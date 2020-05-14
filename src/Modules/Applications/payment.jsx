import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { GetPrices, GetInvoice } from '../../REST/application';
import Button from '@material-ui/core/Button';

function Payment({ editable = true, display = true }, ref) {
    const [vehicles, setVehicles] = useState([]);

    const { id } = useParams();
    const history = useHistory();

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve();
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    useEffect(() => {
        GetPrices(id).then(response => {
            if (Array.isArray(response.data))
                setVehicles(response.data)
        })
    }, [id])

    const handlePayment = () => {
        GetInvoice(id).then(response => {
            history.push('/invoices/' + response.data)
        })
    }


    return <React.Fragment>
        <p className='text-center'>Payment Summary</p>
        <div className='row'>
            <div className='col-10'>
                <small></small>
            </div>
            <div className='col-2 text-right'>
                <small>Amount</small>
            </div>
        </div>
        {vehicles.map((e, i) => {
            return <div key={i} className='row border-top border-bottom pt-3'>
                <div className='col-10'>
                    <p className='w-100 h6'><small className='text-muted'>Vehicle Make: </small>{e.make}</p>
                    <p className='w-100 h6'><small className='text-muted'>Plate Number: </small>{e.plateNumber}</p>
                    <p className='w-100 h6'><small className='text-muted'>Plate Region: </small>{e.plateRegion}</p>
                </div>
                <div className='col-2 text-right'>
                    <b>${e.amount.toFixed(2)}</b>
                </div>
            </div>
        })}
        {vehicles.length > 0 && (
            <React.Fragment>
                <div className='row'>
                    <div className='col-12 text-right'>
                        <b>Subtotal ({vehicles.length} items): ${(vehicles.map(e => e.amount).reduce((a, c) => a + c)).toFixed(2)}</b>
                    </div>
                </div>
                <Button className='float-right' onClick={handlePayment} variant='outlined'>Proceed to Checkout</Button>
                <div className='clearfix' />
            </React.Fragment>
        )}
    </React.Fragment>
}

export default forwardRef(Payment);