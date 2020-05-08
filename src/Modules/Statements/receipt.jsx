import React, { useState, useRef } from 'react';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { RecordPayment } from '../../REST/statement';

export default function RecordReceipt({ onBack }) {
    const { id } = useParams();
    const [data, setData] = useState({});
    const formView = useRef(null)
    const [complete, setComplete] = useState(false);

    const handleChange = () => {
        let result = formView.current.getCurrentResult();
        if (result) {
            setData({ ...data, ...result })
        }
    }

    const handleSubmit = () => {
        let result = formView.current.getResult();
        if (result) {
            if (isEqual(result.paymentType, 1))
                result.accountNumber = 'GCN_INTERNAL_COLLECT';
            result.confirmationNumber = 'MANUAL'
            result.invoiceId = id;
            RecordPayment(result).then(response => {
                setComplete(true);
            })
        }
    }

    const options = [
        { label: 'Cash', value: 1 },
        { label: 'Check', value: 2 }
    ]

 

    if (complete)
        return <h3>Payment Complete. Please Close Browser Window</h3>

    return <div className='row'>
        <div className='col-6'>
            <FormView ref={formView} data={data}>
                <Field.TextBox field='accountName' label='Name' required />
                <Field.DatePicker field='paymentDate' label='Date Paid' required />
                <Field.DropDown field='paymentType' label='Payment Type' options={options} required changeEvt={handleChange} />
                {isEqual(data.paymentType, 2) && <Field.TextBox field='accountNumber' label='Check Number' required />}
                <div className='row'>
                    <div className='col-6'>
                        <Button onClick={handleSubmit} fullWidth variant='outlined'>Submit Payment</Button>
                    </div>
                    <div className='col-6'>
                        <Button onClick={onBack} fullWidth variant='outlined'>Cancel</Button>
                    </div>
                </div>
            </FormView>
        </div>
    </div>
}

export const isEqual = (l, r) => {
    if (l && r)
        return l === r || l.toString() === r.toString()
    return false
}