import "../styles/main.css";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
    const { loginWithRedirect, loginWithPopup, logout } = useAuth0();
    const redirectUri = "http://localhost:3000/user-type";
    return (
        <div className="main__container">
            <div className="main__helpers">
                {/*<h1>Alături de poporul ucrainean</h1>*/}
                <h1>
                    Together with the <br /> ukrainian people
                </h1>

                <div className="main__container__btn">
                    {/*<Link to="/register" className="main__btn">*/}
                    {/*    Register*/}
                    {/*</Link>*/}
                    <button
                        className="main__btn"
                        onClick={() =>
                            loginWithRedirect({ redirectUri: redirectUri })
                        }
                    >
                        Log In
                    </button>
                    {/*<button*/}
                    {/*    className="main__btn"*/}
                    {/*    onClick={() =>*/}
                    {/*        logout({ returnTo: window.location.origin })*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*    Log Out*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default Main;
