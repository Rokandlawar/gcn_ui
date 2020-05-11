import Axios from './base';

export const GetAll = () => Axios().get('Application')

export const GetApplication = (id) => Axios('Application Loaded.').get('Application/' + id)

export const GetOptions = () => {
    return Axios().get('Application/Options')
}

export const AddRecord = (entity) => {
    return Axios().post('Application', entity)
}

export const GetTerms = (id) => {
    return Axios().get('Application/Terms/' + id)
}

export const GetVehicles = (id) => Axios().get('Vehicle/' + id)

export const ValidateVehicle = (id) => {
    return Axios().get('Vehicle/Validate/' + id)
}

export const GetAttachmentTypes = (id) => {
    return Axios().get('Attachment/Applications/' + id)
}

export const GetAttachments = (id, type) => {
    return Axios().get('Attachment/Applications/' + id + '/' + type)
}

export const ValidateAttachments = (id) => {
    return Axios().get('Attachment/Applications/Validate/' + id)
}

export const GetUploadURL = (entity) => Axios().post('Attachment/Upload', entity)

export const GetDownloadURL = (id) => Axios().get('Attachment/Download/' + id)

export const AddAttachment = (entity) => Axios().post('Attachment', entity)

export const DeleteAttachment = (id) => Axios().delete('Attachment/' + id)

export const ValidatePayment = (id) => Axios().get('Payment/Validate/1' + id)

export const GetPrices = (id) => Axios().get('Application/Prices/' + id)

export const GetInvoice = (id) => Axios().get('Statement/Information/Application/' + id); 