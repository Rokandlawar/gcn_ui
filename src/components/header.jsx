import React, { useImperativeHandle, forwardRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';
import { authenticationService } from './authorization';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1030
    },
    list: {
        width: 250
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function MenuAppBar(props, ref) {
    const [hide, setHide] = useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [show, setShow] = React.useState(false);

    const history = useHistory();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        authenticationService.removeToken();
        handleClose();
        history.replace('/')
    }

    useImperativeHandle(ref, () => ({
        hide: () => {
            setHide(true)
        }
    }))

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setShow(!show);
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                <ListItemLink href='#'>
                    <ListItemText primary='Dashboard' />
                </ListItemLink>
                <ListItemLink href='#applications'>
                    <ListItemText primary='Applications' />
                </ListItemLink>
                <ListItemLink href='#company'>
                    <ListItemText primary='Companies' />
                </ListItemLink>
                <ListItemLink href='#events'>
                    <ListItemText primary='Events' />
                </ListItemLink>
                <ListItemLink href='#invoices'>
                    <ListItemText primary='Invoices' />
                </ListItemLink>
                <ListItemLink href='#security/permissions'>
                    <ListItemText primary='Security' />
                </ListItemLink>
                <ListItemLink href='#security/modules'>
                    <ListItemText primary='Modules' />
                </ListItemLink>
                <ListItemLink href='#security/roles'>
                    <ListItemText primary='Role Types' />
                </ListItemLink>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar color='secondary' position="static">
                <Toolbar>
                    <IconButton disabled={hide} onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        GCNConnect
          </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            disabled={hide || authenticationService.user() === null}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logOut}>Log Out</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer open={show} onClose={toggleDrawer}>
                {list('left')}
            </Drawer>
        </div>
    );
}

export default forwardRef(MenuAppBar);