import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import InstitutionsMap from './pages/institutionsMap';
import Landing from './pages/landing';
import './style/global.css';
import './style/pages/landing.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" render={Landing} exact />
        <Route path="/maps" render={InstitutionsMap} exact />
      </Switch>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


