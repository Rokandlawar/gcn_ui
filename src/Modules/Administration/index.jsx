import React from 'react';
import PrivateRoute from '../Authentication/private';
import { AdminDashboard } from '../Dashboard';
import Notices from './Notices';
import Content from './Messages';
import PermitTypes from './PermitTypes';

function Admin() {
    return (
        <React.Fragment>
            <PrivateRoute exact path='/admin' component={AdminDashboard} />
            <PrivateRoute exact path='/admin/notices/:id?' component={Notices} />
            <PrivateRoute exact path='/admin/content/:id?' component={Content} />
            <PrivateRoute exact path='/admin/permits/:id?' component={PermitTypes} />
        </React.Fragment>
    );
}

export default Admin;