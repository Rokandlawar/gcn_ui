import React, { forwardRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetItems } from '../../REST/statement';
import { SimpleCheckBox } from '../../components/checkbox';
import { simpleDateTime } from '../../components/dates';

function Events({ editable = true, display = true, charges = [], selected = [], refresh, onSelect }, ref) {

    const [vehicles, setVehicles] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        GetItems(id, 4).then(resp => {
            if (Array.isArray(resp.data))
                setVehicles(resp.data)
        })
    }, [id, refresh])

    const handleCheck = (entityId) => {
        onSelect({ module: 4, entityId })
    }

    return <React.Fragment>
        {vehicles.length > 0 && (
            <React.Fragment>
                <div className='row'>
                    <div className='col-10'>
                        <small>Activity Details</small>
                    </div>
                    <div className='col-2 text-right'>
                        <small>Amount</small>
                    </div>
                </div>

                {
                    vehicles.map((e, i) => {
                        return <div key={i} className='row border-top border-bottom pt-3'>
                            <div className='col-8'>
                                <SimpleCheckBox onCheck={() => handleCheck(e.id)} editable={editable && !e.isPaid} checked={selected.findIndex(x => x.module === 4 && x.entityId === e.id) >= 0}>
                                    <p className='w-100 h6'><small className='text-muted'>Activity: </small>{e.activity}</p>
                                    <p className='w-100 h6'><small className='text-muted'>Activity Time: </small> {simpleDateTime(e.activityTime)}</p>
                                    <p className='w-100 h6'><small className='text-muted'>Plate Number: </small>{e.plateNumber}</p>
                                    <p className='w-100 h6'><small className='text-muted'>Plate Region: </small>{e.plateRegion}</p>
                                </SimpleCheckBox>
                            </div>
                            <div className='col-2 text-right my-auto'>
                                {e.isPaid && <b>Paid</b>}
                            </div>
                            <div className='col-2 text-right my-auto'>
                                <b>${e.charge.toFixed(2)}</b>
                            </div>
                        </div>
                    })
                }
            </React.Fragment>
        )}
    </React.Fragment>
}

export default forwardRef(Events);

// Payment Reverse 