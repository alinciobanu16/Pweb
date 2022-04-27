import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Refugee from "./pages/Refugee";
import UserType from "./pages/UserType";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/refugee" element={<Refugee />} />
                <Route path="/user-type" element={<UserType />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
