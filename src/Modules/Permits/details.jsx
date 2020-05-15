import React, { useImperativeHandle, forwardRef } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { simpleDate } from '../../components/dates';

function Details({ editable = true, display = true, entity = null }, ref) {

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    if (entity === null)
        return <p>No Details Found</p>

    return <Paper elevation={4}>
        <div className='p-2'>
            <h6 className='text-center'>Permit Number: {entity.permitNumber}</h6>
            <h6 className='text-right'><small className='text-muted'>Permit Applicable for Year: {entity.fiscal}</small></h6>
            <h6><small className='text-muted'>Permit Type: {entity.name}</small></h6>
            <h6><small className='text-muted'>Expiry Date: {simpleDate(entity.expiryDate)}</small></h6>
            <h6><small className='text-muted'>Date Approved: {simpleDate(entity.approvedDate)}</small></h6>
            <h6><small className='text-muted'>Sent to Risk: {simpleDate(entity.riskSent)}</small></h6>
            <h6><small className='text-muted'>Received from Risk: {simpleDate(entity.riskReceived)}</small></h6>
            <h6 className='text-right'><small className='text-muted'><Button variant='text' href={`#applications/${entity.applicationId}`}>View Application</Button></small></h6>
        </div>
    </Paper>
}

export default forwardRef(Details);
