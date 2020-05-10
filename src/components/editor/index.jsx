import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 2000,
        color: '#fff',
    }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ title = 'Not Provided', fields = groups }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const frameView = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
        setLoading(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (data) => {
        console.log(data)
    }

    useEffect(() => {
        const messageHandler = (message) => {
            if (message.origin === process.env.REACT_APP_TEMPLATE_UI) {
                if (message.data === 'Initialized' && frameView.current && frameView.current.contentWindow) {
                    setLoading(false);
                    frameView.current.contentWindow.postMessage({ render: 'Fields', fields }, "*")
                }
                else if (message.data === 'Close')
                    handleClose()
                else
                    handleSubmit(message.data)
            }
        }
        window.addEventListener('message', messageHandler)
    }, [fields])

    return (
        <div>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                {title}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <iframe id='template-editor' src={process.env.REACT_APP_TEMPLATE_UI} ref={frameView}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    width="100%"
                    height="100%"
                    title='Template Editor'
                    scrolling="auto">
                </iframe>
            </Dialog>
        </div>
    );
}

const groups = [
    {
        name: 'Application', fields: [
            { name: 'Application Id', id: 'ID' },
            { name: 'Application Name', id: 'Name' },
            { name: 'Payment Amount', id: 'Amount' }
        ],
        values: [
            ['1', 'Air Port Permit', '10'],
            ['2', 'Train Permit', '20'],
            ['3', 'Bus Permit', '30']
        ],
        id: 'Application'
    },
    {
        name: 'Vehicles', fields: [
            { name: 'Application ID', id: 'ApplicationID' },
            { name: 'Vehicle Plate', id: 'PlateNumber' },
            { name: 'Vehicle Region', id: 'PlateRegion' },
            { name: 'Vehicle ID', id: 'VehicleID' }
        ],
        values: [
            ['1', 'QSDFG', 'DE', 1],
            ['1', 'FJSJS', 'MD', 2],
            ['1', 'SDKSD', 'NJ', 3],
            ['2', 'SDJSD', 'NY', 4],
            ['2', 'SDKSD', 'VA', 5],
            ['2', 'SDSDA', 'NV', 6],
            ['3', 'SDSDS', 'LA', 7],
            ['3', 'SDAZD', 'CA', 8],
            ['3', 'LKKOS', 'TX', 9]
        ],
        id: 'Vehicles',
        relation: 'ApplicationID = %Application.ID%'
    },
    {
        name: 'Events', fields: [
            { name: 'Event ID', id: 'EventID' },
            { name: 'Activity Time', id: 'Time' },
            { name: 'Event Vehicle', id: 'EventVehicleID' }
        ],
        values: [
            [1, '1:00', 1],
            [2, '1:00', 1],
            [3, '1:00', 1],
            [4, '1:00', 2],
            [5, '1:00', 2],
            [6, '1:00', 3],
            [7, '1:00', 4],
            [8, '1:00', 5],
            [9, '1:00', 6],
            [10, '1:00', 7],
            [11, '1:00', 8],
            [12, '1:00', 9],
            [13, '1:00', 9],
            [14, '1:00', 9],
            [15, '1:00', 9],
        ],
        id: 'Events',
        relation: 'EventVehicleID = %Vehicles.VehicleID%'
    }

]

  // handleMerge = () => {
  //     let sfdt = this.container.documentEditor.serialize();
  //     Axios.post(this.container.serviceUrl + 'Download', JSON.stringify({ sfdt, groups }), {
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         responseType: 'blob'
  //     }).then(response => {
  //         const url = window.URL.createObjectURL(new Blob([response.data]));
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.setAttribute('download', 'Sample.docx'); //or any other extension
  //         document.body.appendChild(link);
  //         link.click();
  //     })
  // }