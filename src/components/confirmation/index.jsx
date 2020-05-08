import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

export default function ConfirmationDialogRaw({ children, onSubmit, onCancel }) {

    const [open, setOpen] = React.useState(false)

    const handleDialog = event => (action) => {
        setOpen(false)
        if (action === 'submit')
            onSubmit()
        else
            onCancel()
    }

    return (
        <React.Fragment>
            <div onClick={setOpen(true)}>
                {children}
            </div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                open={open}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={handleDialog('submit')} color="primary">
                        Cancel
        </Button>
                    <Button onClick={handleDialog('cancel')} color="primary">
                        Ok
        </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};
