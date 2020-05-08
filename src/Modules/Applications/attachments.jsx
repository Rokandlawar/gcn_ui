import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CRUDView from '../../components/crud';
import EditIcon from '@material-ui/icons/Edit';
import { ValidateAttachments, GetAttachments, GetUploadURL, AddAttachment, DeleteAttachment, GetDownloadURL } from '../../REST/application';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import { getAuditColumns } from '../Security/permissions';


const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Attachments({ editable = true, display = true }, ref) {

    const [error, setError] = useState(false)
    const [view, setView] = useState({ open: false, type: null, title: null })
    const [refresh, setRefresh] = useState(false);

    const { id } = useParams();

    useImperativeHandle(ref, () => ({
        validate: () => {
            return new Promise((resolve, error) => {
                ValidateAttachments(id).then(response => {
                    setError(false);
                    resolve()
                }).catch(ex => {
                    setError(true);
                    error();
                })
            })
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    const config = [
        { field: 'name', title: 'Attachment Type', isGrid: true, type: 'text' },
        { field: 'issueReq', title: 'Required For Submission', isGrid: true, type: 'checkbox' },
        { field: 'renewalReq', title: 'Requirements Satisfied', isGrid: true, type: 'checkbox' }
    ]

    const actions = [{ icon: EditIcon, onClick: (event, rowData) => setView({ open: true, title: rowData.name, type: rowData.id }) }]

    return <React.Fragment>
        <AttachmentView open={view.open} title={view.title} permitId={view.type} onClose={() => { setView({ open: false, title: null, type: null }); setRefresh(!refresh) }} editable={editable} />
        {error && <p className='text-danger'>Please upload Attachments required for Submission</p>}
        <CRUDView urls={{ list: process.env.REACT_APP_API_URL + '/Attachment/Applications/' + id }}
            id='id' columns={config} title={'Attachment Types'} refresh={refresh}
            allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} pageCount={5} />
    </React.Fragment>
}

export default forwardRef(Attachments);

function AttachmentView({ permitId, open, onClose, title = 'Attachments', editable = true }) {
    const classes = useStyles();
    const [files, setFiles] = useState([])
    const [refresh, setRefresh] = useState(false)
    const { id } = useParams();

    const handleAdd = e => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            GetUploadURL({ fileType: file.type }).then(response => {
                const { url, objectKey } = response.data;
                const options = {
                    params: {
                        Key: file.name,
                        ContentType: file.type
                    },
                    headers: {
                        'Content-Type': file.type
                    }
                };
                axios.put(url, file, options).then(result => {
                    const entity = { attachmentId: objectKey, entityId: id, name: file.name, description: file.name, type: permitId, module: 1, ...getAuditColumns() }
                    AddAttachment(entity).then(resp => {
                        setRefresh(!refresh)
                        document.getElementById('file-upload').value = null;
                    })
                }).catch(ex => {
                    console.log(ex);
                })
            })
        }
    };

    const downloadFile = (id) => GetDownloadURL(id).then(r => { const { url } = r.data; window.open(url, '_blank') });
    const deleteFile = (id) => DeleteAttachment(id).then(r => setRefresh(!refresh))

    useEffect(() => {
        if (permitId && open)
            GetAttachments(id, permitId).then(response => {
                if (Array.isArray(response.data)) setFiles(response.data);
            })
    }, [open, permitId, id, refresh])

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
            <AppBar position='static' className={classes.appBar} color='secondary'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className='h-100 of-auto'>
                {editable && <div className="form-group">
                    <label>Add Documents</label>
                    <input id='file-upload' type="file" onChange={handleAdd} className="form-control-file" />
                </div>}
                <h4>Uploaded Attachments</h4>
                {files.length === 0 && <p>None</p>}
                <ul className="list-group">
                    {files.map(e => {
                        return <li key={e.attachmentId} className='list-group-item'>{e.name}
                            <IconButton onClick={() => downloadFile(e.attachmentId)}><DownloadIcon /></IconButton><IconButton onClick={() => deleteFile(e.attachmentId)}><DeleteIcon /></IconButton>
                        </li>
                    })}
                </ul>

            </div>
        </Dialog>
    );
}