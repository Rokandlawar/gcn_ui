import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import CRUDView from '../../components/crud';
import EditIcon from '@material-ui/icons/Edit';
import { GetAttachments, GetDownloadURL } from '../../REST/application';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Attachments({ editable = true, display = true, entity }, ref) {
    const [view, setView] = useState({ open: false, type: null, title: null })

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
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
        <AttachmentView applicationId={entity.applicationId} open={view.open} title={view.title} permitId={view.type} onClose={() => setView({ open: false, title: null, type: null })} editable={editable} />
        <CRUDView urls={{ list: process.env.REACT_APP_API_URL + '/Attachment/Applications/' + entity.applicationId }}
            id='id' columns={config} title={'Attachment Types'}
            allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} pageCount={5} />
    </React.Fragment>
}

export default forwardRef(Attachments);

function AttachmentView({ permitId, open, onClose, title = 'Attachments', editable = true, applicationId = null }) {
    const classes = useStyles();
    const [files, setFiles] = useState([])

    const downloadFile = (id) => GetDownloadURL(id).then(r => { const { url } = r.data; window.open(url, '_blank') });

    useEffect(() => {
        if (permitId && open && applicationId !== null)
            GetAttachments(applicationId, permitId).then(response => {
                if (Array.isArray(response.data)) setFiles(response.data);
            })
    }, [open, permitId, applicationId])

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
                <h4>Uploaded Attachments</h4>
                {files.length === 0 && <p>None</p>}
                <ul className="list-group">
                    {files.map(e => {
                        return <li key={e.attachmentId} className='list-group-item'>{e.name}
                            <IconButton onClick={() => downloadFile(e.attachmentId)}><DownloadIcon /></IconButton>
                        </li>
                    })}
                </ul>
            </div>
        </Dialog>
    );
}