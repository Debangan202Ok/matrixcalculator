import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import Matrix from "./components/Matrix";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <h1>Matrix Calculator</h1>
        <Matrix />
      </Container>
    </ThemeProvider>
  );
}

export default App;
