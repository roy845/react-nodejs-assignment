import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function ButtonAppBar() {
  const { pathname } = useLocation();

  const navigate: NavigateFunction = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h3>
            {pathname === "/"
              ? "Users"
              : pathname.includes("/userPosts")
              ? "User Posts"
              : null}
          </h3>

          {pathname.includes("/userPosts") && (
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() => navigate("/")}
              startIcon={<ArrowBack />}
            >
              Go back
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
