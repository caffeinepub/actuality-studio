import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, u as useInternetIdentity, X, B as Bookmark, t as useCatalogEntries, g as LoaderCircle } from "./index-Dl1C1aBr.js";
import { M as MotionConfigContext, i as isHTMLElement, a as useConstant, P as PresenceContext, b as usePresence, c as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion, u as useImageReveal } from "./proxy-CNPjm07E.js";
import { C as CircleCheckBig } from "./circle-check-big-BWss_wb0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (element && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const size = this.props.sizeRef.current;
      size.height = element.offsetHeight || 0;
      size.width = element.offsetWidth || 0;
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      exitingComponents.current.add(key);
      if (exitComplete.has(key)) {
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function SignInOverlay({
  isOpen,
  onClose,
  onSignIn
}) {
  const { login } = useInternetIdentity();
  const handleSignIn = () => {
    login();
    onSignIn == null ? void 0 : onSignIn();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { backgroundColor: "rgba(0,0,0,0.6)" },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      "data-ocid": "signin.modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.94, y: 24 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.94, y: 24 },
          transition: { duration: 0.28, ease: "easeOut" },
          className: "relative w-full max-w-md rounded-2xl shadow-2xl p-7 sm:p-9",
          style: { backgroundColor: "var(--color-warm-1, #f5e6c8)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "data-ocid": "signin.close_button",
                className: "absolute top-4 right-4 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all duration-150",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center w-12 h-12 rounded-full mb-5 mx-auto",
                style: { backgroundColor: "rgba(192,57,43,0.12)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bookmark,
                  {
                    className: "w-6 h-6",
                    style: { color: "var(--color-crimson-lustre, #c0392b)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-xl sm:text-2xl font-bold text-foreground text-center mb-2", children: "Join to Save & Save More" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 text-center leading-relaxed mb-6", children: "Sign in with Internet Identity to save items to your personal catalog and unlock exclusive member discounts." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mb-7", children: [
              "Save items to your personal storefront",
              "Member Special pricing on all saved items",
              "Exclusive discounts per membership tier"
            ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-4 h-4 mt-0.5 shrink-0",
                  style: { color: "var(--color-crimson-lustre, #c0392b)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/70", children: benefit })
            ] }, benefit)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSignIn,
                "data-ocid": "signin.submit_button",
                className: "w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
                children: "Sign In with Internet Identity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-foreground/40 mt-4 font-body", children: "Free to join · No credit card required" })
          ]
        },
        "overlay-card"
      )
    },
    "overlay-backdrop"
  ) });
}
const STORAGE_KEY = "actuality-saved-catalog";
function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
  }
}
function useSavedCatalog() {
  const [savedIds, setSavedIds] = reactExports.useState(readIds);
  const saveItem = reactExports.useCallback((id) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeIds(next);
      return next;
    });
  }, []);
  const unsaveItem = reactExports.useCallback((id) => {
    setSavedIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeIds(next);
      return next;
    });
  }, []);
  const isSaved = reactExports.useCallback(
    (id) => savedIds.includes(id),
    [savedIds]
  );
  const toggleSave = reactExports.useCallback((id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      writeIds(next);
      return next;
    });
  }, []);
  return { savedIds, saveItem, unsaveItem, isSaved, toggleSave };
}
const SEED_ENTRIES = [
  {
    id: "1",
    title: "McKinley Loft Shell A",
    description: "Primary ADU shell derived from the original north-wing classroom envelope. 620 sq ft with soaring 11′ ceilings, exposed brick, and original transom windows.",
    imageUrl: "https://placehold.co/800x600/c0392b/f5e6c8?text=McKinley+Loft+Shell+A",
    category: "ADU Shells",
    tags: ["adu", "loft", "north-wing", "premium"],
    accessLevel: "premium"
  },
  {
    id: "2",
    title: "Compact Studio Module",
    description: "Efficient 320 sq ft studio layout optimised for the school's standard classroom bay. Open plan with built-in storage wall and Murphy bed alcove.",
    imageUrl: "https://placehold.co/800x600/2c7a4b/f5e6c8?text=Compact+Studio+Module",
    category: "ADU Shells",
    tags: ["studio", "compact", "efficient"],
    accessLevel: "free"
  },
  {
    id: "3",
    title: "Corner Unit with Bay Window",
    description: "Premium corner ADU capturing two original window bays. 740 sq ft with angled living area and restored pressed-tin ceiling detail.",
    imageUrl: "https://placehold.co/800x600/c0392b/f5e6c8?text=Corner+Unit+Bay+Window",
    category: "ADU Shells",
    tags: ["corner", "bay-window", "premium"],
    accessLevel: "premium"
  },
  {
    id: "4",
    title: "Arts & Crafts Bedroom Set",
    description: "Seven-piece bedroom collection in white oak and hand-hammered copper hardware. Inspired by 1902 Craftsman detailing found in original McKinley millwork.",
    imageUrl: "https://placehold.co/800x600/8b6914/f5e6c8?text=Arts+%26+Crafts+Bedroom",
    category: "Furniture Collections",
    tags: ["bedroom", "craftsman", "oak", "copper"],
    accessLevel: "preview"
  },
  {
    id: "5",
    title: "Craftsman Dining Suite",
    description: "Extending table seats 4–8 with matched spindle-back chairs. White oak with mortise-and-tenon joinery; optional built-in hutch available.",
    imageUrl: "https://placehold.co/800x600/8b6914/f5e6c8?text=Craftsman+Dining+Suite",
    category: "Furniture Collections",
    tags: ["dining", "craftsman", "extendable"],
    accessLevel: "preview"
  },
  {
    id: "6",
    title: "Reading Nook Package",
    description: "Built-in window seat with under-seat storage, flanking bookshelves, and swing-arm lamp brackets. Designed to fit standard 36″ McKinley window bays.",
    imageUrl: "https://placehold.co/800x600/5a7a3a/f5e6c8?text=Reading+Nook+Package",
    category: "Furniture Collections",
    tags: ["nook", "storage", "built-in"],
    accessLevel: "free"
  },
  {
    id: "7",
    title: "Original Pressed Tin Ceiling Panel",
    description: "Exact reproduction of the 12″ × 12″ pressed tin pattern documented in the 1902 McKinley construction records. Available in raw, primed, and oil-rubbed bronze.",
    imageUrl: "https://placehold.co/800x600/c0392b/f5e6c8?text=Pressed+Tin+Ceiling",
    category: "Architectural Details",
    tags: ["ceiling", "tin", "1902", "historic"],
    accessLevel: "premium"
  },
  {
    id: "8",
    title: "1902 Brick Facade Detail",
    description: "High-resolution photogrammetric scan of the original Flemish-bond brickwork on the south elevation. Includes mortar analysis and repointing specification.",
    imageUrl: "https://placehold.co/800x600/7a3520/f5e6c8?text=1902+Brick+Facade",
    category: "Architectural Details",
    tags: ["brick", "facade", "scan", "historic"],
    accessLevel: "preview"
  },
  {
    id: "9",
    title: "McKinley Unit Floor Plan A",
    description: "Full construction-document set for Loft Shell A: floor plan, reflected ceiling plan, elevations, sections, and finish schedule. IFC + PDF formats.",
    imageUrl: "https://placehold.co/800x600/c0392b/f5e6c8?text=Unit+Floor+Plan+A",
    category: "Plans & Blueprints",
    tags: ["floor-plan", "IFC", "construction", "loft-a"],
    accessLevel: "premium"
  },
  {
    id: "10",
    title: "Site Plan — North Wing",
    description: "Site plan showing the north-wing ADU cluster layout, shared courtyard, bicycle storage, and utility easements at 117 N Napa Street.",
    imageUrl: "https://placehold.co/800x600/2c4a7a/f5e6c8?text=Site+Plan+North+Wing",
    category: "Plans & Blueprints",
    tags: ["site-plan", "north-wing", "courtyard"],
    accessLevel: "premium"
  }
];
const CATEGORIES = [
  "All",
  "ADU Shells",
  "Furniture Collections",
  "Architectural Details",
  "Plans & Blueprints"
];
function CatalogCard({
  entry,
  featured = false,
  isSaved,
  onToggleSave,
  onShowSignIn,
  isAuthenticated
}) {
  const { ref, isVisible } = useImageReveal({
    threshold: 0.08
  });
  const handleSaveClick = () => {
    if (!isAuthenticated) {
      onShowSignIn();
    } else {
      onToggleSave();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `group relative bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "image-reveal-visible" : "image-reveal-hidden"} ${featured ? "md:col-span-2" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative overflow-hidden ${featured ? "aspect-[16/7]" : "aspect-[4/3]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: entry.imageUrl,
                  alt: entry.title,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ),
              featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-body font-bold tracking-widest uppercase bg-primary text-primary-foreground px-3 py-1 rounded-full", children: "Spotlight" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-base sm:text-lg font-semibold text-foreground leading-snug", children: entry.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full", children: entry.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs sm:text-sm text-foreground/60 leading-relaxed mb-3", children: entry.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: entry.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-xs font-body text-foreground/40 bg-muted/30 px-2 py-0.5 rounded-full",
              children: [
                "#",
                tag
              ]
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleSaveClick,
              "data-ocid": "catalog.save.button",
              className: `flex items-center gap-1.5 text-sm font-body transition-all duration-200 ${isSaved ? "text-primary font-semibold" : "text-foreground/50 hover:text-primary"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bookmark,
                  {
                    className: "w-4 h-4",
                    fill: isSaved ? "currentColor" : "none"
                  }
                ),
                isSaved ? "Saved" : "Save to My Catalog"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function CatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const {
    data: entries,
    isLoading: entriesLoading,
    error
  } = useCatalogEntries();
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [showSignInOverlay, setShowSignInOverlay] = reactExports.useState(false);
  const { isSaved, toggleSave } = useSavedCatalog();
  const allEntries = entries && entries.length > 0 ? entries : SEED_ENTRIES;
  const filteredEntries = allEntries.filter((entry) => {
    const matchesCategory = activeCategory === "All" || entry.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || entry.title.toLowerCase().includes(q) || entry.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
  const featuredEntries = filteredEntries.filter((e) => e.accessLevel === "premium").slice(0, 2);
  const remainingEntries = filteredEntries.filter(
    (e) => !featuredEntries.find((f) => f.id === e.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f5e6c8]/60 to-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3",
          children: "McKinley Collection"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.1 },
          className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight",
          children: "Catalog"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.2 },
          className: "font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto leading-relaxed",
          children: "Curated ADU shells, furniture collections, and architectural details from the historic McKinley Elementary School in Spokane, Washington."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1 },
          transition: { duration: 0.6, delay: 0.35 },
          className: "mt-6 mx-auto w-24 h-0.5 bg-primary/30 rounded-full"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            "data-ocid": "catalog.search_input",
            type: "text",
            placeholder: "Search by title or tag…",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9 font-body text-sm bg-muted/30 border-border/30 focus:border-primary/40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide", children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": `catalog.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}.tab`,
          onClick: () => setActiveCategory(cat),
          className: `shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${activeCategory === cat ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/60 hover:text-foreground hover:bg-muted/50"}`,
          children: cat
        },
        cat
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16 sm:pb-20 lg:pb-28 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: entriesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-20",
        "data-ocid": "catalog.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
      }
    ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20", "data-ocid": "catalog.error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-destructive", children: "Failed to load catalog entries." }) }) : filteredEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20", "data-ocid": "catalog.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/50", children: "No items match your search." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      featuredEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-lg font-semibold text-foreground/70 mb-4 tracking-wide uppercase text-sm", children: "Spotlight" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6", children: featuredEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: i * 0.1 },
            "data-ocid": `catalog.item.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CatalogCard,
              {
                entry,
                isAuthenticated,
                featured: true,
                isSaved: isSaved(entry.id),
                onToggleSave: () => toggleSave(entry.id),
                onShowSignIn: () => setShowSignInOverlay(true)
              }
            )
          },
          entry.id
        )) })
      ] }),
      remainingEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        featuredEntries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-lg font-semibold text-foreground/70 mb-4 tracking-wide uppercase text-sm", children: "All Items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8", children: remainingEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: i * 0.06 },
            "data-ocid": `catalog.item.${featuredEntries.length + i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              CatalogCard,
              {
                entry,
                isAuthenticated,
                isSaved: isSaved(entry.id),
                onToggleSave: () => toggleSave(entry.id),
                onShowSignIn: () => setShowSignInOverlay(true)
              }
            )
          },
          entry.id
        )) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SignInOverlay,
      {
        isOpen: showSignInOverlay,
        onClose: () => setShowSignInOverlay(false)
      }
    )
  ] });
}
const CatalogPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SEED_ENTRIES,
  default: CatalogPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  CatalogPage$1 as C,
  SEED_ENTRIES as S,
  SignInOverlay as a,
  useSavedCatalog as u
};
