import React, { useState, useEffect } from 'react';
import ArrowIcon from '@material-ui/icons/ArrowRight';
import { useHistory, useParams } from 'react-router-dom';
import { GetCompany } from '../../REST/company';
import { GetPermissions } from '../../REST/security';
import CRUDView from '../../components/crud';
import Details from './details';
import Profile from './profile';
import Invoices from './invoice';
import Address from './address';
import Users from './users';
import ModuleTemplate from '../../components/templates/module';
import StatusTemplate from '../../components/templates/status';
import SpeedTemplate from '../../components/templates/speeddial';
import { authenticationService } from '../../components/authorization';
// Icons
import CommentIcon from '@material-ui/icons/Comment';
import NotesIcon from '@material-ui/icons/NoteAdd';
import PeopleIcon from '@material-ui/icons/People';
import AttachmentIcon from '@material-ui/icons/Attachment';
import InfoIcon from '@material-ui/icons/Info';
import PayIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
// Other Modules
import NotesView from '../Widgets/Notes';
import NoticeView from '../Widgets/Notices';
import AttachmentView from '../Widgets/Files';

export default function Company() {
    const { id } = useParams();
    const history = useHistory();
    const config = [
        { field: 'name', title: 'Company Name', isGrid: true, type: 'text' },
        { field: 'dotnumber', title: 'DOT Number', isGrid: true, type: 'text' },
        { field: 'phone', title: 'Phone', isGrid: true, type: 'text' },
        { field: 'email', title: 'Email', isGrid: true, type: 'text' },
        { field: 'vendorCode', title: 'Vendor Code', isGrid: true, type: 'text' },
        { field: 'billingProfile', title: 'Billing Profile', isGrid: true, type: 'text' },
        { field: 'isTenant', title: 'Lease Holder', isGrid: true, type: 'checkbox' },
    ]

    const actions = [
        { icon: ArrowIcon, onClick: (evt, rowData) => history.push('company/' + rowData.id) }
    ]

    const url = process.env.REACT_APP_API_URL + '/company';

    if (id)
        return <CompanyDetails />
    return <CRUDView title='Company Information' url={url} allowAdd={false} allowDelete={false} allowEdit={false} actions={actions} columns={config} />

}

function CompanyDetails() {
    const [details, setDetails] = useState(null);
    const [access, setAccess] = useState([]);
    const { id } = useParams();
    const role = authenticationService.getRole();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        GetCompany(id).then(response => {
            if (response.data != null)
                GetPermissions(3, response.data.status, role).then(resp => {
                    if (Array.isArray(resp.data)) {
                        setDetails(response.data);
                        setAccess(resp.data);
                    }
                })
        })
    }, [id, role, refresh])

    const handleStatus = () => {
        setRefresh()
    }

    const actions = [
        { name: 'Details', icon: <DescriptionIcon />, module: 1, component: <Details onRefresh={() => setRefresh(!refresh)} /> },
        { name: 'Profile', icon: <InfoIcon />, module: 2, component: <Profile onRefresh={() => setRefresh(!refresh)} /> },
        { name: 'Address', icon: <MailIcon />, module: 3, component: <Address /> },
        { name: 'Users', icon: <PeopleIcon />, module: 4, component: <Users /> },
        { name: 'Invoice Cycles', icon: <PayIcon />, module: 5, component: <Invoices /> },
        { name: 'Notes', icon: <CommentIcon />, module: 6, component: <NotesView module={3} entityId={id} /> },
        { name: 'Notices', icon: <NotesIcon />, module: 7, component: <NoticeView module={3} entityId={id} /> },
        { name: 'Attachments', icon: <AttachmentIcon />, module: 8, component: <AttachmentView module={3} entityId={id} /> },
    ]
    /*Need to Change templates below. Make it One*/
    return <React.Fragment>
        <SpeedTemplate link='#company' entityId={id} entity={details} access={access} actions={actions} />
        <StatusTemplate settings={access} handleClick={handleStatus}>
            <ModuleTemplate entity={details} settings={access} module={1} component={<Details onRefresh={() => setRefresh(!refresh)} />} />
            <ModuleTemplate entity={details} settings={access} module={2} component={<Profile onRefresh={() => setRefresh(!refresh)} />} />
            <ModuleTemplate entity={details} settings={access} module={3} component={<Address />} />
            <ModuleTemplate entity={details} settings={access} module={4} component={<Users />} />
            <ModuleTemplate entity={details} settings={access} module={5} component={<Invoices />} />
            <ModuleTemplate entity={details} settings={access} module={6} component={<NotesView module={3} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={7} component={<NoticeView module={3} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={8} component={<AttachmentView module={3} entityId={id} />} />
        </StatusTemplate>
    </React.Fragment>
}