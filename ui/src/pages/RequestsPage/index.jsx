import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { Table } from '../../components/';
import { AuthContext } from '../../context/authContext';
import { pageEnter, pageExit } from '../../utils/animations';
import { getRequests, updateRequestStatus, getRequestsMe } from '../../utils/fetchAPI';
import { getStatusText, getStatusColor } from '../../utils/helpers';
import { label } from '../../variables/labels';
import { Save, Loader } from 'react-feather';
import { isAllowed } from '../../components/Can';

const RequestsPage = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [change, setChange] = useState();
    const isAdmin = isAllowed(user.role && user.role.type, "requests:get");

    useEffect(() => {
        if (isAdmin) {
            getRequests().then(({data}) => {
                setData(data);
            });
        } else {
            getRequestsMe().then(({data}) => {
                setData(data);
            });
        }
    }, [user, isAdmin, change]);   

    const headers = [
        {
            title: 'Номер',
            key: 'id',
        },
        {
            title: 'Секцiя',
            key: 'section',
            renderer: (rowData) => rowData.user.appartment.section,
        },
        {
            title: 'Поверх',
            key: 'floor',
            renderer: (rowData) => rowData.user.appartment.floor,
        },
        {
            title: 'Квартира',
            key: 'user',
            renderer: (rowData) => rowData.user.appartment.number,
        },
        {
            title: 'Опис',
            key: 'description',
        },
        {
            title: 'Статус',
            renderer: (rowData) => isAdmin ? (<SelectControl rowData={rowData} onChange={setChange} />) : (<StatusText value={rowData.status} />),
        },
    ];

    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='requests-page'>
                <Helmet>
                    <title>{label.registration.title}</title>
                    <meta property="og:title" content={label.registration.title} />
                    <meta name="description" property="og:description" content={label.registration.metaDescription} />
                </Helmet>
                <Hero isColor='warning' isSize='small' >
                    <HeroBody>
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>Заявки для ОСББ</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <Section>
                    <Container>
                        <Table data={data} headers={headers} />
                    </Container>
                </Section>
            </section>
        </Transition>
    );
};

const SelectControl = (props) => {
    const { id, status } = props.rowData;
    const statuses = ["open", "review", "progress", "declined", "hold", "done"];
    const [newStatus, setNewStatus] = useState(status);
    const selectField = useSelect(status, setNewStatus);

    const handleSave = () => {
        updateRequestStatus(id, newStatus);
        props.onChange({id, newStatus});
    }

    return (
        <div className='field has-addons'>
            <div className='control'>
                <div className="select">
                    <select type='text' {...selectField} >
                        {statuses.map(status => (<option key={status} value={status}>{getStatusText(status)}</option>))}
                    </select>
                </div>
            </div>
            <div className="control">
                <button className='button' disabled={newStatus === status} onClick={handleSave} >
                    <Save />
                </button>
            </div>
        </div>
    );
};

const StatusText = ({ value }) => {
    return (
        <span className={`tag is-medium ${getStatusColor(value)}`}>{getStatusText(value)}</span>
    );
}

const useSelect = (initial, activateButton) => {
    const [value, setValue] = useState(initial);

    const onChange = (e) => {
        setValue(e.target.value);
        if (activateButton) activateButton(e.target.value);
    };

    return {
        value,
        onChange
    };
};

export default RequestsPage;