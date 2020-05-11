import React, { useState, useEffect } from 'react';
import ArrowIcon from '@material-ui/icons/ArrowRight';
import { useHistory, useParams } from 'react-router-dom';
import CRUDView from '../../components/crud';
import DetailsView from './details';
import CommentsView from './comments';
import VehiclesView from './vehicles';
import SkuView from './sku';
import EventsView from './events';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import TotalView from './total';
import { GetAllItems } from '../../REST/statement';
import { authenticationService } from '../../components/authorization';
import AttachmentView from '../Widgets/Files';

export default function Statement() {
    const { id } = useParams();
    const history = useHistory();
    const config = [
        { field: 'invoiceNumber', title: 'Invoice Number', isGrid: true, type: 'text' },
        { field: 'invoiceDate', title: 'Invoice Date', isGrid: true, type: 'date' },
        { field: 'amountDue', title: 'Amount Due', isGrid: true, type: 'amount' },
        { field: 'amountPaid', title: 'Amount Paid', isGrid: true, type: 'amount' },
    ]

    const actions = [
        { icon: ArrowIcon, onClick: (evt, rowData) => history.push('invoices/' + rowData.id), tooltip: 'View Details' }
    ]

    const url = process.env.REACT_APP_API_URL + '/statement';

    if (id)
        return <StatementDetails />
    return <CRUDView title='Invoices' url={url} allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} columns={config} />

}

function StatementDetails() {
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [selected, setSelected] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        GetAllItems(id).then(response => {
            if (Array.isArray(response.data)) { setItems(response.data); setSelected([]) }
        })
    }, [id, refresh])

    const handleSelect = (item) => {
        console.log(item)
        const exist = selected.findIndex(e => e.module === item.module && e.entityId === item.entityId)
        if (exist < 0)
            setSelected(selected.concat([item]))
        else setSelected(selected.filter(e => e.module === item.module && e.entityId !== item.entityId))
    }

    const toggleRefresh = () => setRefresh(!refresh)

    return <React.Fragment>
        {authenticationService.user() !== null && <Button className='float-right' href='#invoices' variant="contained" color="secondary" startIcon={<BackIcon />}>Back</Button>}
        <div className='clearfix' />
        <hr />
        <DetailsView charges={items} handleRefresh={toggleRefresh} refresh={refresh} />
        <VehiclesView charges={items} handleRefresh={toggleRefresh} selected={selected} refresh={refresh} onSelect={handleSelect} />
        <EventsView editable={authenticationService.user() !== null} charges={items} handleRefresh={toggleRefresh} selected={selected} refresh={refresh} onSelect={handleSelect} />
        <SkuView charges={items} handleRefresh={toggleRefresh} selected={selected} refresh={refresh} onSelect={handleSelect} />
        <AttachmentView module={4} entityId={id} />
        <div className='row'>
            <div className='col'>
                <CommentsView display={authenticationService.user() !== null} handleRefresh={toggleRefresh} />
            </div>
            <div className='col'>
                <TotalView charges={items} handleRefresh={toggleRefresh} selected={selected} refresh={refresh} />
            </div>
        </div>
    </React.Fragment>

}