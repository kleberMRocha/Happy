import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import CreateOrphanage from './pages/CreateOrphanage';
import InstitutionsMap from './pages/institutionsMap';
import Landing from './pages/landing';
import Orphanage from './pages/Orphanage';
import './style/global.css';
import './style/pages/landing.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/maps" component={InstitutionsMap} exact/>
        <Route path="/orphanage/create" component={CreateOrphanage} exact />
        <Route path="/orphanage/:id" component={Orphanage} exact/>
      </Switch>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


