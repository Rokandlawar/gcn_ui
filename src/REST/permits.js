import Axios from './base';

export const GetPermit = (id) => Axios('Permit Loaded.').get('Permit/' + id)

export const UpdateStatus = (id, status) => Axios().get('Permit/Status/' + id + '/' + status)

export const UpdateInsurance = (entity, id) => Axios().post('Permit/Insurance/' + id, entity)