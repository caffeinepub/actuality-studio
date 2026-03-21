import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, r as reactExports, a as createContextScope, P as Primitive, b as cn, u as useInternetIdentity, d as useGetCallerMembershipState, e as useTrialStatus, f as useMintBadge, g as LoaderCircle, T as TriangleAlert, C as Clock, M as MemberCategory } from "./index-Dl1C1aBr.js";
import { u as useImageReveal, m as motion } from "./proxy-CNPjm07E.js";
import { E as EnrollmentModal, S as Shield } from "./EnrollmentModal-09yU8NbE.js";
import "./circle-check-big-BWss_wb0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function AboutSection() {
  const { ref: img1Ref, isVisible: img1Visible } = useImageReveal();
  const { ref: img2Ref, isVisible: img2Visible } = useImageReveal();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "about",
      className: "py-16 sm:py-20 lg:py-28 bg-background overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Our Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight", children: [
            "From Schoolhouse to",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary block sm:inline sm:ml-2", children: "Sovereign Home" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-8 lg:gap-16 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 space-y-5 sm:space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Built in 1902, McKinley Elementary School in Spokane, Washington stands as a testament to the city's architectural heritage. Its red-brick façade, arched windows, and cast-iron staircases have witnessed over a century of community life in Spokane's historic neighborhoods." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Actuality Studio is transforming this Spokane landmark into sovereign loft residences — spaces where history meets modern living, and where community ownership replaces traditional landlord models." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Our on-chain membership system ensures every resident holds a verifiable, custodian-free NFT badge — proof of belonging that lives on the Internet Computer, not in a corporate database." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/membership",
                className: "\n                  inline-flex items-center gap-2\n                  px-6 py-3 sm:px-7 sm:py-3.5\n                  bg-primary text-primary-foreground\n                  font-body font-semibold text-sm sm:text-base\n                  rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-lg hover:bg-primary/90\n                  active:scale-95\n                  w-full sm:w-auto justify-center sm:justify-start\n                ",
                children: "View Memberships"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full md:w-1/2 grid grid-cols-2 gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  ref: img1Ref,
                  className: `rounded-xl overflow-hidden aspect-[4/3] shadow-warm ${img1Visible ? "image-reveal-visible" : "image-reveal-hidden"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/mckinley-1902.dim_600x400.png",
                      srcSet: "/assets/generated/mckinley-1902.dim_600x400.png 600w",
                      sizes: "(max-width: 768px) 100vw, 50vw",
                      alt: "McKinley Elementary School, Spokane, WA — c. 1902",
                      width: 600,
                      height: 400,
                      className: "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
                      loading: "lazy",
                      decoding: "async"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/70 text-center italic", children: "c. 1902 — Original Building, Spokane, WA" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  ref: img2Ref,
                  className: `rounded-xl overflow-hidden aspect-[4/3] shadow-warm ${img2Visible ? "image-reveal-visible" : "image-reveal-hidden"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/assets/generated/mckinley-gymnasium-studio.dim_600x400.png",
                      srcSet: "/assets/generated/mckinley-gymnasium-studio.dim_600x400.png 600w",
                      sizes: "(max-width: 768px) 100vw, 50vw",
                      alt: "McKinley Elementary School Gymnasium renovated as Actuality Studio, Spokane, WA",
                      width: 600,
                      height: 400,
                      className: "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
                      loading: "lazy",
                      decoding: "async"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/70 text-center italic", children: "Today — Gymnasium Space, Spokane, WA" })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function HeroSection() {
  const [enrollOpen, setEnrollOpen] = reactExports.useState(false);
  const { ref: heroImgRef, isVisible: heroImgVisible } = useImageReveal({
    threshold: 0.05,
    rootMargin: "0px"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: heroImgRef,
        className: `w-full aspect-[21/9] overflow-hidden ${heroImgVisible ? "image-reveal-visible" : "image-reveal-hidden"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/assets/generated/mckinley-school-hero.dim_1920x1080.png",
            srcSet: "/assets/generated/mckinley-school-hero.dim_1920x1080.png 1920w",
            sizes: "100vw",
            alt: "Historic McKinley Elementary School, Spokane, Washington",
            width: 1920,
            height: 1080,
            className: "w-full h-full object-cover object-center",
            loading: "eager",
            fetchPriority: "high"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs sm:text-sm font-body font-medium tracking-wide uppercase", children: "Historic Preservation · Sovereign Living" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: 0.2 },
          className: "font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-5",
          children: [
            "Actuality Studio",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary mt-1 sm:mt-2", children: "McKinley Lofts" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: 0.3 },
          className: "font-body text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed",
          children: "Join a sovereign community transforming Spokane, Washington's historic 1902 McKinley Elementary School into living spaces that honor the past while building the future."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "hero.primary_button",
                onClick: () => setEnrollOpen(true),
                className: "\n                w-full sm:w-auto\n                px-7 py-3.5 sm:px-8 sm:py-4\n                bg-primary text-primary-foreground\n                font-body font-semibold text-base sm:text-lg\n                rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:shadow-xl hover:bg-primary/90\n                active:scale-95\n                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50\n              ",
                children: "Start Your Free 30-Day Trial"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "hero.secondary_button",
                onClick: () => {
                  var _a;
                  return (_a = document.getElementById("about")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "\n                w-full sm:w-auto\n                px-7 py-3.5 sm:px-8 sm:py-4\n                bg-muted text-foreground border border-border\n                font-body font-medium text-base sm:text-lg\n                rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:bg-muted/80 hover:shadow-lg\n                active:scale-95\n                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50\n              ",
                children: "Learn More"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnrollmentModal,
      {
        open: enrollOpen,
        onClose: () => setEnrollOpen(false),
        tierName: "Trial",
        tierId: "trial"
      }
    )
  ] });
}
const slides = [
  {
    src: "/assets/generated/mckinley-exterior.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-exterior.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Exterior",
    caption: "The iconic 1902 red-brick facade of McKinley Elementary School in Spokane, Washington, preserved for future generations.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-interior-apt.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-interior-apt.dim_1200x800.png 1200w",
    alt: "McKinley Lofts, Spokane, WA — Interior Apartment",
    caption: "Open-plan loft living with original hardwood floors and exposed brick inside Spokane's historic McKinley School.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-staircase.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-staircase.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Original Cast-Iron Staircase",
    caption: "Restored cast-iron staircases at Spokane's McKinley Elementary School — a century of stories in every step.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-interior-detail.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-interior-detail.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Interior Architectural Detail",
    caption: "Arched windows and original millwork bring warmth to every space in Spokane's McKinley Lofts.",
    width: 1200,
    height: 800
  }
];
function InspirationCarousel() {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const { ref: sectionRef, isVisible: sectionVisible } = useImageReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px"
  });
  const goTo = reactExports.useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning]
  );
  const next = reactExports.useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = reactExports.useCallback(() => goTo(current - 1), [current, goTo]);
  reactExports.useEffect(() => {
    timerRef.current = setTimeout(next, 5e3);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-spring overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Real-World Inspiration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-forest", children: "The McKinley Vision — Spokane, WA" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: sectionRef,
        className: `relative rounded-2xl overflow-hidden shadow-2xl ${sectionVisible ? "image-reveal-visible" : "image-reveal-hidden"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] bg-forest/50", children: [
            slides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: slide.src,
                srcSet: slide.srcSet,
                sizes: "(max-width: 768px) 100vw, 80vw",
                alt: slide.alt,
                width: slide.width,
                height: slide.height,
                loading: "lazy",
                decoding: "async",
                className: `
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  ${i === current ? "opacity-100" : "opacity-0"}
                `
              },
              slide.src
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: prev,
                "aria-label": "Previous slide",
                className: "\n                absolute left-3 sm:left-4 top-1/2 -translate-y-1/2\n                w-10 h-10 sm:w-12 sm:h-12\n                flex items-center justify-center\n                bg-forest/60 hover:bg-forest/80 text-cream\n                rounded-full backdrop-blur-sm\n                transition-all duration-200 ease-in-out\n                hover:scale-110 active:scale-95\n              ",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 sm:w-6 sm:h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: next,
                "aria-label": "Next slide",
                className: "\n                absolute right-3 sm:right-4 top-1/2 -translate-y-1/2\n                w-10 h-10 sm:w-12 sm:h-12\n                flex items-center justify-center\n                bg-forest/60 hover:bg-forest/80 text-cream\n                rounded-full backdrop-blur-sm\n                transition-all duration-200 ease-in-out\n                hover:scale-110 active:scale-95\n              ",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 sm:w-6 sm:h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-forest/90 min-h-[3.5rem] flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `
                font-body text-sm sm:text-base lg:text-lg text-cream/90 max-w-2xl mx-auto text-center w-full italic
                transition-all duration-400 ease-in-out
                ${isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}
              `,
              children: slides[current].caption
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 py-3 bg-forest/80", children: slides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => goTo(i),
              "aria-label": `Go to slide ${i + 1}`,
              className: `
                  rounded-full transition-all duration-300 ease-in-out
                  hover:scale-125 active:scale-95
                  ${i === current ? "w-6 h-2.5 bg-gold" : "w-2.5 h-2.5 bg-cream/30 hover:bg-cream/60"}
                `
            },
            slide.src
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8 sm:mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/catalog",
        className: "\n              inline-flex items-center gap-2\n              px-6 py-3 sm:px-7 sm:py-3.5\n              bg-gold text-forest\n              font-body font-semibold text-sm sm:text-base\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-lg hover:bg-gold/90\n              active:scale-95\n            ",
        children: "View Full Catalog"
      }
    ) })
  ] }) });
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function MembershipCard() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: membership, isLoading } = useGetCallerMembershipState();
  const trialStatus = useTrialStatus();
  const mintBadge = useMintBadge();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary/40 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60", children: "Login to view your membership status." })
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/60", children: "Loading membership…" })
    ] });
  }
  if (!membership) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary/40 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-4", children: "No active membership found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/membership",
          className: "\n            inline-flex items-center gap-2 px-5 py-2.5\n            bg-primary text-primary-foreground\n            font-body font-semibold text-sm rounded-full\n            transition-all duration-200 ease-in-out\n            hover:scale-105 hover:shadow-md active:scale-95\n          ",
          children: "View Plans"
        }
      )
    ] });
  }
  if (trialStatus.isTrial) {
    const progressPct = trialStatus.isExpired ? 100 : Math.max(
      0,
      Math.min(100, (30 - trialStatus.daysRemaining) / 30 * 100)
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bg-background rounded-2xl border shadow-warm p-5 sm:p-6 ${trialStatus.isExpired ? "border-destructive/40" : trialStatus.isWarning ? "border-gold/40" : "border-border/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            trialStatus.isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive shrink-0" }) : trialStatus.isWarning ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gold shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-base font-semibold text-foreground", children: trialStatus.isExpired ? "Trial Expired" : "Trial Membership" })
          ] }),
          !trialStatus.isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressPct, className: "h-2 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-foreground/60 mb-4", children: [
              trialStatus.daysRemaining,
              " day",
              trialStatus.daysRemaining !== 1 ? "s" : "",
              " remaining"
            ] })
          ] }),
          (trialStatus.isExpired || trialStatus.isWarning) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/membership",
                className: "\n                flex-1 text-center px-4 py-2.5\n                bg-primary text-primary-foreground\n                font-body font-semibold text-sm rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:shadow-md active:scale-95\n              ",
                children: "Upgrade Now"
              }
            ),
            !membership.badgeMinted && !trialStatus.isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => mintBadge.mutate(),
                disabled: mintBadge.isPending,
                className: "\n                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5\n                  bg-secondary text-secondary-foreground\n                  font-body font-semibold text-sm rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-md active:scale-95\n                  disabled:opacity-50 disabled:hover:scale-100\n                ",
                children: [
                  mintBadge.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                  "Mint Badge"
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  const isStandard = membership.category === MemberCategory.standard;
  const isPremium = membership.category === MemberCategory.premium;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-gold shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-base font-semibold text-foreground", children: isPremium ? "Premium Member" : "Standard Member" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-4", children: isPremium ? "Full access to all sovereign catalog content and community features." : "Access to standard catalog content and community features." }),
    isStandard && !membership.badgeMinted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => mintBadge.mutate(),
        disabled: mintBadge.isPending,
        className: "\n            w-full flex items-center justify-center gap-2 px-4 py-2.5\n            bg-primary text-primary-foreground\n            font-body font-semibold text-sm rounded-full\n            transition-all duration-200 ease-in-out\n            hover:scale-105 hover:shadow-md active:scale-95\n            disabled:opacity-50 disabled:hover:scale-100\n          ",
        children: [
          mintBadge.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          mintBadge.isPending ? "Minting…" : "Mint Your Badge NFT"
        ]
      }
    ),
    membership.badgeMinted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-body text-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
      "Badge NFT minted — you are the direct on-chain owner"
    ] })
  ] });
}
const products = [
  {
    id: "adu-a",
    title: "ADU Shell — Type A",
    description: "Modular 400 sq ft single-story accessory dwelling unit shell.",
    imageUrl: "/assets/generated/adu-shell-type-a.dim_600x400.png",
    imageSrcSet: "/assets/generated/adu-shell-type-a.dim_600x400.png 600w",
    badge: "ADU",
    accentColor: "bg-secondary text-forest border border-border/40"
  },
  {
    id: "adu-b",
    title: "ADU Shell — Type B",
    description: "Two-story 650 sq ft ADU with optional rooftop terrace.",
    imageUrl: "/assets/generated/adu-shell-type-b.dim_600x400.png",
    imageSrcSet: "/assets/generated/adu-shell-type-b.dim_600x400.png 600w",
    badge: "ADU",
    accentColor: "bg-secondary text-forest border border-border/40"
  },
  {
    id: "furniture-compact",
    title: "Furniture Set — Compact",
    description: "Space-optimized furniture collection for studio and one-bedroom lofts.",
    imageUrl: "/assets/generated/furniture-set-compact.dim_600x400.png",
    imageSrcSet: "/assets/generated/furniture-set-compact.dim_600x400.png 600w",
    badge: "Furniture",
    accentColor: "bg-gold/20 text-gold border-gold/30"
  },
  {
    id: "furniture-sovereign",
    title: "Furniture Set — Sovereign",
    description: "Premium curated collection for full-floor sovereign loft residences.",
    imageUrl: "/assets/generated/furniture-set-sovereign.dim_600x400.png",
    imageSrcSet: "/assets/generated/furniture-set-sovereign.dim_600x400.png 600w",
    badge: "Furniture",
    accentColor: "bg-gold/20 text-gold border-gold/30"
  }
];
function ProductCard({ product, index }) {
  const { ref, isVisible } = useImageReveal({
    threshold: 0.1,
    rootMargin: `0px 0px -${30 + index * 10}px 0px`
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `group bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "image-reveal-visible" : "image-reveal-hidden"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/2] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              srcSet: product.imageSrcSet,
              sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
              alt: product.title,
              width: 600,
              height: 400,
              loading: "lazy",
              decoding: "async",
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-3 left-3 text-xs font-body font-semibold px-2.5 py-1 rounded-full border ${product.accentColor}`,
              children: product.badge
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-base font-semibold text-foreground mb-1.5 leading-snug", children: product.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-foreground/60 leading-relaxed mb-4", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/catalog",
              className: "\n            inline-flex items-center gap-1.5\n            text-xs font-body font-semibold text-primary\n            hover:text-primary/80 transition-colors duration-200\n            group/link\n          ",
              children: [
                "View in Catalog",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "transition-transform duration-200 group-hover/link:translate-x-0.5", children: "→" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ProductTeaserGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Catalog Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground", children: "Featured Products" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6", children: products.map((product, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index }, product.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-10 sm:mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/catalog",
        className: "\n              inline-flex items-center gap-2\n              px-6 py-3 sm:px-7 sm:py-3.5\n              bg-primary text-primary-foreground\n              font-body font-semibold text-sm sm:text-base\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-lg hover:bg-primary/90\n              active:scale-95\n            ",
        children: "Browse Full Catalog"
      }
    ) })
  ] }) });
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InspirationCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProductTeaserGrid, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-28 bg-forest text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-gold/70 mb-4", children: "Our Mission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-6 sm:mb-8 leading-tight", children: [
        "Sovereign Living,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold block sm:inline sm:ml-2", children: "On-Chain" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-cream/75 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto", children: "We believe housing should be a right, not a commodity. By placing membership and ownership records on the Internet Computer, we eliminate custodians, reduce friction, and give residents true sovereignty over their homes in Spokane, Washington." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/membership",
          className: "\n              inline-flex items-center gap-2\n              px-7 py-3.5 sm:px-8 sm:py-4\n              bg-gold text-forest\n              font-body font-bold text-base sm:text-lg\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-xl hover:bg-gold/90\n              active:scale-95\n            ",
          children: "Join the Community"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "community", className: "py-16 sm:py-20 lg:py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Why Actuality Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground", children: "Built Different" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8", children: [
        {
          icon: "🏛️",
          title: "Historic Preservation",
          desc: "Every renovation decision honors the 1902 architectural heritage of McKinley Elementary School in Spokane, Washington."
        },
        {
          icon: "🔗",
          title: "On-Chain Ownership",
          desc: "Your membership badge is a custodian-free NFT on the Internet Computer — you own it, period."
        },
        {
          icon: "🌿",
          title: "Sovereign Community",
          desc: "Cohort-based living with up to 12 trusted members per household, governed on-chain."
        }
      ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-background rounded-2xl border border-border/30 shadow-warm p-6 sm:p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl sm:text-4xl mb-4", children: card.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-lg sm:text-xl font-bold text-primary mb-2", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/70 leading-relaxed", children: card.desc })
          ]
        },
        card.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 sm:mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3", children: "Your Membership Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm sm:text-base text-foreground/60", children: "Track your trial, upgrade your tier, or mint your on-chain badge." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MembershipCard, {})
    ] }) })
  ] });
}
export {
  LandingPage as default
};
