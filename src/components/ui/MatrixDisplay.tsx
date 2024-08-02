/* eslint-disable react/no-array-index-key */
import { TextField, Box } from "@mui/material";

export function MatrixDisplay({ matrix }: { matrix: number[][] }) {
  return (
    <Box>
      {matrix.map((row, i) => (
        <Box display="flex" gap={1} key={i} mb={1}>
          {row.map((cell, j) => (
            <TextField
              key={j}
              value={cell}
              disabled
              sx={{
                minWidth: "70px",
                minHeight: "80px",
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
