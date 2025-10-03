import { FiLogOut } from "react-icons/fi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = ({
  isCollapsed,
  onToggle,
  isMobile,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      id: "request-assessment",
      name: "Request Assessment",
      path: "/request-assessment",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "assessment-results",
      name: "Assessment Results",
      path: "/assessment-results",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "booking-queue",
      name: "Booking Queue",
      path: "/booking-queue",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "settings",
      name: "Settings",
      path: "/settings",
      icon: (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`
     fixed left-0 top-0 z-50 h-full bg-[#233242]
    flex flex-col justify-between
    ease-in-out duration-300 overflow-visible
    ${
      isMobile
        ? `w-64 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`
        : `transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`
    }
  `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4.5 border-b border-[#1f2d3b] shadow-sm">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#1f2d3b] border border-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-semibold text-[#ffffff]">
              caring.ai
            </span>
          </div>
        )}
        <button
          onClick={isMobile ? onCloseMobileMenu : onToggle}
          className="p-2 rounded-lg text-[#ffffff] transition-colors duration-300 ease-in-out cursor-pointer"
        >
          {isMobile ? (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 shadow-md">
        {navigationItems.map((item) => (
          <div key={item.id} className="relative group">
            <Link
              to={item?.path}
              onClick={() => {
                if (isMobile) onCloseMobileMenu();
              }}
              className={`
          w-full flex items-center space-x-3 px-3 py-2 rounded-sm text-left text-[14px] cursor-pointer
          ${
            location?.pathname === item?.path
              ? "bg-[#1f2d3b] text-white"
              : "hover:bg-[#1f2d3b] hover:text-white text-[#9eacbd]"
          }
          ${isCollapsed && !isMobile ? "justify-center" : ""}
        `}
            >
              <span className="flex-shrink-0">{item?.icon}</span>
              {(!isCollapsed || isMobile) && (
                <span className="font-medium truncate">{item?.name}</span>
              )}
            </Link>

            {/* Tooltip */}
            {isCollapsed && !isMobile && (
              <span
                className="
            absolute left-full top-1/2 -translate-y-1/2 ml-3
            px-3 py-2 text-xs rounded-r-sm bg-[#233242] text-white shadow-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            whitespace-nowrap z-50
          "
              >
                {item?.name}
              </span>
            )}
          </div>
        ))}
      </nav>
      {/* Footer */}
      <div className="p-4">
        <div
          className={`flex items-center hover:bg-[#1f2d3b] hover:bg-opacity-20 ${
            isCollapsed && !isMobile ? "justify-center" : "justify-between"
          }`}
        >
          <button
            onClick={handleLogout}
            className="p-2 flex items-center gap-3 rounded-full text-white cursor-pointer transition-colors "
            title="Sign Out"
          >
            <FiLogOut className="text-lg" />{" "}
            {(!isCollapsed || isMobile) && "Sign out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
