import { useState, useEffect } from "react";
import { ref, get, set, push, remove } from "firebase/database";
import { db } from "../../firebaseConfig";
import Button from "@mui/material/Button";
import { manipulateDateAndTime } from "../utils/utils";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  content: string;
  timestamp: number;
}

interface LegislationNotesProps {
  legislationId: string;
  userUID: string | null;
}

function LegislationNotes({ legislationId, userUID }: LegislationNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()


  useEffect(() => {

    const fetchNotes = async () => {
      const notesRef = ref(
        db,
        `users/${userUID}/savedLegislations/${legislationId}/notes`
      );
      const snapshot = await get(notesRef);
      if (snapshot.exists()) {
        const fetchedNotes = Object.entries(snapshot.val()).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );
        setNotes(fetchedNotes);
      }
    };

    fetchNotes();
  }, [userUID, legislationId]);

  const handleAddNote = async () => {

    if (!userUID){
        alert("You must be logged in to add notes.");
        return navigate("/signin")
  }

    if (!newNote.trim()) return;

    const notesRef = ref(
      db,
      `users/${userUID}/savedLegislations/${legislationId}/notes`
    );

    try {
      const newNoteRef = push(notesRef);
      await set(newNoteRef, {
        content: newNote,
        timestamp: Date.now(),
      });

      setNotes((prevNotes) => [
        ...prevNotes,
        { id: newNoteRef.key || "", content: newNote, timestamp: Date.now() },
      ]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }
  };

  const handleDeleteNote = async (noteID: string) => {
    const noteRef = ref(
      db,
      `users/${userUID}/savedLegislations/${legislationId}/notes/${noteID}`
    );

    try {
      await remove(noteRef);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteID));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Notes</h3>
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <Button
          variant="contained"
          className="mt-2"
          onClick={handleAddNote}
          disabled={!newNote.trim()}
        >
          Add Note
        </Button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <p className="text-gray-600">{note.content}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{manipulateDateAndTime(note.timestamp)}</span>
              <Button
                variant="text"
                color="error"
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LegislationNotes;
