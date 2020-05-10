import React from 'react';
import './App.css';
import Login from './Modules/Authentication/login';
import Header from './components/header';
import PrivateRoute from './Modules/Authentication/private';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

//Routes Start Here 
import Dashboard from './Modules/Dashboard';
import Application from './Modules/Applications';
import Statement from './Modules/Statements';
import Company from './Modules/Company';
import CameraEvent from './Modules/Camera';
import { PaymentView } from './Modules/Statements/payment';
import Search from './Modules/Camera/search';
import SignUp from './Modules/Company/create';
// Security
import Security from './Modules/Security';
import Module from './Modules/Security/modules';
import Roles from './Modules/Security/roles';
//Template
import TemplateView from './components/editor';

let theme = createMuiTheme({
  typography: {
    "fontFamily": "\"Nanum Gothic\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  palette: {
    secondary: {
      main: '#000000'
    }
  },
  overrides: {
    MUIDataTableHeadCell: {
      root: {
        fontSize: '1em'
      },
    }
  }
});

theme = responsiveFontSizes(theme);

function App() {

  const headerView = React.useRef(null);

  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Header ref={headerView} />
        <Switch>
          <Route exact path='/payment/:id' render={props => <PaymentView {...props} header={headerView} />} />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/search' component={Search} />
          <Route exact path='/statement/:id' component={Statement} />
          <PrivateRoute exact path='/applications/:id?' component={Application} />
          <PrivateRoute exact path='/company/:id?' component={Company} />
          <PrivateRoute exact path='/events/:id?' component={CameraEvent} />
          <PrivateRoute exact path='/invoices/:id?' component={Statement} />
          <PrivateRoute exact path='/security/permissions/:id?' component={Security} />
          <PrivateRoute exact path='/security/modules' component={Module} />
          <PrivateRoute exact path='/security/roles' component={Roles} />
          <Route path='/' render={() => <p>Not Found</p>} />
        </Switch>
      </Router>
      <TemplateView title='Editor' />
    </ThemeProvider>

  );
}

export default App;
