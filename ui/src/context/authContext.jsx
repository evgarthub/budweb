import React, { createContext, useState, useEffect } from 'react';
import { doLogin, doRegistration } from '../utils/authorization';
import { getMe } from '../utils/fetchAPI';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const defaultState = {
        username: 'Вхiд',
    };
    const [userProfile, setUserProfile] = useState(defaultState);

    const handleUpdate = (input) => {
        setUserProfile(input);
    };

    const updateCurrentUser = () => {
        return getMe().then((response) => {
            switch (response.status) {
                case 200:
                    handleUpdate(response.data);
                    break;
                default:
                    createMessage(response.statusText);
            }
        })
    }

    useEffect(() => {
        updateCurrentUser().catch(data => {
            createMessage(data);
        });
    }, [])

    const handleLogin = (login, password, callback) => {
        doLogin(login, password)
            .then(resp => {
                const { jwt } = resp.data;

                switch (resp.status) {
                    case 200:
                        localStorage.setItem('nb_token', jwt);
                        updateCurrentUser();
                        break;

                    default:
                        createMessage(resp.statusText);
                }
                
                if (callback) {
                    callback();
                }
            })
            .catch(data => {
                createMessage(data);
            });
    }

    const handleRegistration = (login, password, appartment, email, phone, onSuccess) => {
        doRegistration(login, password, appartment, email, phone)
            .then(resp => {
                const { jwt } = resp.data;

                switch (resp.status) {
                    case 200:
                        localStorage.setItem('nb_token', jwt);
                        updateCurrentUser().then(() => {
                            onSuccess && onSuccess();
                        });
                        break;

                    default:
                        createMessage(resp.statusText);
                }
            
            })
            .catch(data => {
                createMessage(data);
            });
    }

    const handleSignOut = () => {
        localStorage.removeItem('nb_token');
        setUserProfile(defaultState);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!localStorage.getItem('nb_token'),
            user: { ...userProfile },
            actions: { handleLogin, handleSignOut, handleRegistration }
        }} >
            {props.children}
        </AuthContext.Provider>
    );
}

const createMessage = (data) => {
    console.log(`Сталася помилка. Перевiрте введенi данi. Деталi: ${data}`);
};