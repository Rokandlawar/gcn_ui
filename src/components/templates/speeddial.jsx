import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 70,
        // transform: 'translateZ(-10px)',
        flexGrow: 1,
        position: 'relative'
    },
    speedDial: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: 1000
    },
    backdrop: {
        zIndex: 999,
        color: '#fff',
    },
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


export default function SpeedTemplate({ access = [], actions = [], link = '#', entity = null }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [current, setCurrent] = React.useState({ component: null, title: null, module: -1 });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = (component, title, module) => event => {
        setCurrent({ component, title, module });
        setShow(true);
    }

    const handleHide = () => {
        setShow(false)
        setCurrent({ component: null, title: null, module: -1 });
    }

    const getPermissions = (module) => {
        const item = access.filter(e => !e.isStatus).find(e => e.module === module)
        return { editable: item ? item.allowEdit : false, display: item ? (item.allowDisplay && (item.displayType === 3 || item.displayType === '3')) : false }
    }

    const items = actions.filter(e => {
        const { display } = getPermissions(e.module)
        return display;
    })

    if (items.length > 0)
        return <React.Fragment>
            <Backdrop className={classes.backdrop} open={open} />
            <div className={classes.root}>
                <Dialog fullScreen open={show} onClose={handleHide} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar} color='secondary'>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleHide} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {current.title || 'NA'}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {current.component && React.cloneElement(current.component || <p />, { ...getPermissions(current.module), entity, entityId: entity ? entity.id : null })}
                </Dialog>
                <Button variant='contained' href={link} color='secondary' startIcon={<ArrowBack />}>Back</Button>
                <SpeedDial
                    className={classes.speedDial}
                    ariaLabel="SpeedDial Template"
                    icon={<MoreIcon />}
                    onClose={handleClose}
                    FabProps={{ color: 'secondary', size: 'small' }}
                    onClick={handleOpen}
                    open={open}
                    direction='down'
                >
                    {items.map((action, idx) => (
                        <SpeedDialAction key={action.name} tooltipOpen icon={action.icon} onClick={handleAction(action.component, action.name, action.module)} tooltipTitle={action.name} />
                    ))}
                </SpeedDial>
            </div>
        </React.Fragment>
    return <Button variant='contained' href={link} color='secondary' startIcon={<ArrowBack />}>Back</Button>
}