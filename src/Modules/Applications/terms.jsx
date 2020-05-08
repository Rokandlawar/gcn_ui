import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { GetTerms } from '../../REST/application';
import ReactHtmlParser from 'react-html-parser';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function TermsNConditions({ permitId, open, onCancel, onSubmit, text = 'Submit', title = 'Terms & Conditions' }) {
    const classes = useStyles();
    const [template, setTemplate] = useState({})

    useEffect(() => {
        if (permitId)
            GetTerms(permitId).then(response => {
                setTemplate(response.data)
            })
    }, [open, permitId])

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
            <div className='h-100 of-auto'>{ReactHtmlParser(template || '')}</div>
        </Dialog>
    );
}
