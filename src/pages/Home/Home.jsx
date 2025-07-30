import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import classroomImage from '../../assets/images/classroom-circle.svg';
import bullyingImage from '../../assets/images/bullying-scene.svg';
import teamworkImage from '../../assets/images/teamwork.svg';
import './Home.css';

const Home = ({ onNavigate }) => {
  const features = [
    {
      icon: '🧠',
      title: 'Educación Emocional',
      description: 'Desarrolla habilidades para comprender y gestionar emociones, fundamentales en la adolescencia.',
      detailedInfo: {
        benefits: ['Autoconocimiento emocional', 'Regulación de impulsos', 'Empatía hacia otros', 'Resiliencia ante adversidades'],
        techniques: ['Mindfulness y respiración', 'Diario emocional', 'Técnicas de relajación', 'Identificación de triggers']
      },
      action: () => onNavigate('about')
    },
    {
      icon: '🤝',
      title: 'Resolución de Conflictos',
      description: 'Aprende técnicas pacíficas para resolver desacuerdos y mejorar la convivencia escolar.',
      detailedInfo: {
        benefits: ['Comunicación asertiva', 'Negociación efectiva', 'Mediación entre pares', 'Ambiente escolar positivo'],
        techniques: ['Escucha activa', 'Técnica del semáforo', 'Círculos de diálogo', 'Acuerdos ganar-ganar']
      },
      action: () => onNavigate('about')
    },
    {
      icon: '💬',
      title: 'Comunicación Efectiva',
      description: 'Desarrolla empatía y habilidades de comunicación para relaciones más saludables.',
      detailedInfo: {
        benefits: ['Expresión clara de ideas', 'Comprensión mutua', 'Relaciones más fuertes', 'Confianza interpersonal'],
        techniques: ['Lenguaje corporal positivo', 'Preguntas abiertas', 'Parafraseo activo', 'Feedback constructivo']
      },
      action: () => onNavigate('about')
    }
  ];

  const benefits = [
    {
      icon: '🌱',
      title: 'Desarrollo Integral',
      description: 'La adolescencia requiere herramientas para afrontar cambios físicos, emocionales y sociales.'
    },
    {
      icon: '🎯',
      title: 'Habilidades para la Vida',
      description: 'Competencias útiles no solo en la escuela, sino en relaciones personales y futuro laboral.'
    },
    {
      icon: '🤝',
      title: 'Mejora la Convivencia',
      description: 'Facilita la búsqueda de soluciones pacíficas y constructivas a los desacuerdos.'
    },
    {
      icon: '💪',
      title: 'Fortalece la Autoestima',
      description: 'Ayuda a comprender y gestionar emociones, desarrollando confianza personal.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero">
        <div className="container">
          <div className="home__hero-content">
            <div className="home__hero-text">
              <h1 className="home__hero-title">
                Educación Emocional para
                <span className="home__hero-highlight"> Estudiantes de Secundaria</span>
              </h1>
              <p className="home__hero-description">
                Desarrolla habilidades socioemocionales fundamentales para la resolución pacífica de conflictos. 
                Aprende a gestionar emociones, comunicarte efectivamente y crear un ambiente escolar más armonioso.
              </p>
              <div className="home__hero-actions">
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => onNavigate('about')}
                >
                  🧠 Explorar Recursos
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                  onClick={() => onNavigate('about')}
                >
                  🤝 Tips para Conflictos
                </Button>
              </div>
            </div>
            <div className="home__hero-visual">
              <div className="home__hero-card">
                <img 
                  src={classroomImage} 
                  alt="Estudiantes en círculo practicando educación emocional" 
                  className="home__hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home__features">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Herramientas para el Bienestar Escolar</h2>
            <p className="home__section-description">
              Explora las competencias esenciales para crear un ambiente educativo saludable y emocionalmente inteligente.
            </p>
          </div>
          <div className="home__features-grid">
            {features.map((feature, index) => (
              <div key={index} className="home__feature-flip-container">
                <div className="home__feature-flip-card">
                  {/* Frente de la tarjeta */}
                  <div className="home__feature-flip-front">
                    <Card 
                      variant="default"
                      padding="large"
                      shadow="medium"
                      className="home__feature-card"
                    >
                      <div className="home__feature-icon">{feature.icon}</div>
                      <h3 className="home__feature-title">{feature.title}</h3>
                      <p className="home__feature-description">{feature.description}</p>
                      <div className="home__feature-action">
                        Explorar →
                      </div>
                    </Card>
                  </div>
                  
                  {/* Parte trasera de la tarjeta */}
                  <div className="home__feature-flip-back">
                    <Card 
                      variant="primary"
                      padding="large"
                      shadow="medium"
                      className="home__feature-card home__feature-card--back"
                      onClick={feature.action}
                    >
                      <div className="home__feature-icon">{feature.icon}</div>
                      <h3 className="home__feature-title">{feature.title}</h3>
                      
                      <div className="home__feature-details">
                        <div className="home__feature-section">
                          <h4 className="home__feature-subtitle">✨ Beneficios:</h4>
                          <ul className="home__feature-list">
                            {feature.detailedInfo.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="home__feature-section">
                          <h4 className="home__feature-subtitle">🛠️ Técnicas:</h4>
                          <ul className="home__feature-list">
                            {feature.detailedInfo.techniques.map((technique, idx) => (
                              <li key={idx}>{technique}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="home__feature-action home__feature-action--back">
                        Ver más detalles →
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="home__benefits">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Importancia en la Educación Secundaria</h2>
            <p className="home__section-description">
              La educación emocional es fundamental durante la adolescencia para el desarrollo integral
            </p>
          </div>
          <div className="home__benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="home__benefit-item">
                <div className="home__benefit-icon">{benefit.icon}</div>
                <div className="home__benefit-content">
                  <h4 className="home__benefit-title">{benefit.title}</h4>
                  <p className="home__benefit-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Examples Section */}
      <section className="home__examples">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Transformando el Ambiente Escolar</h2>
            <p className="home__section-description">
              Observa cómo la educación emocional puede cambiar las dinámicas en el aula
            </p>
          </div>
          <div className="home__examples-grid">
            <Card variant="default" padding="large" className="home__example-card">
              <img 
                src={bullyingImage} 
                alt="Situación de conflicto escolar que requiere intervención" 
                className="home__example-image"
              />
              <div className="home__example-content">
                <h3 className="home__example-title">Identificar Conflictos</h3>
                <p className="home__example-description">
                  Reconocer las señales tempranas de conflictos y situaciones de bullying para intervenir de manera oportuna.
                </p>
              </div>
            </Card>
            <Card variant="default" padding="large" className="home__example-card">
              <img 
                src={teamworkImage} 
                alt="Estudiantes trabajando en equipo y colaborando" 
                className="home__example-image"
              />
              <div className="home__example-content">
                <h3 className="home__example-title">Fomentar Colaboración</h3>
                <p className="home__example-description">
                  Crear espacios donde los estudiantes trabajen juntos, desarrollen empatía y celebren los logros en equipo.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="home__resources">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Recursos Educativos</h2>
            <p className="home__section-description">
              Explora contenido audiovisual especializado para profundizar en la educación emocional y resolución de conflictos
            </p>
          </div>
          <div className="home__resources-grid">
            <div className="home__resource-category">
              <h3 className="home__resource-category-title">📚 Material Visual de Apoyo</h3>
              <div className="home__resource-links">
                <Card variant="default" padding="medium" className="home__resource-card">
                  <div className="home__resource-content">
                    <div className="home__resource-icon">🎥</div>
                    <h4 className="home__resource-title">Resolución de conflictos en la escuela</h4>
                    <p className="home__resource-description">Webinar especializado sobre estrategias efectivas para manejar conflictos escolares</p>
                    <a 
                      href="https://www.youtube.com/watch?v=9oC4pIAJJ_k" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="home__resource-link"
                    >
                      Ver Video →
                    </a>
                  </div>
                </Card>
                <Card variant="default" padding="medium" className="home__resource-card">
                  <div className="home__resource-content">
                    <div className="home__resource-icon">💭</div>
                    <h4 className="home__resource-title">Reflexiones para la resolución de conflictos</h4>
                    <p className="home__resource-description">Conferencia sobre el manejo de emociones y técnicas de mediación</p>
                    <a 
                      href="https://www.youtube.com/live/NurfPcbVFfk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="home__resource-link"
                    >
                      Ver Conferencia →
                    </a>
                  </div>
                </Card>
              </div>
            </div>
            <div className="home__resource-category">
              <h3 className="home__resource-category-title">🎯 Vídeo educativo para niños</h3>
              <div className="home__resource-links">
                <Card variant="default" padding="medium" className="home__resource-card home__resource-card--featured">
                  <div className="home__resource-content">
                    <div className="home__resource-icon">👶</div>
                    <h4 className="home__resource-title">Resolución de Conflictos para Niños</h4>
                    <p className="home__resource-description">Aprende sobre estilos de comunicación: asertivo, agresivo, pasivo y pasivo-agresivo</p>
                    <a 
                      href="https://www.youtube.com/watch?v=K59PwiIz2d8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="home__resource-link"
                    >
                      Ver Video Educativo →
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Section */}
      <section className="home__survey">
        <div className="container">
          <div className="home__section-header">
            <h2 className="home__section-title">Ayúdanos a Mejorar</h2>
            <p className="home__section-description">
              Tu opinión es valiosa para nosotros. Comparte tu experiencia y ayúdanos a crear mejores recursos educativos
            </p>
          </div>
          <div className="home__survey-content">
            <Card variant="secondary" padding="large" className="home__survey-card">
              <div className="home__survey-icon">📝</div>
              <h3 className="home__survey-title">Formulario de Educación Emocional</h3>
              <p className="home__survey-description">
                Participa en nuestro estudio sobre educación emocional para estudiantes de secundaria. 
                Tu participación es anónima y nos ayudará a entender mejor las necesidades emocionales en el entorno escolar.
              </p>
              <div className="home__survey-features">
                <div className="home__survey-feature">
                  <span className="home__survey-feature-icon">🔒</span>
                  <span>Completamente anónimo</span>
                </div>
                <div className="home__survey-feature">
                  <span className="home__survey-feature-icon">⏱️</span>
                  <span>Solo 5 minutos</span>
                </div>
                <div className="home__survey-feature">
                  <span className="home__survey-feature-icon">🎯</span>
                  <span>Mejora nuestros recursos</span>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="large"
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfelm9Z2vX-7JhylTxRm4ynCGgisyw3uHUrduPVIRFzH-jr8g/viewform?usp=header', '_blank')}
                className="home__survey-button"
              >
                📋 Responder Formulario
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home__cta">
        <div className="container">
          <Card variant="primary" padding="large" className="home__cta-card">
            <div className="home__cta-content">
              <h2 className="home__cta-title">¿Listo para transformar tu entorno escolar?</h2>
              <p className="home__cta-description">
                Únete a educadores y estudiantes que están implementando la educación emocional para crear ambientes más armoniosos
              </p>
              <div className="home__cta-actions">
                <Button 
                  variant="success" 
                  size="large"
                  onClick={() => onNavigate('about')}
                >
                  Ver Tips y Estrategias
                </Button>
                <Button 
                  variant="ghost" 
                  size="large"
                  onClick={() => onNavigate('about')}
                >
                  Recursos para Docentes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;