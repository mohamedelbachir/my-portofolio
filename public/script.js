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
    //changeGiscusTheme(theme || systemTheme)
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
  /*  window.addEventListener("load", () => {
    let postContainer = document.querySelector(".filter-container");
    if (postContainer) {
      let postIsotope = new Isotope(postContainer, {
        itemSelector: ".card",
      });

      let postFilters = document.querySelectorAll("#filter-item");

      attachEvent("click", "#filter-item", function (e) {
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
  }); */

  /**isotope */
  // init Isotope

  const isoDeclaration = () => {
    // bind filter button click
    var iso = new Isotope(".filter-card-container", {
      itemSelector: ".card",
      layoutMode: "fitRows",
    });
    var filtersElem = document.querySelectorAll(".filter-chip");
    filtersElem.forEach((e) => {
      e.addEventListener("click", function () {
        filtersElem.forEach((e) => {
          e.classList.remove("active");
        });
        var filterValue = e.getAttribute("data-filter");
        e.classList.add("active");
        iso.arrange({ filter: filterValue });
      });
    });
  };
  
  const fetchMetric=()=>{
      const Likes = document.querySelectorAll(".like");
      const Views = document.querySelectorAll(".view");
      Likes.forEach(async(l)=>{
        const slug=l.getAttribute('data-slug')
        const response = await fetch(`/api/like?slug=${slug}`);
        const result=await response.json()
        l.innerHTML=result.total??0;
      })
      Views.forEach(async(v)=>{
        const slug=v.getAttribute('data-slug')
        const response = await fetch(`/api/views?slug=${slug}`);
        const result=await response.json()
        v.innerText=result.total??0;
      })
      //c
  }
  

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
  function addIntersectionObserver() {
    const observer = new IntersectionObserver((sections) => {
      sections.forEach((section) => {
        const heading = section.target.querySelector("h2, h3, h4, h5");
        if (!heading) return;
        const id = heading.getAttribute("id");

        // Get the link to this section's heading
        const link = document.querySelector(
          `nav.article-toc li a[href="#${id}"]`
        );
        if (!link) return;

        // Add/remove the .active class based on whether the
        // section is visible
        const addRemove = section.intersectionRatio > 0 ? "add" : "remove";
        link.classList[addRemove]("active");
      });
    });
    document.querySelectorAll(".article-content section").forEach((section) => {
      observer.observe(section);
    });
  }
  function fixHiddingHeader() {
    // Get the header element
    var header = document.querySelector("header");

    // Get the height of the header
    var headerHeight = header.offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();

        // Get the target element that
        // the anchor link points to
        var target = document.querySelector(this.getAttribute("href"));

        var targetPosition =
          target.getBoundingClientRect().top - headerHeight - 10;

        window.scrollTo({
          top: targetPosition + window.pageYOffset,
          behavior: "smooth",
        });
      });
    });
  }
  const onLoad = function () {
    addIntersectionObserver();
    fixHiddingHeader();
    isoDeclaration();
    fetchMetric();
    attachEvent("#menu", "click", () => {
      const nav = document.querySelector("nav");
      nav?.classList.toggle("open");
    });
    attachEvent("[data-download-cv]", "click", function (_, elem) {
      const newlink = document.createElement("a");
      var userLang = navigator.language || navigator.userLanguage;
      newlink.href = userLang.includes("fr")
        ? "/CV/CV_fr.pdf"
        : "/CV/CV_en.pdf";
      newlink.click();
    });
    attachEvent("[data-hire-me]", "click", function (_, elem) {
      const newlink = document.createElement("a");
      newlink.target = "_blank";
      newlink.href =
        "mailto:mohamedelbachirboubanganadakou@gmail.com?subject=Hi, Bachir are you looking for a job";
      newlink.click();
    });
    attachEvent("[data-blog]", "click", function (_, elem) {
      const newlink = document.createElement("a");
      const url = encodeURIComponent(elem.getAttribute("data-demo"));
      newlink.target = "_blank";
      newlink.href = url;
      console.log("clicked");
      newlink.click();
    });
    attachEvent("[data-aw-social-share]", "click", function (_, elem) {
      const network = elem.getAttribute("data-aw-social-share");
      const url = encodeURIComponent(elem.getAttribute("data-aw-url"));
      const text = encodeURIComponent(elem.getAttribute("data-aw-text"));

      let href = "";
      switch (network) {
        case "facebook":
          href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
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
          duration: 600,
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
    fetchMetric();
  });
})();
