import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ── Initial user data (replace with API call in production)
const INITIAL_USERS = [
  { id:1,  first:"Somchai",  last:"Jaidee",      email:"somchai@email.com",    phone:"081-234-5678", date:"11 Mar 2026", status:"pending"  },
  { id:2,  first:"Nattaya",  last:"Srisuk",      email:"nattaya@gmail.com",    phone:"089-876-5432", date:"11 Mar 2026", status:"pending"  },
  { id:3,  first:"Prayut",   last:"Wongsri",     email:"prayut.w@mail.com",    phone:"062-345-6789", date:"10 Mar 2026", status:"pending"  },
  { id:4,  first:"Malee",    last:"Thongdee",    email:"malee.t@email.co.th",  phone:"093-456-7890", date:"10 Mar 2026", status:"pending"  },
  { id:5,  first:"Krit",     last:"Suwan",       email:"krit.s@hotmail.com",   phone:"086-567-8901", date:"10 Mar 2026", status:"pending"  },
  { id:6,  first:"Anchalee", last:"Kaewsai",     email:"anchalee@email.com",   phone:"082-678-9012", date:"9 Mar 2026",  status:"approved" },
  { id:7,  first:"Wanchai",  last:"Pattana",     email:"wanchai.p@mail.com",   phone:"091-789-0123", date:"9 Mar 2026",  status:"approved" },
  { id:8,  first:"Siriporn", last:"Nilsuk",      email:"siri.n@email.co.th",   phone:"085-890-1234", date:"8 Mar 2026",  status:"approved" },
  { id:9,  first:"Prasert",  last:"Duangdee",    email:"prasert@email.com",    phone:"087-901-2345", date:"8 Mar 2026",  status:"rejected" },
  { id:10, first:"Nittaya",  last:"Charoenwong", email:"nittaya@gmail.com",    phone:"094-012-3456", date:"8 Mar 2026",  status:"approved" },
];

const AV_COLORS = ["av-red","av-blue","av-green","av-amber","av-purple"];

function getInitials(u) { return (u.first[0] + u.last[0]).toUpperCase(); }
function getAvColor(id)  { return AV_COLORS[(id - 1) % AV_COLORS.length]; }

