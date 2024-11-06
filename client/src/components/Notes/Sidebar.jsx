const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return (
    <div className='app-sidebar'>
      <div className='app-sidebar-header'>
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className='app-sidebar-notes'>
        {sortedNotes.map(({ id, title, content, updatedAt }, i) => (
          <div
            key={id}
            className={`app-sidebar-note ${id === activeNote && 'active'}`}
            onClick={() => setActiveNote(id)}
          >
            <div className='sidebar-note-title'>
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>

            <p>{content && content.substr(0, 100) + '...'}</p>
            <small className='note-meta'>
              Last modified{' '}
              {new Date(updatedAt).toLocaleDateString('pl-PL', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
