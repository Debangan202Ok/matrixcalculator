/* eslint-disable import/no-extraneous-dependencies */
import {
  Container,
  ThemeProvider,
  CssBaseline,
  Box,
  Tooltip,
} from "@mui/material";
import { FaGithubSquare } from "react-icons/fa";
import Matrix from "./components/Matrix";
import theme from "./theme/theme";

function App() {
  const handleGithubClick = () => {
    window.open("https://github.com/Debangan202Ok/matrixcalculator", "_blank");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <h1>Matrix Calculator</h1>
          <Tooltip title="Source Code">
            <FaGithubSquare
              style={{ width: "35px", height: "35px", cursor: "pointer" }}
              onClick={handleGithubClick}
            />
          </Tooltip>
        </Box>
        <Matrix />
      </Container>
    </ThemeProvider>
  );
}

export default App;
