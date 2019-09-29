import { Container, Hero, HeroBody, Section, Title } from 'bloomer';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { Table, isAllowed } from '../../components/';
import { AuthContext } from '../../context/authContext';
import { pageEnter, pageExit } from '../../utils/animations';
import { getRequests, updateRequestStatus, getRequestsMe } from '../../utils/fetchAPI';
import { label } from '../../variables/labels';

const RequestsPage = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const isAdmin = isAllowed(user.role && user.role.type, "requests:get");
    const [statuses, setStatuses] = useState(["open", "review", "progress", "declined", "hold", "done"]);

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
    }, [user, isAdmin]);   

    const headers = [
        {
            headerName: 'Номер',
            field: 'id',
            suppressSizeToFit: true,
            width: 90,
        },
        {
            headerName: 'Секцiя',
            field: 'user',
            valueGetter: ({data}) => data.user.appartment.section,
            suppressSizeToFit: true,
            width: 90,
        },
        {
            headerName: 'Поверх',
            valueGetter: ({data}) => data.user.appartment.floor,
            suppressSizeToFit: true,
            width: 90,
        },
        {
            headerName: 'Квартира',
            valueGetter: ({data}) => data.user.appartment.number,
            suppressSizeToFit: true,
            width: 90,
        },
        {
            headerName: 'Опис',
            field: 'description',
            autoHeight: true,
            cellStyle: { "white-space": "normal" },
        },
        {
            headerName: 'Статус',
            suppressSizeToFit: true,
            editable: isAdmin,
            cellEditor: 'agPopupSelectCellEditor',
            cellEditorParams: {
                values: [...statuses]
            },
            width: 200,
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
                        <Table data={data} columns={headers} defaultColDef={{
                            resizable: true,
                            sortable: true,
                        }} />
                    </Container>
                </Section>
            </section>
        </Transition>
    );
};

export default RequestsPage;