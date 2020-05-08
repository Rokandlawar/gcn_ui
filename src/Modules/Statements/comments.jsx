import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FormView, Field } from '../../components/form/Index';
import { GetComment, UpdateComment } from '../../REST/statement';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

function Comments({ editable = true, display = true }, ref) {
    const [remarks, setRemarks] = useState('');
    const formView = useRef(null);
    const { id } = useParams();

    const onSave = () => {
        const result = formView.current.getResult();
        if (result)
            UpdateComment(id, { ...result, id }).then(response => setRemarks(response.data))
    }

    useEffect(() => {
        if (display)
            GetComment(id).then(response => setRemarks(response.data))
    }, [id, display])

    if (!display)
        return <div />

    return <FormView ref={formView} data={{ remarks }}>
        <div className='row'>
            <div className='col-10'>
                <Field.TextBox field='remarks' label='Remarks' />
            </div>
            <div className='col-2 my-auto'>
                <IconButton onClick={onSave}><SaveIcon /></IconButton>
            </div>
        </div>
    </FormView>
}

export default forwardRef(Comments);