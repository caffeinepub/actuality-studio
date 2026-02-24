import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, MembershipState } from '../backend';

// ── User Profile ──────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ── Membership ────────────────────────────────────────────────────────────

export function useGetCallerMembershipState() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MembershipState | null>({
    queryKey: ['callerMembership'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCallerMembershipState();
      } catch {
        // Backend traps if no membership found — treat as null
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useCreateTrialMembership() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.createTrialMembership();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerMembership'] });
    },
  });
}

export function useMintMembership() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.mintMembership();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerMembership'] });
    },
  });
}
