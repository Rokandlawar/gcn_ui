import React, { useEffect, useState } from 'react';
import CRUDView from '../../components/crud';
import { useParams, useHistory } from 'react-router-dom';
import ArrowIcon from '@material-ui/icons/ArrowRight';
import { GetOptions } from '../../REST/cameraEvents';
import AddIcon from '@material-ui/icons/Add';
import DetailsView from './details';

export default function CameraEvents() {
    const [refresh, setRefresh] = useState(false);
    const [options, setOptions] = useState({ companies: [], skus: [], charges: [], cameras: [] })
    const { id } = useParams();
    const history = useHistory();

    const config = [
        { field: 'id', title: 'Event ID', type: 'text', isGrid: true },
        { field: 'activity', title: 'Activity Name', type: 'text', isGrid: true },
        { field: 'activityTime', title: 'Activity Time', type: 'datetime', isGrid: true },
        { field: 'plateNumber', title: 'Plate/Tail Number', type: 'text', isGrid: true },
        { field: 'plateRegion', title: 'Plate Region', type: 'text', isGrid: true },
    ]

    const url = process.env.REACT_APP_API_URL + '/CameraEvent'

    const actions = [
        { icon: AddIcon, onClick: (evt, rowData) => history.push('events/' + 0), isFreeAction: true },
        { icon: ArrowIcon, onClick: (evt, rowData) => history.push('events/' + rowData.id) }
    ]

    useEffect(() => {
        GetOptions().then(response => {
            if (Array.isArray(response.data.companies) && Array.isArray(response.data.skus) && Array.isArray(response.data.charges))
                setOptions(response.data);
        })
    }, [refresh])

    if (id !== undefined && id !== null)
        return <DetailsView options={options} refresh={refresh} onRefresh={() => setRefresh(!refresh)} />

    return <CRUDView columns={config} url={url} title='Camera Events' id='id' allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} />
}

