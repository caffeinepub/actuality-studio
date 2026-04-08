import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface CohortMember {
    principal: Principal;
    role: MemberRole;
}
export interface Cohort {
    members: Array<CohortMember>;
    owner: Principal;
    createdAt: Time;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
}
export interface InviteCode {
    created: Time;
    code: string;
    used: boolean;
}
export interface MembershipState {
    badgeMinted: boolean;
    category: MemberCategory;
    trialEndsAt?: Time;
}
export interface DiscountRates {
    trial: bigint;
    patronPro: bigint;
    cohort: bigint;
    sponsorClient: bigint;
}
export interface UserProfile {
    name: string;
}
export interface SavedCatalogItem {
    itemId: string;
    title: string;
    description: string;
    imageUrl: string;
    savedAt: Time;
    category: string;
}
export enum MemberCategory {
    trial = "trial",
    premium = "premium",
    standard = "standard"
}
export enum MemberRole {
    professional = "professional",
    friend = "friend",
    family = "family"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdmin(user: Principal): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCohort(members: Array<CohortMember>): Promise<void>;
    createTrialMembership(): Promise<void>;
    generateInviteCode(): Promise<string>;
    getAllMemberships(): Promise<Array<MembershipState>>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getCallerMembershipState(): Promise<MembershipState>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCohort(): Promise<Cohort | null>;
    getDiscountRates(): Promise<DiscountRates>;
    getInviteCodes(): Promise<Array<InviteCode>>;
    getMemberCohort(owner: Principal): Promise<Cohort>;
    getMembershipState(member: Principal): Promise<MembershipState>;
    getSavedCatalogItems(): Promise<Array<SavedCatalogItem>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasAnyAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listAdmins(): Promise<Array<string>>;
    mintBadge(): Promise<void>;
    registerAsFirstAdmin(): Promise<void>;
    removeAdmin(user: Principal): Promise<void>;
    removeSavedCatalogItem(itemId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCatalogItem(item: SavedCatalogItem): Promise<void>;
    setDiscountRates(rates: DiscountRates): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    upgradeToPremium(user: Principal): Promise<void>;
}
