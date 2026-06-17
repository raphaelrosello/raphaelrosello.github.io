/* ALPS mockups — shared sample data + helpers (window.ALPS).
   Values are chosen so the compute chains tie out arithmetically. */
window.ALPS = (function () {
  function peso(n) {
    var neg = n < 0; n = Math.abs(Number(n) || 0);
    var s = n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "(" : "") + s + (neg ? ")" : "");
  }
  function php(n) { return "₱" + peso(n); }

  var routes = [
    { id: 0, code: "BAT", name: "Batangas" },
    { id: 2, code: "BIC", name: "BICOL" },
    { id: 1, code: "RORO", name: "RORO (ferry)" },
    { id: 3, code: "SJ",  name: "San Juan" },
    { id: 9, code: "PAN", name: "Panay (local)" },
    { id: 99, code: "ADD", name: "Added / Re-adder" },
  ];

  var buses = [
    { code: "0123", desc: "Hino RK1J", ac: true  },
    { code: "0241", desc: "Hino RN8J", ac: true  },
    { code: "4501", desc: "Isuzu LT",  ac: false },
    { code: "4732", desc: "Daewoo BV", ac: false },
    { code: "0318", desc: "Yutong ZK", ac: true  },
  ];

  var crew = [
    { code: "D-104", name: "Reyes, Mario A.",    role: "Driver",    fund: 1.0 },
    { code: "D-117", name: "Santos, Eduardo P.", role: "Driver",    fund: 1.5 },
    { code: "C-209", name: "Dela Cruz, Jun B.",  role: "Conductor", fund: 1.0 },
    { code: "C-233", name: "Aguilar, Noel R.",   role: "Conductor", fund: 1.0 },
  ];

  /* Chart of accounts (subset used in Phase-1 postings; codes from §5/§9) */
  var accounts = [
    { gl: "10000", sub: "10000",     name: "Cash on Hand" },
    { gl: "10000", sub: "10000-CB1", name: "Cash in Bank — BPI Savings" },
    { gl: "10000", sub: "10000-PC",  name: "Petty Cash" },
    { gl: "10000", sub: "10000-CSO", name: "Cash Short / Over" },
    { gl: "19300", sub: "19600",     name: "Funds Payable — Driver SSS" },
    { gl: "19300", sub: "19700",     name: "Funds Payable — Conductor SSS" },
    { gl: "20000", sub: "20000",     name: "Accounts Payable" },
    { gl: "22000", sub: "22000",     name: "Revenue — Passenger Fares" },
    { gl: "23000", sub: "23000-CO",  name: "Commission Payable" },
    { gl: "24011", sub: "24011",     name: "Interest Expense" },
    { gl: "24000", sub: "24000",     name: "Salaries & Wages" },
  ];

  var books = [
    { code: "CRJ",  name: "Cash Receipts Journal",          source: "auto from remittance" },
    { code: "GJ",   name: "General Journal",                source: "manual" },
    { code: "CHDJ", name: "Cash Disbursement Journal",      source: "check vouchers" },
    { code: "CADJ", name: "Cash Advance Disbursement Journal", source: "cash vouchers" },
  ];

  var busCategories = ["Aircon — Batangas", "Ordinary — Batangas", "Aircon — San Juan", "Ordinary — Lemery"];

  return { peso: peso, php: php, routes: routes, buses: buses, crew: crew,
           accounts: accounts, books: books, busCategories: busCategories };
})();
