import Map "mo:core/Map";
import Time "mo:core/Time";
import Int64 "mo:core/Int64";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ── User Profile ──────────────────────────────────────────────────────────

  public type UserProfile = {
    name : Text;
    // Add additional user metadata if needed
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

  // ── Membership ────────────────────────────────────────────────────────────

  type MemberCategory = {
    #standard;
    #premium;
    #trial;
  };

  type MembershipState = {
    category : MemberCategory;
    nftMinted : Bool;
    trialEndsAt : ?Time.Time;
  };

  let memberships = Map.empty<Principal, MembershipState>();
  let defaultTrialPeriod : Int = 30 * 24 * 60 * 60 * 1000000000;

  // Create a 30-day trial membership for the authenticated caller.
  public shared ({ caller }) func createTrialMembership() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can create a trial membership");
    };

    switch (memberships.get(caller)) {
      case (null) {
        let newMembership : MembershipState = {
          category = #trial;
          nftMinted = false;
          trialEndsAt = ?(Time.now() + defaultTrialPeriod);
        };
        memberships.add(caller, newMembership);
      };
      case (?_) {
        Runtime.trap("User is already a member");
      };
    };
  };

  // Mint the membership NFT for the authenticated caller.
  public shared ({ caller }) func mintMembership() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only logged-in users can mint a membership");
    };

    switch (memberships.get(caller)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?membershipState) {
        let withNFT : MembershipState = {
          membershipState with
          category = #standard;
          nftMinted = true;
          trialEndsAt = null;
        };
        memberships.add(caller, withNFT);
      };
    };
  };

  // Admin-only: upgrade a user to premium tier.
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

  // Get the caller's own membership state.
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

  // Get a specific member's state — accessible by the member themselves or an admin.
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

  // Admin-only: retrieve all memberships sorted by trial expiry.
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
            if (aEnd < bEnd) #less
            else if (aEnd > bEnd) #greater
            else #equal;
          };
        };
      }
    );
  };
};
