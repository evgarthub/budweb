import React from 'react';
import PostList from '../../comp/PostList/PostList';
import { Title, Container, Section, Notification, Button } from 'bloomer';
import { Link } from "react-router-dom";
import "./HomePage.scss";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';

const HomePage = () => {
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
                                <Title isSize={3}>{label.home.newsTitle}</Title>
                                <PostList limit={4} />
                            </Container>
                        </Section>
                    </div>
                </section>
            </Transition>

        );
}

export default HomePage;
