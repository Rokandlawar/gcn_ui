import React, { forwardRef, Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { DeleteItems } from '../../REST/statement';
import PaymentView from './payment';

function PaymentTotal({ editable = true, display = true, charges = [], selected = [], refresh, handleRefresh }, ref) {
    const { id } = useParams();
    const [pay, setPay] = useState({ open: false, invoiceId: null });

    const handlePayment = () => {
        setPay({ open: true, invoiceId: id })
        window.open(process.env.REACT_APP_BASE_URL + '/#/payment/' + id)
    }

    const handleDelete = () => {
        DeleteItems(id, selected).then(response => {
            handleRefresh()
        })
    }

    const items = charges.filter(e => !e.isPaid)
    if (items.length > 0) {
        return <React.Fragment>
            <PaymentView open={pay.open} handleClose={() => { setPay({ open: false, invoiceId: null }); handleRefresh(); }} invoiceId={pay.invoiceId} />
            <div className='row'>
                <div className='col-12 text-right'>
                    <b>Subtotal ({items.length} items): ${(items.map(e => e.charge).reduce((a, c) => a + c)).toFixed(2)}</b>
                </div>
            </div>
            {selected.length > 0 && <React.Fragment>
                <Button variant='outlined' onClick={handleDelete} className='text-danger'>Delete ({selected.length}) Items</Button>
                <Button disabled={selected.length === items.length} variant='outlined' color='secondary'>Pay ({selected.length}) Items</Button>
            </React.Fragment>}
            {display && <React.Fragment>
                <Button className='float-right' disabled={!editable} onClick={handlePayment} variant='outlined'>Pay Now</Button>
                <div className='clearfix' />
            </React.Fragment>}
        </React.Fragment>
    }
    return <Fragment>
        <div className='row'>
            <div className='col-12 text-right'>
                <b>Total Due: ${'0.00'}</b>
            </div>
        </div>
    </Fragment>
}

export default forwardRef(PaymentTotal);