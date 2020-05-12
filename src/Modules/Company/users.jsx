import React, { forwardRef, useEffect, useState } from 'react';
import CRUDView from '../../components/crud';
import { GetRoles } from '../../REST/company';

function CompanyUser({ editable = true, display = true, entity, entityId, module }, ref) {

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        GetRoles().then(resp => {
            if (Array.isArray(resp.data))
                setRoles(resp.data)
        })
    }, [])

    const config = [
        { field: 'userName', title: 'User Name ', type: 'text', required: true, isGrid: true, noUpdate: true },
        { field: 'email', title: 'Email ', type: 'text', required: true, isGrid: true, noUpdate: true },
        { field: 'firstName', title: 'First Name ', type: 'text', required: true, isGrid: false },
        { field: 'lastName', title: 'Last Name ', type: 'text', required: true, isGrid: false },
        { field: 'roleId', title: 'Role ', type: 'select', required: true, isGrid: true, options: roles },
        { field: 'isActive', title: 'Active ', type: 'checkbox', isGrid: true, noAdd: true },
    ]


    return <CRUDView url={process.env.REACT_APP_API_URL + '/Customer/' + entityId}
        allowAdd={editable}
        allowDelete={false}
        allowEdit={editable}
        columns={config} title='Company Users' id='id' />
}

export default forwardRef(CompanyUser);