import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: '#fff',
    },
}));

function SimpleBackdrop(props, ref) {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    const handleClose = () => {
        setCount(0)
    };

    useImperativeHandle(ref, () => ({
        add: () => {
            setCount(count + 1);
        },
        remove: () => {
            setCount(count > 0 ? count - 1 : 0)
        }
    }))

    return (
        <Backdrop className={classes.backdrop} open={count > 0} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default forwardRef(SimpleBackdrop);