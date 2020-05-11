import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DocumentEditor({ label, value, className, fields = [] }, ref) {
    const [data, setData] = useState('');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const frameView = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
        setLoading(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return data
        },
        resetForm: () => {

        },
        isNew: () => {
            return true;
        }
    }))

    useEffect(() => {
        setData(value)
    }, [value])

    useEffect(() => {
        const handleSubmit = (data) => {
            setData(data);
            handleClose()
        }

        const messageHandler = (message) => {
            if (message.origin === process.env.REACT_APP_TEMPLATE_UI) {
                if (message.data === 'Initialized' && frameView.current && frameView.current.contentWindow) {
                    setLoading(false);

                    frameView.current.contentWindow.postMessage({ render: 'Fields', fields, content: data }, "*")
                }
                else if (message.data === 'Close')
                    handleClose()
                else
                    handleSubmit(message.data)
            }
        }
        window.addEventListener('message', messageHandler)

        return function cleanup() {
            window.removeEventListener('message', messageHandler);
        }
    }, [fields, label, data])

    return (
        <div className={className || ''}>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            <Button variant='text' fullWidth color="secondary" onClick={handleClickOpen}>
                {label}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <iframe id='template-editor' src={process.env.REACT_APP_TEMPLATE_UI} ref={frameView}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    width="100%"
                    height="100%"
                    title='Template Editor'
                    scrolling="auto">
                </iframe>
            </Dialog>
        </div>
    );
}

export default forwardRef(DocumentEditor);