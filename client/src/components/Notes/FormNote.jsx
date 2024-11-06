import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import notesService from '../../services/notes.service';

const FormNote = () => {
  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState();
  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    setContent(location.state?.content);
    setNoteId(location.state?.noteId);
  }, [location]);

  const handleSaveNote = (content) => {
    if (!content) {
      alert('Note can not be empty!');
    } else {
      notesService.createUserNote(content).then((response) => {
        alert(response.data);
        history.goBack();
      });
    }
  };
  const handleUpdateNote = (content, noteId) => {
    if (!content) {
      alert('Note can not be empty!');
    } else {
      notesService.updateUserNoteById({ noteId, content }).then((response) => {
        alert(response.data);
        history.goBack();
      });
    }
  };
  return (
    <div>
      <h3 className=''>
        {!noteId ? <strong>New </strong> : <strong>Update </strong>}
        Note
      </h3>

      <div className='app-main'>
        <div className='app-main-note-edit'>
          {!noteId ? (
            <button onClick={() => handleSaveNote(content)}>Create</button>
          ) : (
            <button onClick={() => handleUpdateNote(content, noteId)}>
              Update
            </button>
          )}

          <textarea
            id='body'
            placeholder='Write your note here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />
        </div>
        <div className='app-main-note-preview'>
          <ReactMarkdown className='markdown-preview'>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
export default FormNote;
