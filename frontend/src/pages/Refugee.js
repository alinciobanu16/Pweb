import { useAuth0 } from "@auth0/auth0-react";
import "../styles/main.css";
import "../styles/refugee.css";
import { useEffect, useRef, useState } from "react";
import defaultProfilePicture from "./images/profile-picture.png";

const sidebarNavItems = [
    {
        display: "Dashboard",
        icon: <i className="bx bx-home"></i>,
        to: "/",
        section: "",
    },
    {
        display: "Getting Started",
        icon: <i className="bx bx-star"></i>,
        to: "/started",
        section: "started",
    },
    {
        display: "Calendar",
        icon: <i className="bx bx-calendar"></i>,
        to: "/calendar",
        section: "calendar",
    },
    {
        display: "User",
        icon: <i className="bx bx-user"></i>,
        to: "/user",
        section: "user",
    },
    {
        display: "Orders",
        icon: <i className="bx bx-receipt"></i>,
        to: "/order",
        section: "order",
    },
];

const Refugee = () => {
    const { logout, getAccessTokenSilently, user, isAuthenticated } =
        useAuth0();

    const [helpers, setHelpers] = useState([]);
    console.log(isAuthenticated);

    // const callApi = () => {
    //     fetch("http://localhost/api/public")
    //         .then((res) => console.log(res.message))
    //         .catch((err) => console.log(err.message));
    // };
    //
    // const callApi2 = async () => {
    //     const res = await fetch("http://localhost/api/public");
    //     const data = await res.json();
    //     console.log(data.message);
    // };

    const getRoute = async () => {
        const token = await getAccessTokenSilently();
        console.log(token);
        const res = await fetch("http://localhost/api/private", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        console.log(data);
    };

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
    }, [user]);

    function getImage() {
        if (user.picture) {
            return <img src={user.picture} />;
        }

        return <img src={defaultProfilePicture} />;
    }

    console.log(helpers);

    return (
        <div className="page-container">
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
                                {/*<button*/}
                                {/*    className="main__btn refugee-btn"*/}
                                {/*    onClick={getRoute}*/}
                                {/*>*/}
                                {/*    Get Route*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                )}

                <div className="content">
                    {helpers.length != 0 && (
                        <ul>
                            {helpers.map((value, index) => {
                                return (
                                    <li className="items-list">
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
                                            <u>Mesaj</u>: {value.message}
                                        </div>
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
