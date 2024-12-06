import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1C3F7C',
              color: 'white',
            },
          }} 
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;