const Sidebar = ({
  isCollapsed,
  onToggle,
  currentPage,
  onPageChange,
  isMobile,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const navigationItems = [
    {
      id: "dashboard",
      name: "Dashboard",
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
    fixed left-0 top-0 z-50 h-full bg-[#082f49]  
    flex flex-col justify-between
    transition-all duration-300 ease-in-out
    ${
      isMobile
        ? isMobileMenuOpen
          ? "w-64 translate-x-0"
          : "-translate-x-full"
        : isCollapsed
        ? "w-16"
        : "w-64"
    }
  `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4.5 border-b border-[#082f49]">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#075985] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-semibold text-[#ffffff]">
              caring.ai
            </span>
          </div>
        )}
        <button
          onClick={isMobile ? onCloseMobileMenu : onToggle}
          className="p-2 rounded-lg hover:bg-[#0c4a6e] text-[#ffffff] transition-colors"
          aria-label={
            isMobile
              ? "Close menu"
              : isCollapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
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
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onPageChange(item.id);
              if (isMobile) {
                onCloseMobileMenu();
              }
            }}
            className={`
              w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-[16px]   
              ${
                currentPage === item.id
                  ? "bg-[#0c4a6e] text-white"
                  : "hover:text-[#0c4a6e] text-[#ffffff] hover:bg-gray-100"
              }
              ${isCollapsed && !isMobile ? "justify-center" : ""}
            `}
            title={isCollapsed ? item.name : ""}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {(!isCollapsed || isMobile) && (
              <span className="font-medium truncate">{item.name}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex items-center ${
            isCollapsed && !isMobile ? "justify-center" : "justify-between"
          }`}
        >
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-3 ">
              <div className="w-8 h-8 bg-[#075985] rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">SA</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  System Admin
                </p>
                <p className="text-xs text-white truncate">Administrator</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
