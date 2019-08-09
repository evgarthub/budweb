import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.scss';
import { Footer, Header, Loading, ScrollToTop } from './components';
import { AuthContextProvider } from './context';
import { ContactPage, HomePage, InfrastructurePage, ListPage, NewsPage, PollsPage } from './pages';
import { getSiteConfigById } from './utils/fetchAPI';
import siteConfig from './variables/config';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    id: siteConfig.siteConfigId,
    navId: 1,
    fooId: 1,
  });

  const handleConfigChange = (input) => {
    setConfig({
      ...config,
      ...input,
    });
  };

  useEffect(() => {
    getSiteConfigById(config.id).then(({ data }) => {
      const { footerid, navigationid } = data.data.siteconfig;

      handleConfigChange({
        fooId: footerid,
        navId: navigationid,
      });

      setLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ScrollToTop>
          <Loading visible={isLoading} />
          <div className="App">
            <Helmet
              titleTemplate="%s | Наш будинок"
              defaultTitle="Наш будинок | Сторінка мешканців будинку">
                <meta property="og:title" content="Наш будинок - Сторінка мешканців будинку" />
                <meta name="description" property="og:description" content="Сторінка мешканців будинку. На сайті можливо знайти свіжі оголошення, інформацію, стосовно будинку, різні інструкції та контакти" />
            </Helmet>

            <Header id={config.navId} />

            <section className='scroll-box'>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/news" component={ListPage} />
                <Route path="/news/:id" component={NewsPage} />
                <Route path="/contacts" component={ContactPage} />
                <Route path="/infrastructure" component={InfrastructurePage} />
                <Route path="/polls" component={PollsPage} />
              </Switch>

              <Footer id={config.fooId} />
            </section>
          </div>
        </ScrollToTop>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
