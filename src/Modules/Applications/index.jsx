import React, { useEffect, useState, useRef } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { tableIcons } from '../../components/crud/icons';
import ArrowIcon from '@material-ui/icons/ArrowRightOutlined';
import MaterialTable from 'material-table';
import { GetAll, GetApplication, GetOptions, AddRecord } from '../../REST/application';
import { GetPermissions } from '../../REST/security';
import { useParams, useHistory } from 'react-router-dom';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import DetailsView from './details';
import TermsView from './terms';
import Vehicles from './vehicles';
import Attachments from './attachments';
import Payment from './payment';
import { authenticationService } from '../../components/authorization';
import ModuleTemplate from '../../components/templates/module';
import StatusTemplate from '../../components/templates/status';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function Application() {

    const [data, setData] = useState([]);
    const [create, setCreate] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id === undefined)
            GetAll().then(response => {
                setData(response.data)
            })
    }, [id])

    const columns = [
        { title: 'Application Id', field: 'id' },
        { title: 'Application Name', field: 'name' },
        { title: 'Status', field: 'status' }
    ]

    const actions = [
        { icon: AddIcon, isFreeAction: true, onClick: () => setCreate(true) },
        { icon: ArrowIcon, tooltip: 'View Application', onClick: (event, rowData) => history.push('applications/' + rowData.id) }
    ]

    if (create)
        return <ApplicationCreate onSubmit={() => setCreate(false)} />

    if (id)
        return <ApplicationView />

    return <MaterialTable icons={tableIcons} columns={columns} title="Applications" data={data} actions={actions} options={{ actionsColumnIndex: -1, pageSize: 15 }} />
}

function ApplicationView() {
    const classes = useStyles();
    const [details, setDetails] = useState(null);
    const [access, setAccess] = useState([]);
    const { id } = useParams();
    const role = authenticationService.getRole();
    const [loading, setLoading] = useState(true);

    const handleError = () => {
        setLoading(false);
    }

    useEffect(() => {
        GetApplication(id).then(response => {
            if (response.data != null)
                GetPermissions(1, response.data.status, role).then(resp => {
                    if (Array.isArray(resp.data)) {
                        setDetails(response.data);
                        setAccess(resp.data);
                        setLoading(false)
                    }
                }).catch(handleError)
        }).catch(handleError)
    }, [id, role])

    const handleStatus = () => {

    }

    return <React.Fragment>
        <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
        <StatusTemplate settings={access} handleClick={handleStatus}>
            <ModuleTemplate entity={details} settings={access} module={7} component={<DetailsView />} />
            <ModuleTemplate entity={details} settings={access} module={1} component={<Vehicles />} />
            <ModuleTemplate entity={details} settings={access} module={2} component={<Attachments />} />
            <ModuleTemplate entity={details} settings={access} module={6} component={<Payment />} />
        </StatusTemplate>

    </React.Fragment>
}

function ApplicationCreate({ onSubmit }) {

    const formView = useRef(null);
    const [details, setDetails] = useState({ companies: [], permits: [] })
    const [terms, setTerms] = useState({ open: false, result: null })
    const history = useHistory();

    const addRecord = (result) => {
        if (result)
            AddRecord(result).then(response => {
                const { id } = response.data;
                if (id)
                    history.push('applications/' + id); onSubmit();
            })
    }

    const handleAdd = () => {
        let result = formView.current.getResult();
        if (result) {
            setTerms({ open: true, result })
        }
    }

    useEffect(() => {
        GetOptions().then(response => {
            setDetails(response.data)
        })
    }, [])

    const init = {}
    if (details.companies.length === 1)
        init.companyId = details.companies[0].value

    if (details.permits.length === 1)
        init.permitId = details.permits[0].value

    const years = [{ label: new Date().getFullYear(), value: new Date().getFullYear() }, { label: new Date().getFullYear() + 1, value: new Date().getFullYear() + 1 }]

    return <React.Fragment>
        <TermsView open={terms.open} permitId={terms.result ? terms.result.permitId : null} onSubmit={() => addRecord(terms.result)} onCancel={() => setTerms({ open: false, result: null })} />
        <FormView ref={formView} data={{ init, ...terms.result }}>
            <Field.DropDown field='companyId' label='Company' options={details.companies} required disabled={details.companies.length === 1} />
            <Field.DropDown field='permitId' label='Permit Type' options={details.permits} required disabled={details.permits.length === 1} />
            <Field.DropDown field='fiscal' label='Applying For Year' options={years} required />
            <Button onClick={handleAdd} variant='outlined'>Create Application</Button>
        </FormView>
    </React.Fragment>
}
