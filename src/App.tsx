import React, { useState, useEffect } from 'react';
import { SocialProvider, useSocial } from './context/SocialContext';
import { TopBar } from './components/Navigation/TopBar';
import { BottomNav } from './components/Navigation/BottomNav';
import { DesktopSidebar } from './components/Navigation/DesktopSidebar';
import { TrendingSidebar } from './components/Sidebar/TrendingSidebar';
import { FeedView } from './components/Feed/FeedView';
import { TribesHub } from './components/Tribes/TribesHub';
import { WatchView } from './components/Watch/WatchView';
import { ChatDrawer } from './components/Messages/ChatDrawer';
import { ProfileView } from './components/Profile/ProfileView';
import { StoryViewerModal } from './components/Feed/StoryViewerModal';
import { CreatePostModal } from './components/Feed/CreatePostModal';
import { EditProfileModal } from './components/Profile/EditProfileModal';
import { NotificationSheet } from './components/Notifications/NotificationSheet';
import { ToastAlert } from './components/Notifications/ToastAlert';
import { ThreedyBrandStudioModal } from './components/Branding/ThreedyBrandStudioModal';
import { Moon, Sun } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, isThreedyStudioOpen, setIsThreedyStudioOpen } = useSocial();
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Synchronize dark theme class with html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'tribes':
        return <TribesHub />;
      case 'watch':
        return <WatchView />;
      case 'messages':
        return <ChatDrawer />;
      case 'profile':
        return <ProfileView />;
      case 'feed':
      default:
        return <FeedView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-blue-500 selection:text-white">
      
      {/* Top App Bar */}
      <TopBar />

      {/* Main 3-Column Responsive Canvas */}
      <div className="flex-1 w-full max-w-7xl mx-auto flex justify-center">
        
        {/* Left Navigation Rail (Desktop) */}
        <DesktopSidebar />

        {/* Center Main Stage */}
        <main className="flex-1 min-w-0 max-w-2xl xl:max-w-3xl">
          {renderActiveView()}
        </main>

        {/* Right Trending & Recommendations Sidebar (Desktop) */}
        <TrendingSidebar />

      </div>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav />

      {/* Floating Theme Switcher & Status Tool */}
      <div className="fixed bottom-20 lg:bottom-5 right-4 z-30">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
        </button>
      </div>

      {/* Modals, Drawers & Push Toasts */}
      <StoryViewerModal />
      <CreatePostModal />
      <EditProfileModal />
      <NotificationSheet />
      <ToastAlert />
      <ThreedyBrandStudioModal
        isOpen={isThreedyStudioOpen}
        onClose={() => setIsThreedyStudioOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <SocialProvider>
      <MainLayout />
    </SocialProvider>
  );
}
