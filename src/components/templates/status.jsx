import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';

export default function ModuleTemplate({ settings = [], handleClick, children }) {
    const refs = useRef(children.map(() => React.createRef()));
    if (settings.length < 1 || module === 0)
        return <div />

    const handleStatus = (validate, status) => {
        if (validate)
            Promise.all(refs.current.map(e => e.current.validate())).then(resp => {
                handleClick(status)
            })
        else
            handleClick(status)
    }

    return <React.Fragment>
        {
            <StatusView items={settings.filter(e => e.isStatus && e.allowDisplay)} onClick={handleStatus} />
        }
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
                        <ListItem button onClick={() => handleClick(e.isValidate, e.module)}>
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
            return <Button variant='outlined' color='secondary' key={i} onClick={() => onClick(e.isValidate, e.module)} className='float-right'>{e.name}</Button>
        })}
        <div className='clearfix' />
    </div>
}
