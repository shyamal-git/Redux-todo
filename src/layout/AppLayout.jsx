import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";
import { selectUser } from "../features/auth/authSelectors";

const navLinkStyles = ({ isActive }) => ({
  color: "#fff",
  opacity: isActive ? 1 : 0.78,
  textDecoration: "none",
  fontWeight: 600,
});

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f8fb" }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Product Todo Admin
          </Typography>

          <Stack direction="row" spacing={3} alignItems="center">
            <NavLink to="/dashboard" style={navLinkStyles}>
              Dashboard
            </NavLink>
            <NavLink to="/products" style={navLinkStyles}>
              Products
            </NavLink>
            {user?.username && (
              <Typography variant="body2" sx={{ opacity: 0.86 }}>
                {user.username}
              </Typography>
            )}
            <Button color="inherit" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppLayout;
