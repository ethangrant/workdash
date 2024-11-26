import { Outlet, Link } from "react-router-dom"
import Timers from "../components/Timers/Timers";

export default function Root() {
  // @TODO - Might be a better way of handling conditional component here.
  const isRootPath = window.location.pathname === '/';

  return (
    <>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <Link to={`dashboard`}>Dashboard</Link>
            </li>
            <li>
              <Link to={`tasks`}>Tasks</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        {isRootPath && <Timers />}
        <Outlet />
      </main>
    </>
  );
}
