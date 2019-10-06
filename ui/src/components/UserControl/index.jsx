import { Control, Field, Input } from 'bloomer';
import React, { useContext, useState } from 'react';
import { Mail, LogOut, LogIn, Home, Key, ChevronsUp, User, Codepen, Grid } from 'react-feather';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { label } from '../../variables/labels';
import './styles.scss';
import { Spinner } from '..';

const AuthForm = (props) => {
    const [formData, setformData] = useState({
        login: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
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
        setIsLoading(true);
        actions.handleLogin(login, password, () => setIsLoading(false));
        setformData({
            login: '',
            password: '',
        });
    }

    const handleSignOut = () => {
        actions.handleSignOut();
        props.onRegisterClick();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
            <div className='buttons'>
                <button className='button is-info' onClick={handleLogin}>
                    <span className="icon is-small">
                        <LogIn size={16} />
                    </span>
                    <span>{label.userProfile.loginButton}</span>
                </button>
                <Link to='/register'>
                    <button className='button is-text' onClick={props.onRegisterClick} >{label.userProfile.registerButton}</button>
                </Link>
            </div>
            
        </form>
    );
    
    const exitForm = (
        <div className='user-control__form'>
            <div className='user-control__profile content'>
                <User size={16} /> <div>{label.userProfile.loginLabel}:</div> <div>{user.username}</div>
                <Mail size={16} /> <div> {label.userProfile.email}:</div> <div>{user.email}</div>
                {user.appartment && (<>
                    <Key size={16} /> <div> {label.userProfile.appartment}:</div> <div>{user.appartment.number}</div>
                    <Codepen size={16} /> <div> {label.userProfile.space}:</div> <div>{user.appartment.space} м.кв.</div>
                    <Grid size={16} /> <div> {label.userProfile.rooms}:</div> <div>{user.appartment.rooms}</div>
                    <ChevronsUp size={16} /> <div> {label.userProfile.floor}:</div> <div>{user.appartment.floor}</div>
                    <Home size={16} /> <div> {label.userProfile.section}:</div> <div>{user.appartment.section}</div>
                </>)}
                
            </div>
            <button className='button is-danger' onClick={handleSignOut}>
                <span className="icon is-small">
                    <LogOut size={16} />
                </span>
                <span>{label.userProfile.logoutButton}</span>
            </button>
        </div> 
    );

    if (isLoading) return (<Spinner />);

    return (
        <section className='user-control'>
            { user.role && user.role.type  ? exitForm : loginForm }
        </section>
    );
}

export default AuthForm;
