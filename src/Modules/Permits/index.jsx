import React, { useEffect, useState } from 'react';
import ArrowIcon from '@material-ui/icons/ArrowRightOutlined';
import { GetPermit, UpdateStatus } from '../../REST/permits';
import { GetPermissions } from '../../REST/security';
import { useParams, useHistory } from 'react-router-dom';
import { authenticationService } from '../../components/authorization';
import ModuleTemplate from '../../components/templates/module';
import StatusTemplate from '../../components/templates/status';
import SpeedTemplate from '../../components/templates/speeddial';
import CRUDView from '../../components/crud';
import Company from './company';
import Details from './details';
import Insurance from './insurance';
import Vehicles from './vehicles';
import Documents from './documents';
// Icons
import CommentIcon from '@material-ui/icons/Comment';
import NotesIcon from '@material-ui/icons/NoteAdd';
import CommuteIcon from '@material-ui/icons/Commute';
import AttachmentIcon from '@material-ui/icons/Attachment';
import BusinessIcon from '@material-ui/icons/Business';
import InfoIcon from '@material-ui/icons/Info';
import DescriptionIcon from '@material-ui/icons/Description';
import ReceiptIcon from '@material-ui/icons/Receipt';
import FilesIcon from '@material-ui/icons/FileCopy';
// Other Modules
import NotesView from '../Widgets/Notes';
import NoticeView from '../Widgets/Notices';
import AttachmentView from '../Widgets/Files';
import ReceiptView from '../Widgets/Receipt';

export default function Permit() {
    const history = useHistory();
    const { id } = useParams();

    const columns = [
        { title: 'Permit Id', field: 'id', isGrid: true, type: 'text' },
        { title: 'Permit Name', field: 'name', isGrid: true, type: 'text' },
        { title: 'Status', field: 'status', isGrid: true, type: 'text' }
    ]

    const actions = [
        { icon: ArrowIcon, tooltip: 'View Permit', onClick: (event, rowData) => history.push('permits/' + rowData.id) }
    ]


    if (id)
        return <PermitView />

    return <CRUDView title='Permits' allowAdd={false} allowEdit={false} allowDelete={false} url={`${process.env.REACT_APP_API_URL}/Permit`} columns={columns} actions={actions} />
}

function PermitView() {
    const [details, setDetails] = useState(null);
    const [access, setAccess] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const { id } = useParams();
    const role = authenticationService.getRole();

    useEffect(() => {
        GetPermit(id).then(response => {
            if (response.data != null)
                GetPermissions(2, response.data.status, role).then(resp => {
                    if (Array.isArray(resp.data)) {
                        setDetails(response.data);
                        setAccess(resp.data);
                    }
                })
        })
    }, [id, role, refresh])

    const handleStatus = (status) => {
        UpdateStatus(id, status).then(() => setRefresh(!refresh))
    }

    const actions = [
        { name: 'Details', icon: <DescriptionIcon />, module: 1, component: <Details /> },
        { name: 'Company', icon: <BusinessIcon />, module: 2, component: <Company /> },
        { name: 'Vehicles', icon: <CommuteIcon />, module: 3, component: <Vehicles /> },
        { name: 'Documents', icon: <FilesIcon />, module: 4, component: <Documents /> },
        { name: 'Insurance', icon: <InfoIcon />, module: 5, component: <Insurance /> },
        { name: 'Notes', icon: <CommentIcon />, module: 6, component: <NotesView module={2} entityId={id} /> },
        { name: 'Notices', icon: <NotesIcon />, module: 7, component: <NoticeView module={2} entityId={id} /> },
        { name: 'Attachments', icon: <AttachmentIcon />, module: 8, component: <AttachmentView module={2} entityId={id} /> },
        { name: 'Receipt', icon: <ReceiptIcon />, module: 9, component: <ReceiptView module={2} entityId={id} /> },
    ]
    /*Need to Change templates below. Make it One*/

    return <React.Fragment>
        <SpeedTemplate link='#permits' entity={details} access={access} actions={actions} />
        <StatusTemplate settings={access} handleClick={handleStatus}>
            <ModuleTemplate entity={details} settings={access} module={1} component={<Details />} />
            <ModuleTemplate entity={details} settings={access} module={2} component={<Company />} />
            <ModuleTemplate entity={details} settings={access} module={3} component={<Vehicles />} />
            <ModuleTemplate entity={details} settings={access} module={4} component={<Documents />} />
            <ModuleTemplate entity={details} settings={access} module={5} component={<Insurance />} />
            <ModuleTemplate entity={details} settings={access} module={6} component={<NotesView module={2} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={7} component={<NoticeView module={2} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={8} component={<AttachmentView module={2} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={9} component={<ReceiptView module={2} entityId={details ? details.vehicleId : null} />} />
        </StatusTemplate>

    </React.Fragment>
}

