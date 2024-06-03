(function () {
  function attachEvent(selector, event, fn) {
    const matches =
      typeof selector === "string"
        ? document.querySelectorAll(selector)
        : selector;
    if (matches && matches.length) {
      matches.forEach((elem) => {
        elem.addEventListener(event, (e) => fn(e, elem), false);
      });
    }
  }

  function applyTheme(theme) {
    //const btnToggleTheme = document.querySelector("[data-aw-theme-switcher]");
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }

  const initTheme = function () {
    const theme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    applyTheme(theme || systemTheme);
  };

  initTheme();

  /** back to top */

  const toggleBacktotop = () => {
    let backtotop = document.querySelector("#back-to-top");
    backtotop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
      });
    });
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };

  /**header */
  let lastKnownScrollPosition = window.scrollY;
  let ticking = true;

  function applyHeaderStylesOnScroll() {
    toggleBacktotop();
    const header = document.querySelector("#header");
    const thresholdHeader = 30;
    if (!header) return;
    if (
      lastKnownScrollPosition > thresholdHeader &&
      !header.classList.contains("scroll")
    ) {
      header.classList.add("scroll");
    } else if (
      lastKnownScrollPosition <= thresholdHeader &&
      header.classList.contains("scroll")
    ) {
      header.classList.remove("scroll");
    }
    ticking = false;
  }

  /**
   * isotope and filter
   */
  window.addEventListener("load", () => {
    let postContainer = document.querySelector(".post-container");
    if (postContainer) {
      let postIsotope = new Isotope(postContainer, {
        itemSelector: ".post-item",
      });

      let postFilters = document.querySelectorAll("#post-filter li");

      attachEvent("click", "#post-filter li", function (e) {
        e.preventDefault();
        postFilters.forEach(function (el) {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        postIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        postIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      });
    }
  });

  /**AOS configuratiion */

  const init = () =>
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

  document.addEventListener("astro:page-load", init);
  document.addEventListener("astro:after-swap", init);
  document.addEventListener("load", init);

  const onLoad = function () {
    attachEvent("#menu", "click", () => {
      const nav = document.querySelector("nav");
      nav?.classList.toggle("open");
    });
    attachEvent("[data-download-cv]", "click", function (_, elem) {
      const newlink = document.createElement("a");
      newlink.target = "_blank";
      newlink.href = "/CV/CV EL BACHIR.pdf";
      newlink.click();
    });
     attachEvent("[data-hire-me]", "click", function (_, elem) {
      const newlink = document.createElement("a");
      newlink.target = "_blank";
      newlink.href = "mailto:bachdev237@gmail.com?subject=Hi, Bachir are you looking for a job";
      newlink.click();
    });
    attachEvent("[data-aw-social-share]", "click", function (_, elem) {
      const network = elem.getAttribute("data-aw-social-share");
      const url = encodeURIComponent(elem.getAttribute("data-aw-url"));
      const text = encodeURIComponent(elem.getAttribute("data-aw-text"));

      let href;
      switch (network) {
        case "facebook":
          href = `https://www.facebook.com/sharer.php?u=${url}`;
          break;
        case "twitter":
          href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
          break;
        case "linkedin":
          href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
          break;
        case "whatsapp":
          href = `https://wa.me/?text=${text}%20${url}`;
          break;
        case "mail":
          href = `mailto:?subject=%22${text}%22&body=${text}%20${url}`;
          break;

        default:
          return;
      }

      const newlink = document.createElement("a");
      newlink.target = "_blank";
      newlink.href = href;
      newlink.click();
    });

    const screenSize = window.matchMedia("(max-width: 767px)");
    screenSize.addEventListener("change", function () {
      //
    });

    applyHeaderStylesOnScroll();

    attachEvent([document], "scroll", function () {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyHeaderStylesOnScroll();
        });
        ticking = true;
      }
    });

    const handleToggleClick = async (e, elmt) => {
      const element = document.documentElement;

      const toogleDark = () => {
        element.classList.toggle("dark");
        const isDark = element.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      };

      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        toogleDark();
        return;
      }

      await document.startViewTransition(() => {
        setTimeout(() => {
          toogleDark();
        }, 0);
      }).ready;

      const { top, left, width, height } = elmt.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;
      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRadius = Math.hypot(
        Math.max(left, right),
        Math.max(top, bottom)
      );

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    };

    attachEvent("#themeToggle", "click", handleToggleClick);
  };
  document.addEventListener("astro:before-swap", () => {
    applyHeaderStylesOnScroll();
  });
  const onPageShow = function () {
    document.documentElement.classList.add("motion-safe:scroll-smooth");
  };

  window.onload = onLoad;
  window.onpageshow = onPageShow;

  document.addEventListener("astro:after-swap", () => {
    initTheme();
    onLoad();
    onPageShow();
  });
})();
