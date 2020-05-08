import React from 'react';
import CRUDView from '../../components/crud';


const config = [

    { field: 'roleName', title: 'Role Name', type: 'text', required: true, isGrid: true },
    { field: 'roleId', title: 'Role Id', type: 'numeric', required: true, isGrid: false },
    { field: 'isInternal', title: 'Is Internal', type: 'checkbox', isGrid: true },
    { field: 'isSystem', title: 'Is System', type: 'checkbox', isGrid: true },
]

export default function ModuleGroups() {
    return <CRUDView url={process.env.REACT_APP_API_URL + '/RoleType'} columns={config} title='Role Types' id='id' />
}