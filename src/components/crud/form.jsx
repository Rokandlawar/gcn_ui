import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import { FormView, Field } from '../form/Index';

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

export default function JsonForm({ columns = [], data = {}, show = false, isEdit = false, onSubmit, onCancel }) {
    const classes = useStyles();
    const formView = React.useRef(null);

    const [form, setForm] = useState({});

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            onSubmit({ ...data, ...result })
        }
    }

    const handleChange = (idx) => {
        if (columns[idx] && Array.isArray(columns[idx].effects)) {
            let result = formView.current.getCurrentResult();
            columns[idx].effects.forEach(e => {
                if (e.type === 'lookup') {
                    if (e.lookup) {
                        result[e.field] = e.lookup[result[columns[idx].field]] || form[columns[idx].field]
                    }
                    else {
                        // eslint-disable-next-line
                        result[e.field] = Array.isArray(columns[idx].options) ? (columns[idx].options.find(x => x.value == result[columns[idx].field]) || {}).label : form[columns[idx].field]
                    }
                }
            })
            Object.keys(result).forEach(e => {
                if (result[e] === undefined || result === null) delete result[e];
            })
            setForm(result)
        }
    }

    useEffect(() => {
        setForm(data);
    }, [data])

    return (
        <Dialog fullScreen open={show} onClose={onCancel} TransitionComponent={Transition}>
            <AppBar color='secondary' className={classes.appBar}>
                <Toolbar>
                    <IconButton color='inherit' edge="start" onClick={onCancel} >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {!isEdit ? 'Add Record' : 'Update Record'}
                    </Typography>
                    <IconButton color='inherit' onClick={handleSave}>
                        <SaveIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div className='col-12'>
                <FormView ref={formView} data={form}>
                    {columns.filter(e => !e.isHide).map((config, idx) => {
                        switch (config.type) {
                            case 'text':
                                return <Field.TextBox {...reqProps(config, idx)} />
                            case 'textarea':
                                return <Field.TextArea {...reqProps(config, idx)} />
                            case 'amount':
                                return <Field.AmountText {...reqProps(config, idx)} />
                            case 'amount5':
                                return <Field.AmountText {...reqProps(config, idx)} precision />
                            case 'numeric':
                                return <Field.TextBox {...reqProps(config, idx)} number />
                            case 'checkbox':
                                return <Field.CheckBox {...reqProps(config, idx)} />
                            case 'select':
                                return <Field.DropDown {...reqProps(config, idx)} options={config.options} changeEvt={() => handleChange(idx)} />
                            case 'multiselect':
                                return <Field.MultiSelect string {...reqProps(config, idx)} options={config.options} changeEvt={() => handleChange(idx)} />
                            default:
                                return <p key={idx}>Cannot find {config.type} type</p>
                        }
                    })}
                </FormView>
            </div>
        </Dialog>
    );
}

const reqProps = (element, key) => {
    const { title, field, required, disabled, message } = element
    return { label: title, field, required, key: element.key || key, disabled, message }
}