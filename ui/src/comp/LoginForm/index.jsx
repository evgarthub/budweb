import React, { Component } from 'react';
import { Field, Control, Input, Button } from 'bloomer';

class LoginForm extends Component {
    state = {
        login: '',
        password: '',
    }
    render() {
        const { login, password } = this.state;

        return (
            <section className='login-form'>
                { !this.props.user.token
                    ? (
                        <>
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
                        </>
                    )
                    : ( 
                        <>
                            <span>{`${this.props.user.login} - ${this.props.user.role}`}</span>
                            <Button onClick={this.handleSignOut}>Выйти</Button>
                        </> 
                    )
                }

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
