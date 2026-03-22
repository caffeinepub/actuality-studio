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
export interface Cohort {
    members: Array<CohortMember>;
    owner: Principal;
    createdAt: Time;
}
export interface CohortMember {
    principal: Principal;
    role: MemberRole;
}
export interface UserProfile {
    name: string;
}
export interface RSVP {
    name: string;
    inviteCode: string;
    timestamp: Time;
    attending: boolean;
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
    getInviteCodes(): Promise<Array<InviteCode>>;
    getMemberCohort(owner: Principal): Promise<Cohort>;
    getMembershipState(member: Principal): Promise<MembershipState>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasAnyAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    mintBadge(): Promise<void>;
    registerAsFirstAdmin(): Promise<void>;
    addAdmin(user: Principal): Promise<void>;
    removeAdmin(user: Principal): Promise<void>;
    listAdmins(): Promise<Array<string>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRSVP(name: string, attending: boolean, inviteCode: string): Promise<void>;
    upgradeToPremium(user: Principal): Promise<void>;
}
