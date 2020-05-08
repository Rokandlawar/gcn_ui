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
import { authenticationService } from '../../components/authorization';
import { FormView, Field } from '../../components/form/Index';
import { GetCycles } from '../../REST/company';
import { GetEventsInvoice } from '../../REST/statement';
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
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExternalPayment({ open = false, eventIds = [], onCreated, handleClose, groupSimilar = false }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [cycles, setCycles] = useState([]);
    const formView = useRef(null)

    useEffect(() => {
        if (open && authenticationService.isAdmin()) {
            setLoading(true);
            GetCycles().then(res => {
                if (Array.isArray(res.data))
                    setCycles(res.data)
                setLoading(false)
            }).catch(ex => { setLoading(false) })
        }
    }, [open])

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            let entity = { eventIds, groupSimilar, ...result }
            createInvoice(entity)
        }
    }

    const createInvoice = (entity) => {
        GetEventsInvoice(entity).then(response => {
            if (Array.isArray(response.data)) {
                setLoading(false);
                onCreated(response.data)
            }
        }).catch(ex => { setLoading(false) })
    }

    return (<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='secondary' className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Create Invoice
            </Typography>
            </Toolbar>
        </AppBar>
        <div className='col-12 mx-auto my-auto'>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            {authenticationService.isAdmin() && <div className='col-6'>
                <FormView ref={formView}>
                    <Field.DropDown label='Select Invoice Cycle' field='cycleId' required options={cycles} />
                    <Button fullWidth onClick={handleSave} variant='outlined'>Submit</Button>
                </FormView>
            </div>}
            {!authenticationService.isAdmin() && <div className='offset-sm-3 col-6'>
                <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">Confirmation</h5>
                        <p className="card-text">Are you sure you want to create invoice for the selected events.<br /><small className='text-muted'>Please note the invoice number in next screen, if you want to come back and pay at a later time.</small></p>
                        <button onClick={() => createInvoice({ eventIds, groupSimilar, cycleId: 0 })} className="card-link btn btn-default">Proceed</button>
                        <button className="card-link btn btn-default">Cancel</button>
                    </div>
                </div>
            </div>
            }
        </div>
    </Dialog>
    );
}
