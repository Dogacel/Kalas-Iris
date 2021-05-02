import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, logout2 } from "../api/api";
import { useUserContext } from "../components/UserContext";

export default function Logout() {
    const navigate = useNavigate();

    const {
        setUsername,
        setAccessToken,
        setRefreshToken,
        accessToken, 
        refreshToken
    } = useUserContext();

    const authStr = "Bearer ".concat(accessToken);
    const config = {
        headers: { Authorization: authStr },
    };

    const refreshStr = "Bearer ".concat(refreshToken);
    const refreshConfig = {
        headers: { Authorization: refreshStr},
    };

    useEffect(() => {
        logout2(refreshConfig).then(() => {
            setRefreshToken("");
        }).catch(() => {
            setRefreshToken("")
        });

        logout(config).then(() => {
            setUsername("");
            setAccessToken("");
            navigate("/", { message: "Logged out." });
        }).catch(() => {
            setUsername("");
            setAccessToken("");
            navigate("/", { message: "You are not logged in!" });
        });
    }, []);

    return <></>;
}