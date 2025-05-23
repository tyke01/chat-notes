"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    // Simulate a logout process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Here you would typically call your logout function
    const errMessage = null;
    if (!errMessage) {
      toast.toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
        variant: "success",
      });
      router.push("/");
    } else {
      toast.toast({
        title: "Error",
        description: errMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Button
      variant={"outline"}
      onClick={handleLogout}
      disabled={loading}
      className="w-24"
    >
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};

export default LogOutButton;
