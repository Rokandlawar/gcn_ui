import Axios from './base';

export const GetCompany = (id) => Axios().get('Company/' + id)

export const GetCycles = () => Axios().get('InvoiceCycle/Options')

export const GetSkus = () => Axios().get('Manifest/Options')

export const GetRoles = () => Axios().get('Customer/Options')

export const GenerateInvoice = (company, invoice) => Axios().get('Statement/Information/' + company + '/' + invoice)

export const Register = (entity) => Axios().post('Company/Register', entity)

export const ValidateProfile = (id) => Axios().get('Company/Validate/' + id)

export const UpdateStatus = (id, status) => Axios().get('Company/Status/' + id + '/' + status)

export const UpdateInfomation = (id, entity) => Axios().post('Company/Information/' + id, entity)

export const UpdateProfile = (id, entity) => Axios().post('Company/Profile/' + id, entity)