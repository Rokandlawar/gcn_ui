import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faBuilding, faFileInvoiceDollar, faCalendarAlt, faInfo, faPhoneAlt, faChartBar, faUserLock, faSignInAlt, faUserAlt, faDollarSign, faFileWord, faCode, faList, faLockOpen, faUserCircle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { faWpforms } from '@fortawesome/free-brands-svg-icons';
import { authenticationService } from '../../components/authorization';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    parent: {
        cursor: 'pointer',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.1)'
        }
    },
}));

export default function Dashboard() {
    if (authenticationService.user()) {
        return <Template list={home} title='Dashboard' />
    }
    return <div className='row bg-fill h-100' style={{ backgroundImage: 'url("https://www.nps.gov/common/uploads/banner_image/imr/homepage/99556161-1DD8-B71B-0B896E4D786C6B47.jpg")' }}>
        <div className='col-12 my-auto'>
            <Template list={init} />
        </div>
    </div>
}

export function AdminDashboard() {
    if (authenticationService.user()) {
        return <Template list={admin} title='Administration' />
    }
    return <p>Not Authorized</p>
}

export function SecurityDashboard() {
    if (authenticationService.user()) {
        return <Template list={security} title='Security' />
    }
    return <p>Not Authorized</p>
}



export function Template({ list = [], title }) {
    const classes = useStyles();
    const history = useHistory();
    const handleLink = link => (evt) => {
        console.log(link)
        history.push(link)
    }

    return <React.Fragment>
        {title && <h5 className='text-center p-3'>{title}</h5>}
        <div className='row'>
            {list.filter(e => !e.isSecure ? true : authenticationService.isAdmin()).map((e, i) => {
                return <div onClick={handleLink(e.href)} key={i} className={clsx(classes.parent, 'text-center', 'col-sm-6', 'col-md-3', 'col-xs-12', 'mt-3')}>
                    <div className='bg-white p-3 rounded'>
                        <FontAwesomeIcon icon={e.icon} size='4x' />
                        <h5 className='p-3'>{e.title}</h5>
                    </div>
                </div>
            })}
        </div>
    </React.Fragment>
}

const home = [
    { icon: faWpforms, title: 'Applications', isSecure: false, href: '/applications' },
    { icon: faBus, title: 'Permits', isSecure: false, href: '/permits' },
    { icon: faBuilding, title: 'Company Details', isSecure: false, href: '/company' },
    { icon: faFileInvoiceDollar, title: 'Invoices', isSecure: false, href: '/invoices' },
    { icon: faCalendarAlt, title: 'Events', isSecure: false, href: '/events' },
    { icon: faInfo, title: 'Help', isSecure: false, href: '/help' },
    { icon: faPhoneAlt, title: 'Contact Support', isSecure: false, href: 'https://apps.azdot.gov/contact_adot/' },
    { icon: faChartBar, title: 'Reports', isSecure: true, href: '/reports' },
    { icon: faUserLock, title: 'Administration', isSecure: true, href: '/admin' },
    { icon: faShieldAlt, title: 'Security', isSecure: true, href: '/security' }
]

const admin = [
    { icon: faFileWord, title: 'Notices', isSecure: true, href: '/admin/notices' },
    { icon: faCode, title: 'Content Messages', isSecure: true, href: '/admin/content' },
]

const security = [
    { icon: faLockOpen, title: 'Permissions', isSecure: true, href: '/security/permissions' },
    { icon: faList, title: 'Modules', isSecure: true, href: '/security/modules' },
    { icon: faUserCircle, title: 'Role Types', isSecure: true, href: '/security/roles' },
]

const init = [
    { icon: faSignInAlt, title: 'Account Login', isSecure: false, href: '/login' },
    { icon: faWpforms, title: 'Apply For Permit', isSecure: false, href: '/applications' },
    { icon: faUserAlt, title: 'Sign Up For Account', isSecure: false, href: '/signup' },
    { icon: faDollarSign, title: 'Pay Airport Use Feee', isSecure: false, href: '/search' },
]