import Axios from './base';

export const GetCompany = (id) => Axios().get('Company/' + id)

export const GetCycles = () => Axios().get('InvoiceCycle/Options')

export const GetSkus = () => Axios().get('Manifest/Options')

export const GetRoles = () => Axios().get('Customer/Options')

export const GenerateInvoice = (company, invoice) => Axios().get('Statement/Information/' + company + '/' + invoice)

export const Register = (entity) => Axios().post('Company/Register', entity)