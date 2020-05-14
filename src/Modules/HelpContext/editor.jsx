import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CRUDView from '../../components/crud';
import { authenticationService } from '../../components/authorization';
import { useParams } from 'react-router-dom';
import ArrowUp from '@material-ui/icons/ArrowUpward';
import ArrowDown from '@material-ui/icons/ArrowDownward';
import { OrderArticles, OrderStories, OrderTopics } from '../../REST/helpcontext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function TopicEditor({ onClose }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const editable = authenticationService.isAdmin();
    const [refresh, setRefresh] = useState(false);

    const config = [
        { field: 'title', title: 'Name', type: 'text', isGrid: true }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    const handleOrder = (dir, id) => {
        OrderTopics(dir, id).then(resp => setRefresh(!refresh))
    }

    const actions = [
        { icon: ArrowUp, toolTip: 'Move Up', onClick: (evt, rowData) => handleOrder('up', rowData.id) },
        { icon: ArrowDown, toolTip: 'Move Down', onClick: (evt, rowData) => handleOrder('down', rowData.id) },
    ]

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit Topics
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar color='secondary' className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Topics
                            </Typography>
                    </Toolbar>
                </AppBar>
                <CRUDView refresh={refresh} title='Topics' columns={config} allowAdd={editable} allowDelete={editable} allowEdit={editable} actions={actions}
                    url={process.env.REACT_APP_API_URL + '/topic'} />
            </Dialog>
        </div>
    );
}


export function ArticleEditor({ onClose }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const editable = authenticationService.isAdmin();
    const { topic } = useParams();
    const [refresh, setRefresh] = useState(false);

    const config = [
        { field: 'title', title: 'Title', type: 'text', isGrid: true }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    const handleOrder = (dir, id) => {
        OrderArticles(dir, id).then(resp => setRefresh(!refresh))
    }

    const actions = [
        { icon: ArrowUp, toolTip: 'Move Up', onClick: (evt, rowData) => handleOrder('up', rowData.id) },
        { icon: ArrowDown, toolTip: 'Move Down', onClick: (evt, rowData) => handleOrder('down', rowData.id) },
    ]

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit Articles
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar color='secondary' className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Articles
                            </Typography>
                    </Toolbar>
                </AppBar>
                <CRUDView actions={actions} refresh={refresh} title='Articles' columns={config} allowAdd={editable} allowDelete={editable} allowEdit={editable}
                    url={process.env.REACT_APP_API_URL + '/article/' + topic} />
            </Dialog>
        </div>
    );
}

export function StoryEditor({ onClose }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const editable = authenticationService.isAdmin();
    const { article } = useParams();
    const [refresh, setRefresh] = useState(false);

    const config = [
        { field: 'title', title: 'Story Title', type: 'text', isGrid: true },
        { field: 'template', title: 'Story Template', type: 'editor', isGrid: false }
    ]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onClose()
    };

    const handleOrder = (dir, id) => {
        OrderStories(dir, id).then(resp => setRefresh(!refresh))
    }

    const actions = [
        { icon: ArrowUp, toolTip: 'Move Up', onClick: (evt, rowData) => handleOrder('up', rowData.id) },
        { icon: ArrowDown, toolTip: 'Move Down', onClick: (evt, rowData) => handleOrder('down', rowData.id) },
    ]

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit Stories
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar color='secondary' className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Stories
                            </Typography>
                    </Toolbar>
                </AppBar>
                <CRUDView refresh={refresh} title='Stories' columns={config} allowAdd={editable} allowDelete={editable} allowEdit={editable} actions={actions}
                    url={process.env.REACT_APP_API_URL + '/story/' + article} fresh />
            </Dialog>
        </div>
    );
}