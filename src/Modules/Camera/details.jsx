import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AddEvent, UpdateEvent, GetEvent } from '../../REST/cameraEvents';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button'
import BackIcon from '@material-ui/icons/ArrowBack';
import { isEqual } from '../Statements/receipt';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Company from './company';
import { authenticationService } from '../../components/authorization';
import { makeStyles } from '@material-ui/core/styles';
import CreateInvoice from '../Statements/create';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function DetailsView({ refresh, onRefresh, options = { companies: [], skus: [], charges: [], cameras: [] } }) {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [create, setCreate] = useState({ open: false, eventIds: [], groupSimilar: false })
    const [add, setAdd] = useState(false);
    const formView = useRef(null)
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (id && id !== 0) {
            setLoading(true)
            GetEvent(id).then(response => {
                setEvent(response.data)
                setLoading(false)
            }).catch(ex => { setLoading(false) })
        }
    }, [id])

    const transport = [
        { label: 'Air Craft', value: 1 },
        { label: 'Commercial Ground', value: 2 }
    ]

    const handleChange = () => {
        let result = formView.current.getCurrentResult();
        setEvent({ ...event, ...result })
    }

    const handleClose = (refresh) => {
        setAdd(false)
        if (refresh) onRefresh();
    }

    const handleCharge = () => {
        let result = formView.current.getCurrentResult();
        const sku = options.charges.find(e => isEqual(e.skuId, result.skuId));
        if (sku) {
            result.charge = result.isPermit ? sku.permitAmount : sku.nonPermitAmount
            setEvent({ ...event, ...result })
        }
    }

    const handleCreate = (invoiceIds) => {
        if (Array.isArray(invoiceIds) && invoiceIds.length > 0)
            history.push('/invoices/' + invoiceIds[0])
    }

    const handleSave = () => {
        let result = formView.current.getResult();
        console.log(result);
        if (result) {
            if (id !== 0 && id && id !== '0') {
                UpdateEvent({ ...event, ...result }).then(response => {
                    setEvent(response.data)
                    setLoading(false);
                    setDisable(false)
                }).catch(ex => { setLoading(false) })
            }
            else {
                AddEvent(result).then(response => {
                    history.push('/events/' + response.data.id)
                    setLoading(false);
                }).catch(ex => { setLoading(false) })
            }
        }
    }

    const createReq = (group) => {
        let result = formView.current.getResult();
        if (result)
            setCreate({ open: true, eventIds: [id], groupSimilar: group })
        else
            setTimeout(() => {
                console.log('Waiting')
                setDisable(true)
            }, 2000)
    }


    return <div className='row'>
        <Company open={add} handleClose={handleClose} states={states} />
        <CreateInvoice open={create.open} handleClose={() => setCreate({ open: false, eventIds: [], groupSimilar: false })} eventIds={create.eventIds} groupSimilar={create.groupSimilar} onCreated={handleCreate} />
        <div className='col-12'>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            <Button className='float-right' href='#events' variant="contained" color="secondary" startIcon={<BackIcon />}>Back</Button>
            <div className='clearfix' />
            <hr />
        </div>
        {id !== 0 && id !== '0' && authenticationService.isAdmin() && <div className='col-12'>
            <Button disabled={disable} onClick={() => createReq(false)}>Create Invoice For This Event</Button>
            <Button disabled={disable} onClick={() => createReq(true)}>Create Invoice For This Transport</Button>
        </div>}
        <div className='col-sm-12 col-md-6'>
            <FormView ref={formView} data={event}>
                <Field.DropDown changeEvt={handleCharge} field='skuId' label='Activity Type' options={options.skus} required />
                <Field.CheckBox checkEvt={handleCharge} field='isPermit' label='Is Permitted' />
                <Field.AmountText field='charge' label='Activity Charge' required />
                <Field.DateTimePicker field='activityTime' label='Activity Time' required />
                <Field.DropDown changeEvt={handleChange} field='vehicleType' label='Transport Type' options={transport} required />
                <Field.DropDown options={options.cameras} field='cameraId' label='Camera Name' required />
                <div className='row'>
                    <Field.TextBox className='col' field='plateNumber' label={event && isEqual(event.vehicleType, 1) ? 'Tail Number' : 'Plate Number'} required />
                    {event && isEqual(event.vehicleType, 2) && <Field.DropDown className='col' label='Plate Region' field='plateRegion' options={states} required />}
                </div>
                <div className='row'>
                    <Field.DropDown className='col' field='companyId' label='Company' options={options.companies} required />
                    {authenticationService.isAdmin() && <Button className='col' onClick={() => setAdd(true)} fullWidth variant='text'>Add New Company</Button>}
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <Button color='secondary' onClick={handleSave} variant='outlined' fullWidth>Save</Button>
                    </div>
                    <div className='col-6'>
                        <Button color='secondary' href='#events' variant='outlined' fullWidth>Cancel</Button>
                    </div>
                </div>
            </FormView>
        </div>
    </div>
}

