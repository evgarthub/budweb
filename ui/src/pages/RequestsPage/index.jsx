import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { isAllowed, Table } from '../../components/';
import { AuthContext } from '../../context/authContext';
import { pageEnter, pageExit } from '../../utils/animations';
import { getRequests, getRequestsMe } from '../../utils/fetchAPI';
import { label } from '../../variables/labels';
import { useHistory } from "react-router-dom";
import './styles.scss';

const RequestsPage = () => {
    const { user } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState();
    const isAdmin = isAllowed(user.role && user.role.type, "requests:get");
    const history = useHistory();

    
    const handleUpdate = () => {
        setLoading(true);
        if (isAdmin) {
            getRequests().then(({data}) => {
                setData(data);
                setLoading(false);
            });
        } else {
            getRequestsMe().then(({data}) => {
                setData(data);
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        handleUpdate();
    }, [user, isAdmin]);
    
    const headers = [
        {
            headerName: 'Номер',
            field: 'id',
            suppressSizeToFit: true,
            width: 70,
            sortingOrder: ["desc", "asc"],
            sort: 'desc',
            valueFormatter: (props) => `#${props.value}`,
        },
        {
            headerName: 'Статус',
            suppressSizeToFit: true,
            field: 'status',
            width: 100,
            valueGetter: ({ data }) => data.status.label,
        },
        {
            headerName: 'Опис',
            field: 'description',
            filter: true,
            minWidth: 300,
        },
        {
            headerName: 'Дата створення',
            field: 'created_at',
            width: 180,
            suppressSizeToFit: true,
            valueFormatter: props => new Date(props.value).toLocaleString()
        },
        {
            headerName: 'Квартира',
            valueGetter: ({ data }) => data.user.appartment.number,
            suppressSizeToFit: true,
            width: 80,
        },
        {
            headerName: 'Поверх',
            valueGetter: ({ data }) => data.user.appartment.floor,
            suppressSizeToFit: true,
            width: 70,
        },
        {
            headerName: 'Секцiя',
            field: 'user',
            valueGetter: ({data}) => data.user.appartment.section,
            suppressSizeToFit: true,
            width: 70,
        },
    ];

    const handleDoubleClick = (props) => {
        history.push(`/requests/${props.data.id}`)
    }

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
                        <Table
                            data={data} 
                            columns={headers}
                            isLoading={isLoading}
                            defaultColDef={{
                                resizable: true,
                                sortable: true,
                            }}
                            suppressCellSelection={true}
                            onDoubleClick={handleDoubleClick}
                        />
                    </Container>
                </Section>
            </section>
        </Transition>
    );
};

export default RequestsPage;