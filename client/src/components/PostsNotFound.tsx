import { Container, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PostsNotFound = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Box style={{ marginBottom: "2rem" }}>
        <ErrorOutlineIcon style={{ fontSize: 100, color: "primary.main" }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Posts Not Found
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Oops! We couldn't find any posts here.
      </Typography>
      <Typography variant="subtitle1">
        You might have followed an outdated link, or there may be no posts
        available at the moment.
      </Typography>
    </Container>
  );
};

export default PostsNotFound;
