import PropTypes from "prop-types";
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

import { Helmet } from "react-helmet";

function Layout({ children, description, title, keywords, author }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-1">
          <SideBar open={sidebarOpen} />

          <main className="flex-1 p-4 lg:p-8 ml-0 lg:ml-64 transition-all duration-300">

            {children}
          </main>
        </div>
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  title: PropTypes.string,
  keywords: PropTypes.string,
  author: PropTypes.string,
};

export default Layout;
