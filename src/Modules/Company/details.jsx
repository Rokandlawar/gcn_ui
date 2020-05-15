import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { UpdateInfomation } from '../../REST/company';
import Paper from '@material-ui/core/Paper';

function Details({ editable = true, display = true, entity, onRefresh }, ref) {
    const formView = useRef(null);
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
        setData(entity)
    }, [entity])

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    if (data === null)
        return <div />

    if (!display)
        return <div />

    const handleSave = () => {
        let result = formView.current.getResult()
        if (result)
            UpdateInfomation(id, { ...entity, ...result }).then(onRefresh)
    }

    const handleCheck = () => {
        let result = formView.current.getCurrentResult();
        setData({ ...data, ...result });
    }


    return <Paper elevation={3}>
        <div className='p-3'>
            <FormView data={data} disabled={!editable} ref={formView}>
                <div className='row'>
                    <div className='col-sm-10'>
                        <p className='lead'>{entity.name}</p>
                    </div>
                    <div className='col-sm-2'>
                        <Button variant='outlined' onClick={handleSave} disabled={!editable}>Save</Button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <Field.TextBox field='name' label='Name' required />
                        <Field.TextBox field='dotNumber' label='DOT Number' />
                        <Field.TextBox field='email' label='Email' required />
                        <Field.PhoneText field='phone' label='Phone' required />
                        <Field.CheckBox checkEvt={handleCheck} field='isTenant' label='Is Lease Holder' />
                        {data && data.isTenant && <Field.Row>
                            <Field.DatePicker className='col' label='Begin Date' required field='startDate' />
                            <Field.DatePicker className='col' label='End Date' required field='endDate' />
                        </Field.Row>}
                    </div>
                </div>
            </FormView>
        </div>
    </Paper>
}

export default forwardRef(Details);
