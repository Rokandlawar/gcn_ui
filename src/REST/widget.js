import Axios from './base';

export const GetUploadURL = (entity) => Axios().post('Files/Upload', entity)

export const GetDownloadURL = (id) => Axios().get('Files/Download/' + id)

export const AddAttachment = (entity, module, entityId) => Axios().post('Files/' + module + '/' + entityId, entity)

export const DeleteAttachment = (id) => Axios().delete('Files/' + id)

export const GetAttachments = (module, entityId) => Axios().get('Files/' + module + '/' + entityId) 