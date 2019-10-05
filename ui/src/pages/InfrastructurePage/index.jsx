import { Container, Hero, HeroBody, Title } from 'bloomer';
import { Section } from 'bloomer/lib/layout/Section';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { getGoogleMapString } from "../../utils/fetchAPI";
import { label } from '../../variables/labels';
import './styles.scss';

const InfrastructurePage = () => {
    const [data, setData] = useState({
        configId: 1,
        gmapsUrl: null,
    });

    useEffect(() => {
        getGoogleMapString(data.configId)
            .then(({data}) => setData({ gmapsUrl: data.data.siteconfig.gmapurl }));
    }, [data.configId]);

    return (
        <Transition timeout={0} in={true} appear={true} onEnter={pageEnter} onExit={pageExit}>
            <section className='infra-page'>
                <Helmet>
                    <title>{label.infrastructure.title}</title>
                    <meta property="og:title" content={label.infrastructure.title} />
                    <meta name="description" property="og:description" content={label.infrastructure.metaDescription} />
                </Helmet>
                <Hero isColor='warning' isSize='small'>
                    <HeroBody>
                        <Container hasTextAlign='centered'>
                            <Title isSize={3}>{label.infrastructure.title}</Title>
                        </Container>
                    </HeroBody>
                </Hero>
                <Section>
                    <Container>
                        <section className='infra-page__map-wrapper' dangerouslySetInnerHTML={{ __html: data.gmapsUrl }}>
                        </section>
                        <progress className="infra-page__progress progress is-small is-link" max="100"></progress>
                    </Container>
                </Section>
            </section>
        </Transition>
    );
}

export default InfrastructurePage;
