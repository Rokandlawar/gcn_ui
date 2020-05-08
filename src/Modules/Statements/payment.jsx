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
import { useParams } from 'react-router-dom';
import { authenticationService } from '../../components/authorization';
import { FormView, Field } from '../../components/form/Index';
import { GetSAML, GetInfomation } from '../../REST/statement';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReceiptAdd from './receipt';

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

export default function ExternalPayment({ open = false, handleClose, invoiceId }) {
    const classes = useStyles();

    return (<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='secondary' className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Payment
            </Typography>
            </Toolbar>
        </AppBar>
            Please Complete Payment in Other window
    </Dialog>
    );
}

const paymentSettings = (profile) => {
    if (profile === 'DEV')
        return {
            destination: process.env.REACT_APP_DEV_PAYMENT,
            partnerKey: process.env.REACT_APP_DEV_PARTNERKEY
        }
    else
        return {
            destination: process.env.REACT_APP_PROD_PAYMENT,
            partnerKey: process.env.REACT_APP_PROD_PARTNERKEY
        }
}

const paymentURL = (profile) => {
    return profile === 'DEV' ? process.env.REACT_APP_DEV_PAYMENT : process.env.REACT_APP_PROD_PAYMENT
}

export function PaymentView({ header, mode = 'DEV' }) {
    const classes = useStyles();
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [manual, setManual] = useState(false);
    const { id } = useParams();
    const formView = useRef(null);
    const [user, setUser] = useState(authenticationService.getUserInfo());

    useEffect(() => {
        const handleHeader = () => {
            if (header.current)
                header.current.hide()
        }

        if (user !== null)
            GetInfomation(id).then(resp => {
                GetSAML({
                    ...user, invoiceId: id, ...paymentSettings(mode),
                    isEncoded: true,
                    keyName: '3Public.pfx',
                    balance: resp.data.amountDue,
                    accountNum: 1,
                    //keyValue: 'GCNCONNECT'
                }).then(response => {
                    setQuery(response.data)
                    setLoading(false)
                    handleHeader()
                }).catch(handleEx)
            }).catch(handleEx)
        else
            handleHeader()
    }, [id, user, header, mode])

    const handleEx = () => {
        setLoading(false)
    }

    const handleUser = () => {
        let result = formView.current.getResult();
        if (result) {
            setUser(result)
        }
    }

    if (manual)
        return <ReceiptAdd onBack={() => setManual(false)} />

    if (user === null)
        return <div className='row h-100'>
            <div className='sm-offset-6 col-sm-4 col-xs-12'>
                <h4>Please Provide Following Details</h4>
                <FormView ref={formView}>
                    <Field.TextBox label='First Name' field='firstName' required />
                    <Field.TextBox label='Last Name' field='lastName' required />
                    <Field.TextBox label='Email' field='email' required />
                    <Button onClick={handleUser} fullWidth variant='outlined' color='secondary'>Submit</Button>
                </FormView>
            </div>
        </div >

    return <div className='row h-100'>
        <div className='col-12 my-auto text-center'>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            {query != null && <form id="frmPaymentRequest" action={paymentURL(mode)} method="post">
                <div>
                    <input type="hidden" name="SAMLResponse" value={query} runat="server" />
                </div>
                <Button variant='outlined' className='mx-auto' type='submit'>Proceed to Payment Portal (External)</Button>
            </form>}
            {authenticationService.isAdmin() && <Button className='mx-auto' onClick={() => setManual(true)} variant='outlined'>Manual Payment</Button>}
        </div>
    </div>
}