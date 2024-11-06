import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_SERVER_URL + '/api/v1/card';

const getBusinessCard = (slug) => {
  return axios.get(API_URL+`/${slug}`, { headers: authHeader() });
};
const createBusinessCard = (formData) => {
  return axios.post(API_URL, { name: formData.name, company: formData.company, phone: formData.phone, email: formData.email, vcardAddress: formData.vcardAddress }, { headers: authHeader() });
};
const saveClientContactInfo = ({phone, name, email, company, date, topic}) => {
  return axios.put(API_URL, { phone, name, email, company, date, topic },);
};
const updateUserNoteById = ({noteId, content}) => {
  return axios.put(API_URL, { noteId: noteId, content: content }, { headers: authHeader() });
};
const deleteUserNoteById = (noteId) => {
  return axios.delete(API_URL, { headers: authHeader(), data: { noteId: noteId } });
};
export default {
  getBusinessCard,
  createBusinessCard,
  saveClientContactInfo,
  deleteUserNoteById,
  updateUserNoteById,
};

