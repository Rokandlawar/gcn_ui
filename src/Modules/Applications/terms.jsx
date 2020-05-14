import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TermsNConditions({ permitId, open, onCancel, onSubmit, text = 'Submit', title = 'Terms & Conditions' }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const frameView = useRef(null);

    useEffect(() => {
        setLoading(true);
    }, [open])

    return (
        <Dialog fullScreen open={open} onClose={onCancel} TransitionComponent={Transition}>
            <AppBar position='static' className={classes.appBar} color='secondary'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onCancel} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Button autoFocus variant='outlined' color="inherit" onClick={onSubmit}>
                        {text}
                    </Button>
                </Toolbar>
            </AppBar>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            {permitId && <iframe onLoad={() => setLoading(false)} id='template-editor' src={`${process.env.REACT_APP_API_URL}/Application/Terms/${permitId}`} ref={frameView}
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                width="100%"
                height="100%"
                title='Message Viewer'
                scrolling="auto">
            </iframe>}
        </Dialog>
    );
}
