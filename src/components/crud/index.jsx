import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table'
import Axios from 'axios';
import { tableIcons } from './icons';
import { authenticationService } from '../authorization';
import JsonForm from './form';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { simpleDate, simpleDateTime } from '../dates';

export default function CrudView({ url, columns = [], title, allowDelete = true, allowEdit = true, allowAdd = true, actions = [], urls = { get: null, add: null, list: null, update: null, delete: null }, id, pageCount = 10, refresh = false, display = true }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [confirm, setConfirm] = useState({ open: false, title: 'NA', onSubmit: null, onCancel: null })

    useEffect(() => {
        setLoading(true)
        const headers = { 'Authorization': authenticationService.getToken() }
        const fetchData = async (url) => {
            try {
                const { data } = await Axios.get(url, { headers: headers })
                if (Array.isArray(data)) {
                    setLoading(false)
                    setData(data)
                }
                else
                    throw new Error(`Expecting Array but got ${typeof data}`)
            }
            catch (ex) {
                handleFail(ex)
                setLoading(false)
            }
        }
        fetchData(urls.list || url)
    }, [url, urls.list, refresh])

    const handleAdd = () => {
        setShow(true);
        setIsEdit(false);
    }

    const handleUpdate = (event, rowData) => {
        setRecord(rowData);
        setIsEdit(true);
        setShow(true);
    }

    const handleDelete = (event, rowData) => {
        const headers = { 'Authorization': authenticationService.getToken() }
        setConfirm({
            open: true, title: 'Please confirm delete action !', onSubmit: () => {
                Axios.delete(urls.delete || url + '/' + rowData[id], { headers: headers }).then(handleSuccess).catch(handleFail)
            }, onCancel: () => {
                setConfirm({ open: false, title: 'NA', onSubmit: null, onCancel: null })
            }
        })
    }

    const getAuditColumns = (isEdit) => {
        if (isEdit)
            return { updatedOn: new Date().toISOString(), updatedBy: authenticationService.user() }
        return { createdOn: new Date().toISOString(), createdBy: authenticationService.user(), updatedOn: new Date().toISOString(), updatedBy: authenticationService.user() }
    }

    const handleSuccess = (success) => {
        const headers = { 'Authorization': authenticationService.getToken() }
        Axios.get(urls.list || url, { headers: headers }).then(response => {
            setData(response.data)
            setConfirm({ open: false, title: 'NA', onSubmit: null, onCancel: null })
            setRecord(null);
            setShow(false);
            setIsEdit(false);
        }).catch(handleFail)
    }

    const handleCancel = () => {
        setRecord(null);
        setShow(false);
        setIsEdit(false);
    }

    const handleFail = (error) => {
        console.log(error)
    }

    const handleData = (result) => {
        const headers = { 'Authorization': authenticationService.getToken() }
        if (!isEdit) {
            Axios.post(urls.get || url, { ...result, ...getAuditColumns(isEdit) }, { headers: headers }).then(handleSuccess).catch(handleFail)
        }
        else {
            Axios.put(urls.get || url, { ...result, ...getAuditColumns(isEdit) }, { headers: headers }).then(handleSuccess).catch(handleFail)
        }
    }

    const events = [
        { icon: AddIcon, tooltip: 'New Record', isFreeAction: true, onClick: handleAdd, status: allowAdd },
        { icon: EditIcon, tooltip: 'Edit Record', onClick: handleUpdate, status: allowEdit },
        { icon: DeleteIcon, tooltip: 'Delete Record', onClick: handleDelete, status: allowDelete }
    ];


    const allActions = events.filter(e => e.status).map(e => { delete e.status; return { ...e } }).concat(actions.map(e => { return { ...e } }))

    if (!display)
        return <div />

    return <div className='w-100'>
        <MaterialTable icons={tableIcons} columns={columns.filter(e => e.isGrid).map(e => {
            return {
                title: e.title, field: e.field, render: rowData => {
                    if (e.type === 'amount' || e.type === 'amount5')
                        return '$' + (rowData[e.field] !== null && rowData[e.field] !== undefined ? rowData[e.field].toFixed(2) : -99)
                    if (e.type === 'checkbox')
                        return <Checkbox checked={rowData[e.field]} disabled />
                    if (e.type === 'date')
                        return simpleDate(rowData[e.field])
                    if (e.type === 'datetime')
                        return simpleDateTime(rowData[e.field])
                    if (e.type === 'select')
                        // eslint-disable-next-line eqeqeq
                        return <Chip variant='outlined' label={(e.options.find(x => x.value == rowData[e.field]) || {}).label || 'Invalid'} />
                    return rowData[e.field]
                }
            }
        })} title={title} data={data} isLoading={loading} options={{ pageSize: pageCount, actionsColumnIndex: -1 }} actions={allActions} />
        <JsonForm onCancel={handleCancel} onSubmit={handleData} show={show} columns={columns} data={record} isEdit={isEdit} />
        <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs" open={confirm.open}>
            <DialogTitle>{confirm.title}</DialogTitle>
            <DialogActions>
                <Button onClick={confirm.onCancel} color="secondary">
                    Cancel
                </Button>
                <Button onClick={confirm.onSubmit} color="secondary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </div>
}

