"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";
import Cookies from "js-cookie";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { DARK_TOKENS, LIGHT_TOKENS } from "@/constants";

function Header({ theme: initialTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    Cookies.set("theme", theme, { expires: 1000 });
    document.documentElement.setAttribute("data-color-theme", theme);
    const tokens = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;
    document.documentElement.style = Object.entries(tokens)
      .map(([k, v]) => `${k}:${v}`)
      .join("; ");
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
