import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import DefaultSettings from '../settings';

export default function StatusTemplate({ settings = [], handleClick, children }) {
    const refs = useRef(children.map(() => React.createRef()));
    const [view, setView] = useState({ open: false, message: null, status: null });
    if (settings.length < 1 || module === 0)
        return <div />

    const handleStatus = (validate, status, data) => {
        if (validate) {
            Promise.all(refs.current.map(e => e.current.validate())).then(resp => {
                if (!data.isAlert && !data.isConfirm)
                    handleClick(status)
                else if (data.isAlert && !data.isConfirm) {
                    DefaultSettings.showAlert(data.message, 'info')
                    handleClick(status)
                }
                else if (!data.isAlert && data.isConfirm)
                    setView({ open: true, message: data.message, status: status })
                else {
                    DefaultSettings.showAlert(data.message, 'info')
                    setView({ open: true, message: data.message, status: status })
                }
            })
        }
        else
            handleClick(status)
    }

    const handleClose = () => setView({ open: false, message: null, status: null })

    return <React.Fragment>
        {
            <StatusView items={settings.filter(e => e.isStatus && e.allowDisplay)} onClick={handleStatus} />
        }
        <AlertDialog open={view.open} message={view.message} onSubmit={() => handleClick(view.status)} onCancel={handleClose} />
        {React.Children.map(children, (elem, idx) => {
            return React.cloneElement(elem, {
                ref: refs.current[idx]
            })
        })}
    </React.Fragment>
}



function DialogStatus({ items = [], onClick }) {
    const [open, setOpen] = useState(false)
    const handleClick = (v, s) => {
        setOpen(false);
        onClick(v, s)
    }

    return <React.Fragment>
        <Button className='float-right' variant="outlined" color="secondary" onClick={() => setOpen(true)}>
            Available Actions
      </Button>
        <Dialog onClose={() => setOpen(false)} open={open}>
            <DialogTitle>Select An Action</DialogTitle>
            <List>
                {items.map((e, i) => (
                    <React.Fragment key={i}>
                        <Divider />
                        <ListItem button onClick={() => handleClick(e.isValidate, e.module, e)}>
                            <ListItemText primary={e.name} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Dialog>
        <div className='clearfix' />
    </React.Fragment>
}


function StatusView({ items = [], onClick }) {

    if (items.length > 2)
        return <DialogStatus items={items} onClick={onClick} />
    return <div>
        {items.map((e, i) => {
            return <Button variant='outlined' color='secondary' key={i} onClick={() => onClick(e.isValidate, e.module, e)} className='float-right'>{e.name}</Button>
        })}
        <div className='clearfix' />
    </div>
}

function AlertDialog({ open, onSubmit, onCancel, message = '' }) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
        >
            <DialogTitle>{'Confirmation'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Disagree
          </Button>
                <Button onClick={onSubmit} color="primary" autoFocus>
                    Agree
          </Button>
            </DialogActions>
        </Dialog>
    );
}
