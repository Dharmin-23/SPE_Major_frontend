import React, { useContext, useState } from "react";
// import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme();

function Login() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // const { user, setUser } = useContext(UserContext);

  function onChangeHandler(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl + "/user/login", credentials);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Login Successful \nRedirecting to the home page ");
      navigate(routes.LandingPage);
    } catch {
      alert("Invalid Credentails !!!");
    }
  }


  return (
    // <div className="LoginPage">
    //   <div className="form-box">
    //     <h3>Login</h3>
    //     <form className="login-form" onSubmit={onSubmitHandler}>
    //       <label htmlFor="email">Email</label>
    //       <input
    //         name="email"
    //         onChange={onChangeHandler}
    //         type="text"
    //         placeholder="Enter you email"
    //         value={credentials.email}
    //       />
    //       <label htmlFor="password">Password</label>
    //       <input
    //         name="password"
    //         onChange={onChangeHandler}
    //         type="password"
    //         placeholder="Enter your password"
    //         value={credentials.password}
    //       />
    //       <button className="btn btn-primary" type="submit`">
    //         Login
    //       </button>

    //       <Link
    //         to={routes.Registration}
    //         className="btn btn-dark"
    //         style={{ margin: "5px" }}
    //       >
    //         Create Account
    //       </Link>
    //     </form>
    //   </div>
    // </div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange= {onChangeHandler}
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange= {onChangeHandler}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
