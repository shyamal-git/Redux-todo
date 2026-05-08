import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { loginUser } from "../features/auth/authSlice";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful");
      navigate("/dashboard");
    } else {
      toast.error(result.payload);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: 4,
          }}
        >
          <Typography variant="h4" mb={3} textAlign="center">
            Login
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </form>

          <Typography mt={2}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>

          <Typography mt={3} variant="body2">
            Demo Credentials:
            <br />
            Username: emilys
            <br />
            Password: emilyspass
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
