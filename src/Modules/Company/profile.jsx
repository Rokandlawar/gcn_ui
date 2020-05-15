import React, { useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { UpdateProfile, ValidateProfile } from '../../REST/company';
import Paper from '@material-ui/core/Paper';

function Profile({ editable = true, display = true, entity, onRefresh, entityId }, ref) {
    const [error, setError] = useState(false);
    const formView = useRef(null);
    const { id } = useParams();

    useImperativeHandle(ref, () => ({
        validate: () => {
            return new Promise((res, rej) => {
                ValidateProfile(entityId).then(resp => {
                    res();
                }).catch(() => { rej(); setError(true) })
            })
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    if (!display)
        return <div />

    const handleSave = () => {
        let result = formView.current.getResult()
        if (result)
            UpdateProfile(id, { ...entity, ...result }).then(onRefresh)
    }


    return <Paper className='mt-2' elevation={3}>
        <div className='p-3'>
            {error && <p>Below Informtion is Required</p>}
            <FormView data={entity} disabled={!editable} ref={formView}>
                <div className='row'>
                    <div className='offset-sm-10 col-sm-2'>
                        <Button onClick={handleSave} variant='outlined' disabled={!editable}>Save</Button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='row'>
                            <Field.TextBox className='col' field='vendorCode' label='Vendor Code' required />
                            <Field.TextBox className='col' field='billingProfile' label='Billing Profile' required />
                        </div>
                        <Field.TextBox number field='comment' label='Comments' required />
                        <Field.TextBox number field='maxUsers' label='Max Users' required />
                    </div>
                </div>
            </FormView>
        </div>
    </Paper>
}

export default forwardRef(Profile);
