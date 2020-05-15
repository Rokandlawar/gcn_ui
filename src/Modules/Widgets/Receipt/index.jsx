import React, { forwardRef } from 'react';
import CRUDView from '../../../components/crud';

const options = [
    { label: 'Online Payment', value: 1 },
    { label: 'Cash', value: 2 },
    { label: 'Check', value: 3 }
]

function ReceiptView({ module, entityId, editable = true, display = true }, ref) {

    const config = [
        { field: 'accountNumber', title: 'Account/Check Number', type: 'text', isGrid: false },
        { field: 'accountName', title: 'Payment Source', type: 'text', isGrid: false },
        { field: 'paymentType', title: 'Payment Type', type: 'select', isGrid: true, options: options },
        { field: 'paymentDate', title: 'Payment Date', type: 'date', isGrid: true },
        { field: 'amount', title: 'Amount', type: 'amount', isGrid: true },
        { field: 'confirmationNum', title: 'Confirmation Number', type: 'text', isGrid: false },
    ]

    return <CRUDView url={`${process.env.REACT_APP_API_URL}/Receipt/${entityId}/${module}`} columns={config} title='Receipts'
        allowDelete={false}
        allowView={true}
        allowEdit={false}
        allowAdd={false}
        id='id' />
}

export default forwardRef(ReceiptView)