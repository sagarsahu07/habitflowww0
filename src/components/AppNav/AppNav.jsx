import "./AppNav.css";

const ROUTES = [
  { path: "/", label: "Dashboard" },
  { path: "/analytics", label: "Analytics" },
];

function AppNav({ currentPath, onNavigate }) {
  return (
    <nav className="app-nav" aria-label="Main">
      <ul className="app-nav__list">
        {ROUTES.map((route) => {
          const isActive = currentPath === route.path;
          return (
            <li key={route.path}>
              <a
                href={route.path}
                className={"app-nav__link" + (isActive ? " app-nav__link--active" : "")}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(route.path);
                }}
              >
                {route.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default AppNav;
