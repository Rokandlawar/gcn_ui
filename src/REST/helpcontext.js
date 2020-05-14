import Axios from './base';

// Articles
export const GetArticles = (id) => Axios().get('Article/' + id)
export const OrderArticles = (dir, id) => Axios().get('Article/Order/' + dir + '/' + id)

// Stories
export const GetStories = (id) => Axios().get('Story/' + id)
export const OrderStories = (dir, id) => Axios().get('Story/Order/' + dir + '/' + id)

// Topics
export const GetTopics = () => Axios().get('Topic')
export const GetTopicById = (id) => Axios().get('Topic/' + id)
export const AddTopic = (entity) => Axios().post('Topic', entity);
export const UpdateTopic = (entity) => Axios().put('Topic', entity);
export const DeleteTopic = (id) => Axios().delete('Topic/' + id);
export const OrderTopics = (dir, id) => Axios().get('Topic/Order/' + dir + '/' + id)
