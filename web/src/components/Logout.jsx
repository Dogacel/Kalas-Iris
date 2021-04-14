import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/api";
import { useUserContext } from "../components/UserContext";

export default function Logout() {
    const navigate = useNavigate();

    const {
        setUsername,
        setAccessToken,
        setRefreshToken
    } = useUserContext();

    useEffect(() => {
        logout().then(() => {
            setUsername("");
            setAccessToken("");
            setRefreshToken("");
            navigate("/", { message: "Logged out." });
        }).catch(() => {
            setUsername("");
            setAccessToken("");
            setRefreshToken("");
            navigate("/", { message: "You are not logged in!" });
        });
    }, []);

    return <></>;
}