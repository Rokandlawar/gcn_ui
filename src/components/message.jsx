import React, { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Axios from '../REST/base';

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

export default function MessageView({ setting, title, fullScreen = false, link = null }) {
    if (fullScreen)
        return <FullScreenMessage setting={setting} title={title} link={link} />
    return <FullMessage setting={setting} />
}

function FullScreenMessage({ setting = 'NA', title = 'Please Provide a Title', link = null }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const frameView = useRef(null);
    const [loading, setLoading] = useState(false);
    const url = link || `${process.env.REACT_APP_API_URL}/Content/Message/HTML/${setting}`

    const handleClickOpen = () => {
        setOpen(true);
        setLoading(true);
    };

    const handleClose = () => {
        axios.get(url).then(resp => {
            Axios().post('Content/Email', { content: resp.data, email: 'aditya4pavan@gmail.com', subject: title })
        })
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {title}
            </Button>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar color='secondary' className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <iframe onLoad={() => setLoading(false)} id='template-editor' src={url} ref={frameView}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    width="100%"
                    height="100%"
                    title='Message Viewer'
                    scrolling="auto">
                </iframe>
            </Dialog>
        </div>
    );
}

function FullMessage({ setting = 'NA' }) {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (setting !== 'NA')
            axios.get(`${process.env.REACT_APP_API_URL}/Content/Message/Data/${setting}`).then(resp => {
                setContent(resp.data);
                setLoading(false);
            }).catch(ex => {
                setContent('<p>Loading Content for ' + setting + ' Failed</p>')
                setLoading(false);
            })
    }, [setting])

    return <React.Fragment>
        {loading && <CircularProgress color="secondary" />}
        {!loading && ReactHtmlParser(content || '')}
    </React.Fragment>
}
