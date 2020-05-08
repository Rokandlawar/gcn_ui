import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export const SimpleCheckBox = ({ children, onCheck = handleCheck, editable = true, checked = false }) => {
    return <div className='row'>
        <div className='col-2 my-auto'>
            <Checkbox
                checked={checked}
                onChange={evt => onCheck(evt.target.checked)}
                disabled={!editable}
            />
        </div>
        <div className='col-10 my-auto'>
            {children}
        </div>
    </div>
}

const handleCheck = () => {
    console.log('No Action Assigned')
}