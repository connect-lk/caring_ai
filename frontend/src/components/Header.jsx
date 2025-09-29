import { useState } from "react";

const Header = ({ onToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden sm:block">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <div className="flex items-center">
                    {/* <svg
                      className="h-4 w-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg> */}
                    <span className="ml-2 text-sm font-medium text-gray-500">
                      Dashboard
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative"
              aria-label="Notifications"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4"
                />
              </svg>
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm text-gray-900">
                      New assessment request received
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm text-gray-900">
                      Assessment completed for Patient #1234
                    </p>
                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-gray-50">
                    <p className="text-sm text-gray-900">
                      System maintenance scheduled for tonight
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-sm text-[#075985] hover:text-[#075985] font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#075985] rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">SA</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">System Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
