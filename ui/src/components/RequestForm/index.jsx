import React, { useContext, useState } from 'react';
import { Send } from 'react-feather';
import { AuthContext } from '../../context/authContext';
import { label } from '../../variables/labels';
import { postRequest } from '../../utils/fetchAPI';
import './styles.scss';

const RequestForm = () => {
    const [success, setSuccess] = useState({
        status: false,
        id: null,
    });
    const description = useFieldInput('');

    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        postRequest(description.value, user.id).then((res => {
            setSuccess({
                status: res.status === 200,
                id: res.data.id,
            })
        }));
    };

    if (success.status) {
        return (
            <div class="content">
                <p>Заявка создана! Спасибо! Номер вашей завки: <strong>{success.id}</strong></p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='registration-form'>
            <textarea className="textarea" placeholder={label.ticket.placeholder} {...description} />
            <br />
            <button className='button is-success'><Send className='registration-form__icon' size={16} /> {label.ticket.buttonLabel}</button>
        </form>
    );
};

const useFieldInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = ({ target }) => {
        setValue(target.value);
    };

    return {
        value,
        onChange: handleChange,
    };
};

export default RequestForm;
