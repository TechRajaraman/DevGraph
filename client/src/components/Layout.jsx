import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['/', 'Dashboard'],
  ['/developers', 'Developers'],
  ['/technologies', 'Technologies'],
  ['/career', 'Career Explorer']
];

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">D</span>
          <span>DevGraph</span>
        </NavLink>
        <nav className="nav" aria-label="Main navigation">
          {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
        </nav>
      </header>
      <Outlet />
      <footer className="footer">DevGraph · Graph-first developer knowledge exploration</footer>
    </div>
  );
}
