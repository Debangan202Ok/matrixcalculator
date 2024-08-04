/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-promise-executor-return */
import React, { useState, useRef, useEffect } from "react";
import { Button, Grid, Paper, Box, Alert, Typography, Skeleton } from "@mui/material";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);

  // 👉 debounce ref for user experince and prevent unecessary re-renders
  const debounceTimeoutRef = useRef(null);

  const handleGenerateMatrices = async () => {
    // 👉 MxN size matrix calculation is heavy ux is also important
    setLoading(true);
    setError(null);
    const generateMatrix = (callback: (i: number, j: number) => number) =>
      Array.from({ length: Number(rows) }, (_, i) =>
        Array.from({ length: Number(columns) }, (_, j) => callback(i, j)),
      );

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setMatrixA(generateMatrix((i, j) => i + j));
    setMatrixB(generateMatrix((i, j) => i * j));
    setResultMatrix(null);
    setLoading(false);
  };

  // 👉 Hanlder for edit matrix
  const handleMatrixChange = (
    matrixSetter: React.Dispatch<React.SetStateAction<number[][]>>,
    matrix: number[][],
    row: number,
    col: number,
    value: string | number,
  ) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
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
    }, 300);
  };

  const handleMatrixAddition = async () => {
    // 👉 loader before heavy computation
    setCalculating(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell + matrixB[i][j]),
    );
    setResultMatrix(result);
    setCalculating(false);
  };

  const handleMatrixSubtraction = async () => {
    // 👉 loader before heavy computation
    setCalculating(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = matrixA.map((row, i) =>
      row.map((cell, j) => cell - matrixB[i][j]),
    );
    setResultMatrix(result);
    setCalculating(false);
  };

  const handleMatrixMultiplication = async () => {
    // 👉 loader before heavy computation
    if (matrixA[0].length !== matrixB.length) {
      setError("Matrix A columns must equal Matrix B rows for multiplication.");
      return;
    }
    setCalculating(true);
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = matrixA.map((row, i) =>
      row.map((_, j) =>
        row.reduce((sum, _, k) => sum + matrixA[i][k] * matrixB[k][j], 0),
      ),
    );
    setResultMatrix(result);
    setCalculating(false);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Grid container spacing={2}>
      {/* 👉 matrix input ui component */}
      <MatrixInput
        rows={rows}
        columns={columns}
        setRows={setRows}
        setColumns={setColumns}
        handleGenerateMatrices={handleGenerateMatrices}
      />

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
          {loading ? (
            <>
              <Typography>Loading Matrix A...</Typography>
              <Skeleton width="100%" height="350px">
                <Typography>.</Typography>
              </Skeleton>
            </>
          ) : (
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
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={2}
          sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
        >
          <h3>Matrix B</h3>
          {loading ? (
            <>
              <Typography>Loading Matrix B...</Typography>
              <Skeleton width="100%" height="350px">
                <Typography>.</Typography>
              </Skeleton>
            </>
          ) : (
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
          )}
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
      {calculating ? (
        <Grid item xs={12} sx={{ mb: 5 }}>
          <Paper
            elevation={2}
            sx={{ padding: 2, maxHeight: 400, overflow: "auto" }}
          >
            <Typography>Please wait, calculating...</Typography>
            <Skeleton width="100%" height="150px">
              <Typography>.</Typography>
            </Skeleton>
          </Paper>
        </Grid>
      ) : (
        resultMatrix && (
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
        )
      )}
    </Grid>
  );
}

export default Matrix;
