import { useState } from "react";
import { Button, Grid, TextField, Box, Alert } from "@mui/material";

export function MatrixInput({
  rows,
  columns,
  setRows,
  setColumns,
  handleGenerateMatrices,
}: {
  rows: number;
  columns: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setColumns: React.Dispatch<React.SetStateAction<number>>;
  handleGenerateMatrices: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = () => {
    if (rows <= 0 || columns <= 0) {
      setError("Rows and columns must be positive numbers greater than 0");
      return;
    }
    setError(null);
    handleGenerateMatrices();
  };

  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          label="Rows"
          type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value, 10))}
        />
        <TextField
          label="Columns"
          type="number"
          value={columns}
          onChange={(e) => setColumns(parseInt(e.target.value, 10))}
        />
        <Button variant="contained" onClick={handleGenerateClick}>
          Generate Matrices
        </Button>
      </Box>
      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Grid>
  );
}

export default MatrixInput;
