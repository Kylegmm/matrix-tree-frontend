import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TreeDiagram = ({ treeData }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!treeData) return;

        const containerWidth = 800; // Match the container width in CSS
        const containerHeight = 600;

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };

        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);

        // Clear previous tree diagram
        svg.selectAll("*").remove();

        svg.attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`) // SVG viewBox for scaling
            .attr("preserveAspectRatio", "xMidYMid meet") // Keep aspect ratio centered
            .style("border", "2px solid #00ff00") // Container border styling
            .call(
                d3.zoom()
                    .scaleExtent([0.5, 2]) // Limit zoom levels
                    .translateExtent([[0, 0], [containerWidth, containerHeight]]) // Limit panning
                    .on("zoom", (event) => {
                        svgGroup.attr("transform", event.transform);
                    })
            );

        const svgGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Create tree layout
        const treeLayout = d3.tree().size([width, height]);

        const root = d3.hierarchy(treeData, (node) => {
            const children = [];
            if (node.left) children.push(node.left);
            if (node.right) children.push(node.right);
            return children.length ? children : null;
        });

        treeLayout(root);

        // Offset to center the tree
        const xOffset = (width - (root.x || 0)) / 2 - (root.x || 0) / 2;

        // Draw links (diagonal paths)
        svgGroup.append("g")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkVertical()
                .x((d) => d.x + xOffset)
                .y((d) => d.y)
            )
            .attr("stroke", "#00ff00")
            .attr("fill", "none")
            .attr("stroke-width", 2);

        // Draw nodes (circles)
        svgGroup.append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("circle")
            .attr("cx", (d) => d.x + xOffset)
            .attr("cy", (d) => d.y)
            .attr("r", 20)
            .attr("fill", "#00ff00")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "#ffffff");
                svgGroup.append("text")
                    .attr("id", "hover-label")
                    .attr("x", d.x + xOffset + 10)
                    .attr("y", d.y - 10)
                    .attr("fill", "#ffffff")
                    .text(`Value: ${d.data.value}`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "#00ff00");
                svgGroup.select("#hover-label").remove();
            })
            .on("click", function (event, d) {
                svgGroup.selectAll("path")
                    .attr("stroke", (link) =>
                        link.target === d ? "#ffffff" : "#00ff00"
                    )
                    .attr("stroke-width", (link) =>
                        link.target === d ? 4 : 2
                    );
                svgGroup.selectAll("circle")
                    .attr("fill", (node) =>
                        node === d ? "#ffffff" : "#00ff00"
                    );
            });

        // Draw labels (node values)
        svgGroup.append("g")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .attr("x", (d) => d.x + xOffset)
            .attr("y", (d) => d.y - 25)
            .attr("text-anchor", "middle")
            .attr("fill", "#00ff00")
            .style("font-size", "14px")
            .style("font-family", "Courier New")
            .text((d) => d.data.value);

    }, [treeData]);

    return <svg ref={svgRef}></svg>;
};

export default TreeDiagram;
