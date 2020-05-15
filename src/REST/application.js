import Axios from './base';

export const GetAll = () => Axios().get('Application')

export const GetApplication = (id) => Axios('Application Loaded.').get('Application/' + id)

export const GetOptions = () => Axios().get('Application/Options')

export const AddRecord = (entity) => Axios().post('Application', entity)

export const GetTerms = (id) => Axios().get('Application/Terms/' + id)

export const UpdateInsurance = (entity, id) => Axios().post('Application/Insurance/' + id, entity)

// Vehicles
export const GetVehicles = (id) => Axios().get('Vehicle/' + id)

export const GetVehicle = (application, id) => Axios().get('Vehicle/' + application + '/' + id)

export const ValidateVehicle = (id) => Axios().get('Vehicle/Validate/' + id)

// Attachments 
export const GetAttachmentTypes = (id) => Axios().get('Attachment/Applications/' + id)

export const GetAttachments = (id, type) => Axios().get('Attachment/Applications/' + id + '/' + type)

export const ValidateAttachments = (id) => Axios().get('Attachment/Applications/Validate/' + id)

export const GetUploadURL = (entity) => Axios().post('Attachment/Upload', entity)

export const GetDownloadURL = (id) => Axios().get('Attachment/Download/' + id)

export const AddAttachment = (entity) => Axios().post('Attachment', entity)

export const DeleteAttachment = (id) => Axios().delete('Attachment/' + id)

// Payment and Status
export const ValidatePayment = (id) => Axios().get('Payment/Validate/1' + id)

export const GetPrices = (id) => Axios().get('Application/Prices/' + id)

export const UpdateStatus = (id, status) => Axios().get('Application/Status/' + id + '/' + status)

export const GetInvoice = (id) => Axios().get('Statement/Information/Application/' + id); 