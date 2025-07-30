import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/molecules/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import WordSearchComponent from './components/organisms/WordSearch';
import Crossword from './components/organisms/Crossword';
import './styles/global.css';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <Home onNavigate={handleSectionChange} />;
      case 'wordsearch':
        return (
          <div className="app__game-container">
            <WordSearchComponent key="wordsearch-game" />
          </div>
        );
      case 'crossword':
        return (
          <div className="app__game-container">
            <Crossword />
          </div>
        );
      case 'about':
        return <About onNavigate={handleSectionChange} />;
      case 'team':
        return <Team onNavigate={handleSectionChange} />;
      default:
        return <Home onNavigate={handleSectionChange} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Navigation 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        <main className="app__main">
          {renderContent()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
