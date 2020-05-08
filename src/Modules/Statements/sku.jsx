import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GetItems, UpdateSku } from '../../REST/statement';
import { FormView, Field } from '../../components/form/Index';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import { SimpleCheckBox } from '../../components/checkbox';

function SkuActivity({ editable = true, display = true, charges = [], selected = [], refresh, onSelect, handleRefresh }, ref) {
    const [skus, setSkus] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        GetItems(id, 3).then(resp => {
            if (Array.isArray(resp.data))
                setSkus(resp.data)
        })
    }, [id, refresh])

    return <React.Fragment>
        {skus.length > 0 && (
            <div className='row'>
                <div className='col-10'>
                    Sku Name
                </div>
                <div className='col-2 text-right'>
                    Price
                </div>
            </div>
        )}
        {skus.map((e, idx) => {
            return <SkuView key={idx} data={e} editable={editable} onSelect={onSelect} selected={selected} onRefresh={handleRefresh} />
        })}
    </React.Fragment>
}

export default forwardRef(SkuActivity);

function SkuView({ data, editable = true, onSelect, selected = [], onRefresh }) {
    const [form, setForm] = useState({ amount: 0, multiplier: 0, name: 'NA' })
    const [btns, setBtns] = useState(false);
    const formView = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        setForm(data)
        setBtns(false);
    }, [data])

    const handleDisplay = () => {
        if (btns !== true) {
            let result = formView.current.getCurrentResult();
            setForm({ ...form, ...result })
            setBtns(true);
        }
    }

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            UpdateSku(id, { ...form, ...result }).then(response => {
                onRefresh()
            })
        }
    }

    const handleCheck = (checked) => {
        onSelect({ module: 3, entityId: data.id })
    }

    return <FormView ref={formView} data={form} disabled={!editable || data.isPaid}>
        <div className='row border'>
            <div className='col-3 my-auto'>
                <SimpleCheckBox editable={editable && !data.isPaid} onCheck={handleCheck} checked={selected.findIndex(e => e.module === 3 && e.entityId === data.id) >= 0}>
                    <h6><small className='text-muted'>{data.name}</small></h6>
                </SimpleCheckBox>
            </div>
            <div className='col-5'>
                <div className='row'>
                    <Field.AmountText changeEvt={handleDisplay} className='col-5' disabled={!data.allowEdit} precision={!data.isFixed} number label='Amount' field='amount' required />
                    {data.isFixed === false && <Field.TextBox changeEvt={handleDisplay} className='col-5' number label='Count/Rate' field='multiplier' required />}
                    {btns && <div className='col-2 my-auto'>
                        <IconButton onClick={handleSave}><SaveIcon /></IconButton>
                    </div>}
                </div>
            </div>
            <div className='col-2 text-right my-auto'>
                {data.isPaid && <b>Paid</b>}
            </div>
            <div className='col-2 text-right my-auto'>
                <b>${(data.amount * data.multiplier).toFixed(2)}</b>
            </div>
        </div>
    </FormView>
}