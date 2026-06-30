/* ALPS mockups — shared shell.
   Each page sets on <body>:
     data-active   nav key (dashboard|remittance|teller|journal|books|checker)
     data-base     relative path to mockups root ("" for root files, "../" for subfolder pages)
     data-title    page title shown in the topbar
     data-crumbs   optional "Label>href|Label" breadcrumb trail (href relative to base)
   The page's own content lives inside <main id="page">…</main>.
   This script builds the sidebar + topbar and slots the content in. Works on file://. */
(function () {
  var body = document.body;
  var base = body.dataset.base || "";
  var active = body.dataset.active || "";
  var title = body.dataset.title || "ALPS";

  var NAV = [
    { group: "Operations", items: [
      { key: "dashboard",  label: "Dashboard",         href: "dashboard.html",          icon: "grid" },
      { key: "remittance", label: "Remittance",        href: "remittance/index.html",   icon: "receipt" },
      { key: "teller",     label: "Teller / DCR",      href: "teller/index.html",       icon: "cash" },
      { key: "charter",    label: "Special Trip",      href: "charter/index.html",      icon: "ticket" },
    ]},
    { group: "Accounting", items: [
      { key: "journal",    label: "General Journal",   href: "journal/index.html",      icon: "book" },
      { key: "books",      label: "Books of Accounts", href: "books/index.html",        icon: "books" },
      { key: "checker",    label: "Account Checker",   href: "checker/index.html",      icon: "search" },
      { key: "banking",    label: "Cash Manager",      href: "banking/index.html",      icon: "bank" },
      { key: "cashadvance",label: "Cash Advance",      href: "cashadvance/index.html",  icon: "cash" },
    ]},
    { group: "Payroll & HR", items: [
      { key: "payroll",    label: "Payroll",           href: "payroll/index.html",      icon: "users" },
      { key: "attendance", label: "Attendance / DTR",  href: "attendance/index.html",   icon: "calendar" },
      { key: "hr",         label: "201 Files",         href: "hr/index.html",           icon: "id" },
    ]},
    { group: "Fleet & Inventory", items: [
      { key: "fleet",      label: "Bus Info",          href: "fleet/index.html",        icon: "bus" },
      { key: "inventory",  label: "Inventory",         href: "inventory/index.html",    icon: "box" },
      { key: "suppliers",  label: "Suppliers",         href: "suppliers/index.html",    icon: "truck" },
    ]},
    { group: "Admin", items: [
      { key: "admin",      label: "Users & Access",    href: "admin/index.html",        icon: "shield" },
      { key: "reports",    label: "Reports",           href: "reports/index.html",      icon: "chart" },
    ]},
  ];

  var ICONS = {
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    receipt:'<path d="M5 3h14v18l-3-2-3 2-3-2-3 2zM8 8h8M8 12h8"/>',
    cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
    book:'<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM9 4v14"/>',
    books:'<path d="M4 5h4v14H4zM10 5h4v14h-4zM16 6l4 1-2 13-4-1z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6"/>',
    bank:'<path d="M3 10 12 4l9 6M5 10v8M19 10v8M3 20h18"/>',
    bus:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M3 11h18M7 17v2M17 17v2"/>',
    id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M14 10h4M14 14h4"/>',
    box:'<path d="M3 7 12 3l9 4-9 4zM3 7v10l9 4 9-4V7"/>',
    ticket:'<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M13 7v10"/>',
    calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    truck:'<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    shield:'<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
    chart:'<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7"/>',
  };
  function icon(n){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">'+(ICONS[n]||'')+'</svg>'; }

  function navHtml() {
    return NAV.map(function (g) {
      var items = g.items.map(function (it) {
        var cls = "nav-link" + (it.key === active ? " active" : "") + (it.disabled ? " disabled" : "");
        var href = it.disabled ? "#" : base + it.href;
        var soon = it.disabled ? '<span class="badge badge-gray" style="margin-left:auto;font-size:.6rem">soon</span>' : '';
        return '<a class="'+cls+'" href="'+href+'">'+icon(it.icon)+'<span>'+it.label+'</span>'+soon+'</a>';
      }).join("");
      return '<div class="px-3 pt-4 pb-1 nav-group">'+g.group+'</div><nav class="px-2 space-y-0.5">'+items+'</nav>';
    }).join("");
  }

  function crumbsHtml() {
    var raw = body.dataset.crumbs;
    var parts = ['<a href="'+base+'dashboard.html" class="hover:text-gray-700">ALPS</a>'];
    if (raw) {
      raw.split("|").forEach(function (seg) {
        var bits = seg.split(">");
        if (bits[1]) parts.push('<a href="'+base+bits[1]+'" class="hover:text-gray-700">'+bits[0]+'</a>');
        else parts.push('<span class="text-gray-700 font-medium">'+bits[0]+'</span>');
      });
    }
    return parts.join('<span class="px-1.5 text-gray-300">/</span>');
  }

  var shell = document.createElement("div");
  shell.innerHTML =
    '<aside id="sidebar" class="alps-side fixed inset-y-0 left-0 w-64 flex flex-col z-40 -translate-x-full lg:translate-x-0 transition-transform">' +
      '<div class="h-16 flex items-center gap-2.5 px-4 border-b border-slate-800">' +
        '<div class="brand-mark h-8 w-8 rounded-lg grid place-items-center font-bold text-sm">A</div>' +
        '<div class="leading-tight"><div class="text-white font-semibold text-sm">ALPS THE BUS</div>' +
        '<div class="text-slate-400 text-[11px]">Bus System · mockup</div></div>' +
      '</div>' +
      '<div class="flex-1 overflow-y-auto pb-6">' + navHtml() + '</div>' +
      '<div class="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-400">Full system · static prototype</div>' +
    '</aside>' +
    '<div id="backdrop" class="fixed inset-0 bg-black/40 z-30 hidden lg:hidden"></div>' +
    '<div class="lg:pl-64 min-h-screen flex flex-col">' +
      '<header class="h-16 bg-white border-b border-gray-200 flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-20">' +
        '<button id="menuBtn" class="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900" aria-label="Menu">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
        '</button>' +
        '<div class="min-w-0"><div class="text-[12px] text-gray-400 hidden sm:block">'+crumbsHtml()+'</div>' +
        '<h1 class="text-base font-semibold text-gray-900 truncate">'+title+'</h1></div>' +
        '<div class="ml-auto flex items-center gap-3">' +
          '<div class="relative hidden md:block"><input class="input" style="width:15rem;padding-left:2rem" placeholder="Search…">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-2.5 top-2.5 text-gray-400"><circle cx="11" cy="11" r="7"/><path d="m21 21-3-3"/></svg></div>' +
          '<div class="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-xs font-semibold">RR</div>' +
        '</div>' +
      '</header>' +
      '<div id="content" class="flex-1"></div>' +
    '</div>';

  var page = document.getElementById("page");
  // move shell to front of body, then relocate page content into #content
  while (shell.firstChild) body.insertBefore(shell.firstChild, body.firstChild);
  if (page) document.getElementById("content").appendChild(page);

  // mobile sidebar toggle
  var sb = document.getElementById("sidebar"), bd = document.getElementById("backdrop");
  function open(o){ sb.classList.toggle("-translate-x-full", !o); bd.classList.toggle("hidden", !o); }
  var mb = document.getElementById("menuBtn");
  if (mb) mb.addEventListener("click", function(){ open(true); });
  if (bd) bd.addEventListener("click", function(){ open(false); });

  body.classList.add("app-ready");
})();
