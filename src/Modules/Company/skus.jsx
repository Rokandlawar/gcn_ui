import React, { useState, useEffect } from 'react';
import CRUDView from '../../components/crud';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import { GetSkus } from '../../REST/company';
import { useParams } from 'react-router-dom';

export default function CompanySkus({ invoiceId = 0, onClose }) {

    const [skus, setSkus] = useState({ names: {}, amounts: {}, options: [] });
    const { id } = useParams();

    useEffect(() => {
        GetSkus().then(res => {
            const data = { names: {}, amounts: {}, options: [] }
            if (Array.isArray(res.data)) {
                const list = res.data;
                list.forEach(e => {
                    data.names[e.id] = e.name;
                    data.amounts[e.id] = parseFloat(e.triggerType === 2 ? e.userInputValue : e.fixedAmount);
                    data.options.push({ label: e.name, value: e.id })
                })
                setSkus(data);
            }
        })
    }, [id])

    const url = process.env.REACT_APP_API_URL + '/Manifest/' + invoiceId;

    const config = [
        {
            field: 'skuId', title: 'Select Sku', isGrid: true, type: 'select', options: skus.options, effects: [
                { type: 'lookup', field: 'skuName', lookup: skus.names },
                { type: 'lookup', field: 'amount', lookup: skus.amounts }
            ]
        },
        { field: 'amount', title: 'Amount/Rate', isGrid: true, type: 'amount5' },
        { field: 'skuName', title: 'Sku Name', isGrid: false, type: 'text' },
        { field: 'allowEdit', title: 'Allow Edit', isGrid: true, type: 'checkbox' }
    ]

    return <React.Fragment>
        <Button className='float-right' onClick={onClose} variant="contained" color="secondary" startIcon={<BackIcon />}>Back</Button>
        <div className='clearfix' />
        <hr />
        <CRUDView url={url} id='id' columns={config} title='Sku List' />
    </React.Fragment>

}