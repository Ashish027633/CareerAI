import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-ivory text-slate-text">
      {/* Top Navbar */}
      <Navbar
        isDashboard={true}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Full Viewport App Shell: Sidebar + Main Content expanding edge-to-edge */}
      <div className="flex-1 flex w-full min-h-[calc(100vh-4rem)]">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 lg:p-8 xl:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
