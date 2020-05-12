import Axios from './base';

export const GetNotice = (id) => Axios().get('Notice/' + id)

export const AddNotice = (entity) => Axios().post('Notice', entity)

export const UpdateNotice = (entity) => Axios().put('Notice', entity)

export const GetNoticeOptions = () => Axios().get('Notice/Options')

export const GetNoticeData = (module, id) => Axios().get('Notice/Values/' + module + '/' + id)

export const GetContent = (id) => Axios().get('Content/' + id);
export const AddContent = (entity) => Axios().post('Content', entity);
export const UpdateContent = (entity) => Axios().put('Content', entity);
export const GetContentOptions = () => Axios().get('Content/Options');