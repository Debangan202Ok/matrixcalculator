/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-promise-executor-return */
import React, { useState } from "react";
import { Button, Grid, Paper, Box, Alert, CircularProgress } from "@mui/material";
import { MatrixInput } from "./ui/MatrixInput";
import { EditableMatrix } from "./ui/EditableMatrix";
import { MatrixDisplay } from "./ui/MatrixDisplay";

// 👉 Main Matrix Component

function Matrix() {
  // 👉 all useful states
  const [rows, setRows] = useState<number | string>("");
  const [columns, setColumns] = useState<number | string>("");
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [resultMatrix, setResultMatrix] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const handleGenerateMatrices = async () => {
    // 👉 MxN size matrix calculation is heavy ux is also important
    setLoading(true);
    setError(null);
    const generateMatrix = (callback: (i: number, j: number) => number) =>
      Array.from({ length: Number(rows) }, (_, i) =>
        Array.from({ length: Number(columns) }, (_, j) => callback(i, j)),
      );

    await new Promise((resolve) => setTimeout(resolve, 500));

    setMatrixA(generateMatrix((i, j) => i + j));
    setMatrixB(generateMatrix((i, j) => i * j));
    setResultMatrix(null);
    setLoading(false);
  };

  const handleMatrixChange = (
    matrixSetter: React.Dispatch<React.SetStateAction<number[][]>>,
    matrix: number[][],
    row: number,
    col: number,
    value: string | number,
  ) => {
    const numericValue = value === "" ? 0 : Number(value);
    const updatedMatrix = matrix.map((rowArr, i) =>
      rowArr.map((cell, j) =>
        i === row && j === col
          ? isNaN(numericValue)
            ? 0
            : numericValue
          : cell,
      ),
    );
    matrixSetter(updatedMatrix);
  };

  const handleMatrixAddition = async () => {
    // 👉 loader before heavy computation
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell + matrixB[i][j]),
    );
    setResultMatrix(result);
    setLoading(false);
  };

  const handleMatrixSubtraction = async () => {
    // 👉 loader before heavy computation
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell - matrixB[i][j]),
    );
    setResultMatrix(result);
    setLoading(false);
  };

  const handleMatrixMultiplication = async () => {
    // 👉 loader before heavy computation
    if (matrixA[0].length !== matrixB.length) {
      setError("Matrix A columns must equal Matrix B rows for multiplication.");
      return;
    }
    setLoading(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = matrixA.map((row, i) =>
      row.map((_, j) =>
        row.reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0),
      ),
    );
    setResultMatrix(result);
    setLoading(false);
  };

  return (
    <Grid container spacing={2}>
      {/* 👉 matrix input ui component */}
      <MatrixInput
        rows={Number(rows)}
        columns={Number(columns)}
        setRows={setRows}
        setColumns={setColumns}
        handleGenerateMatrices={handleGenerateMatrices}
      />

      {loading ? (
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        <>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={2}
              sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
            >
              <h3>Matrix A</h3>
              <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                <EditableMatrix
                  rows={Number(rows)}
                  columns={Number(columns)}
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
              elevation={2}
              sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
            >
              <h3>Matrix B</h3>
              <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                <EditableMatrix
                  rows={Number(rows)}
                  columns={Number(columns)}
                  matrix={matrixB}
                  handleChange={(row, col, value) =>
                    handleMatrixChange(setMatrixB, matrixB, row, col, value)
                  }
                />
              </Box>
            </Paper>
          </Grid>

          {/* 👉 Operation ui buttons */}
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

          {/* 👉 result display ui */}
          {resultMatrix && (
            <Grid item xs={12} sx={{ mb: 5 }}>
              <Paper
                elevation={2}
                sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
              >
                <h3>Result Matrix</h3>
                <Box sx={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                  <MatrixDisplay matrix={resultMatrix} />
                </Box>
              </Paper>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}

export default Matrix;
