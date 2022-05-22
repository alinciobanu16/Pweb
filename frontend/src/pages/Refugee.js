import { useAuth0 } from "@auth0/auth0-react";
import "../styles/main.css";
import "../styles/refugee.css";
import { useEffect, useState } from "react";
import defaultProfilePicture from "./images/profile-picture.png";
import { TextField, Alert, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const Refugee = () => {
    const { logout, getAccessTokenSilently, user, isAuthenticated } =
        useAuth0();

    const [userType, setUserType] = useState("");
    const [show, setShow] = useState(false);
    const [helpers, setHelpers] = useState([]);
    const [mailData, setMailData] = useState({
        refName: "",
        refEmail: user.email,
        refPhoneNumber: "",
        helpService: "",
        helpEmail: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            const res = await fetch("http://localhost/api/helper", {
                method: "GET",
                headers: {
                    "Content-type": "appication/json",
                    Authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            if (data.success) {
                setHelpers(data.helpers.reverse());
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, getAccessTokenSilently]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await getAccessTokenSilently();
            const res = await fetch("http://localhost/api/check-user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify(user),
            });
            const data = await res.json();
            if (data.success) {
                setUserType(data.userType);
            } else setUserType("");
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, getAccessTokenSilently, user]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setMailData({
            ...mailData,
            helpEmail: "",
            refEmail: user.email,
            helpService: "",
            refName: "",
            refPhoneNumber: "",
        });
    };
    const handleClose = () => setOpen(false);

    const handleInput = (e) => {
        setMailData({ ...mailData, [e.target.name]: e.target.value });
    };

    function getImage() {
        return <img src={defaultProfilePicture} alt="" />;
    }

    const sendMail = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost/api/send-email", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(mailData),
        });

        const data = await res.json();
        if (data.success) {
            setMailData({
                ...mailData,
                helpEmail: "",
                refEmail: "",
                helpService: "",
                refName: "",
                refPhoneNumber: "",
            });
            setShow(true);
        }
    };

    console.log(mailData);

    const handleShow = () => {
        setShow(false);
    };

    return (
        <div className="page-container">
            <span className="text-white text-3xl flex items-center justify-center">
                Active Services
            </span>
            <div className="container">
                {isAuthenticated && (
                    <div>
                        <div className="profile-details-container">
                            <div className="image-container">{getImage()}</div>
                            <div className="full-name">
                                {user.given_name} {user.family_name}
                            </div>
                            <div className="btn-container">
                                <button
                                    className="main__btn refugee-btn"
                                    onClick={() =>
                                        logout({
                                            returnTo: window.location.origin,
                                        })
                                    }
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="content">
                    {helpers.length !== 0 && (
                        <ul>
                            {helpers.map((value, index) => {
                                return (
                                    <li className="items-list" key={index}>
                                        <div className="top-row">
                                            {value.help_type}
                                        </div>
                                        <div className="middle-row">
                                            <div id="person-details">
                                                {value.fullName},{" "}
                                                <i>{value.person_type}</i>
                                            </div>
                                            <div>Email: {value.email}</div>
                                            <div>
                                                Phone: {value.phone_number}
                                            </div>
                                        </div>
                                        <div className="bottom-row">
                                            <u>Message</u>: {value.message}
                                        </div>
                                        {userType === "refugee" && (
                                            <div className="flex item-center justify-center mt-5">
                                                <button
                                                    className="refugee-btn"
                                                    onClick={() => {
                                                        handleOpen();
                                                        setMailData({
                                                            ...mailData,
                                                            helpEmail:
                                                                value.email,
                                                            helpService:
                                                                value.help_type,
                                                        });
                                                    }}
                                                >
                                                    Accept
                                                </button>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={open}
                                                    onClose={() => {
                                                        handleClose();
                                                        handleShow();
                                                    }}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={open}>
                                                        <Box sx={style}>
                                                            <TextField
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                value={
                                                                    mailData.refName
                                                                }
                                                                sx={{
                                                                    width: "300px",
                                                                }}
                                                                id="standard-basic"
                                                                label="Name"
                                                                name="refName"
                                                                variant="standard"
                                                            />
                                                            <TextField
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                value={
                                                                    mailData.refEmail
                                                                }
                                                                sx={{
                                                                    width: "300px",
                                                                    marginTop:
                                                                        "7px",
                                                                }}
                                                                id="standard-basic"
                                                                label="Email"
                                                                name="refEmail"
                                                                variant="standard"
                                                            />
                                                            <TextField
                                                                onChange={
                                                                    handleInput
                                                                }
                                                                value={
                                                                    mailData.refPhoneNumber
                                                                }
                                                                sx={{
                                                                    width: "300px",
                                                                    marginTop:
                                                                        "7px",
                                                                }}
                                                                id="standard-basic"
                                                                label="Phone Number"
                                                                name="refPhoneNumber"
                                                                variant="standard"
                                                            />

                                                            <Button
                                                                onClick={
                                                                    sendMail
                                                                }
                                                                type="submit"
                                                                fullWidth
                                                                variant="contained"
                                                                sx={{
                                                                    mt: 3,
                                                                    mb: 2,
                                                                    backgroundColor:
                                                                        "darkgreen",
                                                                }}
                                                            >
                                                                Submit
                                                            </Button>
                                                            {show ? (
                                                                <Alert
                                                                    variant="filled"
                                                                    severity="success"
                                                                >
                                                                    Your request
                                                                    has been
                                                                    sent to the
                                                                    helper. He
                                                                    will contact
                                                                    you soon.
                                                                </Alert>
                                                            ) : null}
                                                        </Box>
                                                    </Fade>
                                                </Modal>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Refugee;
