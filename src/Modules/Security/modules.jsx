import React from 'react';
import CRUDView from '../../components/crud';


const config = [
    {
        field: 'module', title: 'Module', type: 'select', options: [
            { label: 'Applications', value: 1 },
            { label: 'Permits', value: 2 },
            { label: 'Company', value: 3 },
            { label: 'Invoices', value: 4 },
            { label: 'Camera Events', value: 5 }
        ],
        required: true,
        isGrid: true
    },
    { field: 'groupName', title: 'Group Name', type: 'text', required: true, isGrid: true },
    { field: 'groupId', title: 'Group Value', type: 'numeric', required: true, isGrid: true }
]

export default function ModuleGroups() {
    return <CRUDView url={process.env.REACT_APP_API_URL + '/Module'} columns={config} title='Module Groups' id='id' />
}