import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import InviteLinksModule "mo:caffeineai-invite-links/invite-links-module";
import Random "mo:core/Random";



actor {
  include MixinObjectStorage();

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

  // ── Discount Rates ─────────────────────────────────────────────────────────

  public type DiscountRates = {
    trial : Nat;
    cohort : Nat;
    patronPro : Nat;
    sponsorClient : Nat;
  };

  var discountRates : DiscountRates = {
    trial = 5;
    cohort = 10;
    patronPro = 20;
    sponsorClient = 30;
  };

  public query func getDiscountRates() : async DiscountRates {
    discountRates;
  };

  public shared ({ caller }) func setDiscountRates(rates : DiscountRates) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can set discount rates");
    };
    discountRates := rates;
  };

  // ── Saved Catalog Items ─────────────────────────────────────────────────────

  public type SavedCatalogItem = {
    itemId : Text;
    title : Text;
    description : Text;
    imageUrl : Text;
    category : Text;
    savedAt : Time.Time;
  };

  let savedCatalogItems = Map.empty<Principal, List.List<SavedCatalogItem>>();

  public shared ({ caller }) func saveCatalogItem(item : SavedCatalogItem) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only members can save catalog items");
    };

    let existing = switch (savedCatalogItems.get(caller)) {
      case (?list) { list };
      case null { List.empty<SavedCatalogItem>() };
    };

    // Remove existing entry with same itemId to avoid duplicates, then add updated
    let filtered = existing.filter(func(i : SavedCatalogItem) : Bool { i.itemId != item.itemId });
    filtered.add(item);
    savedCatalogItems.add(caller, filtered);
  };

  public shared ({ caller }) func removeSavedCatalogItem(itemId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only members can remove saved catalog items");
    };

    switch (savedCatalogItems.get(caller)) {
      case (null) {};
      case (?list) {
        let filtered = list.filter(func(i : SavedCatalogItem) : Bool { i.itemId != itemId });
        savedCatalogItems.add(caller, filtered);
      };
    };
  };

  public query ({ caller }) func getSavedCatalogItems() : async [SavedCatalogItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only members can view saved catalog items");
    };

    switch (savedCatalogItems.get(caller)) {
      case (null) { [] };
      case (?list) { list.toArray() };
    };
  };

  // ── Internet Product Search via HTTP Outcalls ───────────────────────────────

  public type InternetProduct = {
    id : Text;
    title : Text;
    description : Text;
    price : Text;
    imageUrl : Text;
    purchaseUrl : Text;
    source : Text;
  };

  // IC management canister interface for http_request
  let ic = actor "aaaaa-aa" : actor {
    http_request : ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [{ name : Text; value : Text }];
      body : ?Blob;
      transform : ?{
        function : shared ({ response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob }; context : Blob }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
  };

  // URL-encode a query string (encode spaces as %20, special chars)
  func encodeURIComponent(s : Text) : Text {
    var result = "";
    for (c in s.toIter()) {
      let encoded : Text = switch c {
        case ' ' { "%20" };
        case '!' { "%21" };
        case '\"' { "%22" };
        case '#' { "%23" };
        case '$' { "%24" };
        case '%' { "%25" };
        case '&' { "%26" };
        case '\'' { "%27" };
        case '(' { "%28" };
        case ')' { "%29" };
        case '*' { "%2A" };
        case '+' { "%2B" };
        case ',' { "%2C" };
        case '/' { "%2F" };
        case ':' { "%3A" };
        case ';' { "%3B" };
        case '=' { "%3D" };
        case '?' { "%3F" };
        case '@' { "%40" };
        case '[' { "%5B" };
        case ']' { "%5D" };
        case _ { Text.fromChar(c) };
      };
      result := result # encoded;
    };
    result;
  };

  // Simple JSON text extraction: find first occurrence of "key":"value" or "key":number
  func extractJsonField(json : Text, key : Text) : ?Text {
    let searchKey = "\"" # key # "\":";
    switch (findSubstring(json, searchKey, 0)) {
      case null { null };
      case (?startIdx) {
        let afterKey = startIdx + searchKey.size();
        let chars = json.toArray();
        if (afterKey >= chars.size()) { return null };
        // Skip whitespace
        var i = afterKey;
        while (i < chars.size() and chars[i] == ' ') { i += 1 };
        if (i >= chars.size()) { return null };
        if (chars[i] == '\"') {
          // String value
          i += 1;
          var value = "";
          var escaped = false;
          label inner while (i < chars.size()) {
            let ch = chars[i];
            if (escaped) {
              value := value # Text.fromChar(ch);
              escaped := false;
            } else if (ch == '\\') {
              escaped := true;
            } else if (ch == '\"') {
              i += 1;
              return ?value;
            } else {
              value := value # Text.fromChar(ch);
            };
            i += 1;
          };
          null
        } else {
          // Numeric or null value
          var value = "";
          label inner2 while (i < chars.size()) {
            let ch = chars[i];
            if (ch == ',' or ch == '}' or ch == ']' or ch == '\n') {
              return if (value == "" or value == "null") null else ?value;
            };
            value := value # Text.fromChar(ch);
            i += 1;
          };
          if (value == "" or value == "null") null else ?value
        };
      };
    };
  };

  // Find substring index in text
  func findSubstring(haystack : Text, needle : Text, startFrom : Nat) : ?Nat {
    let hChars = haystack.toArray();
    let nChars = needle.toArray();
    let hLen = hChars.size();
    let nLen = nChars.size();
    if (nLen == 0) { return ?startFrom };
    if (hLen < nLen) { return null };
    var i = startFrom;
    label outer while (i + nLen <= hLen) {
      var match = true;
      var j = 0;
      while (j < nLen) {
        if (hChars[i + j] != nChars[j]) { match := false };
        j += 1;
      };
      if (match) { return ?i };
      i += 1;
    };
    null
  };

  // Extract nth occurrence of an array element from JSON (finds nth "{" block)
  func extractNthObject(json : Text, n : Nat) : ?Text {
    let chars = json.toArray();
    let len = chars.size();
    var count = 0;
    var i = 0;
    label outer while (i < len) {
      if (chars[i] == '{') {
        if (count == n) {
          // found start, now find matching closing brace
          var depth = 0;
          var j = i;
          var obj = "";
          label inner while (j < len) {
            let ch = chars[j];
            obj := obj # Text.fromChar(ch);
            if (ch == '{') { depth += 1 };
            if (ch == '}') {
              depth -= 1;
              if (depth == 0) {
                return ?obj;
              };
            };
            j += 1;
          };
          return null;
        };
        count += 1;
      };
      i += 1;
    };
    null
  };

  // Extract "items" array content from UPC API response
  func extractItemsArray(json : Text) : Text {
    switch (findSubstring(json, "\"items\":[", 0)) {
      case null { "[]" };
      case (?startIdx) {
        let afterBracket = startIdx + 9; // length of "\"items\":["
        let chars = json.toArray();
        var depth = 1;
        var i = afterBracket;
        var result = "[";
        while (i < chars.size() and depth > 0) {
          let ch = chars[i];
          result := result # Text.fromChar(ch);
          if (ch == '[') { depth += 1 };
          if (ch == ']') {
            depth -= 1;
            if (depth == 0) { return result };
          };
          i += 1;
        };
        "[]"
      };
    };
  };

  // Extract first string from a JSON array like ["url1","url2"]
  func extractFirstArrayString(json : Text, key : Text) : ?Text {
    let searchKey = "\"" # key # "\":[";
    switch (findSubstring(json, searchKey, 0)) {
      case null { null };
      case (?startIdx) {
        let afterBracket = startIdx + searchKey.size();
        let chars = json.toArray();
        var i = afterBracket;
        // skip whitespace
        while (i < chars.size() and chars[i] == ' ') { i += 1 };
        if (i >= chars.size()) { return null };
        if (chars[i] == '\"') {
          i += 1;
          var value = "";
          label lp while (i < chars.size()) {
            let ch = chars[i];
            if (ch == '\"') { return ?value };
            value := value # Text.fromChar(ch);
            i += 1;
          };
          null
        } else { null }
      };
    };
  };

  // Extract first offer link from offers array
  func extractFirstOfferLink(itemJson : Text) : ?Text {
    let searchKey = "\"offers\":[";
    switch (findSubstring(itemJson, searchKey, 0)) {
      case null { null };
      case (?startIdx) {
        let afterBracket = startIdx + searchKey.size();
        // find "link" in the first offer object
        switch (findSubstring(itemJson, "\"link\":\"", afterBracket)) {
          case null { null };
          case (?linkStart) {
            let afterQuote = linkStart + 8;
            let chars = itemJson.toArray();
            var i = afterQuote;
            var value = "";
            label lp while (i < chars.size()) {
              let ch = chars[i];
              if (ch == '\"') { return ?value };
              value := value # Text.fromChar(ch);
              i += 1;
            };
            null
          };
        };
      };
    };
  };

  // Extract first offer price from offers array
  func extractFirstOfferPrice(itemJson : Text) : ?Text {
    let searchKey = "\"offers\":[";
    switch (findSubstring(itemJson, searchKey, 0)) {
      case null { null };
      case (?startIdx) {
        let afterBracket = startIdx + searchKey.size();
        switch (findSubstring(itemJson, "\"price\":\"", afterBracket)) {
          case null {
            // try numeric price
            switch (findSubstring(itemJson, "\"price\":", afterBracket)) {
              case null { null };
              case (?priceStart) {
                let afterColon = priceStart + 8;
                let chars = itemJson.toArray();
                var i = afterColon;
                var value = "";
                label lp while (i < chars.size()) {
                  let ch = chars[i];
                  if (ch == ',' or ch == '}' or ch == '\n') { return ?value };
                  value := value # Text.fromChar(ch);
                  i += 1;
                };
                ?value
              };
            }
          };
          case (?priceStart) {
            let afterQuote = priceStart + 9;
            let chars = itemJson.toArray();
            var i = afterQuote;
            var value = "";
            label lp while (i < chars.size()) {
              let ch = chars[i];
              if (ch == '\"') { return ?value };
              value := value # Text.fromChar(ch);
              i += 1;
            };
            null
          };
        };
      };
    };
  };

  public shared func searchInternetProducts(searchTerm : Text) : async [InternetProduct] {
    let encodedQuery = encodeURIComponent(searchTerm);
    let url = "https://api.upcitemdb.com/prod/trial/search?s=" # encodedQuery # "&type=product";

    let response = try {
      await ic.http_request({
        url = url;
        max_response_bytes = ?500_000;
        method = #get;
        headers = [
          { name = "Accept"; value = "application/json" },
          { name = "User-Agent"; value = "ActualityStudio/1.0" },
        ];
        body = null;
        transform = null;
        is_replicated = ?false;
      });
    } catch _ {
      return [];
    };

    if (response.status != 200) { return [] };

    let bodyText = switch (response.body.decodeUtf8()) {
      case null { return [] };
      case (?t) { t };
    };

    let itemsArray = extractItemsArray(bodyText);
    if (itemsArray == "[]") { return [] };

    let results = List.empty<InternetProduct>();
    var idx = 0;
    label parse while (idx < 20) {
      switch (extractNthObject(itemsArray, idx)) {
        case null { break parse };
        case (?itemJson) {
          let title = switch (extractJsonField(itemJson, "title")) {
            case null { "" };
            case (?t) { t };
          };
          if (title == "") {
            idx += 1;
          } else {
            let description = switch (extractJsonField(itemJson, "description")) {
              case null { "" };
              case (?d) { d };
            };
            let imageUrl = switch (extractFirstArrayString(itemJson, "images")) {
              case null { "" };
              case (?img) { img };
            };
            let lowestPrice = switch (extractJsonField(itemJson, "lowest_recorded_price")) {
              case null { "" };
              case (?p) { p };
            };
            let offerPrice = switch (extractFirstOfferPrice(itemJson)) {
              case null { "" };
              case (?p) { p };
            };
            let price = if (offerPrice != "") { "$" # offerPrice }
              else if (lowestPrice != "") { "$" # lowestPrice }
              else { "Price unavailable" };
            let offerLink = switch (extractFirstOfferLink(itemJson)) {
              case null { "" };
              case (?l) { l };
            };
            let purchaseUrl = if (offerLink != "") { offerLink }
              else { "https://www.amazon.com/s?k=" # encodedQuery };
            let ean = switch (extractJsonField(itemJson, "ean")) {
              case null { title # idx.toText() };
              case (?e) { e };
            };
            results.add({
              id = ean;
              title;
              description;
              price;
              imageUrl;
              purchaseUrl;
              source = "upcitemdb";
            });
            idx += 1;
          };
        };
      };
    };
    results.toArray()
  };

  // ── Item Ratings ────────────────────────────────────────────────────────────

  // Composite key: principalText # ":" # itemId
  let itemRatings = Map.empty<Text, Int>();

  func ratingKey(caller : Principal, itemId : Text) : Text {
    caller.toText() # ":" # itemId
  };

  public shared ({ caller }) func rateItem(itemId : Text, rating : Int) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous callers cannot rate items");
    };
    if (rating != 1 and rating != -1) {
      Runtime.trap("Rating must be 1 (upvote) or -1 (downvote)");
    };
    itemRatings.add(ratingKey(caller, itemId), rating);
  };

  public query ({ caller }) func getItemRatings(itemId : Text) : async { upvotes : Nat; downvotes : Nat; callerRating : ?Int } {
    var upvotes : Nat = 0;
    var downvotes : Nat = 0;
    let suffix = ":" # itemId;
    for ((key, rating) in itemRatings.entries()) {
      if (key.endsWith(#text suffix)) {
        if (rating == 1) { upvotes += 1 }
        else if (rating == -1) { downvotes += 1 };
      };
    };
    let callerRating = if (caller.isAnonymous()) { null }
      else { itemRatings.get(ratingKey(caller, itemId)) };
    { upvotes; downvotes; callerRating };
  };

};
