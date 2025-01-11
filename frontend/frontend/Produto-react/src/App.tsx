import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from './store/';
import Routes from './router/';
import Layout from './components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createReduxStore();

 const App: React.FC = () => {
    return ( 
      <Router>
        <Provider store={store}>
            <Layout>
              <Routes />
            </Layout>
        </Provider>
      </Router>
    );
  }

export default App;



