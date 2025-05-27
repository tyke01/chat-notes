"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {v4 as uuidv4} from "uuid";
import { useToast } from "@/hooks/use-toast";
import { createNoteAction } from "@/actions/notes";

interface NewNoteButtonProps {
  user: User | null;
}

const NewNoteButton = ({ user }: NewNoteButtonProps) => {
  
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {toast} = useToast();

  const handleClockNewNoteButton = async () => {
    if(!user) {
      router.push("/login");
    } else{
      setLoading(true);

      const uuid = uuidv4();

      await createNoteAction(uuid);

      router.push(`/?noteId=${uuid}`);

      toast({
        title: "New Note Created",
        description: "You have created a new note.",
        variant: "success",
      })

      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClockNewNoteButton}
      variant={"secondary"}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
};

export default NewNoteButton;
