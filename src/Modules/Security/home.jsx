import React from 'react';
import PrivateRoute from '../Authentication/private';
import { SecurityDashboard } from '../Dashboard';
// Security
import Security from './index';
import Module from './modules';
import Roles from './roles';


export default function SecurityHome() {
    return <React.Fragment>
        <PrivateRoute exact path='/security' component={SecurityDashboard} />
        <PrivateRoute exact path='/security/permissions/:id?' component={Security} />
        <PrivateRoute exact path='/security/modules' component={Module} />
        <PrivateRoute exact path='/security/roles' component={Roles} />
    </React.Fragment>
}