import { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'HTML & CSS Basics',
      content: 'HTML provides the structure of web pages, while CSS handles the styling and responsive layout.'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      content: 'JavaScript adds interactivity, handles DOM events, and communicates with servers.'
    },
    {
      id: 3,
      title: 'React.js Components & State',
      content: 'React allows building user interfaces using reusable components and managing short-term memory with useState.'
    },
    {
      id: 4,
      title: 'CRUD Operations in React',
      content: 'Create: Add new note\nRead: Display notes list\nUpdate: Edit existing note\nDelete: Remove note'
    },
    {
      id: 5,
      title: 'Single-Page Application (SPA)',
      content: 'SPAs load once and dynamically rewrite the current page rather than loading entire new pages from a server.'
    },
    {
      id: 6,
      title: 'Exam Preparation Checklist',
      content: 'Review React hooks, practice CRUD implementation, and test locked navbar/sidebar layout.'
    }
  ]);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [activeOption, setActiveOption] = useState('All Notes');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || content === '') return;

    if (editId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, title: title, content: content } : note
        )
      );
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title,
        content: content,
      };
      setNotes([...notes, newNote]);
    }
    setTitle('');
    setContent('');
  };

  const handleDelete = (idToRemove) => {
    setNotes(notes.filter((note) => note.id !== idToRemove));
    if (editId === idToRemove) {
      setEditId(null);
      setTitle('');
      setContent('');
    }
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div>
      <div className="navbar">
        <h2>My Notes App</h2>
      </div>

      <div className="sidebar">
        <h3>Sidebar</h3>
        <ul className="sidebar-options">
          <li
            className={activeOption === 'All Notes' ? 'active' : ''}
            onClick={() => setActiveOption('All Notes')}
          >
             All Notes ({notes.length})
          </li>
          <li
            className={activeOption === 'Study' ? 'active' : ''}
            onClick={() => setActiveOption('Study')}
          >
             Study Notes
          </li>
          <li
            className={activeOption === 'Work' ? 'active' : ''}
            onClick={() => setActiveOption('Work')}
          >
             Work
          </li>
          <li
            className={activeOption === 'Favorites' ? 'active' : ''}
            onClick={() => setActiveOption('Favorites')}
          >
             Favorites
          </li>
          <li
            className={activeOption === 'Trash' ? 'active' : ''}
            onClick={() => setActiveOption('Trash')}
          >
             Trash
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="content-inner">
          <form onSubmit={handleSubmit} className="note-form">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
            />
            <button type="submit">
              {editId !== null ? 'Update Note' : 'Add Note'}
            </button>
          </form>

          <div className="notes-list">
            {notes.length === 0 ? (
              <p>No notes yet. Add one above!</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="note-card">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button onClick={() => handleEdit(note)}>Edit</button>
                  <button onClick={() => handleDelete(note.id)}>Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
