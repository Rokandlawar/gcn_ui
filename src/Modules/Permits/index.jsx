import React, { useEffect, useState } from 'react';
import ArrowIcon from '@material-ui/icons/ArrowRightOutlined';
import { GetPermit } from '../../REST/permits';
import { GetPermissions } from '../../REST/security';
import { useParams, useHistory } from 'react-router-dom';
import { authenticationService } from '../../components/authorization';
import ModuleTemplate from '../../components/templates/module';
import StatusTemplate from '../../components/templates/status';
import CRUDView from '../../components/crud';
// Other Modules
import NotesView from '../Widgets/Notes';
import NoticeView from '../Widgets/Notices';


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
    }, [id, role])

    const handleStatus = () => {

    }

    return <React.Fragment>
        <StatusTemplate settings={access} handleClick={handleStatus}>
            <ModuleTemplate entity={details} settings={access} module={5} component={<NotesView module={2} entityId={id} />} />
            <ModuleTemplate entity={details} settings={access} module={4} component={<NoticeView module={2} entityId={id} />} />
        </StatusTemplate>

    </React.Fragment>
}

