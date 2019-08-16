import React, { useState, useEffect } from 'react';
import { PostList } from '../../components';
import { Title, Container, Section, Notification, Button } from 'bloomer';
import { Link } from "react-router-dom";
import "./styles.scss";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import TopValues from '../../components/TopValues';
import { getTariffs } from '../../utils/fetchAPI';

const HomePage = () => {
    const [tariffs, setTariffs] = useState([
        {
            title: "Завантаження",
            value: 0,
        },
    ]);

    useEffect(() => {
        getTariffs().then(({data}) => setTariffs(data));
    }, []);

    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='home-page'>
                <div className='home-page__post-card'>
                    <Section>
                        <Container>
                            <Notification className="home-page__notification" isColor='warning'>
                                {label.home.messageTitle}
                                <Link to="/polls"><Button isSize="normal" isColor="black">{label.home.messageButton}</Button></Link>
                            </Notification>
                            <section className='home-page__component'>
                                <Title isSize={3}>{label.home.tarifTitle}</Title>
                                <TopValues items={tariffs} />
                            </section>
                            <section className='home-page__component'>
                                <Title isSize={3}>{label.home.newsTitle}</Title>
                                <PostList limit={4} />
                            </section>
                        </Container>
                    </Section>
                </div>
            </section>
        </Transition>
    );
}

export default HomePage;
