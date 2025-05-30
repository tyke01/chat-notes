"use client";

import useNote from "@/hooks/use-note";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SelectNoteButtonProps {
  note: Note;
}

const SelectNoteButton = ({ note }: SelectNoteButtonProps) => {
  const noteId = useSearchParams().get("noteId") || "";

  const { noteText: selectedNoteText } = useNote();

  const [shouldBeGlobalNoteText, setShouldBeGlobalNoteText] = useState(false);

  const [localNoteText, setLocalNoteText] = useState(note.text);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldBeGlobalNoteText(true);
    } else {
      setShouldBeGlobalNoteText(false);
    }
  }, [noteId, note.text]);

  useEffect(() => {
    if (shouldBeGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [shouldBeGlobalNoteText, selectedNoteText]);

  const blankNotetext = "EMPTY NOTE";

  let notetext = localNoteText || blankNotetext;

  if (shouldBeGlobalNoteText) {
    notetext = selectedNoteText || blankNotetext;
  }

  return (
    <SidebarMenuButton
      asChild
      className={cn(
        "items-start gap-0 pr-12",
        note.id === noteId ? "bg-sidebar-accent/50" : "",
      )}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {notetext}
        </p>
        <p className="text-xs text-muted-foreground">{note.updatedAt.toLocaleDateString()}</p>
      </Link>
    </SidebarMenuButton>
  );
};

export default SelectNoteButton;
