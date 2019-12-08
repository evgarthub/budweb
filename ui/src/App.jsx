import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.scss';
import { Footer, Header, Loading, ScrollToTop, PrivateRoute } from './components';
import { AuthContextProvider } from './context';
import { ContactPage, HomePage, InfrastructurePage, ListPage, NewsPage, PollsPage, RegistrationPage, TicketPage, RequestsPage, RequestPage } from './pages';
import { getSiteConfigById } from './utils/fetchAPI';
import siteConfig from './variables/config';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    id: siteConfig.siteConfigId,
    navId: 1,
    fooId: 1,
  });

  useEffect(() => {
    getSiteConfigById(config.id).then(({ data }) => {
      const { footerid, navigationid } = data.data.siteconfig;

      setConfig({
        ...config,
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
                <Route path="/news/:id" component={NewsPage} exact={true} />
                <PrivateRoute path="/requests/:id" component={RequestPage} exact={true} />
                <Route exact path="/news" component={ListPage} />
                <Route path="/contacts" component={ContactPage} />
                <Route path="/infrastructure" component={InfrastructurePage} />
                <Route path="/polls" component={PollsPage} />
                <Route path="/register" component={RegistrationPage} />
                <Route path="/ticket" component={TicketPage} />
                <PrivateRoute path="/requests" component={RequestsPage} />
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
