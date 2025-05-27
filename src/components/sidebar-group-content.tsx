"use client"

import { Note } from "@prisma/client";


interface SidebarGroupContentProps {
    notes: Note[];
}

const SidebarGroupContent = ({notes}: SidebarGroupContentProps) => {
    console.log("SidebarGroupContent", notes);
  return (
    <div>
      Your Notes here
    </div>
  )
}

export default SidebarGroupContent
