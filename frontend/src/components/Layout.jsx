import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        currentPage={currentPage}
        onPageChange={onPageChange}
        isMobile={isMobile}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}
        `}
      >
        {/* Fixed Header */}
        <div
          className="fixed top-0 z-30 bg-white shadow-sm border-b border-gray-200"
          style={{
            left: isMobile ? "0" : isCollapsed ? "4rem" : "16rem",
            right: "0",
            transition: "left 0.3s ease-in-out",
          }}
        >
          <Header
            isCollapsed={isCollapsed}
            onToggle={() =>
              isMobile
                ? setIsMobileMenuOpen(!isMobileMenuOpen)
                : setIsCollapsed(!isCollapsed)
            }
          />
        </div>

        {/* Scrollable Page content */}
        <main className="pt-20 p-6 min-h-screen">
          <div className="max-w-screen-2xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
