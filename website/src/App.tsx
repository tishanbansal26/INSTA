import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Home } from './pages/Home';
import { SEOLanding } from './pages/SEOLanding';
import { Calculator } from './pages/Calculator';
import { AIAdvisor } from './components/AIAdvisor';
import { ThemeProvider } from './components/providers/ThemeProvider';

function App() {
  return (
    <>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate" element={<Calculator />} />
          <Route path="/:type" element={<SEOLanding />} />
        </Routes>
        <AIAdvisor />
      </Router>
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
