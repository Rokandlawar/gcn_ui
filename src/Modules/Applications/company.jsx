import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { GetCompany } from '../../REST/company';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

function CompanyDetails({ editable = true, display = true, entity }, ref) {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (entity !== null && entity.companyId)
            GetCompany(entity.companyId).then(response => setData(response.data)).catch(ex => setError(true))
    }, [entity])

    useImperativeHandle(ref, () => ({
        validate: () => {
            return Promise.resolve()
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    if (error)
        return <p>Error Occured While Retrieving results. </p>

    if (data === null)
        return <p>Company not Found</p>


    return <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Company Details
      </Typography>
            <div className='row'>
                <div className='col-sm-6'>
                    <h6><small className='text-muted'>Name:</small>{data.name}</h6>
                    <h6><small className='text-muted'>DOT Number:</small>{data.name}</h6>
                    <h6><small className='text-muted'>Address:</small>{data.address1} {data.city} {data.state}</h6>
                </div>
            </div>
        </CardContent>
        <CardActions>
            <Button href={`#company/${data.id}`} size="small">Learn More</Button>
        </CardActions>
    </Card>
}

export default forwardRef(CompanyDetails);
