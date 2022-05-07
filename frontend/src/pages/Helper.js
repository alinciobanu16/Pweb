import { useAuth0 } from "@auth0/auth0-react";
import "../styles/usertype.css";
import * as React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backImg from "./images/daria-volkova-qhlmymt14Ys-unsplash.jpg";
import { useEffect, useState } from "react";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link to="/" className="text-sm underline">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const Helper = () => {
    const { logout, getAccessTokenSilently, user } = useAuth0();
    const [helperData, setHelperData] = useState({
        fullName: "",
        email: "",
        phone_number: "",
        person_type: "",
        help_type: "",
        message: "",
    });

    const [errors, setErrors] = useState([]);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        setHelperData({
            ...helperData,
            [e.target.name]: e.target.value,
        });
    };

    const [token, setToken] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            let tkn = await getAccessTokenSilently();
            setToken(tkn);
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost/api/helper", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(helperData),
        });

        const data = await res.json();
        console.log(data);
        if (!data.success) {
            setErrors(data.errors);
        } else {
            setHelperData({
                ...helperData,
                fullName: "",
                email: "",
                phone_number: "",
                person_type: "",
                help_type: "",
                message: "",
            });
            setOpen(true);
        }
    };

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setOpen(false);
        }, 5000);

        return () => {
            clearTimeout(timeId);
        };
    }, [open]);

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
                        backgroundImage: `url(${backImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "top",
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
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ textTransform: "uppercase" }}
                        >
                            Help ukrainian people
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                onChange={handleChange}
                                value={helperData.fullName}
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
                                value={helperData.email}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                onChange={handleChange}
                                value={helperData.phone_number}
                                margin="normal"
                                required
                                fullWidth
                                name="phone_number"
                                label="Phone Number"
                                type="text"
                                id="phone_number"
                                autoComplete="phone_number"
                            />
                            <TextField
                                onChange={handleChange}
                                value={helperData.person_type}
                                margin="normal"
                                required
                                fullWidth
                                name="person_type"
                                label="As what you want to help?"
                                type="text"
                                id="person_type"
                                autoComplete="person_type"
                            />
                            <TextField
                                onChange={handleChange}
                                value={helperData.help_type}
                                margin="normal"
                                required
                                fullWidth
                                name="help_type"
                                label="How you want to help?"
                                type="text"
                                id="help_type"
                                autoComplete="help_type"
                            />
                            <TextField
                                onChange={handleChange}
                                value={helperData.message}
                                margin="normal"
                                required
                                fullWidth
                                name="message"
                                label="Send a message for refugees"
                                type="text"
                                id="message"
                                autoComplete="message"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>
                            {open ? (
                                <Alert variant="filled" severity="success" time>
                                    Your application has been registered. Thank
                                    you for your help. Visit refugee page.
                                </Alert>
                            ) : null}
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        to="/refugee"
                                        className="text-blue-600 underline text-sm"
                                    >
                                        Refugee page
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <button
                                        className="text-blue-600 underline text-sm"
                                        onClick={() =>
                                            logout({
                                                returnTo:
                                                    window.location.origin,
                                            })
                                        }
                                    >
                                        Log Out
                                    </button>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Helper;
