import { useTheme } from "./ThemeContext";

function NoteItem({ note, onDelete }) {
  const { theme } = useTheme();

  return (
    <div className={`note-item ${theme}`}>
      <p>{note.text}</p>

      <button
        className="delete-button"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;