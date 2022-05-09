import { useState } from "react";
import "../styles/register.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import img from "./images/ben-masora-YQLGqjM4Tus-unsplash.jpg";
import { Link } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        userType: "",
    });

    const theme = createTheme();

    const handleSubmit = () => {};
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                autoComplete="fullName"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                // autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Why you register?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={data.userType}
                                    label="Why you register?"
                                    name="userType"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="helper">
                                        I want to help ukrainian refugees
                                    </MenuItem>
                                    <MenuItem value="refugee">
                                        I am an ukrainian refugee and I need
                                        help
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        to="/"
                                        className="text-blue-500 text-sm underline"
                                    >
                                        Back
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link
                                        to="/register"
                                        className="text-blue-500 text-sm underline"
                                    >
                                        Already have an account? Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Register;
