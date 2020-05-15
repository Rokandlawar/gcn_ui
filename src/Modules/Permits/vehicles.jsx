import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { GetVehicle } from '../../REST/application';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
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
            GetVehicle(entity.applicationId, entity.vehicleId).then(response => setData(response.data)).catch(ex => setError(true))
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
        return <p>Vehicle not Found</p>


    return <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Vehicle Information
      </Typography>
            <div className='row'>
                <div className='col-12'>
                    <h6><small className='text-muted'>Plate Number: {data.plate}</small></h6>
                    <h6><small className='text-muted'>Plate Region: {data.state}</small></h6>
                    <h6><small className='text-muted'>Vehicle Details (VIN, Make, Year): {data.vin || 'NA'}, {data.make || 'NA'}, {data.year || 'NA'}</small></h6>
                    <h6><small className='text-muted'>Vehicle Capacity: {data.pax}</small></h6>
                    <h6><small className='text-muted'>Vehicle Number: {data.number}</small></h6>
                </div>
            </div>
        </CardContent>
    </Card>
}

export default forwardRef(CompanyDetails);
