import React, { useRef, useState } from 'react';
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
import { FormView, Field } from '../../components/form/Index';
import { AddCompany } from '../../REST/cameraEvents';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExternalPayment({ open = false, handleClose, states = [] }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const formView = useRef(null);

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            AddCompany(result).then(response => {
                handleClose(true);
            }).catch(ex => {
                console.log(ex);
            })
        }
    }

    return (<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='secondary' className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Add Company
            </Typography>
                <Button variant='outlined' color="inherit" onClick={handleSave}>
                    Save
            </Button>
            </Toolbar>
        </AppBar>
        <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
        <div className='col-12'>
            <FormView ref={formView}>
                <Field.TextBox field='name' label='Company Name' required />
                <Field.TextBox field='number' label='Company DOT#' required />
                <Field.TextBox field='address1' label='Business Address' required />
                <Field.TextBox field='address2' label='Address Line 2 (Contd.)' />
                <div className='row'>
                    <Field.TextBox className='col' field='city' label='City' required />
                    <Field.DropDown options={states} className='col' field='state' label='State' required />
                    <Field.ZipText className='col' field='zip' label='Zip' required />
                </div>
                <div className='row'>
                    <Field.TextBox className='col' field='email' label='Email' />
                    <Field.PhoneText className='col' field='phone' label='Phone Number' />
                </div>
            </FormView>
        </div>
    </Dialog>
    );
}