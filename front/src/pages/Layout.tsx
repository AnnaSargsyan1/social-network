import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Axios } from "../lib/api.ts";
import { IRequest, IResponse, IUser } from "../types.ts";
import { FaBell } from "react-icons/fa";
import { useHttp } from "../lib/hooks/useHttp.ts";

export const Layout = () => {
  const navigate = useNavigate()
  const [account, setAccount] = useState<IUser | null>(null)

  const location = useLocation();

  const { data: requests } = useHttp<IRequest[]>("/requests", { method: "GET" });

  const PUBLIC_ROUTES = ["/login", "/"];
  useEffect(() => {

    console.log("layout renders");
    const stored = localStorage.getItem("account");
    if (stored) {
      setAccount(JSON.parse(stored));
      return;
    }
    if (PUBLIC_ROUTES.includes(location.pathname)) {
      return;
    } 
    console.log("sending a request...");
    
    Axios.get<IResponse<IUser>>("/verify")
    .then(response => {
      setAccount(response.data.payload);
      localStorage.setItem("account", JSON.stringify(response.data.payload));
    })
    .catch(() => navigate("/login"));
    
  }, [location.pathname]);
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      isActive ? "bg-gradient-to-r from-blue-500 to-purple-500" : "hover:bg-gray-700"
  }`;
  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">MyApp</h1>

          <div className="flex items-center space-x-6">
            {account ? (
              <>
                <NavLink to="profile" end className={navLinkClass}>
                  Profile
                </NavLink>
                <NavLink to="/profile/search" className={navLinkClass}>
                  Search
                </NavLink>
                <NavLink to="/profile/settings" className={navLinkClass}>
                  Settings
                </NavLink>

                {/* 🔔 Notification Bell */}
                <NavLink
                  to="/profile/notifications"
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium transition flex items-center justify-center ${
                      isActive ? "bg-gradient-to-r from-blue-500 to-purple-500" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaBell size={22} />
                  {requests?.length && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {requests.length}
                    </span>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Log In
                </NavLink>
                <NavLink to="/" className={navLinkClass}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-full w-7xl pb-6">
        <Outlet context={{ account, setAccount }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-3 flex items-center justify-center">
        <p className="text-gray-400 text-sm mb-2 md:mb-0">
          © 2025 | All rights reserved.
        </p>
      </footer>
    </div>
  );
};
