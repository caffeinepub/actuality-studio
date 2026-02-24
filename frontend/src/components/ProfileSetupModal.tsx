import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Loader2, User } from 'lucide-react';

interface ProfileSetupModalProps {
  open: boolean;
}

export default function ProfileSetupModal({ open }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveProfile.mutate({ name: name.trim() });
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="bg-cream border border-cream-300 rounded-xl max-w-md shadow-warm-lg"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-terracotta/10 border border-terracotta/30 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-terracotta" />
            </div>
            <DialogTitle className="font-heading text-xl font-bold text-forest">
              Welcome to Actuality Studio
            </DialogTitle>
          </div>
          <DialogDescription className="text-forest/60 text-sm leading-relaxed">
            You're logged in for the first time. Please enter your name to set up your profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-sans uppercase tracking-wider text-forest/60 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-cream-50 border border-cream-300 rounded-lg px-4 py-3 text-forest placeholder:text-forest/40 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-colors font-sans"
              autoFocus
              maxLength={50}
            />
          </div>

          {saveProfile.error && (
            <p className="text-destructive text-xs">
              {(saveProfile.error as Error).message || 'Failed to save profile. Please try again.'}
            </p>
          )}

          <button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="btn-primary-warm w-full flex items-center justify-center gap-2 py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Continue to Studio'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
