/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Button, Grid, Paper, Box } from "@mui/material";
import { MatrixInput } from "./ui/MatrixInput";
import { EditableMatrix } from "./ui/EditableMatrix";
import { MatrixDisplay } from "./ui/MatrixDisplay";

function Matrix() {
  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);

  const handleGenerateMatrices = () => {
    const generateMatrix = (callback: (i: number, j: number) => number) =>
      Array.from({ length: rows }, (_, i) =>
        Array.from({ length: columns }, (_, j) => callback(i, j)),
      );

    setMatrixA(generateMatrix((i, j) => i + j));
    setMatrixB(generateMatrix((i, j) => i * j));
    setResultMatrix(null);
  };

  const handleMatrixChange = (
    matrixSetter: React.Dispatch<React.SetStateAction<number[][]>>,
    matrix: number[][],
    row: number,
    col: number,
    value: number,
  ) => {
    const updatedMatrix = matrix.map((rowArr, i) =>
      rowArr.map((cell, j) => (i === row && j === col ? value : cell)),
    );
    matrixSetter(updatedMatrix);
  };

  const handleMatrixAddition = () => {
    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell + matrixB[i][j]),
    );
    setResultMatrix(result);
  };

  const handleMatrixSubtraction = () => {
    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell - matrixB[i][j]),
    );
    setResultMatrix(result);
  };

  const handleMatrixMultiplication = () => {
    const result = matrixA.map((row, i) =>
      row.map((_, j) =>
        row.reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0),
      ),
    );
    setResultMatrix(result);
  };

  return (
    <Grid container spacing={2}>
      <MatrixInput
        rows={rows}
        columns={columns}
        setRows={setRows}
        setColumns={setColumns}
        handleGenerateMatrices={handleGenerateMatrices}
      />

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
        >
          <h3>Matrix A</h3>
          <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <EditableMatrix
              rows={rows}
              columns={columns}
              matrix={matrixA}
              handleChange={(row, col, value) =>
                handleMatrixChange(setMatrixA, matrixA, row, col, value)
              }
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={3}
          sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
        >
          <h3>Matrix B</h3>
          <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            <EditableMatrix
              rows={rows}
              columns={columns}
              matrix={matrixB}
              handleChange={(row, col, value) =>
                handleMatrixChange(setMatrixB, matrixB, row, col, value)
              }
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={handleMatrixAddition}>
            Add Matrices
          </Button>
          <Button variant="contained" onClick={handleMatrixSubtraction}>
            Subtract Matrices
          </Button>
          <Button variant="contained" onClick={handleMatrixMultiplication}>
            Multiply Matrices
          </Button>
        </Box>
      </Grid>

      {resultMatrix && (
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
          >
            <h3>Result Matrix</h3>
            <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <MatrixDisplay matrix={resultMatrix} />
            </Box>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default Matrix;
