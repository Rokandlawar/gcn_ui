import Axios from './base';

export const GetEvent = (id) => Axios().get('CameraEvent/' + id);

export const AddEvent = (entity) => Axios().post('CameraEvent', entity);

export const UpdateEvent = (entity) => Axios().put('CameraEvent', entity);

export const GetOptions = () => Axios().get('CameraEvent/Options');

export const AddCompany = (entity) => Axios().post('CameraEvent/Company', entity);

export const CreateInvoice = (id, type) => Axios().get('CameraEvent/Invoice/' + id + '/' + type);

export const SearchEvents = (entity) => Axios().post('CameraEvent/Search', entity);