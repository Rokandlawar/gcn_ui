import React, { useState, useRef } from 'react';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { SearchEvents } from '../../REST/cameraEvents';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SimpleCheckBox } from '../../components/checkbox';
import { simpleDateTime } from '../../components/dates';
import CreateInvoice from '../Statements/create';
import { useHistory } from 'react-router-dom';

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

export default function Search() {
    const classes = useStyles();
    const [search, setSearch] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const formView = useRef(null);
    const handleChange = () => {
        let result = formView.current.getCurrentResult();
        setSearch({ ...search, ...result })
    }

    const handleSearch = () => {
        let result = formView.current.getResult();
        if (result) {
            if (result.vehicleType === '1' || result.vehicleType === 1)
                result.plateRegion = 'AZ';
            SearchEvents(result).then(response => {
                if (Array.isArray(response.data))
                    setResults(response.data)
            })
        }
    }

    const options = [
        { label: 'Commercial Ground', value: 2 },
        { label: 'Aircraft', value: 1 },
    ]

    return <div className='row'>
        <ResultsView handleClose={() => setResults([])} results={results} open={results.length > 0} />
        <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
        <div className='col-xs-12 col-sm-6 offset-sm-3'>
            <h4 className='lead text-center'>Search For Events</h4>
            <FormView ref={formView} data={search}>
                <Field.DropDown changeEvt={handleChange} options={options} field='vehicleType' label='Transport Type' required />
                <Field.TextBox field='plateNumber' label='Plate/Tail Number' required />
                {search && (search.vehicleType === 2 || search.vehicleType === '2') && <Field.DropDown options={states} field='plateRegion' label='Plate Region' required />}
                <div className='row'>
                    <Field.DatePicker className='col' label='Date From' field='startDate' required />
                    <Field.DatePicker className='col' label='Date To' field='endDate' required />
                </div>
                <Button fullWidth color='secondary' onClick={handleSearch} variant='outlined'>Search</Button>
            </FormView>
        </div>
    </div>
}

function ResultsView({ results = [], open = false, handleClose }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([])
    const [create, setCreate] = useState({ eventIds: [], open: false, groupSimilar: false })
    const history = useHistory();

    const handlePay = () => setCreate({ eventIds: selected, open: true })

    const handleCheck = (item) => {
        const exist = selected.includes(item)
        if (!exist)
            setSelected(selected.concat([item]))
        else setSelected(selected.filter(e => e !== item))
    }

    const handleInvoice = (invoiceIds) => {
        if (invoiceIds.length > 0)
            history.push('/statement/' + invoiceIds[0])
    }

    return (<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar color='secondary' className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Select Events
            </Typography>
            </Toolbar>
        </AppBar>
        <CreateInvoice eventIds={create.eventIds} open={create.open} onCreated={handleInvoice} groupSimilar={false} handleClose={() => setCreate({ open: false, eventIds: [] })} />
        <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
        <div className='col-12'>
            {
                results.map((e, i) => {
                    return <div key={i} className='row border-top border-bottom pt-3'>
                        <div className='col-8'>
                            <SimpleCheckBox onCheck={() => handleCheck(e.id)} editable={!e.isPaid} checked={selected.includes(e.id)}>
                                <p className='w-100 h6'><small className='text-muted'>Activity: </small>{e.activity}</p>
                                <p className='w-100 h6'><small className='text-muted'>Activity Time: </small> {simpleDateTime(e.activityTime)}</p>
                                <p className='w-100 h6'><small className='text-muted'>Plate Number: </small>{e.plateNumber}</p>
                                <p className='w-100 h6'><small className='text-muted'>Plate Region: </small>{e.plateRegion}</p>
                            </SimpleCheckBox>
                        </div>
                        <div className='col-2 text-right my-auto'>
                            {e.isPaid && <b>Paid</b>}
                        </div>
                        <div className='col-2 text-right my-auto'>
                            <b>${e.charge.toFixed(2)}</b>
                        </div>
                    </div>
                })
            }
            {selected.length > 0 && <Button onClick={handlePay}>Pay ({selected.length}) Item(s)</Button>}
        </div>
    </Dialog>
    );
}


const states = [{ "label": "Alabama", "value": "AL" }, { "label": "Alaska", "value": "AK" }, { "label": "American Samoa", "value": "AS" }, { "label": "Arizona", "value": "AZ" }, { "label": "Arkansas", "value": "AR" }, { "label": "California", "value": "CA" }, { "label": "Colorado", "value": "CO" }, { "label": "Connecticut", "value": "CT" }, { "label": "Delaware", "value": "DE" }, { "label": "District Of Columbia", "value": "DC" }, { "label": "Federated States Of Micronesia", "value": "FM" }, { "label": "Florida", "value": "FL" }, { "label": "Georgia", "value": "GA" }, { "label": "Guam", "value": "GU" }, { "label": "Hawaii", "value": "HI" }, { "label": "Idaho", "value": "ID" }, { "label": "Illinois", "value": "IL" }, { "label": "Indiana", "value": "IN" }, { "label": "Iowa", "value": "IA" }, { "label": "Kansas", "value": "KS" }, { "label": "Kentucky", "value": "KY" }, { "label": "Louisiana", "value": "LA" }, { "label": "Maine", "value": "ME" }, { "label": "Marshall Islands", "value": "MH" }, { "label": "Maryland", "value": "MD" }, { "label": "Massachusetts", "value": "MA" }, { "label": "Michigan", "value": "MI" }, { "label": "Minnesota", "value": "MN" }, { "label": "Mississippi", "value": "MS" }, { "label": "Missouri", "value": "MO" }, { "label": "Montana", "value": "MT" }, { "label": "Nebraska", "value": "NE" }, { "label": "Nevada", "value": "NV" }, { "label": "New Hampshire", "value": "NH" }, { "label": "New Jersey", "value": "NJ" }, { "label": "New Mexico", "value": "NM" }, { "label": "New York", "value": "NY" }, { "label": "North Carolina", "value": "NC" }, { "label": "North Dakota", "value": "ND" }, { "label": "Northern Mariana Islands", "value": "MP" }, { "label": "Ohio", "value": "OH" }, { "label": "Oklahoma", "value": "OK" }, { "label": "Oregon", "value": "OR" }, { "label": "Palau", "value": "PW" }, { "label": "Pennsylvania", "value": "PA" }, { "label": "Puerto Rico", "value": "PR" }, { "label": "Rhode Island", "value": "RI" }, { "label": "South Carolina", "value": "SC" }, { "label": "South Dakota", "value": "SD" }, { "label": "Tennessee", "value": "TN" }, { "label": "Texas", "value": "TX" }, { "label": "Utah", "value": "UT" }, { "label": "Vermont", "value": "VT" }, { "label": "Virgin Islands", "value": "VI" }, { "label": "Virginia", "value": "VA" }, { "label": "Washington", "value": "WA" }, { "label": "West Virginia", "value": "WV" }, { "label": "Wisconsin", "value": "WI" }, { "label": "Wyoming", "value": "WY" }]