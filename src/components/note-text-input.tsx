"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/use-note";
import { updateNoteAction } from "@/actions/notes";

interface NoteTextInputProps {
  noteId: string;
  startingNoteText: string;
}

const NoteTextInput = ({ noteId, startingNoteText }: NoteTextInputProps) => {

    let updateTimeout: NodeJS.Timeout

  const noteIdParam = useSearchParams().get("noteId") || "";

  const { noteText, setNoteText} = useNote();

  useEffect(() => {
    if (noteIdParam == noteId) {
      setNoteText(startingNoteText);
    }
  },[startingNoteText, noteIdParam, noteId, setNoteText]);


  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text) 

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text)

    }, debounceTimeout);


  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type Your Notes Here"
      className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
};

export default NoteTextInput;
