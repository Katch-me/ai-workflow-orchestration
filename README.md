# AI Workflow Orchestration

## Overview
This project implements an interactive AI workflow pipeline system that allows users to visually construct and analyze node-based pipelines. The system enables pipeline creation through connected nodes, dynamic text input handling, and backend validation of the pipeline structure.

The project was developed during a technical evaluation from VectorShift.ai and demonstrates frontend abstraction design, dynamic UI behavior, and backend pipeline validation.

---

## Project Objective
The objective of this project is to design a flexible node-based workflow system where users can construct pipelines and submit them for validation.

The backend processes the pipeline structure and determines key properties such as:
- Number of nodes
- Number of edges
- Whether the pipeline forms a Directed Acyclic Graph (DAG)

---

## Key Features

### Node Abstraction
A reusable abstraction layer was created for nodes to avoid duplicating code when adding new nodes. This abstraction allows new node types to be created easily while maintaining consistent styling and functionality across the workflow system.

### Custom Node Creation
Multiple new node types were implemented to demonstrate the flexibility of the node abstraction architecture.

### Dynamic Text Node
The text node includes enhanced functionality:
- Automatically resizes based on the amount of text entered
- Detects variables defined using `{{variable}}` syntax
- Dynamically generates input handles for detected variables

### Pipeline Visualization
Users can visually construct pipelines by connecting nodes using edges, enabling a clear representation of workflow logic.

### Backend Pipeline Parsing
The frontend sends pipeline data (nodes and edges) to a FastAPI backend endpoint.

The backend processes the pipeline and returns:
- Total number of nodes
- Total number of edges
- Whether the pipeline forms a Directed Acyclic Graph (DAG)

### Result Notification
After submitting the pipeline, the frontend displays an alert showing pipeline statistics and DAG validation results.

---

## Tech Stack

### Frontend
- React
- JavaScript
- React Flow

### Backend
- Python
- FastAPI

---

## System Architecture
User Interface (React)
↓
Pipeline Construction
↓
Submit Pipeline
↓
FastAPI Backend
↓
Pipeline Parsing + DAG Check
↓
Response to Frontend
↓
User Alert with Results

---

## Project Structure
ai-workflow-orchestration
│
├── frontend
│ ├── src
│ │ ├── nodes
│ │ ├── components
│ │ └── submit.js
│
├── backend
│ ├── main.py
│
└── README.md


---

## Running the Project

### Run the Frontend
cd backend
uvicorn main:app --reload


---

## Example Workflow

1. Create nodes in the workflow editor.
2. Connect nodes using edges.
3. Click **Submit Pipeline**.
4. The pipeline data is sent to the backend.
5. The backend processes the structure and checks if it forms a DAG.
6. The frontend displays the pipeline statistics in an alert.

---

## Future Improvements

Potential improvements for the system include:

- Persistent workflow storage
- Pipeline versioning
- Real-time validation
- Execution engine for running pipelines
- Integration with AI model APIs
- Improved UI for workflow editing

---

## Author

Khushi Vasava  
Nirma University