const states = [{ "label": "Alabama", "value": "AL" }, { "label": "Alaska", "value": "AK" }, { "label": "American Samoa", "value": "AS" }, { "label": "Arizona", "value": "AZ" }, { "label": "Arkansas", "value": "AR" }, { "label": "California", "value": "CA" }, { "label": "Colorado", "value": "CO" }, { "label": "Connecticut", "value": "CT" }, { "label": "Delaware", "value": "DE" }, { "label": "District Of Columbia", "value": "DC" }, { "label": "Federated States Of Micronesia", "value": "FM" }, { "label": "Florida", "value": "FL" }, { "label": "Georgia", "value": "GA" }, { "label": "Guam", "value": "GU" }, { "label": "Hawaii", "value": "HI" }, { "label": "Idaho", "value": "ID" }, { "label": "Illinois", "value": "IL" }, { "label": "Indiana", "value": "IN" }, { "label": "Iowa", "value": "IA" }, { "label": "Kansas", "value": "KS" }, { "label": "Kentucky", "value": "KY" }, { "label": "Louisiana", "value": "LA" }, { "label": "Maine", "value": "ME" }, { "label": "Marshall Islands", "value": "MH" }, { "label": "Maryland", "value": "MD" }, { "label": "Massachusetts", "value": "MA" }, { "label": "Michigan", "value": "MI" }, { "label": "Minnesota", "value": "MN" }, { "label": "Mississippi", "value": "MS" }, { "label": "Missouri", "value": "MO" }, { "label": "Montana", "value": "MT" }, { "label": "Nebraska", "value": "NE" }, { "label": "Nevada", "value": "NV" }, { "label": "New Hampshire", "value": "NH" }, { "label": "New Jersey", "value": "NJ" }, { "label": "New Mexico", "value": "NM" }, { "label": "New York", "value": "NY" }, { "label": "North Carolina", "value": "NC" }, { "label": "North Dakota", "value": "ND" }, { "label": "Northern Mariana Islands", "value": "MP" }, { "label": "Ohio", "value": "OH" }, { "label": "Oklahoma", "value": "OK" }, { "label": "Oregon", "value": "OR" }, { "label": "Palau", "value": "PW" }, { "label": "Pennsylvania", "value": "PA" }, { "label": "Puerto Rico", "value": "PR" }, { "label": "Rhode Island", "value": "RI" }, { "label": "South Carolina", "value": "SC" }, { "label": "South Dakota", "value": "SD" }, { "label": "Tennessee", "value": "TN" }, { "label": "Texas", "value": "TX" }, { "label": "Utah", "value": "UT" }, { "label": "Vermont", "value": "VT" }, { "label": "Virgin Islands", "value": "VI" }, { "label": "Virginia", "value": "VA" }, { "label": "Washington", "value": "WA" }, { "label": "West Virginia", "value": "WV" }, { "label": "Wisconsin", "value": "WI" }, { "label": "Wyoming", "value": "WY" }]