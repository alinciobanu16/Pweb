import { useAuth0 } from "@auth0/auth0-react";
import "../styles/usertype.css";

const Helper = () => {
    const { logout } = useAuth0();
    return (
        <>
            <div>Aici cod</div>
            <button
                className="type__btn"
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                Log Out
            </button>
        </>
    );
};

export default Helper;
