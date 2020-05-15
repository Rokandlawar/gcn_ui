import React, { forwardRef, useState, useEffect } from 'react';
import CRUDView from '../../components/crud';
import { GetCycles, GenerateInvoice } from '../../REST/company';
import { useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import PlayIcon from '@material-ui/icons/PlayArrow';
import SkuList from './skus';

function InvoiceCycles({ editable = true, display = true, entityId }, ref) {

    const [cycles, setCycles] = useState([]);
    const [view, setView] = useState(null);
    const history = useHistory();

    useEffect(() => {
        GetCycles().then(res => {
            if (Array.isArray(res.data))
                setCycles(res.data)
        })
    }, [entityId])

    const config = [
        {
            field: 'invoiceId', title: 'Invoice Cycle', isGrid: true, type: 'select', options: cycles, effects: [{
                type: 'lookup', field: 'name'
            }]
        },
        { field: 'name', title: 'Cycle Name', isGrid: false, type: 'text', disabled: true },
        { field: 'status', title: 'Is Active', isGrid: true, type: 'checkbox' }
    ]

    const generateInvoice = (evt, rowData) => {
        GenerateInvoice(entityId, rowData.id).then(response => {
            history.push('/invoices/' + response.data)
        })
    }

    const actions = [
        { icon: SettingsIcon, onClick: (evt, rowData) => setView(rowData.id), tooltip: 'Edit Skus' },
        { icon: PlayIcon, onClick: generateInvoice, tooltip: 'Generate Invoice' }
    ]

    if (view)
        return <SkuList invoiceId={view} onClose={() => setView(null)} />

    const url = process.env.REACT_APP_API_URL + '/InvoiceCycle/' + entityId

    return <CRUDView url={url} title='Invoice Cycles' columns={config} id='id' actions={actions} />
}

export default forwardRef(InvoiceCycles);