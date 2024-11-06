import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_SERVER_URL + '/api/v1/note/';

const getUserNotes = () => {
  return axios.get(API_URL, { headers: authHeader() });
};
const createUserNote = (content) => {
  return axios.post(API_URL, { content: content }, { headers: authHeader() });
};
const updateUserNoteById = ({noteId, content}) => {
  return axios.put(API_URL, { noteId: noteId, content: content }, { headers: authHeader() });
};
const deleteUserNoteById = (noteId) => {
  return axios.delete(API_URL, { headers: authHeader(), data: { noteId: noteId } });
};
export default {
  getUserNotes,
  createUserNote,
  deleteUserNoteById,
  updateUserNoteById,
};

