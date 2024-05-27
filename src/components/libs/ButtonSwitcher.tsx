import { useEffect, useRef, useState } from "react";

/*
 CSS to disable fade-in animation
 ::view-transition-old(root),
 ::view-transition-new(root) {
    animation: none;
  }
*/
/* function useTheme() {
  const themeValue = window.localStorage.getItem("theme");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const theme = themeValue || systemTheme;

  const setTheme = (value: string) => {
    window.localStorage.setItem("theme", value);
    //document.documentElement.classList.toggle("dark");
  };

  return { setTheme, theme };
}

function useThemeTransition() {
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const md = window.matchMedia("(max-width: 768px)").matches;

      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(isDark ? "light" : "dark");
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setTheme(isDark ? "light" : "dark");
        });
      });

      transition.ready.then(() => {
        const duration = md ? 400 : 600;

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
            filter: [`blur(5px)`, `blur(0)`],
          },
          {
            duration,
            easing: "cubic-bezier(.76,.32,.29,.99)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [setTheme, isDark]
  );

  return {
    theme,
    toggleTheme,
  };
} */

function ButtonSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const toggleDarkMode = async (isDarkMode: boolean) => {
    const { top, left, width, height } = ref.current!.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  return (
    <button
      className="text-muted dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center"
      type="button"
      ref={ref}
      onClick={() => toggleDarkMode(!isDarkMode)}
    >
      {!isDarkMode ? (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
          />
        </svg>
      )}
    </button>
  );
}

export default ButtonSwitcher;
