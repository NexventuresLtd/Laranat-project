import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const AUTH_KEY = 'lanart_admin';

function handleLogout(navigate: (to: string) => void) {
  localStorage.removeItem(AUTH_KEY);
  navigate('/login');
}

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/pages', label: 'Website Pages', icon: FileText },
  { to: '/dashboard/comics', label: 'Comics', icon: BookOpen },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useSiteContent();
  const logoUrl = settings.logoUrl || '/Image/lanart.jpg';

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: 'var(--font-body)',
        background: 'linear-gradient(165deg, #eff6ff 0%, #f8fafc 35%, #f5f3ff 100%)',
      }}
    >
      <aside
        className="fixed left-0 top-0 z-40 flex h-full w-[17rem] flex-col bg-white shadow-xl"
        style={{
          borderRight: '1px solid var(--navbar-border)',
          boxShadow: '4px 0 24px rgba(13, 71, 161, 0.08)',
        }}
      >
        {/* Logo + brand */}
        <div
          className="flex min-h-[5rem] items-center gap-4 border-b px-5 py-4"
          style={{ borderColor: 'var(--navbar-border)', backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-white shadow-sm"
            style={{ borderColor: 'var(--color-primary-blue)' }}
          >
            <img
              src={logoUrl}
              alt="Lanart"
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden h-10 w-10 rounded-lg bg-[var(--color-primary-blue)]" aria-hidden />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-base font-bold leading-tight" style={{ color: 'var(--color-deep-blue)' }}>
              Lanart Admin
            </span>
            <span className="block truncate text-xs font-medium" style={{ color: 'var(--navbar-text)' }}>
              Content dashboard
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive =
              location.pathname === to || (to !== '/dashboard' && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--navbar-text)] hover:bg-[var(--color-primary-blue)]/8'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: 'var(--color-primary-blue)',
                        boxShadow: '0 4px 12px rgba(3, 169, 244, 0.3)',
                      }
                    : undefined
                }
              >
                <Icon size={20} strokeWidth={2.2} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t space-y-0.5 p-3" style={{ borderColor: 'var(--navbar-border)' }}>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-primary-blue)]/10"
            style={{ color: 'var(--color-deep-blue)' }}
          >
            <ExternalLink size={18} />
            View live site
          </Link>
          <button
            type="button"
            onClick={() => handleLogout(navigate)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-red-50"
            style={{ color: 'var(--navbar-text)' }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-h-screen pl-[17rem]">
        <div className="p-6 md:p-8 lg:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
