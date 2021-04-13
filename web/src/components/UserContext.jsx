import React, {useState, createContext, useContext} from 'react';

export const UserContext = createContext();

export const UserProvider = props => {

    const [username, setUsername] = useState(String(localStorage.getItem('username')));
    const [accessToken, setAccessToken] = useState(String(localStorage.getItem('accessToken')));
    const [refreshToken, setRefreshToken] = useState(String(localStorage.getItem('refreshToken')));

    const value = {
        username, 
        setUsername,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);