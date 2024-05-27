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
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  applyTheme(theme || systemTheme);
};

initTheme();

const onLoad = function () {
  let lastKnownScrollPosition = window.scrollY;
  let ticking = true;

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

  function applyHeaderStylesOnScroll() {
    const header = document.querySelector("#header");
    if (!header) return;
    if (lastKnownScrollPosition > 60 && !header.classList.contains("scroll")) {
      header.classList.add("scroll");
    } else if (
      lastKnownScrollPosition <= 60 &&
      header.classList.contains("scroll")
    ) {
      header.classList.remove("scroll");
    }
    ticking = false;
  }
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
};
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
/**function attachEvent(
  selector: string | Document[],
  event: string,
  fn: Function
) {
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

function applyTheme(theme: string) {
  const btnToggleTheme = document.querySelector("[data-aw-theme-switcher]");
  btnToggleTheme?.classList.remove("light", "dark");
  btnToggleTheme?.classList.add(theme);
  localStorage.setItem("theme", theme);
}

const initTheme = function () {
  console.log("hola!");

  const theme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  applyTheme(theme || systemTheme);
};

initTheme();

const onLoad = function () {
  let lastKnownScrollPosition = window.scrollY;
  let ticking = true;
  console.log("init");

  attachEvent(
    "[data-aw-social-share]",
    "click",
    function (_: any, elem: HTMLElement) {
      const network = elem.getAttribute("data-aw-social-share");
      const url = encodeURIComponent(
        elem.getAttribute("data-aw-url") as string
      );
      const text = encodeURIComponent(
        elem.getAttribute("data-aw-text") as string
      );

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
    }
  );

  const screenSize = window.matchMedia("(max-width: 767px)");
  screenSize.addEventListener("change", function () {
    //
  });

  function applyHeaderStylesOnScroll() {
    const header = document.querySelector("#header");
    if (!header) return;
    if (lastKnownScrollPosition > 60 && !header.classList.contains("scroll")) {
      header.classList.add("scroll");
    } else if (
      lastKnownScrollPosition <= 60 &&
      header.classList.contains("scroll")
    ) {
      header.classList.remove("scroll");
    }
    ticking = false;
  }
  applyHeaderStylesOnScroll();

  attachEvent("body", "scroll", function () {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        applyHeaderStylesOnScroll();
      });
      ticking = true;
    }
  });
};
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
 */
