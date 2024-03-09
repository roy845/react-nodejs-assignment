import { Container, Typography, Button, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Box style={{ marginBottom: "2rem" }}>
        <ErrorOutlineIcon style={{ fontSize: 100, color: "primary.main" }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Oops! The page you're looking for isn't here.
      </Typography>
      <Typography variant="subtitle1">
        You might have the wrong address, or the page may have moved.
      </Typography>
      <Box style={{ marginTop: "2rem" }}>
        <Button variant="contained" color="primary" href="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
