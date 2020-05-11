import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import CRUDView from '../../../components/crud';
import BackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useHistory } from 'react-router-dom';
import { GetNoticeOptions, GetNotice, AddNotice, UpdateNotice } from '../../../REST/administration';
import { FormView, Field } from '../../../components/form/Index';

const modules = [
    { label: 'Applications', value: 1 },
    { label: 'Permits', value: 2 },
    { label: 'Company', value: 3 },
    { label: 'Invoices', value: 4 },
    { label: 'Camera Events', value: 5 }
]

export default function NoticesView() {
    const { id } = useParams();
    const [options, setOptions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        GetNoticeOptions().then(response => {
            if (Array.isArray(response.data)) {
                const opts = response.data.map(e => {
                    return { ...e, groups: e.groups.map(x => { return { ...x, fields: x.fields.map(y => { return { name: y, id: y } }) } }) }
                })
                setOptions(opts)
            }
        })
    }, [])

    const config = [
        { field: 'name', title: 'Notice Name', type: 'text', isGrid: true },
        { field: 'description', title: 'Notice Description', type: 'textarea', isGrid: true },
        { field: 'module', title: 'Module', type: 'select', options: modules, required: true, isGrid: true },
        { field: 'createdBy', title: 'Created By', type: 'text', isGrid: true, isHide: true },
        { field: 'createdOn', title: 'Created On', type: 'date', isGrid: true, isHide: true },
    ]

    const actions = [
        { icon: AddIcon, tooltip: 'New Record', isFreeAction: true, onClick: () => history.push('/admin/notices/0') },
        { icon: EditIcon, tooltip: 'Edit Record', onClick: (evt, rowData) => history.push('/admin/notices/' + rowData.id) }
    ]

    if (id)
        return <DetailsView options={options} />

    return <CRUDView url={`${process.env.REACT_APP_API_URL}/Notice`} columns={config} title='Notes' actions={actions}
        allowEdit={false}
        allowAdd={false}
        allowDelete={false}
        id='id' />
}

function DetailsView({ options = [] }) {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const history = useHistory();
    const formView = useRef(null);

    useEffect(() => {
        if (id !== 0 && id)
            GetNotice(id).then(response => setData(response.data))
    }, [id])

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            if (id === 0)
                handleAdd(result)
            else
                handleUpdate(result)
        }
    }

    const handleAdd = (result) => {
        AddNotice(result).then(response => {
            history.push('/admin/notices/' + response.data.id)
        })
    }

    const handleUpdate = (result) => {
        UpdateNotice({ ...data, ...result })
    }

    const handleChange = () => {
        let result = formView.current.getCurrentResult();
        setData(result);
    }

    const getFields = () => {
        if (data && data.module)
            return (options.find(e => String(e.module) === String(data.module)) || { groups: [] }).groups
        else
            return []
    }

    return <div className='row'><div className='col-6'>
        <FormView ref={formView} data={data}>
            <div className='row'><div className='col-12'>
                <Button className='float-right' variant="contained" color="secondary" startIcon={<BackIcon />} href='#admin/notices'>Back</Button>
                <div className='clearfix' />
            </div></div>
            <Field.TextBox label='Name' required field='name' />
            <Field.TextArea label='Description' required field='description' />
            <Field.DropDown changeEvt={handleChange} label='Module' required field='module' options={modules} />
            <Field.DocumentEditor label='Template Editor' field='template' fields={getFields()} />
            <div className='row'>
                <div className='col'>
                    <Button fullWidth variant='outlined' color='secondary' onClick={handleSave}>Save</Button>
                </div>
                <div className='col'>
                    <Button fullWidth variant='outlined' color='secondary' href='#admin/notices'>Cancel</Button>
                </div>
            </div>
        </FormView >
    </div>
    </div>
}
