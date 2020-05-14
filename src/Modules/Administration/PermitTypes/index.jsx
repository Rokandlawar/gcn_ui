import React from 'react';
import CRUDView from '../../../components/crud';

const months = [
    { label: '1-January', value: 1 },
    { label: '2-February', value: 2 },
    { label: '3-March', value: 3 },
    { label: '4-April', value: 4 },
    { label: '5-May', value: 5 },
    { label: '6-June', value: 6 },
    { label: '7-July', value: 7 },
    { label: '8-August', value: 8 },
    { label: '9-September', value: 9 },
    { label: '10-October', value: 10 },
    { label: '11-November', value: 11 },
    { label: '12-December', value: 12 },
]

const days = [
    { label: '1st of Month', value: 1 },
    { label: '5th of Month', value: 5 },
    { label: '10th of Month', value: 10 },
    { label: '15th of Month', value: 15 },
    { label: '20th 0f Month', value: 20 },
    { label: '25th 0f Month', value: 25 },
    { label: 'Last 0f Month', value: 30 }
]

export default function PermitTypes() {


    const config = [
        { field: 'name', title: 'Permit Type Name', type: 'text', isGrid: true },
        { field: 'description', title: 'Description', type: 'textarea', isGrid: true },
        { field: 'month', title: 'Expiry Month', type: 'select', options: months, required: true, isGrid: true },
        { field: 'day', title: 'Expiry Day', type: 'select', options: days, required: true, isGrid: true },
        { field: 'issuanceLease', title: 'Issuance Fee (Lease Holder)', type: 'amount', required: true, isGrid: true },
        { field: 'issuanceNonLease', title: 'Issuance Fee (Non-Lease Holder)', type: 'amount', required: true, isGrid: true },
        { field: 'termsConditions', title: 'Terms and Conditions', type: 'editor', required: true, isGrid: false }
    ]

    return <CRUDView fresh url={`${process.env.REACT_APP_API_URL}/PermitType`} columns={config} title='Permit Types' allowDelete={false} id='id' />
}

