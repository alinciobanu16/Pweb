import "../styles/usertype.css";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UserType = () => {
    const { logout, getAccessTokenSilently, isAuthenticated, user, isLoading } =
        useAuth0();

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        userType: "",
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        if (isAuthenticated) {
            setUserData({
                ...userData,
                name: user.name,
                username: user.nickname,
                email: user.email,
                [e.target.name]: e.target.value,
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost/api/users");
        };
    });

    console.log(isAuthenticated);
    console.log(userData);

    const saveData = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost/api/save-user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
            navigate(`/${userData.userType}`);
        } else {
            setErrors(data.errors);
        }
    };

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
                <CssTextField
                    sx={{ mt: 2, width: "30%", marginBottom: "10px" }}
                >
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
                        value={userData.userType}
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
                <span className="text-xs text-red-500 pb-2">
                    {!!errors && errors.email}
                </span>
                <button className="type__btn" onClick={saveData}>
                    Submit
                </button>
                <button
                    className="type__btn"
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default UserType;
