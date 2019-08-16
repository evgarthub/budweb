import { Container, Section, Title } from 'bloomer';
import React from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { PostList } from '../../components';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';

const ListPage = () => {
    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='list-page'>
                <Helmet>
                    <title>{label.list.title}</title>
                    <meta property="og:title" content={label.list.title} />
                    <meta name="description" property="og:description" content={label.list.metaDescription} />
                </Helmet>
                <Section>
                    <Container>
                        <Title isSize={3}>{label.list.title}</Title>
                        <PostList />
                    </Container>
                </Section>
            </section>
        </Transition>
    );
}

export default ListPage;
