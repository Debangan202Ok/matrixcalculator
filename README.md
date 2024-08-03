# Matrix Calculator

A Simple Matrix Calculator that performs calculations like Addition, Subtraction, and Multiplication of MxN dimension matrices.

## Folder Structure

```
my-project/
├── public/
│  
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── MatrixInput.tsx
│   │   │   ├── EditableMatrix.tsx
│   │   │   └── MatrixDisplay.tsx
│   │   └── Matrix.tsx
│   ├── themes/
│   │   └── theme.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.html
├── package.json
├── tsconfig.json
└── ...
```

- **public/**: Contains the static files.
- **src/**: Contains the source code for the React application.
  - **components/**: Contains reusable UI components.
    - **ui/**: Contains UI components.
      - **MatrixInput.tsx**: Component for inputting the matrix dimensions and generating matrices.
      - **EditableMatrix.tsx**: Component for displaying and editing matrices.
      - **MatrixDisplay.tsx**: Component for displaying the result matrix.
    - **Matrix.tsx**: Main matrix component.
  - **themes/**: Contains theme configurations.
    - **theme.tsx**: Theme configuration file.
  - **types/**: Contains TypeScript type definitions.
    - **index.ts**: Type definitions.
  - **App.tsx**: Main application component.
  - **main.tsx**: Entry point for the React application.
  - **index.html**: Main HTML file.

## Run Locally

### Clone the project

```bash
git clone https://github.com/Debangan202Ok/matrixcalculator.git
```

### Go to the project directory

```bash
cd matrixcalculator
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm run dev
```

This will start the development server and open the application in your default web browser.

## Usage

1. **Input Matrix Dimensions**: Enter the number of rows and columns for the matrices in the input fields provided.
2. **Generate Matrices**: Click the "Generate Matrices" button to create two matrices (Matrix A and Matrix B) with the specified dimensions.
3. **Edit Matrices**: Modify the values in Matrix A and Matrix B as needed. Leave any cell blank to set its value to 0.
4. **Perform Operations**: Click on the buttons to perform matrix operations:
   - **Add Matrices**: Adds the corresponding elements of Matrix A and Matrix B.
   - **Subtract Matrices**: Subtracts the corresponding elements of Matrix B from Matrix A.
   - **Multiply Matrices**: Multiplies Matrix A and Matrix B if the number of columns in Matrix A equals the number of rows in Matrix B. If not, an error message will be displayed.
5. **View Result**: The result of the matrix operation will be displayed below the operation buttons.

## Components

### MatrixInput

- **Props**:
  - `rows`: Number of rows for the matrices.
  - `columns`: Number of columns for the matrices.
  - `setRows`: Function to set the number of rows.
  - `setColumns`: Function to set the number of columns.
  - `handleGenerateMatrices`: Function to generate matrices based on the specified dimensions.

### EditableMatrix

- **Props**:
  - `rows`: Number of rows for the matrix.
  - `columns`: Number of columns for the matrix.
  - `matrix`: The matrix data.
  - `handleChange`: Function to handle changes in the matrix cells.

### MatrixDisplay

- **Props**:
  - `matrix`: The matrix data to display.

## Error Handling

- If the user attempts to perform matrix multiplication with incompatible matrices (i.e., the number of columns in Matrix A does not equal the number of rows in Matrix B), an error message will be displayed.

## Loading Indicator

- While performing heavy computations (e.g., generating matrices or performing operations), a loading spinner will be displayed to indicate that the operation is in progress.

## Note

- If you encounter any warnings in the code editor, they might be caused by ESLint configurations. This project follows the Airbnb coding guidelines, and some warnings may be related to those standards. Make sure to check your ESLint configuration if you need to adjust any settings.