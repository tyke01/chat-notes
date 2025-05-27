"use client";

import { createContext, useState } from "react";

interface NoteProviderContextProps {
  noteText: string;
  setNoteText: (noteText: string) => void;
}

export const NoteProviderContext = createContext<
  NoteProviderContextProps | undefined
>({noteText: "", setNoteText: () => {}});

function NoteProvider({children}: {children: React.ReactNode}) {
  const [noteText, setNoteText] = useState("");

  const value = {
    noteText,
    setNoteText,
  };

  return (
    <NoteProviderContext.Provider value={value}>
      {children}
    </NoteProviderContext.Provider>
  );

}
export default NoteProvider;