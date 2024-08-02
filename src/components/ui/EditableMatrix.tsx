/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField } from "@mui/material";
import { MatrixProps } from "../../types";

export function EditableMatrix({
  rows,
  columns,
  matrix,
  handleChange,
}: MatrixProps) {
  return (
    <div style={{ display: "flex", gap: "5px", flexDirection: "column" }}>
      {matrix.map((row, i) => (
        <div style={{ display: "flex", gap: "5px" }} key={i}>
          {row.map((cell, j) => (
            <TextField
              key={j}
              type="number"
              value={cell}
              onChange={(e) => handleChange(i, j, parseInt(e.target.value, 10))}
              sx={{
                minWidth: "70px",
                minHeight: "80px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
