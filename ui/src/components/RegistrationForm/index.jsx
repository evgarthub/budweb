import React, { useState, useContext } from 'react';
import { label } from '../../variables/labels';
import { AuthContext } from '../../context/authContext';
import './styles.scss';
import { UserPlus } from 'react-feather';

const RegistrationForm = () => {
    const defaultFields = {
        login: '',
        password: '',
        appartment: '',
        email: '',
        phone: '',
    };
    const [formData, setformData] = useState(defaultFields);
    const [isRegistered, setIsRegistered] = useState(false);

    const { user, actions } = useContext(AuthContext);

    const successfulReg = () => setIsRegistered(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { login, password, appartment, email, phone } = formData;
        actions.handleRegistration(login, password, appartment, email, phone, successfulReg);

        setformData(defaultFields);
    };

    const handleTextInput = (e) => {
        const { value, name } = e.target;

        setformData({
            ...formData,
            [name]: value,
        });
    };

    const formDefinition = [
        {
            type: 'email', 
            label: 'Пошта', 
            placeholder: 'example@gmail.com', 
            onChange: handleTextInput,
            name: 'email',
            value: formData.email,
            autoComplete: 'email',
        },
        {
            type: 'text', 
            label: 'Логiн', 
            placeholder: 'username', 
            onChange: handleTextInput,
            name: 'login',
            value: formData.login,
            autoComplete: 'nickname',
        },
        {
            type: 'tel',
            label: 'Номер телефону', 
            placeholder: '0671234567', 
            onChange: handleTextInput,
            name: 'phone',
            value: formData.phone,
            autoComplete: 'tel',
        },
        {
            type: 'text', 
            label: 'Номер квартири', 
            placeholder: '123', 
            onChange: handleTextInput,
            name: 'appartment',
            value: formData.appartment,
            autoComplete: 'on',
        },
        {
            type: 'password',
            label: 'Пароль', 
            placeholder: 'passworD123', 
            onChange: handleTextInput,
            name: 'password',
            value: formData.password,
            autoComplete: 'current-password',
        },
    ]

    if (isRegistered) {
        return (
            <article className="message is-success">
                <div className="message-body">
                    Вітаємо, {user.username}! Ви успішно зареєструвалися!
                </div>
            </article>
        );
    }

    return (
        <div class="box registration-form__wrapper">
            <form onSubmit={handleSubmit} className='registration-form'>
                {
                    formDefinition.map((field, i) => (
                            <FieldText 
                                key={i} 
                                name={field.name} 
                                label={field.label} 
                                type={field.type} 
                                placeholder={field.placeholder} 
                                onChange={field.onChange} 
                                value={field.value} 
                                autoComplete={field.autoComplete} />
                        ))
                }
                <br />
                <button className='button is-primary'><UserPlus className='registration-form__icon' size={16} /> {label.registration.submitText}</button>
            </form>
        </div>
        
    );
};

const FieldText = (props) => {
    const { type, label, placeholder, onChange, name, value, autoComplete } = props;

    const validate = (name, value) => {
        switch (name) {
            case 'email':
                return value.length < 4 || value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            case 'login':
                return value.length < 4 || value.match(/^\S*$/);
            case 'phone':
                return value.length === 0 || value.match(/^\d+$/);
            case 'appartment':
                return value.length === 0 || value.match(/^([1-9]|[1-9][0-9]|[123][0-9][0-9]|4[01][0-7])$/);
            default:
                return true;
        }
    }

    const isValid = validate(name, value);

    return (
        <div className="field control" title={label}>
            <label className="label">{label}</label>
            <div className="control">
                <input className={`input ${!isValid && 'is-danger'}`} name={name} type={type} placeholder={placeholder} onChange={onChange} value={value} autoComplete={autoComplete} />
            </div>
            <p style={{display: isValid ? 'none' : 'block'}} className="help is-danger"> 
                Перевiрте введене значення
            </p>
        </div>
    );
}

export default RegistrationForm;
