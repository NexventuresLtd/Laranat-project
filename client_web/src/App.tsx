import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './comps/PublicLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookPage from './pages/BookPage';
import BookDetailPage from './pages/BookDetailPage';
import BookPrintPage from './pages/BookPrintPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import PagesEditor from './pages/Dashboard/PagesEditor';
import ComicsManager from './pages/Dashboard/ComicsManager';
import SettingsPage from './pages/Dashboard/SettingsPage';
import ScrollToTop from './comps/ScrollToTop';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="pages" element={<PagesEditor />} />
          <Route path="comics" element={<ComicsManager />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="books" element={<BookPage />} />
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="books/:id/print" element={<BookPrintPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
      <ScrollToTop />
    </div>
  );
};

export default App;
