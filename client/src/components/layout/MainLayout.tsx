import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAppStore } from '../../store/app.store';
import { cn } from '../../lib/utils';

export function MainLayout() {
  const { isSidebarOpen } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className={cn("flex flex-col flex-1 overflow-hidden transition-all duration-300", isSidebarOpen ? "ml-64" : "ml-20")}>
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background/50 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
