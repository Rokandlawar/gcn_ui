import React, { useEffect } from 'react';
import './App.css';
import Login from './Modules/Authentication/login';
import Loader from './components/loading';
import Header from './components/header';
import Alert from './components/alert';
import PrivateRoute from './Modules/Authentication/private';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import DefaultSettings from './components/settings';

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
// Administration
import Notices from './Modules/Administration/Notices';

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
  const loaderView = React.useRef(null);
  const alertView = React.useRef(null);
  useEffect(() => {
    if (loaderView && loaderView.current)
      DefaultSettings.setLoader(loaderView.current);
    if (alertView && alertView.current)
      DefaultSettings.setAlert(alertView.current);
  }, [loaderView, alertView])


  return (

    <ThemeProvider theme={theme}>
      <Router>
        <Header ref={headerView} />
        <Loader ref={loaderView} />
        <Alert ref={alertView} />
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
          <PrivateRoute exact path='/admin/notices/:id?' component={Notices} />
          <Route path='/' render={() => <p>Not Found</p>} />
        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;


// Check Admin Routes in Server Side - Verify Token if Is Internal