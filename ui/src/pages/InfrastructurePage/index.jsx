import React, { Component } from 'react';
import { Title, Hero, HeroBody, Container } from 'bloomer';
import { Section } from 'bloomer/lib/layout/Section';
import './styles.scss';
import { getGoogleMapString } from "../../utils/fetchAPI";
import { Transition } from 'react-transition-group';
import { pageEnter, pageExit } from '../../utils/animations';
import { label } from '../../variables/labels';
import { Helmet } from "react-helmet";

class InfrastructurePage extends Component {
    constructor() {
        super();
        this.state = {
            configId: 1,
            gmapsUrl: null
        }
    }

    componentDidMount() {
        getGoogleMapString(this.state.configId)
        .then(({data}) => {
          const resData = data.data.siteconfig;
          this.setState({
              isLoading: false,
              gmapsUrl: resData.gmapurl
          });
        });
    }

    render() {
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
                            <section className='infra-page__map-wrapper' dangerouslySetInnerHTML={{ __html: this.state.gmapsUrl }}>

                            </section>
                            <progress className="infra-page__progress progress is-small is-link" max="100"></progress>
                        </Container>
                    </Section>

                </section>
            </Transition>

        );
    }
}

export default InfrastructurePage;
