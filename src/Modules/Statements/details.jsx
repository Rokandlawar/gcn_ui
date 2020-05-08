import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetInvoice } from '../../REST/statement';
import Paper from '@material-ui/core/Paper';
import { simpleDate } from '../../components/dates';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function DetailsView({ editable = true, display = true, charges = [], refresh }, ref) {
    const classes = useStyles();
    const [invoice, setInvoice] = useState(null)
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        GetInvoice(id).then(response => {
            setInvoice(response.data)
            setLoading(false)
        })
    }, [id, refresh])

    return <div className='mx-neg mb-2'>
        <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
        {invoice && (
            <Paper elevation={2}>
                <div className='col-12 p-2'>
                    <h5 className='text-center'><small className='text-muted'>Invoice Number:</small> {invoice.invoiceNumber}</h5>
                    <hr />
                    <h6><small className='text-muted'>Invoice Date:</small> {simpleDate(invoice.invoiceDate)}</h6>
                    <h6><small className='text-muted'>Fiscal Year:</small>{invoice.fiscalYear}</h6>
                    <h6><small className='text-muted'>Finalization Due:</small>{simpleDate(invoice.finalizeDue)}</h6>
                    <h6><small className='text-muted'>Finalized Date:</small> {simpleDate(invoice.finalizedDate)}</h6>
                    <h6><small className='text-muted'>Due Date:</small> {simpleDate(invoice.dueDate)}</h6>
                </div>
            </Paper>
        )
        }
    </div >
}   