import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { FormView, Field } from '../../components/form/Index';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { UpdateInsurance } from '../../REST/application';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
        textAlign: 'center'
    },
    pos: {
        marginBottom: 12,
    },
});

function Insurance({ editable = true, display = true, entity }, ref) {
    const classes = useStyles();
    const formView = useRef(null);

    const handleSave = () => {
        let result = formView.current.getResult();
        if (result) {
            UpdateInsurance({ ...entity, ...result }, entity.id)
        }
    }

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    return <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Insurance Information
      </Typography>
            <div className='row'>
                <div className='col-sm-6'>
                    <FormView ref={formView} data={entity}>
                        <Field.CheckBox label='Is Req. Statisfied' field='isSatisfied' />
                        <Field.DatePicker label='Is Req. Statisfied' field='glexpiration' />
                        <Field.DatePicker label='Is Req. Statisfied' field='alexpiration' />
                        <Field.DatePicker label='Is Req. Statisfied' field='wcexpiration' />
                    </FormView>
                </div>
                <div className='col-6'>
                    <Button onClick={handleSave} variant='outlined' className='float-right'>Save</Button>
                    <div className='clearfix' />
                </div>
            </div>
        </CardContent>
    </Card>
}

export default forwardRef(Insurance);
