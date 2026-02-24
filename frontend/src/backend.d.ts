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
export interface MembershipState {
    category: MemberCategory;
    nftMinted: boolean;
    trialEndsAt?: Time;
}
export interface UserProfile {
    name: string;
}
export enum MemberCategory {
    trial = "trial",
    premium = "premium",
    standard = "standard"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createTrialMembership(): Promise<void>;
    getAllMemberships(): Promise<Array<MembershipState>>;
    getCallerMembershipState(): Promise<MembershipState>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMembershipState(member: Principal): Promise<MembershipState>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    mintMembership(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    upgradeToPremium(user: Principal): Promise<void>;
}
