import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import InviteLinksModule "invite-links/invite-links-module";
import Random "mo:core/Random";



actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let inviteState = InviteLinksModule.initState();

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── Admin Principal Management ─────────────────────────────────────────────

  public query func hasAnyAdmin() : async Bool {
    accessControlState.adminAssigned;
  };

  public shared ({ caller }) func registerAsFirstAdmin() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous callers cannot register as admin");
    };
    if (accessControlState.adminAssigned) {
      Runtime.trap("Admin already registered");
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
  };

  public shared ({ caller }) func addAdmin(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add other admins");
    };
    accessControlState.userRoles.add(user, #admin);
  };

  public shared ({ caller }) func removeAdmin(user : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove admins");
    };
    // Count current admins
    let adminCount = accessControlState.userRoles.entries().filter(
      func((_, role) : (Principal, AccessControl.UserRole)) : Bool { role == #admin }
    ).toArray().size();
    if (adminCount <= 1) {
      Runtime.trap("Cannot remove the last admin");
    };
    accessControlState.userRoles.add(user, #user);
  };

  public query ({ caller }) func listAdmins() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list admins");
    };
    let admins = accessControlState.userRoles.entries().filter(
      func((_, role) : (Principal, AccessControl.UserRole)) : Bool { role == #admin }
    ).map(
      func((p, _) : (Principal, AccessControl.UserRole)) : Text { p.toText() }
    ).toArray();
    admins;
  };

  // ── Membership ─────────────────────────────────────────────────────────────

  public type MemberCategory = {
    #standard;
    #premium;
    #trial;
  };

  public type MembershipState = {
    category : MemberCategory;
    badgeMinted : Bool;
    trialEndsAt : ?Time.Time;
  };

  let memberships = Map.empty<Principal, MembershipState>();
  let defaultTrialPeriod : Int = 30 * 24 * 60 * 60 * 1000000000;

  public shared ({ caller }) func createTrialMembership() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can create a trial membership");
    };

    switch (memberships.get(caller)) {
      case (null) {
        let newMembership : MembershipState = {
          category = #trial;
          badgeMinted = false;
          trialEndsAt = ?(Time.now() + defaultTrialPeriod);
        };
        memberships.add(caller, newMembership);
      };
      case (?_) {
        Runtime.trap("User is already a member");
      };
    };
  };

  public shared ({ caller }) func mintBadge() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can mint a badge");
    };

    switch (memberships.get(caller)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?membershipState) {
        let withBadge : MembershipState = {
          membershipState with
          category = #standard;
          badgeMinted = true;
          trialEndsAt = null;
        };
        memberships.add(caller, withBadge);
      };
    };
  };

  public shared ({ caller }) func upgradeToPremium(user : Principal) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upgrade memberships to premium");
    };

    switch (memberships.get(user)) {
      case (null) { Runtime.trap("User not found") };
      case (?membership) {
        let premiumMembership : MembershipState = {
          membership with
          category = #premium;
        };
        memberships.add(user, premiumMembership);
      };
    };
  };

  public query ({ caller }) func getCallerMembershipState() : async MembershipState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can view their membership");
    };

    switch (memberships.get(caller)) {
      case (null) {
        Runtime.trap("Membership not found");
      };
      case (?state) { state };
    };
  };

  public query ({ caller }) func getMembershipState(member : Principal) : async MembershipState {
    if (caller != member and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own membership state");
    };

    switch (memberships.get(member)) {
      case (null) {
        Runtime.trap("Membership not found");
      };
      case (?state) { state };
    };
  };

  public query ({ caller }) func getAllMemberships() : async [MembershipState] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list all memberships");
    };

    let all = memberships.values().toArray();
    all.sort(
      func(a : MembershipState, b : MembershipState) : Order.Order {
        switch (a.trialEndsAt, b.trialEndsAt) {
          case (null, null) { #equal };
          case (null, ?_) { #less };
          case (?_, null) { #greater };
          case (?aEnd, ?bEnd) {
            if (aEnd < bEnd) { #less } else if (aEnd > bEnd) { #greater } else { #equal };
          };
        };
      }
    );
  };

  public type MemberRole = {
    #family;
    #friend;
    #professional;
  };

  public type CohortMember = {
    principal : Principal;
    role : MemberRole;
  };

  public type Cohort = {
    owner : Principal;
    members : [CohortMember];
    createdAt : Time.Time;
  };

  let cohorts = Map.empty<Principal, Cohort>();

  public shared ({ caller }) func createCohort(members : [CohortMember]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create cohorts");
    };

    if (members.size() > 12) {
      Runtime.trap("Cohort cannot have more than 12 members");
    };

    let cohort : Cohort = {
      owner = caller;
      members;
      createdAt = Time.now();
    };

    cohorts.add(caller, cohort);
  };

  public query ({ caller }) func getCohort() : async ?Cohort {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their cohort");
    };
    cohorts.get(caller);
  };

  public query ({ caller }) func getMemberCohort(owner : Principal) : async Cohort {
    if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own cohort");
    };

    switch (cohorts.get(owner)) {
      case (null) { Runtime.trap("Cohort not found") };
      case (?cohort) { cohort };
    };
  };

  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
};
