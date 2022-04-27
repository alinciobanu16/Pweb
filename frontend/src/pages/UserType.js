import "../styles/main.css";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled,
} from "@mui/material";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserType = () => {
    const { logout, getAccessTokenSilently, isAuthenticated, user } =
        useAuth0();

    const [data, setData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        userType: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });

        // setData({
        //     ...data, email: user.email
        // })
    };

    console.log(user);

    console.log(isAuthenticated);

    console.log(data);

    const CssTextField = styled(FormControl)({
        "& label.Mui-focused": {
            color: "white",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "white",
            },
            "&:hover fieldset": {
                borderColor: "white",
            },
            "&.Mui-focused fieldset": {
                borderColor: "white",
            },
        },
    });

    return (
        <div className="main__container">
            <div className="main__helpers">
                <CssTextField sx={{ mt: 2, width: "30%" }}>
                    <InputLabel
                        id="demo-simple-select-helper-label"
                        sx={{ color: "white", textAlign: "center" }}
                    >
                        Why you register?
                    </InputLabel>
                    <Select
                        sx={{ color: "white" }}
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
                            I am an ukrainian refugee and I need help
                        </MenuItem>
                    </Select>
                </CssTextField>
                <button
                    className="main__btn"
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default UserType;
