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
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    };

    useImperativeHandle(ref, () => ({
        add: () => {
            Counter.addCount();
            setOpen(true);
        },
        remove: () => {
            Counter.reduceCount();
            if (Counter.getCount() === 0)
                setOpen(false)
        }
    }))

    return (
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

class Counter {
    static count = 0;

    static getCount() {
        return this.count;
    }

    static addCount() {
        this.count = this.count + 1;
    }

    static reduceCount() {
        if (this.count > 0)
            this.count = this.count - 1;
    }
}

export default forwardRef(SimpleBackdrop);