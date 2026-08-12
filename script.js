(() => {
  const LANG_KEY = "arkon-proposal-lang";
  const coverSheet = document.getElementById("sheet");
  const stage = document.getElementById("stage");
  const sheets = [...document.querySelectorAll(".sheet")];
  if (!coverSheet || !stage || !sheets.length || typeof I18N === "undefined") return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const pad2 = (n) => String(n).padStart(2, "0");
  const now = new Date();

  const t = (key, lang, vars = {}) => {
    const val = I18N[lang]?.[key];
    if (typeof val !== "string") return "";
    return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
  };

  const formatDate = (lang) =>
    new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);

  let currentLang = localStorage.getItem(LANG_KEY) || "ar";
  if (!I18N[currentLang]) currentLang = "ar";

  let rail = null;

  const applyDates = (lang) => {
    const formatted = formatDate(lang);
    document.querySelectorAll("[data-date-local]").forEach((el) => {
      el.textContent = formatted;
    });
  };

  const applyPageNumbers = () => {
    const total = Math.max(sheets.length, 1);
    sheets.forEach((page, i) => {
      const current = page.querySelector("[data-page-current]");
      const totalEl = page.querySelector("[data-page-total]");
      if (current) current.textContent = pad2(i + 1);
      if (totalEl) totalEl.textContent = pad2(total);
    });
  };

  const updatePageKickers = (lang) => {
    sheets.forEach((sheet) => {
      const kicker = sheet.querySelector(".page-kicker");
      if (!kicker) return;
      const pageNum = sheet.querySelector("[data-page-current]")?.textContent || "";
      kicker.textContent = t("common.page", lang, { n: pageNum });
    });
  };

  const updateProgressRail = (lang) => {
    if (!rail) return;
    rail.setAttribute("aria-label", t("common.progressRail", lang));
    [...rail.children].forEach((btn, i) => {
      const n = pad2(i + 1);
      btn.title = t("common.page", lang, { n });
      btn.setAttribute("aria-label", t("common.goToPage", lang, { n: i + 1 }));
    });
  };

  const langSwitch = document.getElementById("langSwitch");

  const updateLangButtons = (lang) => {
    if (langSwitch) langSwitch.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-set-lang]").forEach((btn) => {
      const active = btn.getAttribute("data-set-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  const applyLanguage = (lang, { animate = true } = {}) => {
    if (!I18N[lang]) return;
    if (animate && lang === currentLang) return;

    const run = () => {
      currentLang = lang;
      localStorage.setItem(LANG_KEY, lang);

      const dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;

      document.title = t("meta.title", lang);
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", t("meta.description", lang));

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (key) el.textContent = t(key, lang);
      });

      document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria");
        if (key) el.setAttribute("aria-label", t(key, lang));
      });

      applyDates(lang);
      updatePageKickers(lang);
      updateProgressRail(lang);
      updateLangButtons(lang);
    };

    if (animate) {
      updateLangButtons(lang);
      document.body.classList.add("is-lang-switching");
      window.setTimeout(() => {
        run();
        window.setTimeout(() => {
          document.body.classList.remove("is-lang-switching");
        }, 50);
      }, 200);
    } else {
      run();
    }
  };

  applyPageNumbers();

  /* Clear SVG icons for feature / diff / role blocks */
  const ICON_PATHS = {
    leads:
      '<path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"/><path d="M4 20a8 8 0 0 1 16 0"/><path d="M19 8v4"/><path d="M17 10h4"/>',
    pipeline:
      '<path d="M4 4h5v16H4z"/><path d="M11 8h5v12h-5z"/><path d="M18 13h2v7h-2z"/>',
    followup:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M8 15h4"/>',
    contacts:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    inventory:
      '<path d="M3 9.5 12 4l9 5.5v10l-9 5.5-9-5.5Z"/><path d="M12 14.5V22"/><path d="M3 9.5l9 5.5 9-5.5"/>',
    masterplan:
      '<path d="M3 6h7v7H3z"/><path d="M14 6h7v4h-7z"/><path d="M14 14h7v4h-7z"/><path d="M3 17h7v1H3z"/>',
    reserve:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/><path d="M10 15h4"/>',
    deals:
      '<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    commission:
      '<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15.5 9.5c0-1.4-1.6-2.5-3.5-2.5s-3.5 1.1-3.5 2.5 1.6 2.5 3.5 2.5 3.5 1.1 3.5 2.5-1.6 2.5-3.5 2.5-3.5-1.1-3.5-2.5"/>',
    investor:
      '<path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h5v5"/>',
    accounting:
      '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h5"/>',
    finance:
      '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01"/><path d="M18 12h.01"/>',
    marketing:
      '<path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M16 8.5a4.5 4.5 0 0 1 0 7"/><path d="M18.5 6a8 8 0 0 1 0 12"/>',
    targets:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    hr: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/>',
    brokers:
      '<path d="M3 21h18"/><path d="M5 21V8l7-4 7 4v13"/><path d="M9 21v-6h6v6"/>',
    reports:
      '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v-4"/><path d="M12 15V8"/><path d="M16 15v-7"/>',
    intel:
      '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2.5"/><path d="M12 3v2"/><path d="M12 19v2"/>',
    risk:
      '<path d="M12 3 3 20h18Z"/><path d="M12 9v5"/><path d="M12 17h.01"/>',
    partners:
      '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20a5 5 0 0 1 10 0"/><path d="M11 20a5 5 0 0 1 10 0"/>',
    security:
      '<path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7Z"/><path d="M9.5 12.5 11 14l3.5-3.5"/>',
    mobile:
      '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    workflow:
      '<path d="M6 3v6"/><circle cx="6" cy="11" r="2"/><path d="M6 13v8"/><path d="M18 3v10"/><circle cx="18" cy="15" r="2"/><path d="M18 17v4"/><path d="M8 11h8"/>',
    docs:
      '<path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/>',
    journey:
      '<circle cx="6" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><path d="M7.5 16.5 10.5 13.5"/><path d="M13.5 10.5 16.5 7.5"/>',
    plan:
      '<path d="M4 4h16v16H4z"/><path d="M4 10h16"/><path d="M10 4v16"/>',
    ops:
      '<circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.9 4.9 7 7"/><path d="M17 17l2.1 2.1"/><path d="M19.1 4.9 17 7"/><path d="M7 17l-2.1 2.1"/>',
    whitelabel:
      '<path d="M12 3 4 7v5c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V7Z"/><path d="M9 12h6"/>',
    owner:
      '<path d="M12 2 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6Z"/>',
    coo:
      '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M8 16h8"/>',
    sales:
      '<path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h5v5"/>',
  };

  const iconSvg = (name) => {
    const paths = ICON_PATHS[name];
    if (!paths) return "";
    return `<svg class="block-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
  };

  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!name || el.querySelector(".block-icon")) return;
    el.insertAdjacentHTML("afterbegin", iconSvg(name));
  });

  /* Decorative layers + reveal tagging */
  sheets.forEach((sheet) => {
    if (!sheet.querySelector(".frame")) {
      const frame = document.createElement("div");
      frame.className = "frame";
      frame.setAttribute("aria-hidden", "true");
      sheet.appendChild(frame);
    }

    if (sheet.classList.contains("page-sheet") && !sheet.querySelector(".veil")) {
      const veil = document.createElement("div");
      veil.className = "veil";
      veil.setAttribute("aria-hidden", "true");
      sheet.insertBefore(veil, sheet.firstChild);
    }

    const title = sheet.querySelector(".page-title");
    if (title && !title.previousElementSibling?.classList?.contains("page-kicker")) {
      const kicker = document.createElement("p");
      kicker.className = "page-kicker reveal";
      kicker.style.setProperty("--ri", "0");
      title.before(kicker);
    }

    const revealTargets = sheet.querySelectorAll(
      ".page-kicker, .page-title, .page-lede, .feat-block, .diff-item, .role-cell, .section-label, .closing-line, .cover-cta, .demo-panel, .price-card, .legal-panel"
    );
    revealTargets.forEach((el, idx) => {
      el.classList.add("reveal");
      el.style.setProperty("--ri", String(Math.min(idx, 12)));
    });

    sheet.querySelectorAll(".feat-block li, .price-card li").forEach((li, idx) => {
      li.classList.add("reveal-li");
      li.style.setProperty("--li", String(Math.min(idx, 16)));
    });
  });

  const animatePrice = (el) => {
    if (el.dataset.counted === "1") return;
    const raw = el.textContent.replace(/[^\d]/g, "");
    const target = Number(raw);
    if (!target) return;
    el.dataset.counted = "1";
    const start = performance.now();
    const dur = 1100;
    const tick = (t0) => {
      const p = Math.min(1, (t0 - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* Side progress rail */
  rail = document.querySelector(".progress-rail");
  if (!rail && !reduced) {
    rail = document.createElement("nav");
    rail.className = "progress-rail";
    sheets.forEach((sheet, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.addEventListener("click", () => {
        sheet.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      });
      rail.appendChild(btn);
    });
    document.body.appendChild(rail);
  }

  const setActiveRail = (index) => {
    if (!rail) return;
    [...rail.children].forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
    });
  };

  applyLanguage(currentLang, { animate: false });

  document.querySelectorAll("[data-set-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-set-lang");
      if (lang && lang !== currentLang) applyLanguage(lang);
    });
  });

  const boot = () => {
    requestAnimationFrame(() => {
      sheets.forEach((page) => page.classList.add("is-in"));
      coverSheet.classList.add("is-visible");
      if (!reduced) {
        setTimeout(() => coverSheet.classList.add("is-live"), 1200);
      } else {
        coverSheet.classList.add("is-live");
        sheets.forEach((s) => s.classList.add("is-visible"));
      }
    });
  };

  if (document.fonts?.ready) {
    document.fonts.ready.then(boot).catch(boot);
  } else {
    window.addEventListener("load", boot, { once: true });
    setTimeout(boot, 80);
  }

  /* Intersection reveals for pages */
  if (!reduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          const idx = sheets.indexOf(entry.target);
          if (idx >= 0) setActiveRail(idx);
          if (entry.target.classList.contains("pricing-sheet")) {
            entry.target.querySelectorAll(".price-amount b").forEach(animatePrice);
          }
        });
      },
      { root: null, threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );
    sheets.forEach((sheet) => io.observe(sheet));

    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = sheets.indexOf(visible.target);
        if (idx >= 0) setActiveRail(idx);
      },
      { threshold: [0.25, 0.5, 0.75] }
    );
    sheets.forEach((sheet) => spy.observe(sheet));
  } else {
    sheets.forEach((s) => s.classList.add("is-visible"));
    setActiveRail(0);
  }

  if (reduced || !finePointer) return;

  /* Cover 3D tilt */
  let targetX = 0;
  let targetY = 0;
  let currX = 0;
  let currY = 0;

  const apply = () => {
    currX += (targetX - currX) * 0.08;
    currY += (targetY - currY) * 0.08;
    coverSheet.style.setProperty("--rx", `${currY.toFixed(3)}deg`);
    coverSheet.style.setProperty("--ry", `${currX.toFixed(3)}deg`);

    coverSheet.querySelectorAll("[data-depth]").forEach((node) => {
      const depth = Number(node.getAttribute("data-depth") || 10);
      node.style.transform = `translate3d(${(-currX * depth) / 12}px, ${(currY * depth) / 14}px, 0)`;
    });

    requestAnimationFrame(apply);
  };
  requestAnimationFrame(apply);

  coverSheet.addEventListener(
    "pointermove",
    (e) => {
      const rect = coverSheet.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = px * 10;
      targetY = -py * 7;
    },
    { passive: true }
  );

  coverSheet.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${(-y * 12).toFixed(2)}deg) rotateY(${(x * 14).toFixed(2)}deg) translateZ(8px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      card.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      setTimeout(() => {
        card.style.transition = "";
      }, 450);
    });
  });

  /* Soft magnetic hover on feature blocks */
  document.querySelectorAll(".feat-block, .diff-item, .role-cell, .legal-panel").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${(-2 + y).toFixed(2)}px, 0)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
})();
