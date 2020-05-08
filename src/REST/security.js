import Axios from './base';

export const GetModules = (status) => {
    return Axios().get('Module/Status/' + status)
}

export const GetGroups = (status) => {
    return Axios().get('Permission/Groups/' + status)
}

export const GetAccess = (status, group) => {
    return Axios().get('Permission/' + status + '/' + group)
}

export const UpdateAccess = (status, group, list) => {
    return Axios().post('Permission/' + status + '/' + group, list)
}

export const DeleteAccess = (status, group) => {
    return Axios().delete('Permission/' + status + '/' + group)
}

export const GetOptions = (status) => {
    return Axios().get('PossibleStatus/Options/' + status)
}

export const GetRoles = () => Axios().get('RoleType')

export const GetPermissions = (module, status, role) => Axios().get('Permission/Access/' + module + '/' + status + '/' + role)