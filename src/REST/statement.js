import Axios from './base';
import axios from 'axios';

export const GetInvoice = (id) => Axios().get('Statement/' + id);

export const GetComment = (id) => Axios().get('Statement/' + id + '/Comments');

export const UpdateComment = (id, comment) => Axios().post('Statement/' + id + '/Comments', comment);

export const PayInvoice = (entity) => Axios().post('Statement/Information/Token', entity);

export const GetItems = (id, type) => Axios().get('Statement/' + id + '/Items/' + type);

export const GetAllItems = (id) => Axios().get('Statement/' + id + '/Items');

export const DeleteItems = (id, list) => Axios().post('Statement/Delete/' + id + '/Items', list);

export const UpdateSku = (id, entity) => Axios().put('CompanySku/' + id, entity);

export const GetInfomation = (id) => Axios().get('Statement/SAML/Token/' + id);

export const GetSAML = (entity) => axios.post(process.env.REACT_APP_PAYMENT_URL, entity);

//export const GetSAML = (entity) => Axios().post('Statement/SAML/Token', entity);

export const RecordPayment = (entity) => Axios().post('Receipt/', entity);

export const GetEventsInvoice = (entity) => Axios().post('Statement/Information/Events', entity); 