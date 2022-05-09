import { useState } from "react";
import * as React from "react";

import "../styles/login.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const Register = () => {
    const [data, setData] = useState("");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="lg__container">
            <div>
                <Button
                    sx={{ color: "black" }}
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Refugee page</MenuItem>
                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>
            <div className="lg__box">
                <form>
                    <span className="lg__text-center">
                        Help ukrainian people
                    </span>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>Full Name</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="mail" required="" />
                        <label>Email</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>Phone number</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>As what you want to help?</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>How you want to help?</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>Send a message for refugees</label>
                    </div>

                    <button type="button" className="lg__btn">
                        submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
