import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import ThemeToggle from "./ThemeToggle";
import "./index.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch {
      return [];
    }
  });

  const [noteText, setNoteText] = useState("");

  // Save notes whenever the notes array changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Update the browser tab title when the count changes
  useEffect(() => {
    document.title = `Notes (${notes.length})`;
  }, [notes.length]);

  function addNote() {
    const text = noteText.trim();

    if (!text) {
      return;
    }

    const newNote = {
      id: crypto.randomUUID(),
      text: text,
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);
    setNoteText("");
  }

  function deleteNote(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      addNote();
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>My Notes</h1>
        <ThemeToggle />
      </header>

      <section className="add-note">
        <input
          type="text"
          placeholder="Write a note..."
          value={noteText}
          onChange={(event) => setNoteText(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="add-button" onClick={addNote}>
          Add Note
        </button>
      </section>

      <section className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-message">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={deleteNote}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;