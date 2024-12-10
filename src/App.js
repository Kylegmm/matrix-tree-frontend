import React, { useState, useEffect } from "react";
import TreeDiagram from "./components/TreeDiagram";
import "./components/MatrixTheme.css";
import { fetchTrees } from "./utils/fetchData";

function App() {
    const [trees, setTrees] = useState([]); // Fetched trees from backend
    const [selectedTree, setSelectedTree] = useState(null); // Current selected tree
    const [customTreeInput, setCustomTreeInput] = useState(""); // Input for custom tree

    // Fetch trees from backend
    useEffect(() => {
        fetchTrees().then((data) => {
            console.log("Fetched Trees:", data);
            setTrees(data);
        });
    }, []);

    // Utility to create a binary search tree from an array
    const generateBinarySearchTree = (numbers) => {
        const insertNode = (root, value) => {
            if (!root) return { value };
            if (value < root.value) root.left = insertNode(root.left, value);
            else root.right = insertNode(root.right, value);
            return root;
        };
        return numbers.reduce((tree, num) => insertNode(tree, num), null);
    };

    // Save the generated tree to the backend
    const saveTree = async (tree) => {
        try {
            const response = await fetch("http://localhost:8080/api/save-tree", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    inputNumbers: customTreeInput,
                    treeStructure: JSON.stringify(tree),
                }),
            });
            const savedTree = await response.json();
            console.log("Saved Tree:", savedTree);
            setTrees((prevTrees) => [...prevTrees, savedTree]); // Add saved tree to the list
            setSelectedTree(savedTree); // Automatically select and display the new tree
        } catch (error) {
            console.error("Error saving tree:", error);
        }
    };

    // Handle generating and saving a custom tree
    const handleGenerateTree = () => {
        if (!customTreeInput.trim()) return;
        const numbers = customTreeInput.split(",").map(Number);
        const tree = generateBinarySearchTree(numbers);
        console.log("Generated Custom Tree:", tree);

        // Save the generated tree to the database
        saveTree(tree);
    };

    // Handle tree selection from dropdown
    const handleTreeSelection = (event) => {
        const selectedId = parseInt(event.target.value);
        const selected = trees.find((tree) => tree.id === selectedId);
        setSelectedTree(selected || null);
    };

    // Determine the most recent two trees
    const recentTrees = trees.slice(-2); // Get the last two trees
    const otherTrees = trees.slice(0, -2); // Get all other trees

    return (
        <div className="matrix-theme">
            <h1 className="matrix-title">Binary Search Tree - Matrix Style</h1>

            {/* Custom Tree Input */}
            <div className="custom-tree-input">
                <input
                    type="text"
                    value={customTreeInput}
                    onChange={(e) => setCustomTreeInput(e.target.value)}
                    placeholder="Enter numbers (e.g., 10,5,15,3,7)"
                />
                <button onClick={handleGenerateTree}>Generate Custom Tree</button>
            </div>

            {/* Recent Trees as Buttons */}
            <div className="recent-trees">
                {recentTrees.map((tree) => (
                    <button
                        key={tree.id}
                        onClick={() => setSelectedTree(tree)}
                        className="recent-tree-button"
                    >
                        Tree {tree.id}: {tree.inputNumbers}
                    </button>
                ))}
            </div>

            {/* Dropdown for Other Trees */}
            {otherTrees.length > 0 && (
                <div className="tree-dropdown">
                    <label htmlFor="tree-select" className="dropdown-label">
                        Select from other trees:
                    </label>
                    <select
                        id="tree-select"
                        onChange={handleTreeSelection}
                        value={selectedTree?.id || ""}
                    >
                        <option value="" disabled>
                            -- Choose a Tree --
                        </option>
                        {otherTrees.map((tree) => (
                            <option key={tree.id} value={tree.id}>
                                Tree {tree.id}: {tree.inputNumbers}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Tree Visualization */}
            <div className="tree-diagram">
                {selectedTree ? (
                    <TreeDiagram
                        treeData={
                            typeof selectedTree.treeStructure === "string"
                                ? JSON.parse(selectedTree.treeStructure)
                                : selectedTree.treeStructure
                        }
                    />
                ) : (
                    <p>Select or generate a tree to visualize it</p>
                )}
            </div>
        </div>
    );
}

export default App;
