// 👉 all types of matirx configuration will store here

interface MatrixProps {
  rows: number;
  columns: number;
  matrix: number[][];
  handleChange: (row: number, col: number, value: number) => void;
}

export type { MatrixProps };
