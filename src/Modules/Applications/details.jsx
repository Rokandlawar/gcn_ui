import React, { useImperativeHandle, forwardRef } from 'react';

function Details({ editable = true, display = true, entity = null }, ref) {

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))



    return <React.Fragment>
        <p> Details Coming Soon </p>
    </React.Fragment>
}

export default forwardRef(Details);
