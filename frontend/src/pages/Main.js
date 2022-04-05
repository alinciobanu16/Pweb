import "../styles/main.css";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className="main__container">
            <div className="main__helpers">
                {/*<h1>Alături de poporul ucrainean</h1>*/}
                <h1>Together with the ukrainian people</h1>

                <div className="mt-5 flex flex-row">
                    <Link to="/register" className="main__btn">
                        Register
                    </Link>
                    <Link to="/login" className="main__btn">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Main;
