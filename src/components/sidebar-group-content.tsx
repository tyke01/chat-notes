"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadcn,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./select-note-button";
import DeleteNoteButton from "./delete-note-button";

interface SidebarGroupContentProps {
  notes: Note[];
}

const SidebarGroupContent = ({ notes }: SidebarGroupContentProps) => {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

    const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))};

  return (
    <SidebarGroupContentShadcn>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search Your notes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">{
        filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">

              <SelectNoteButton note={note}/>

              <DeleteNoteButton noteId={note.id} deleteNoteLocally={deleteNoteLocally} />

          </SidebarMenuItem>
        ))
        }</SidebarMenu>
    </SidebarGroupContentShadcn>
  );
};

export default SidebarGroupContent;
