"use client"

import { User } from "@supabase/supabase-js"


interface AskAiButtonProps {
  user: User | null

}

const AskAiButton = ({user}: AskAiButtonProps) => {
    console.log("AskAiButton rendered for user:", user?.email);
  return (
    <div>
      Ask AI Button
    </div>
  )
}

export default AskAiButton
