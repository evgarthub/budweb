import React, { Component } from 'react';
import { Field, Control, Input, Button } from 'bloomer';

class LoginForm extends Component {
    state = {
        login: '',
        password: '',
    }
    render() {
        const { login, password } = this.state;
        const { user } = this.props;

        const loginForm = (
            <form>
                <Field>
                    <Control>
                        <Input
                            type="text"
                            placeholder='Почта'
                            name='login'
                            value={login}
                            onChange={this.handleInput} />
                    </Control>
                </Field>
                <Field>
                    <Control>
                        <Input
                            type="password"
                            placeholder='Пароль'
                            name='password'
                            value={password}
                            onChange={this.handleInput} />
                    </Control>
                </Field>
                <Button onClick={this.handleLogin}>Войти</Button>
                <Button onClick={this.handleRegister}>Зарегистрироваться</Button>
            </form>
        );

        const exitForm = ( 
            <>
                <span>{`${user.username} - ${user.App}`}</span>

                <Button onClick={this.handleSignOut}>Выйти</Button>
            </> 
        );

        return (
            <section className='login-form'>
                { user.role && user.role.type === "authenticated" ? exitForm : loginForm }
            </section>
        );
    }

    handleLogin = () => {
        const { login, password } = this.state;
        this.props.onSubmit(login, password);
        this.setState({
            login: '',
            password: '',
        });
    }

    handleRegister = () => {
        alert('registration')
    }

    handleSignOut = () => {
        this.props.onSignOut();
    }

    handleInput = ({ target }) => {
        const { value, name } = target;
        this.setState({
            [name]: value,
        })
    }
}

export default LoginForm;
