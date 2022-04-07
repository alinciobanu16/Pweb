import { useAuth0 } from "@auth0/auth0-react";
import "../styles/main.css";

const Refugee = () => {
    const { logout, getAccessTokenSilently } = useAuth0();

    const callApi = () => {
        fetch("http://localhost/api/public")
            .then((res) => console.log(res.message))
            .catch((err) => console.log(err.message));
    };

    const callApi2 = async () => {
        const res = await fetch("http://localhost/api/public");
        const data = await res.json();
        console.log(data.message);
    };

    const getRoute = async () => {
        const token = await getAccessTokenSilently();
        console.log(token);
        const res = await fetch("http://localhost/api/public", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
            },
        });
        const data = await res.json();
        console.log(data);
    };
    return (
        <div>
            <button
                className="main__btn"
                onClick={() => logout({ returnTo: window.location.origin })}
            >
                Log Out
            </button>
            <button className="main__btn" onClick={callApi2}>
                Get Route
            </button>
        </div>
    );
};

export default Refugee;
