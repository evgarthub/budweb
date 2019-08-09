import React, { useState, useContext } from 'react';
import { Field, Control, Input, Button } from 'bloomer';
import './styles.scss';
import { AuthContext } from '../../context/authContext';
import {label} from '../../variables/labels';

const AuthForm = () => {
    const [formData, setformData] = useState({
        login: '',
        password: '',
    });

    const { user, actions } = useContext(AuthContext);

    const handleInput = ({ target }) => {
        const { value, name } = target;

        setformData({
            ...formData,
            [name]: value,
        });
    }

    const handleLogin = () => {
        const { login, password } = formData;
        actions.handleLogin(login, password);
        setformData({
            login: '',
            password: '',
        });
    }

    const handleRegister = () => {
        alert('registration');
    }

    const handleSignOut = () => {
        actions.handleSignOut();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    const loginForm =  (
        <form className="user-control__form" onSubmit={handleSubmit} >
            <Field>
                <Control>
                    <Input
                        type="text"
                        placeholder={label.userProfile.login}
                        name='login'
                        value={formData.login}
                        autoComplete='username'
                        onChange={handleInput} />
                </Control>
            </Field>
            <Field>
                <Control>
                    <Input
                        type="password"
                        placeholder={label.userProfile.password}
                        name='password'
                        value={formData.password}
                        autoComplete='current-password'
                        onChange={handleInput} />
                </Control>
            </Field>
            <Button onClick={handleLogin}>{label.userProfile.loginButton}</Button>
            <Button onClick={handleRegister}>{label.userProfile.registerButton}</Button>
        </form>
    );
    
    const exitForm = (
        <div className='user-control__form'>
            <div className='user-control__profile'>
                <div>{label.userProfile.loginLabel}:</div> <div>{user.username}</div>
                <div>{label.userProfile.email}:</div> <div>{user.email}</div>
                <div>{label.userProfile.appartment}:</div> <div>{user.App}</div>
                <div></div>
            </div>
            <Button onClick={handleSignOut}>{label.userProfile.logoutButton}</Button>
        </div> 
    );

    return (
        <section className='user-control'>
            { user.role && user.role.type === "authenticated" ? exitForm : loginForm }
        </section>
    );
}

export default AuthForm;
