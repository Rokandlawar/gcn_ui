import React, { forwardRef } from 'react';
import CRUDView from '../../../components/crud';
import { authenticationService } from '../../../components/authorization';

function NotesView({ module, entityId, editable = true, display = true }, ref) {

    const config = [
        { field: 'subject', title: 'Subject', type: 'text', isGrid: true },
        { field: 'body', title: 'Message', type: 'textarea', isGrid: true },
        { field: 'createdBy', title: 'Created By', type: 'text', isGrid: true, isHide: true },
        { field: 'createdOn', title: 'Created On', type: 'date', isGrid: true, isHide: true },
    ]

    return <CRUDView url={`${process.env.REACT_APP_API_URL}/Notes/${module}/${entityId}`} columns={config} title='Notes'
        allowDelete={authenticationService.isAdmin()}
        allowEdit={false}
        allowAdd={editable}
        id='id' />
}

export default forwardRef(NotesView)