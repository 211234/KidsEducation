import { useState } from 'react';
import Button from '../../atoms/Button';
import { useTheme } from '../../../contexts/ThemeContext';
import './Navigation.css';

const Navigation = ({ activeSection, onSectionChange, sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const defaultSections = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'wordsearch', label: 'Sopa de Letras', icon: '🔤' },
    { id: 'crossword', label: 'Crucigrama', icon: '📝' },
    { id: 'about', label: 'Tips', icon: '💬' },
    { id: 'team', label: 'Nosotros', icon: '👥' }
  ];

  const sectionsToUse = sections || defaultSections;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <h1 className="navigation__title">
            <span className="navigation__icon">🎓</span>
            KidsEducation
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="navigation__menu">
          {sectionsToUse.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'ghost'}
              onClick={() => handleSectionClick(section.id)}
              className="navigation__item"
            >
              <span className="navigation__item-icon">{section.icon}</span>
              <span className="navigation__item-label">{section.label}</span>
            </Button>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="navigation__theme-toggle"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="navigation__toggle"
          onClick={toggleMenu}
        >
          <span className={`navigation__hamburger ${
            isMenuOpen ? 'navigation__hamburger--open' : ''
          }`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={`navigation__mobile ${
        isMenuOpen ? 'navigation__mobile--open' : ''
      }`}>
        {sectionsToUse.map(section => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'primary' : 'ghost'}
            onClick={() => handleSectionClick(section.id)}
            className="navigation__mobile-item"
          >
            <span className="navigation__item-icon">{section.icon}</span>
            <span className="navigation__item-label">{section.label}</span>
          </Button>
        ))}
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="navigation__overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;