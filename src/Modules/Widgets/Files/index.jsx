import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import CRUDView from '../../../components/crud';
import AddIcon from '@material-ui/icons/Add';
import { GetUploadURL, AddAttachment, DeleteAttachment, GetDownloadURL } from '../../../REST/widget';
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


const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FilesView({ editable = true, display = true, module, entityId }, ref) {
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const { id } = useParams();

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))


    const downloadFile = (id) => GetDownloadURL(id).then(r => { const { url } = r.data; window.open(url, '_blank') });
    const deleteFile = (id) => DeleteAttachment(id).then(r => setRefresh(!refresh))

    const config = [
        { field: 'name', title: 'Attachment', isGrid: true, type: 'text' },
    ]

    const actions = [
        { icon: AddIcon, isFreeAction: true, tooltip: 'Add Attachment', onClick: () => setOpen(true) },
        { icon: DownloadIcon, tooltip: 'Download Attachment', onClick: (event, rowData) => downloadFile(rowData.id) },
        { icon: DeleteIcon, tooltip: 'Delete Attachment', onClick: (event, rowData) => deleteFile(rowData.id) }
    ]

    return <React.Fragment>
        <AttachmentView module={module} entityId={entityId} open={open} onClose={() => setOpen(false)} onRefresh={() => setRefresh(!refresh)} />
        <CRUDView url={process.env.REACT_APP_API_URL + '/Files/' + module + '/' + id}
            id='id' columns={config} title={'Attachment'} refresh={refresh}
            allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} pageCount={5} />
    </React.Fragment>
}

export default forwardRef(FilesView);

function AttachmentView({ open, onClose, title = 'Attachments', module, entityId, onRefresh }) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleAdd = e => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setLoading(true);
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
                    const entity = { attachmentId: objectKey, name: file.name, description: file.name }
                    AddAttachment(entity, module, entityId).then(resp => {
                        setLoading(false)
                        onClose()
                        onRefresh();
                    })
                }).catch(ex => {
                    console.log(ex); setLoading(false)
                })
            }).catch(ex => setLoading(false));
        }
    };

    return (
        <Dialog keepMounted={false} open={open} onClose={onClose} TransitionComponent={Transition}>
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
            {!loading && <div className='h-100 of-auto'>
                <div className='col-12'>
                    <div className="form-group">
                        <label>Add Documents</label>
                        <input id='file-upload' type="file" onChange={handleAdd} className="form-control-file" />
                    </div>
                </div>
            </div>}
            {loading && <p>Loading...</p>}
        </Dialog>
    );
}