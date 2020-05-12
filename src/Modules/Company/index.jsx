import React from 'react';
import ArrowIcon from '@material-ui/icons/ArrowRight';
import { useHistory, useParams } from 'react-router-dom';
import CRUDView from '../../components/crud';
import Invoices from './invoice';
import Address from './address';
import Users from './users';

export default function Company() {
    const { id } = useParams();
    const history = useHistory();
    const config = [
        { field: 'name', title: 'Company Name', isGrid: true, type: 'text' },
        { field: 'dotnumber', title: 'DOT Number', isGrid: true, type: 'text' },
        { field: 'phone', title: 'Phone', isGrid: true, type: 'text' },
        { field: 'email', title: 'Email', isGrid: true, type: 'text' },
        { field: 'vendorCode', title: 'Vendor Code', isGrid: true, type: 'text' },
        { field: 'billingProfile', title: 'Billing Profile', isGrid: true, type: 'text' },
        { field: 'isTenant', title: 'Lease Holder', isGrid: true, type: 'checkbox' },
    ]

    const actions = [
        { icon: ArrowIcon, onClick: (evt, rowData) => history.push('company/' + rowData.id) }
    ]

    const url = process.env.REACT_APP_API_URL + '/company';

    if (id)
        return <CompanyDetails />
    return <CRUDView title='Company Information' url={url} allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} columns={config} />

}

function CompanyDetails() {
    const { id } = useParams();

    return <React.Fragment>
        <Invoices />
        <Address entityId={id} />
        <Users entityId={id} />
    </React.Fragment>
}