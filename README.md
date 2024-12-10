# Matrix-Style Binary Search Tree - Frontend

This is the **frontend** application for visualizing Binary Search Trees in a Matrix-themed style. Built with **React** and **D3.js**, it interacts with the backend service to fetch, save, and display binary search trees dynamically.

## Features
- **Dynamic Tree Visualization**: 
  - Visualize binary search trees dynamically using **D3.js**.
  - Zoom and pan functionality within a constrained container.
  - Nodes and paths are interactive:
    - Hover to display node values.
    - Click to highlight nodes and paths.
  - Export tree visualizations as **SVG files**.

- **Custom Tree Input**:
  - Generate binary search trees by entering numbers manually.

- **Tree Management**:
  - Recent trees are displayed as buttons for quick access.
  - Older trees are listed in a dropdown menu.

- **Matrix-Themed UI**:
  - Styled with a "Matrix" movie-inspired aesthetic using custom CSS.

## Prerequisites
- **Node.js** (LTS version recommended, e.g., Node 18).
- **npm** or **yarn** package manager.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd matrix-tree-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure

```plaintext
src/
├── components/
│   ├── TreeDiagram.js       # Component for rendering the binary search tree
│   └── MatrixTheme.css      # Stylesheet for the Matrix theme
├── utils/
│   └── fetchData.js         # Utility for API calls to the backend
├── App.js                   # Main application component
├── index.js                 # React DOM entry point
└── index.css                # Global CSS styles
```

## API Endpoints
Ensure the backend is running on [http://localhost:8080](http://localhost:8080). The app communicates with the following API endpoints:

- **`GET /api/previous-trees`**: Fetches all previously saved trees.
- **`POST /api/save-tree`**: Saves a newly generated tree to the backend.
- **`POST /api/process-numbers`**: Processes an array of numbers to create and save a tree.

## Usage

### 1. **Run the Frontend**
Start the React development server:
```bash
npm start
```

### 2. **Enter Custom Input**
- Enter a series of numbers (e.g., `10,5,15,3,7`) in the input box to generate a tree.
- Click **"Generate Custom Tree"** to create the tree and save it to the backend.

### 3. **Select Trees**
- **Recent Trees**: The two most recently created or fetched trees are displayed as buttons for quick access.
- **Other Trees**: Older trees are listed in the dropdown menu. Select a tree from the dropdown to visualize it.

### 4. **Interactive Features**
- **Zoom and Pan**: Use your mouse or touchpad to zoom and pan within the tree container.
- **Hover**: View node values by hovering over a node.
- **Click**: Highlight nodes and paths by clicking on them.

### 5. **Export Trees**
Download the current tree visualization as an **SVG file** by clicking the **"Download Tree as SVG"** button.

## Styling

All styles are defined in the `MatrixTheme.css` file to provide a Matrix-style aesthetic. You can customize colors, fonts, and layout as needed.

```css
/* Example CSS snippet */
.matrix-title {
    font-size: 2.5rem;
    color: #00ff00;
    text-shadow: 0 0 5px #00ff00;
}
```

## Troubleshooting

1. **CORS Issues**:
   - Ensure the backend has CORS enabled for requests from [http://localhost:3000](http://localhost:3000).
   - Example Spring Boot CORS configuration:
     ```java
     @CrossOrigin(origins = "http://localhost:3000")
     ```

2. **API Not Responding**:
   - Verify the backend service is running on [http://localhost:8080](http://localhost:8080).

3. **Styling Issues**:
   - Check if the `MatrixTheme.css` file is correctly imported in `App.js`.

## License
This project is licensed under the MIT License.
