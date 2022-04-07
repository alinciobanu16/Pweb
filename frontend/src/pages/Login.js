import { useState } from "react";
import "../styles/login.css";

const Register = () => {
    const [data, setData] = useState("");

    return (
        <div className="lg__container">
            <div className="lg__box">
                <form>
                    <span className="lg__text-center">login</span>
                    <div className="lg__input-container">
                        <input type="text" required="" />
                        <label>Full Name</label>
                    </div>
                    <div className="lg__input-container">
                        <input type="mail" required="" />
                        <label>Email</label>
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
