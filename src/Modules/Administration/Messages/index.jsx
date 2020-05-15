import React, { useEffect, useState, useRef } from 'react';
import CRUDView from '../../../components/crud';
import { useParams, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { FormView, Field } from '../../../components/form/Index';
import { GetContent, AddContent, UpdateContent, GetContentOptions } from '../../../REST/administration';
import Button from '@material-ui/core/Button';
import MessageView from '../../../components/message';

const types = [
    { label: 'HTML Template', value: 2 },
    { label: 'Email Template', value: 1 },
]

const modules = [
    { label: 'Applications', value: 1 },
    { label: 'Invoice', value: 2 },
    { label: 'Users', value: 3 },
]

function Messages({ editable = true, display = true }) {

    const { id } = useParams();
    const history = useHistory();
    const [fields, setFields] = useState([]);

    useEffect(() => {
        GetContentOptions().then(resp => {
            if (Array.isArray(resp.data))
                setFields(resp.data.map(e => { return { ...e, fields: e.fields.map(x => { return { name: x, id: x } }) } }))
        })
    }, [])

    const config = [
        { field: 'name', title: 'Name ', type: 'text', required: true, isGrid: true },
        { field: 'setting', title: 'Setting Key ', type: 'text', required: true, isGrid: true },
        { field: 'type', title: 'Setting Type ', type: 'select', required: true, isGrid: true, options: types }
    ]

    const actions = [
        { icon: AddIcon, isFreeAction: true, tooltip: 'Add Record', onClick: () => { history.push('/admin/content/0') } },
        { icon: EditIcon, tooltip: 'Edit Record', onClick: (evt, rowData) => { history.push('/admin/content/' + rowData.id) } }
    ]

    if (id !== null && id !== undefined)
        return <MessageDetails fields={fields} />

    return <CRUDView url={process.env.REACT_APP_API_URL + '/Content'}
        allowEdit={false}
        allowAdd={false}
        allowDelete={editable}
        actions={actions}
        columns={config} title='Content Messages' id='id' />
}

export default Messages;

function MessageDetails({ fields = [] }) {
    const formView = useRef(null);
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id !== 0 && id !== '0')
            GetContent(id).then(resp => {
                setData(resp.data);
            })
    }, [id])

    const handleChange = () => {
        let result = formView.current.getCurrentResult();
        setData({ ...data, ...result });
    }

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            if (id !== 0 && id !== '0')
                UpdateContent({ ...data, ...result })
            else
                AddContent(result)
        }
    }

    const getFields = () => {
        if (data && (data.type !== 2 && data.type !== '2')) {
            if (data && data.module !== null && data.module !== undefined) {
                console.log(fields)
                return fields
            }
        }
        return [];
    }

    return <div className='row'><div className='col-sm-6'><FormView ref={formView} data={data}>
        <Field.TextBox label='Message Name' field='name' required />
        <Field.TextArea label='Message Description' field='description' required />
        <Field.TextBox label='Message Key' field='setting' required disabled={id !== 0 && id !== '0'} />
        <Field.DropDown changeEvt={handleChange} label='Message Type' field='type' required options={types} />
        {data && (data.type !== 2 && data.type !== '2') && <Field.DropDown changeEvt={handleChange} label='Module' field='module' required options={modules} />}
        <Field.DocumentEditor label='Template Editor' field='template' fields={getFields()} />
        {data && <MessageView fullScreen setting={data.setting} title='Sample Title' />}
        <div className='row'>
            <div className='col-6'>
                <Button fullWidth variant='outlined' onClick={handleSave} color='secondary'>Submit</Button>
            </div>
            <div className='col-6'>
                <Button fullWidth href='#/admin/content' variant='outlined' color='secondary'>Cancel</Button>
            </div>
        </div>
    </FormView></div></div>
}