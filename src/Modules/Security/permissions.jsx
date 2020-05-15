import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CRUDView from '../../components/crud';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import BackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { GetModules, GetAccess, UpdateAccess, DeleteAccess, GetOptions, GetRoles } from '../../REST/security';
import { authenticationService } from '../../components/authorization';

const columns1 = [
    { field: 'groupName', title: 'Group Name', isGrid: true }
]

const columns2 = [
    {
        field: 'statusId', title: 'Select Status', isGrid: false, type: 'select', options: [], effects: [{
            type: 'lookup', field: 'statusName'
        }]
    },
    { field: 'statusName', title: 'Status Name', isGrid: true, type: 'text', disabled: true },
    { field: 'fields', title: 'Fields', isGrid: false, type: 'multiselect', options: [] },
    { field: 'validate', title: 'Require Validation', isGrid: false, type: 'checkbox' },
    { field: 'alert', title: 'Show Alert', isGrid: false, type: 'checkbox' },
    { field: 'confirm', title: 'Require Confirmation', isGrid: false, type: 'checkbox' },
    { field: 'alertMessage', title: 'Display Message(If any)', isGrid: false, type: 'textarea' }

]

const columns3 = [
    { label: 'Maximize', value: 1 },
    { label: 'Minimize', value: 2 },
    { label: 'Sidebar', value: 3 },
]

export default function Permissions() {

    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    const [roles, setRoles] = useState([]);
    const [view, setView] = useState(null);

    const handleAccess = (event, rowData) => setView(<AccessView roles={roles} groupName={rowData.groupName} statusId={id} groupId={rowData.groupId} onCancel={() => setView(null)} onSubmit={() => { setView(null); setRefresh(!refresh) }} />)

    useEffect(() => {
        GetOptions(id).then(response => {
            const { statuses, fields } = response.data;
            columns2[0].options = statuses.map(e => { return { label: e.statusName, value: e.id } })
            columns2[2].options = fields.map(e => { return { label: e, value: e } })
        })
    }, [id])

    useEffect(() => {
        GetRoles().then(response => {
            if (Array.isArray(response.data))
                setRoles(response.data)
        })
    }, [])

    const addAccess = () => {
        setView(<AccessView roles={roles} statusId={id} onCancel={() => setView(null)} onSubmit={() => { setView(null); }} />)
    }

    const deleteAccess = (event, rowData) => DeleteAccess(id, rowData.groupId).then(() => setRefresh(!refresh))


    const actions1 = [
        { icon: AddIcon, isFreeAction: true, onClick: addAccess },
        { icon: SettingsIcon, onClick: handleAccess },
        { icon: DeleteIcon, onClick: deleteAccess }
    ]

    const AccessURL = process.env.REACT_APP_API_URL + '/Permission/Groups/' + id
    const StatusURL = process.env.REACT_APP_API_URL + '/PossibleStatus/' + id
    if (view != null)
        return view
    return <React.Fragment>
        <div className='row'><div className='col-12'>
            <Button className='float-right' variant="contained" color="secondary" startIcon={<BackIcon />} href='#security/permissions'>Back</Button>
            <div className='clearfix' />
        </div></div>
        <CRUDView columns={columns1} urls={{ list: AccessURL }} title='Role Access' actions={actions1} id='id' pageCount={5} allowAdd={false} allowDelete={false} allowEdit={false} refresh={refresh} />
        <CRUDView columns={columns2} url={StatusURL} title='Available Statuses' id='id' pageCount={5} />
    </React.Fragment>

}

function AccessView({ groupId = 0, roles = [], groupName, statusId, onCancel, onSubmit }) {

    const [data, setData] = useState([])
    const [modules, setModules] = useState([])

    useEffect(() => {
        if (groupId)
            GetAccess(statusId, groupId).then(response => {
                if (Array.isArray(response.data))
                    setData(response.data)
            })
    }, [groupId, statusId])

    const handleSubmit = () => {
        let result = groupId ? { groupId } : formView.current.getResult();
        if (result) {
            let results = refs.current.map(e => e.current.getResult())
            if (results.every(e => { return e !== false })) {
                let final = results.map((e, idx) => {
                    return { ...e, ...result, roleId: roles[idx].roleId, statusId, ...getAuditColumns() }
                })
                UpdateAccess(statusId, result.groupId, final).then(onSubmit)
            }
        }
    }

    useEffect(() => {
        GetModules(statusId).then(response => {
            if (Array.isArray(response.data))
                setModules(response.data.map(e => { return { value: e.groupId, label: e.groupName } }))
        })
    }, [statusId])

    let formView = useRef(null);
    let refs = useRef(roles.map(e => React.createRef()));

    return <React.Fragment>
        {groupId === 0 && <FormView ref={formView} data={{ groupId }}>
            <Field.DropDown options={modules} field='groupId' required label='Group Name' />
        </FormView>
        }
        {groupId !== 0 && <h5>{groupName}</h5>}
        <hr />
        <p className='lead'>Group Permissions</p>
        {
            roles.map((role, idx) => {
                return <FormView ref={refs.current[idx]} key={idx} data={data.find(e => e.roleId === role.roleId)}>
                    <Field.Row>
                        <div className='col'><p className='mt-4'>{role.roleName}</p></div>
                        <Field.CheckBox className='col pt-3' field='display' label='Allow Display' />
                        <Field.CheckBox className='col pt-3' field='editable' label='Allow Edit' />
                        <Field.DropDown required className='col' field='displayType' label='Display Type' options={columns3} />
                    </Field.Row>
                </FormView>
            })
        }
        <div className='row'>
            <div className='col'>
                <Button variant='outlined' onClick={handleSubmit} fullWidth>Submit</Button>
            </div>
            <div className='col'>
                <Button variant='outlined' onClick={onCancel} fullWidth>Cancel</Button>
            </div>
        </div>
    </React.Fragment>
}

export const getAuditColumns = () => {
    return { createdOn: new Date().toISOString(), createdBy: authenticationService.user(), updatedOn: new Date().toISOString(), updatedBy: authenticationService.user() }
}