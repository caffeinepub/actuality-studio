import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useSaveCallerUserProfile } from "../hooks/useQueries";

export default function ProfileSetupModal() {
  const [name, setName] = useState("");
  const saveProfile = useSaveCallerUserProfile();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveProfile.mutateAsync({ name: name.trim() });
  };

  return (
    <Dialog open={true}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-sm sm:max-w-md mx-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl sm:text-2xl text-foreground">
            Welcome to Actuality Studio
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-foreground/60">
            Tell us your name to complete your profile setup.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div className="flex items-center gap-3 bg-primary/5 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="profile-name"
                className="block text-xs font-body font-semibold text-foreground/60 mb-1 uppercase tracking-wide"
              >
                Your Name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="
                  w-full px-3 py-2 text-sm font-body
                  bg-background border border-border/40 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary/30
                  placeholder:text-foreground/30
                "
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="
              w-full flex items-center justify-center gap-2
              px-6 py-3.5
              bg-primary text-primary-foreground
              font-body font-semibold text-base rounded-full
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-lg active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
