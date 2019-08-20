import React, { createContext, useState, useEffect } from 'react';
import { doLogin, getUserInfo, doRegistration } from '../utils/authorization';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const defaultState = {
        username: 'Вхiд',
    };
    const [userProfile, setUserProfile] = useState(defaultState);

    const handleUpdate = (input) => {
        setUserProfile(input)
    };

    useEffect(() => {
        getUserInfo()
            .then(({ data }) => {
                handleUpdate(data);
            })
            .catch(data => {
                console.log(`Something went wrong. Details: ${data}`);
            });
    }, [])

    const handleLogin = (login, password, callback) => {
        doLogin(login, password)
            .then(resp => {
                const { jwt } = resp.data;

                switch (resp.status) {
                    case 200:
                        localStorage.setItem('nb_token', jwt);
                        getUserInfo().then(({ data }) => {
                            handleUpdate(data);
                        })
                        break;

                    default:
                        alert(`Сталася помилка. Перевiрте введенi данi. Деталi: ${resp.statusText}`);
                }
                
                if (callback) {
                    callback();
                }
            })
            .catch(data => {
                alert(`Сталася помилка. Перевiрте введенi данi. Деталi: ${data}`);
            });
    }

    const handleRegistration = (login, password, appartment, email, phone, onSuccess) => {
        doRegistration(login, password, appartment, email, phone)
            .then(resp => {
                const { jwt } = resp.data;

                switch (resp.status) {
                    case 200:
                        localStorage.setItem('nb_token', jwt);
                        getUserInfo().then(({ data }) => {
                            handleUpdate(data);
                            onSuccess();
                        });
                        break;

                    default:
                        alert(`Сталася помилка. Перевiрте введенi данi. Деталi: ${resp.statusText}`);
                }
            
            })
            .catch(data => {
                alert(`Сталася помилка. Перевiрте введенi данi. Деталi: ${data}`);
            });
    }

    const handleSignOut = () => {
        localStorage.removeItem('nb_token');
        setUserProfile(defaultState);
    }

    return (
        <AuthContext.Provider value={{
            user: { ...userProfile },
            actions: { handleLogin, handleSignOut, handleRegistration }
        }} >
            {props.children}
        </AuthContext.Provider>
    );
}