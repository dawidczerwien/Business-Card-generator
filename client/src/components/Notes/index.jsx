import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router';
import Sidebar from './Sidebar';
import UserService from '../../services/notes.service';
import notesService from '../../services/notes.service';

const Notes = () => {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    UserService.getUserNotes().then((response) => {
      setNotes(response.data);
    });
  }, []);

  const onAddNote = () => {
    history.push('/add-note');
  };

  const onEditNote = () => {
    history.push('/add-note', {
      noteId: activeNote,
      content: notes.find((note) => note.id === activeNote)?.content,
    });
  };

  const onDeleteNote = (noteId) => {
    notesService.deleteUserNoteById(noteId).then((response) => {
      UserService.getUserNotes().then((response) => {
        setNotes(response.data);
      });
    });
  };

  return (
    <div className='App'>
      <Sidebar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <div className='app-preview-wrapper'>
        {activeNote && <button onClick={onEditNote}>Edit</button>}
        <ReactMarkdown className='markdown-preview'>
          {notes.find((note) => note.id === activeNote)?.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
export default Notes;
