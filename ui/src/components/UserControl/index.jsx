import React, { useState, useContext } from 'react';
import { Field, Control, Input, Button } from 'bloomer';
import './styles.scss';
import { AuthContext } from '../../context/authContext';

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

    const loginForm =  (
        <form className="form form--login" >
            <Field>
                <Control>
                    <Input
                        type="text"
                        placeholder='Почта'
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
                        placeholder='Пароль'
                        name='password'
                        value={formData.password}
                        autoComplete='current-password'
                        onChange={handleInput} />
                </Control>
            </Field>
            <Button onClick={handleLogin}>Войти</Button>
            <Button onClick={handleRegister}>Зарегистрироваться</Button>
        </form>
    );
    
    const exitForm = (
        <>
            <span>{`${user.username} - ${user.App}`}</span>
            <Button onClick={handleSignOut}>Выйти</Button>
        </> 
    );

    return (
        <section className='login-form'>
            { user.role && user.role.type === "authenticated" ? exitForm : loginForm }
        </section>
    );
}

export default AuthForm;