function StatusBadge({ status }) {
  const map   = { pending: "b-pending", approved: "b-approved", rejected: "b-rejected" };
  const icons = { pending: "⏳", approved: "✅", rejected: "❌" };
  return (
    <span className={`badge ${map[status]}`}>
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ════════════════════════════════════════════════
//  APPROVE MODAL
// ════════════════════════════════════════════════
function ApproveModal({ user, onClose, onConfirm }) {
  const [note, setNote] = useState("");
  if (!user) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-icon mi-green">✅</div>
          <div>
            <h3>Approve Account</h3>
            <p>Grant access to the postal system</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-user-card">
            <div className={`modal-user-av ${getAvColor(user.id)}`}>{getInitials(user)}</div>
            <div>
              <div className="modal-user-name">{user.first} {user.last}</div>
              <div className="modal-user-email">{user.email}</div>
              <div className="modal-user-phone">{user.phone}</div>
            </div>
          </div>
          <div className="modal-info-grid">
            <div className="modal-info-item"><label>Registered</label><p>{user.date}</p></div>
            <div className="modal-info-item"><label>Current Status</label><p>⏳ Pending Review</p></div>
          </div>
          <div className="modal-note">
            <label>Note (optional)</label>
            <textarea rows={3} placeholder="Add a note for this approval…" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-btn-confirm confirm-approve" onClick={() => onConfirm("approved")}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              Approve Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
//  REJECT MODAL
// ════════════════════════════════════════════════
function RejectModal({ user, onClose, onConfirm }) {
  const [note, setNote] = useState("");
  if (!user) return null;
  return (
    <div className="modal-overlay show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-icon mi-red">❌</div>
          <div>
            <h3>Reject Account</h3>
            <p>Deny access to this user</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-user-card">
            <div className={`modal-user-av ${getAvColor(user.id)}`}>{getInitials(user)}</div>
            <div>
              <div className="modal-user-name">{user.first} {user.last}</div>
              <div className="modal-user-email">{user.email}</div>
              <div className="modal-user-phone">{user.phone}</div>
            </div>
          </div>
          <div className="modal-note">
            <label>Reason for rejection <span style={{ color: "var(--accent)" }}>*</span></label>
            <textarea rows={3} placeholder="Provide a reason (e.g. incomplete info, duplicate account)…" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="modal-footer">
            <button className="modal-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="modal-btn-confirm confirm-reject" onClick={() => onConfirm("rejected")}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              Reject Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════════
function Toast({ toast }) {
  return (
    <div className={`toast ${toast.type} ${toast.show ? "show" : ""}`}>
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
      </svg>
      <span>{toast.msg}</span>
    </div>
  );
}

// ════════════════════════════════════════════════
//  PDF EXPORT UTILITY
// ════════════════════════════════════════════════
function exportToPDF(users, filter) {
  const statusLabel = filter === "all" ? "All Users" : filter.charAt(0).toUpperCase() + filter.slice(1);
  const now = new Date().toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });

  const rows = users.map((u, i) => `
    <tr style="background:${i % 2 === 0 ? "#fff" : "#fdf8f8"}">
      <td style="padding:9px 12px;font-size:12px;border-bottom:1px solid #f0dada;">${u.first} ${u.last}</td>
      <td style="padding:9px 12px;font-size:12px;border-bottom:1px solid #f0dada;color:#7c5555;">${u.email}</td>
      <td style="padding:9px 12px;font-size:12px;border-bottom:1px solid #f0dada;">${u.phone}</td>
      <td style="padding:9px 12px;font-size:12px;border-bottom:1px solid #f0dada;color:#7c5555;">${u.date}</td>
      <td style="padding:9px 12px;font-size:12px;border-bottom:1px solid #f0dada;">
        <span style="
          display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
          background:${u.status==="approved"?"#f0fdf4":u.status==="rejected"?"#fff0f0":"#fffbeb"};
          color:${u.status==="approved"?"#16a34a":u.status==="rejected"?"#c0392b":"#d97706"};
          border:1px solid ${u.status==="approved"?"#bbf7d0":u.status==="rejected"?"#f5cece":"#fde68a"};
        ">${u.status==="approved"?"✅":u.status==="rejected"?"❌":"⏳"} ${u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span>
      </td>
    </tr>`).join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>User Approval Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #fff; color: #1a0a0a; padding: 32px; }
    .header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 2px solid #f0dada; margin-bottom: 24px; }
    .logo { display: flex; align-items: center; gap: 12px; }
    .logo-icon { width: 44px; height: 44px; background: linear-gradient(135deg,#c0392b,#e07070); border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 22px; }
    .logo-text h1 { font-size: 18px; font-weight: 700; color: #1a0a0a; }
    .logo-text p { font-size: 11px; color: #7c5555; margin-top: 2px; }
    .report-meta { text-align: right; }
    .report-meta h2 { font-size: 15px; font-weight: 700; color: #c0392b; }
    .report-meta p { font-size: 11px; color: #7c5555; margin-top: 3px; }
    .stats { display: flex; gap: 14px; margin-bottom: 24px; }
    .stat { flex: 1; background: #fdf8f8; border: 1px solid #f0dada; border-radius: 10px; padding: 12px 16px; }
    .stat .num { font-size: 22px; font-weight: 700; color: #1a0a0a; }
    .stat .lbl { font-size: 11px; color: #7c5555; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; border-radius: 10px; overflow: hidden; border: 1px solid #f0dada; }
    thead tr { background: linear-gradient(135deg,#c0392b,#e07070); }
    thead th { padding: 11px 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #fff; text-align: left; }
    .footer { margin-top: 28px; padding-top: 16px; border-top: 1px solid #f0dada; display: flex; justify-content: space-between; font-size: 10px; color: #7c5555; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-icon">📮</div>
      <div class="logo-text">
        <h1>Thailand Post Office</h1>
        <p>Admin Portal — User Management</p>
      </div>
    </div>
    <div class="report-meta">
      <h2>User Approval Report</h2>
      <p>Filter: ${statusLabel} &nbsp;|&nbsp; Generated: ${now}</p>
    </div>
  </div>
  <div class="stats">
    <div class="stat"><div class="num">${users.length}</div><div class="lbl">Total Records</div></div>
    <div class="stat"><div class="num">${users.filter(u=>u.status==="pending").length}</div><div class="lbl">Pending</div></div>
    <div class="stat"><div class="num">${users.filter(u=>u.status==="approved").length}</div><div class="lbl">Approved</div></div>
    <div class="stat"><div class="num">${users.filter(u=>u.status==="rejected").length}</div><div class="lbl">Rejected</div></div>
  </div>
  <table>
    <thead>
      <tr>
        <th>Full Name</th><th>Email</th><th>Phone</th><th>Registered</th><th>Status</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">
    <span>Thailand Post Office — Admin Portal</span>
    <span>Confidential — Internal Use Only</span>
    <span>Page 1</span>
  </div>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if (win) {
    win.addEventListener("load", () => {
      win.print();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    });
  }
}

// ════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════
export default function UserApprovalPage() {
  const navigate = useNavigate();
  const [users, setUsers]             = useState(INITIAL_USERS);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState("all");
  const [approveUser, setApproveUser] = useState(null);
  const [rejectUser,  setRejectUser]  = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast]             = useState({ show: false, msg: "", type: "" });

  const pending  = useMemo(() => users.filter(u => u.status === "pending").length,  [users]);
  const approved = useMemo(() => users.filter(u => u.status === "approved").length, [users]);
  const rejected = useMemo(() => users.filter(u => u.status === "rejected").length, [users]);

  const filtered = useMemo(() => users.filter(u => {
    const matchStatus = filter === "all" || u.status === filter;
    const matchSearch = `${u.first} ${u.last} ${u.email} ${u.phone}`.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  }), [users, search, filter]);

  function showToast(msg, type = "") {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3200);
  }

  function confirmAction(action) {
    const targetUser = action === "approved" ? approveUser : rejectUser;
    setUsers(prev => prev.map(u => u.id === targetUser.id ? { ...u, status: action } : u));
    setApproveUser(null);
    setRejectUser(null);
    showToast(
      action === "approved"
        ? `✅ ${targetUser.first} ${targetUser.last} has been approved`
        : `❌ ${targetUser.first} ${targetUser.last} has been rejected`,
      action === "approved" ? "green" : "red"
    );
  }

  return (
    <div className="page-wrapper">
      <style>{CSS}</style>

      {/* ════ OVERLAY (mobile) ════ */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ════ SIDEBAR ════ */}
      <aside className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">📮</div>
          <div className="logo-text">
            <h2>Post Office</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <div className="sidebar-admin">
          <div className="admin-avatar">👤</div>
          <div className="admin-info">
            <strong>Admin User</strong>
            <span>System Administrator</span>
          </div>
          <span className="admin-role-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          <button className="nav-item" onClick={() => navigate("/admin/dashboard")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Dashboard
          </button>
          <div className="nav-section-label" style={{ marginTop: 8 }}>Management</div>
          {/* ✅ แก้ path จาก /admin/user-approval → /admin/users */}
          <button className="nav-item active" onClick={() => navigate("/admin/users")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
            </svg>
            User Approval
            <span className="nav-badge">{pending}</span>
          </button>
          <button className="nav-item" onClick={() => navigate("/admin/reports")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Statistics &amp; Reports
          </button>
          <div className="nav-section-label" style={{ marginTop: 8 }}>System</div>
          <button className="nav-item" onClick={() => navigate("/admin/settings")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate("/admin/login")}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ════ MAIN ════ */}
      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(s => !s)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div>
              <h1>User Approval</h1>
              <p>Review and manage new account requests</p>
            </div>
          </div>
          <div className="topbar-right">
            <button className="tb-btn">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <div className="tb-badge">{pending}</div>
            </button>
            <div className="tb-divider" />
            <div className="tb-admin">
              <div className="tb-admin-avatar">👤</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        <div className="page-body">

          {/* Page Header */}
          <div className="page-header">
            <div className="page-header-left">
              <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to Dashboard
              </button>
              <div className="page-title">
                <h1>User Approval Queue</h1>
                <p>Wednesday, 11 March 2026</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {[
              { icon: "⏳", cls: "si-amber", num: pending,  label: "Pending Review"  },
              { icon: "✅", cls: "si-green", num: approved, label: "Approved Today"  },
              { icon: "❌", cls: "si-red",   num: rejected, label: "Rejected Today"  },
              { icon: "👥", cls: "si-blue",  num: 142,      label: "Total Users"     },
            ].map(({ icon, cls, num, label }) => (
              <div className="stat-card" key={label}>
                <div className={`stat-icon ${cls}`}>{icon}</div>
                <div className="stat-info">
                  <div className="stat-num">{num}</div>
                  <div className="stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-wrap">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="toolbar-spacer" />
            <button className="export-btn" onClick={() => exportToPDF(filtered, filter)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Export PDF
            </button>
          </div>

          {/* Table */}
          <div className="table-card">
            <div className="table-head">
              <div className="table-head-left">
                <div className="th-icon">👥</div>
                <div>
                  <h3>Registration Requests</h3>
                  <p>Review new user accounts before granting access</p>
                </div>
              </div>
              <span className="pending-count">{pending} pending</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th><th>Phone</th>
                    <th>Registered</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center", padding: 32, color: "var(--muted)", fontSize: ".85rem" }}>
                        No records found
                      </td>
                    </tr>
                  ) : filtered.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="user-cell">
                          <div className={`user-av ${getAvColor(u.id)}`}>{getInitials(u)}</div>
                          <div>
                            <div className="user-name">{u.first} {u.last}</div>
                            <div className="user-email">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="phone-cell">{u.phone}</td>
                      <td className="reg-date">{u.date}</td>
                      <td><StatusBadge status={u.status} /></td>
                      <td>
                        <div className="action-cell">
                          {u.status === "pending" ? (
                            <>
                              <button className="btn-approve" onClick={() => setApproveUser(u)}>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                Approve
                              </button>
                              <button className="btn-reject" onClick={() => setRejectUser(u)}>
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="done-label">
                              {u.status === "approved" ? "✅ Approved" : "❌ Rejected"}
                            </span>
                          )}
                          <button className="btn-view" title="View details">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="pg-info">Showing 1–{Math.min(filtered.length, 10)} of {filtered.length} records</div>
              <div className="pg-btns">
                <button className="pg-btn">‹</button>
                <button className="pg-btn active">1</button>
                <button className="pg-btn">2</button>
                <button className="pg-btn">›</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ════ MODALS ════ */}
      <ApproveModal user={approveUser} onClose={() => setApproveUser(null)} onConfirm={confirmAction} />
      <RejectModal  user={rejectUser}  onClose={() => setRejectUser(null)}  onConfirm={confirmAction} />

      {/* ════ TOAST ════ */}
      <Toast toast={toast} />
    </div>
  );
}

// ════════════════════════════════════════════════
//  CSS
// ════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--accent:#c0392b;--accent-dark:#991b1b;--accent-light:#e07070;--accent-glow:rgba(192,57,43,0.25);--bg:#f7f1f1;--sidebar-bg:#1a0505;--sidebar-border:#2e0a0a;--card:#ffffff;--text:#1a0a0a;--muted:#7c5555;--input-bg:#fff8f8;--input-border:#f5cece;--border:#f0dada;--green:#16a34a;--green-bg:#f0fdf4;--green-border:#bbf7d0;--blue:#1d4ed8;--blue-bg:#eff6ff;--amber:#d97706;--amber-bg:#fffbeb;--gold:#f59e0b;}
html,body{height:100%;}
body{min-height:100vh;background:var(--bg);font-family:'DM Sans',sans-serif;overflow-x:hidden;color:var(--text);}
#root{display:flex;min-height:100vh;width:100%;}
.page-wrapper{display:flex;min-height:100vh;width:100%;background:var(--bg);flex:1;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:49;}
.sidebar{width:240px;min-height:100vh;background:var(--sidebar-bg);border-right:1px solid var(--sidebar-border);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50;transition:transform 0.3s;}
.sidebar-logo{padding:24px 20px 20px;border-bottom:1px solid var(--sidebar-border);display:flex;align-items:center;gap:10px;}
.sidebar-logo .logo-icon{width:40px;height:40px;background:linear-gradient(135deg,rgba(192,57,43,0.4),rgba(224,112,112,0.2));border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;border:1px solid rgba(192,57,43,0.35);box-shadow:0 0 16px rgba(192,57,43,0.2);flex-shrink:0;}
.sidebar-logo .logo-text h2{font-family:'Playfair Display',serif;font-size:0.95rem;font-weight:700;color:#f5e8e8;}
.sidebar-logo .logo-text p{font-size:0.62rem;color:rgba(245,232,232,0.45);letter-spacing:1.4px;text-transform:uppercase;margin-top:1px;}
.sidebar-admin{padding:14px 20px;border-bottom:1px solid var(--sidebar-border);display:flex;align-items:center;gap:10px;}
.admin-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#e07070);display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0;box-shadow:0 0 10px rgba(192,57,43,0.4);}
.admin-info{flex:1;min-width:0;}
.admin-info strong{display:block;font-size:0.78rem;font-weight:600;color:#f5e8e8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.admin-info span{font-size:0.67rem;color:rgba(245,232,232,0.45);}
.admin-role-badge{flex-shrink:0;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:2px 7px;font-size:0.6rem;font-weight:700;color:var(--gold);letter-spacing:0.8px;text-transform:uppercase;}
.sidebar-nav{flex:1;padding:14px 12px;overflow-y:auto;}
.nav-section-label{font-size:0.6rem;font-weight:700;color:rgba(245,232,232,0.3);text-transform:uppercase;letter-spacing:1.2px;padding:10px 8px 6px;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;color:rgba(245,232,232,0.55);font-size:0.82rem;font-weight:500;cursor:pointer;text-decoration:none;transition:all 0.18s;margin-bottom:2px;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif;}
.nav-item:hover{background:rgba(255,255,255,0.06);color:#f5e8e8;}
.nav-item.active{background:rgba(192,57,43,0.2);color:#f5e8e8;border-left:3px solid var(--accent);padding-left:9px;}
.nav-item svg{width:16px;height:16px;flex-shrink:0;}
.nav-item .nav-badge{margin-left:auto;background:var(--accent);border-radius:10px;padding:1px 7px;font-size:0.62rem;font-weight:700;color:#fff;}
.sidebar-footer{padding:14px 12px;border-top:1px solid var(--sidebar-border);}
.logout-btn{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;color:rgba(245,232,232,0.45);font-size:0.82rem;font-weight:500;cursor:pointer;transition:all 0.18s;width:100%;background:none;border:none;font-family:'DM Sans',sans-serif;}
.logout-btn:hover{color:var(--accent-light);background:rgba(192,57,43,0.1);}
.logout-btn svg{width:16px;height:16px;}
.main{margin-left:240px;flex:1;min-height:100vh;display:flex;flex-direction:column;min-width:0;}
.topbar{background:#fff;border-bottom:1px solid var(--border);padding:0 28px;height:62px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40;box-shadow:0 1px 8px rgba(140,30,30,0.06);}
.topbar-left{display:flex;align-items:center;gap:14px;min-width:0;}
.topbar-left h1{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--text);}
.topbar-left p{font-size:0.76rem;color:var(--muted);margin-top:1px;}
.topbar-right{display:flex;align-items:center;gap:12px;flex-shrink:0;}
.tb-btn{width:36px;height:36px;border-radius:9px;background:var(--input-bg);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;position:relative;}
.tb-btn:hover{border-color:var(--accent-light);background:#fff0f0;}
.tb-btn svg{width:16px;height:16px;color:var(--muted);}
.tb-badge{position:absolute;top:-3px;right:-3px;width:16px;height:16px;border-radius:50%;background:var(--accent);color:#fff;font-size:0.58rem;font-weight:700;display:flex;align-items:center;justify-content:center;}
.tb-divider{width:1px;height:24px;background:var(--border);}
.tb-admin{display:flex;align-items:center;gap:8px;cursor:pointer;}
.tb-admin-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#e07070);display:flex;align-items:center;justify-content:center;font-size:0.85rem;flex-shrink:0;}
.tb-admin span{font-size:0.78rem;font-weight:600;color:var(--text);}
.sidebar-toggle{display:none;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;background:var(--input-bg);border:1px solid var(--border);cursor:pointer;flex-shrink:0;}
.sidebar-toggle svg{width:18px;height:18px;color:var(--text);}
.page-body{padding:24px 28px 60px;flex:1;min-width:0;}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
.page-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;animation:fadeUp 0.4s ease both;}
.page-header-left{display:flex;align-items:center;gap:14px;}
.back-btn{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;background:var(--input-bg);border:1px solid var(--input-border);color:var(--muted);font-size:0.8rem;font-weight:600;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;}
.back-btn:hover{border-color:var(--accent-light);color:var(--accent);background:#fff0f0;}
.back-btn svg{width:14px;height:14px;}
.page-title h1{font-family:'Playfair Display',serif;font-size:1.45rem;font-weight:700;color:var(--text);}
.page-title p{font-size:0.76rem;color:var(--muted);margin-top:2px;}
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;animation:fadeUp 0.45s ease both 0.05s;}
.stat-card{background:var(--card);border-radius:13px;padding:16px 18px;border:1px solid var(--border);box-shadow:0 2px 10px rgba(140,30,30,0.06);display:flex;align-items:center;gap:14px;transition:transform 0.18s,box-shadow 0.18s;}
.stat-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(140,30,30,0.1);}
.stat-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.15rem;flex-shrink:0;}
.si-amber{background:var(--amber-bg);}
.si-green{background:var(--green-bg);}
.si-red{background:#fff0f0;}
.si-blue{background:var(--blue-bg);}
.stat-num{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:var(--text);line-height:1;}
.stat-label{font-size:0.72rem;color:var(--muted);margin-top:3px;}
.toolbar{background:var(--card);border:1px solid var(--border);border-radius:13px;padding:14px 18px;display:flex;align-items:center;gap:12px;margin-bottom:16px;animation:fadeUp 0.48s ease both 0.1s;flex-wrap:wrap;}
.search-wrap{display:flex;align-items:center;gap:8px;background:var(--input-bg);border:1.5px solid var(--input-border);border-radius:9px;padding:8px 14px;flex:1;min-width:200px;}
.search-wrap svg{width:15px;height:15px;color:#d4a0a0;flex-shrink:0;}
.search-wrap input{border:none;background:transparent;outline:none;font-size:0.83rem;width:100%;font-family:'DM Sans',sans-serif;color:var(--text);}
.search-wrap input::placeholder{color:#d4a0a0;}
.filter-select{padding:8px 12px;border:1.5px solid var(--input-border);border-radius:9px;background:var(--input-bg);font-size:0.82rem;font-family:'DM Sans',sans-serif;color:var(--text);outline:none;cursor:pointer;}
.filter-select:focus{border-color:var(--accent-light);}
.toolbar-spacer{flex:1;}
.export-btn{display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:9px;background:linear-gradient(135deg,#c0392b,#991b1b);color:#fff;border:none;font-size:0.82rem;font-weight:600;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.export-btn:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(192,57,43,0.3);}
.export-btn svg{width:14px;height:14px;}
.table-card{background:var(--card);border-radius:16px;border:1px solid var(--border);box-shadow:0 2px 12px rgba(140,30,30,0.06);overflow:hidden;animation:fadeUp 0.52s ease both 0.15s;}
.table-head{padding:16px 22px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.table-head-left{display:flex;align-items:center;gap:10px;}
.th-icon{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#e07070,#c0392b);display:flex;align-items:center;justify-content:center;font-size:0.95rem;box-shadow:0 2px 8px rgba(192,57,43,0.25);flex-shrink:0;}
.table-head h3{font-family:'Playfair Display',serif;font-size:0.97rem;font-weight:700;color:var(--text);}
.table-head p{font-size:0.72rem;color:var(--muted);margin-top:1px;}
.pending-count{background:#fff0f0;border:1px solid #f5cece;border-radius:20px;padding:3px 12px;font-size:0.72rem;font-weight:700;color:var(--accent);white-space:nowrap;}
.table-wrap{overflow-x:auto;}
table{width:100%;border-collapse:collapse;}
thead th{font-size:0.68rem;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:var(--muted);padding:10px 18px;text-align:left;border-bottom:1.5px solid var(--border);white-space:nowrap;background:#fdf8f8;}
tbody td{padding:13px 18px;font-size:0.83rem;border-bottom:1px solid #fdf5f5;vertical-align:middle;}
tbody tr:last-child td{border-bottom:none;}
tbody tr:hover td{background:#fffafa;}
.user-cell{display:flex;align-items:center;gap:11px;}
.user-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:0.88rem;font-weight:700;color:#fff;flex-shrink:0;}
.av-red{background:linear-gradient(135deg,#e07070,#c0392b);}
.av-blue{background:linear-gradient(135deg,#60a5fa,#1d4ed8);}
.av-green{background:linear-gradient(135deg,#4ade80,#16a34a);}
.av-amber{background:linear-gradient(135deg,#fbbf24,#d97706);}
.av-purple{background:linear-gradient(135deg,#c084fc,#9333ea);}
.user-name{font-size:0.84rem;font-weight:600;color:var(--text);}
.user-email{font-size:0.72rem;color:var(--muted);margin-top:1px;}
.reg-date{font-size:0.78rem;color:var(--muted);}
.phone-cell{font-size:0.8rem;color:var(--text);font-weight:500;}
.badge{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:20px;font-size:0.7rem;font-weight:700;}
.b-pending{background:#fff7ed;color:var(--amber);border:1px solid #fde68a;}
.b-approved{background:var(--green-bg);color:var(--green);border:1px solid var(--green-border);}
.b-rejected{background:#fff0f0;color:var(--accent);border:1px solid #f5cece;}
.action-cell{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.btn-approve{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;background:var(--green-bg);border:1.5px solid var(--green-border);color:var(--green);font-size:0.76rem;font-weight:700;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;}
.btn-approve:hover{background:#dcfce7;transform:translateY(-1px);box-shadow:0 3px 10px rgba(22,163,74,0.2);}
.btn-approve svg{width:13px;height:13px;}
.btn-reject{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;background:#fff0f0;border:1.5px solid #f5cece;color:var(--accent);font-size:0.76rem;font-weight:700;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;}
.btn-reject:hover{background:#ffe0e0;transform:translateY(-1px);box-shadow:0 3px 10px rgba(192,57,43,0.15);}
.btn-reject svg{width:13px;height:13px;}
.btn-view{width:32px;height:32px;border-radius:7px;background:var(--input-bg);border:1.5px solid var(--input-border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;flex-shrink:0;}
.btn-view:hover{border-color:var(--accent-light);background:#fff0f0;}
.btn-view svg{width:14px;height:14px;color:var(--muted);}
.done-label{font-size:0.76rem;color:var(--muted);font-style:italic;white-space:nowrap;}
.modal-overlay{position:fixed;inset:0;background:rgba(26,5,5,0.55);backdrop-filter:blur(4px);z-index:200;display:none;align-items:center;justify-content:center;padding:20px;}
.modal-overlay.show{display:flex;}
.modal{background:#fff;border-radius:18px;width:100%;max-width:480px;box-shadow:0 24px 60px rgba(26,5,5,0.25);animation:modalIn 0.3s cubic-bezier(.22,.68,0,1.2) both;overflow:hidden;}
@keyframes modalIn{from{opacity:0;transform:scale(0.93) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
.modal-header{padding:20px 24px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;}
.modal-icon{width:40px;height:40px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;}
.mi-green{background:var(--green-bg);}
.mi-red{background:#fff0f0;}
.modal-header h3{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:var(--text);}
.modal-header p{font-size:0.74rem;color:var(--muted);margin-top:2px;}
.modal-close{margin-left:auto;width:30px;height:30px;border-radius:7px;border:1px solid var(--border);background:var(--input-bg);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;flex-shrink:0;}
.modal-close:hover{background:#fff0f0;border-color:var(--accent-light);}
.modal-close svg{width:14px;height:14px;color:var(--muted);}
.modal-body{padding:20px 24px;}
.modal-user-card{display:flex;align-items:center;gap:14px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:12px;padding:14px 16px;margin-bottom:16px;}
.modal-user-av{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff;flex-shrink:0;}
.modal-user-name{font-size:0.9rem;font-weight:700;color:var(--text);}
.modal-user-email{font-size:0.75rem;color:var(--muted);margin-top:2px;}
.modal-user-phone{font-size:0.75rem;color:var(--muted);margin-top:1px;}
.modal-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;}
.modal-info-item{background:#fdf8f8;border-radius:9px;padding:10px 12px;}
.modal-info-item label{font-size:0.63rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;font-weight:700;}
.modal-info-item p{font-size:0.82rem;font-weight:600;color:var(--text);margin-top:3px;}
.modal-note{margin-bottom:18px;}
.modal-note label{font-size:0.76rem;font-weight:600;color:var(--text);display:block;margin-bottom:6px;}
.modal-note textarea{width:100%;padding:10px 12px;border:1.5px solid var(--input-border);border-radius:9px;background:var(--input-bg);font-family:'DM Sans',sans-serif;font-size:0.82rem;color:var(--text);resize:none;outline:none;transition:border-color 0.15s;}
.modal-note textarea:focus{border-color:var(--accent-light);}
.modal-footer{display:flex;gap:10px;}
.modal-btn-cancel{flex:1;padding:10px;border-radius:9px;border:1.5px solid var(--border);background:var(--input-bg);font-size:0.83rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;}
.modal-btn-cancel:hover{border-color:var(--accent-light);color:var(--accent);}
.modal-btn-confirm{flex:2;padding:10px;border-radius:9px;border:none;font-size:0.83rem;font-weight:700;color:#fff;cursor:pointer;transition:all 0.15s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;}
.confirm-approve{background:linear-gradient(135deg,#16a34a,#22c55e);}
.confirm-approve:hover{box-shadow:0 4px 14px rgba(22,163,74,0.35);transform:translateY(-1px);}
.confirm-reject{background:linear-gradient(135deg,#c0392b,#e07070);}
.confirm-reject:hover{box-shadow:0 4px 14px rgba(192,57,43,0.35);transform:translateY(-1px);}
.toast{position:fixed;bottom:28px;right:28px;background:var(--text);color:#fff;padding:12px 20px;border-radius:11px;font-size:0.83rem;font-weight:500;box-shadow:0 8px 24px rgba(0,0,0,0.18);display:flex;align-items:center;gap:10px;z-index:300;opacity:0;transform:translateY(12px);transition:all 0.3s;pointer-events:none;}
.toast.show{opacity:1;transform:translateY(0);}
.toast.green{background:#16a34a;}
.toast.red{background:#c0392b;}
.toast svg{width:16px;height:16px;}
.table-footer{padding:14px 22px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.pg-info{font-size:0.76rem;color:var(--muted);}
.pg-btns{display:flex;gap:6px;}
.pg-btn{width:32px;height:32px;border-radius:7px;border:1px solid var(--border);background:var(--input-bg);font-size:0.78rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;}
.pg-btn:hover{border-color:var(--accent-light);color:var(--accent);}
.pg-btn.active{background:var(--accent);color:#fff;border-color:var(--accent);}
@media(max-width:1080px){.stats-row{grid-template-columns:repeat(2,1fr);}}
@media(max-width:900px){
  .sidebar{transform:translateX(-100%);}
  .sidebar.open{transform:translateX(0);}
  .main{margin-left:0;}
  .sidebar-toggle{display:flex;}
  .page-body{padding:16px 16px 48px;}
  .topbar{padding:0 16px;}
}
@media(max-width:600px){
  .stats-row{grid-template-columns:repeat(2,1fr);}
  .toolbar{flex-direction:column;align-items:stretch;}
  .toolbar-spacer{display:none;}
  .topbar-left p{display:none;}
  .tb-admin span{display:none;}
}
`;
