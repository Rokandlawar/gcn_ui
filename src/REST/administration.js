import Axios from './base';

export const GetNotice = (id) => Axios().get('Notice/' + id)

export const AddNotice = (entity) => Axios().post('Notice', entity)

export const UpdateNotice = (entity) => Axios().put('Notice', entity)

export const GetNoticeOptions = () => Axios().get('Notice/Options')

export const GetNoticeData = (module, id) => Axios().get('Notice/Values/' + module + '/' + id) 