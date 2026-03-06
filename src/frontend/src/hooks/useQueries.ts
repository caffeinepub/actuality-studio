import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Cohort,
  CohortMember,
  MembershipState,
  UserProfile,
} from "../backend";
import { MemberCategory } from "../backend";
import { useActor } from "./useActor";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
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
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetCallerMembershipState() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<MembershipState | null>({
    queryKey: ["callerMembershipState"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCallerMembershipState();
      } catch {
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
      if (!actor) throw new Error("Actor not available");
      // Direct on-chain mint — caller becomes owner, no custodian
      return actor.createTrialMembership();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerMembershipState"] });
    },
  });
}

export function useMintBadge() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      // Direct on-chain mint — caller becomes owner, no custodian
      return actor.mintBadge();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerMembershipState"] });
    },
  });
}

export function useCreateCohort() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (members: CohortMember[]) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createCohort(members);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerCohort"] });
    },
  });
}

export function useGetCohort() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Cohort | null>({
    queryKey: ["callerCohort"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCohort();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export interface TrialStatus {
  isTrial: boolean;
  isExpired: boolean;
  isWarning: boolean;
  daysRemaining: number;
  hoursRemaining: number;
  trialEndsAt: Date | null;
  memberCategory: MemberCategory | null;
  badgeMinted: boolean;
}

export function useTrialStatus(): TrialStatus {
  const { data: membership } = useGetCallerMembershipState();

  if (!membership) {
    return {
      isTrial: false,
      isExpired: false,
      isWarning: false,
      daysRemaining: 0,
      hoursRemaining: 0,
      trialEndsAt: null,
      memberCategory: null,
      badgeMinted: false,
    };
  }

  const isTrial = membership.category === MemberCategory.trial;
  const trialEndsAt = membership.trialEndsAt
    ? new Date(Number(membership.trialEndsAt) / 1_000_000)
    : null;

  const now = Date.now();
  const msRemaining = trialEndsAt ? trialEndsAt.getTime() - now : 0;
  const daysRemaining = Math.max(
    0,
    Math.floor(msRemaining / (1000 * 60 * 60 * 24)),
  );
  const hoursRemaining = Math.max(
    0,
    Math.floor(msRemaining / (1000 * 60 * 60)),
  );
  const isExpired =
    isTrial && trialEndsAt !== null && trialEndsAt.getTime() < now;
  const isWarning = isTrial && !isExpired && daysRemaining <= 7;

  return {
    isTrial,
    isExpired,
    isWarning,
    daysRemaining,
    hoursRemaining,
    trialEndsAt,
    memberCategory: membership.category,
    badgeMinted: membership.badgeMinted,
  };
}

export interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  accessLevel: "free" | "preview" | "premium";
  imageUrl: string;
  tags: string[];
}

export function useCatalogEntries() {
  return useQuery<CatalogEntry[]>({
    queryKey: ["catalogEntries"],
    queryFn: async () => {
      return [
        {
          id: "1",
          title: "McKinley Loft — Unit A",
          description:
            "Open-plan loft conversion with original hardwood floors and exposed brick.",
          category: "Residential",
          accessLevel: "free",
          imageUrl: "/assets/generated/mckinley-interior-apt.dim_1200x800.png",
          tags: ["loft", "residential", "historic"],
        },
        {
          id: "2",
          title: "ADU Shell — Type A",
          description:
            "Modular accessory dwelling unit shell, 400 sq ft, single-story.",
          category: "ADU",
          accessLevel: "preview",
          imageUrl: "/assets/generated/adu-shell-type-a.dim_600x400.png",
          tags: ["adu", "modular", "shell"],
        },
        {
          id: "3",
          title: "ADU Shell — Type B",
          description:
            "Two-story ADU shell with rooftop terrace option, 650 sq ft.",
          category: "ADU",
          accessLevel: "preview",
          imageUrl: "/assets/generated/adu-shell-type-b.dim_600x400.png",
          tags: ["adu", "two-story", "terrace"],
        },
        {
          id: "4",
          title: "Sovereign Furniture Set — Compact",
          description:
            "Curated compact furniture collection for small-space living.",
          category: "Furniture",
          accessLevel: "premium",
          imageUrl: "/assets/generated/furniture-set-compact.dim_600x400.png",
          tags: ["furniture", "compact", "curated"],
        },
        {
          id: "5",
          title: "Sovereign Furniture Set — Full",
          description:
            "Complete sovereign furniture collection for full loft buildout.",
          category: "Furniture",
          accessLevel: "premium",
          imageUrl: "/assets/generated/furniture-set-sovereign.dim_600x400.png",
          tags: ["furniture", "full", "sovereign"],
        },
        {
          id: "6",
          title: "McKinley Staircase Detail",
          description:
            "Original 1902 cast-iron staircase restoration blueprints and specifications.",
          category: "Historic",
          accessLevel: "premium",
          imageUrl: "/assets/generated/mckinley-staircase.dim_1200x800.png",
          tags: ["historic", "staircase", "restoration"],
        },
      ];
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export interface BIMAsset {
  id: string;
  name: string;
  type: string;
  url: string;
}

export function useBIMAssets() {
  return useQuery<BIMAsset[]>({
    queryKey: ["bimAssets"],
    queryFn: async () => {
      return [
        { id: "1", name: "McKinley Floor Plan", type: "floorplan", url: "#" },
        { id: "2", name: "ADU Type A Model", type: "3d-model", url: "#" },
      ];
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export interface CohortData {
  memberCount: number;
  activeProjects: number;
}

export function useCohortData() {
  return useQuery<CohortData>({
    queryKey: ["cohortData"],
    queryFn: async () => {
      return { memberCount: 47, activeProjects: 12 };
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}
