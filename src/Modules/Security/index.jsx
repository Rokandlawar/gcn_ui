import React from 'react';
import CRUDView from '../../components/crud';
import SettingsIcon from '@material-ui/icons/Settings';
import { useHistory, useParams } from 'react-router-dom';
import Permissions from './permissions';

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
    { field: 'statusName', title: 'Status Name', type: 'text', required: true, isGrid: true },
    { field: 'statusValue', title: 'Status Value', type: 'numeric', required: true, isGrid: true },
    { field: 'isSystem', title: 'Is System', type: 'checkbox', isGrid: true }
]

export default function Security() {

    const history = useHistory();
    const { id } = useParams();

    const handleAction = (event, rawData) => {
        history.push('/security/permissions/' + rawData.id)
    }

    const actions = [
        {
            icon: SettingsIcon,
            onClick: handleAction
        }
    ]

    if (id)
        return <Permissions />

    return <CRUDView url={process.env.REACT_APP_API_URL + '/Status'} columns={config} title='Security Settings' id='id' actions={actions} />
}