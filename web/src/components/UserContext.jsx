import React, {useState, createContext, useContext} from 'react';

export const UserContext = createContext();

export const UserProvider = props => {
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const value = {
        username, 
        setUsername,
        accessToken,
        setAccessToken
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);