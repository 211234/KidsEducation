import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import conflictInfographic from '../../assets/images/conflict-infographic.svg';
import './About.css';

const About = ({ onNavigate }) => {
  const features = [
    {
      icon: '🗣️',
      title: 'Comunicación Asertiva',
      description: 'Habla con calma y claridad: Expresa tus sentimientos y necesidades sin atacar a la otra persona.'
    },
    {
      icon: '👂',
      title: 'Escucha Activa',
      description: 'Presta atención a lo que la otra persona está diciendo, sin interrumpir, y trata de entender su punto de vista.'
    },
    {
      icon: '💭',
      title: 'Reconoce tus Emociones',
      description: 'Aprende a identificar cómo te sientes antes de reaccionar. La autoconciencia emocional es clave.'
    },
    {
      icon: '❤️',
      title: 'Practica la Empatía',
      description: 'Ponte en el lugar del otro para entender su punto de vista y crear conexiones más profundas.'
    },
    {
      icon: '🕊️',
      title: 'Busca Soluciones Pacíficas',
      description: 'Piensa en alternativas donde todos ganen. La colaboración es más efectiva que la competencia.'
    },
    {
      icon: '⏸️',
      title: 'Controla la Impulsividad',
      description: 'Respira profundo y cuenta hasta 10 antes de actuar. El autocontrol previene decisiones de las que te puedas arrepentir.'
    }
  ];

  const teacherStrategies = [
    {
      name: 'Escucha Activa',
      description: 'Dedicar tiempo a escuchar a los estudiantes con atención, sin interrupciones, para comprender sus perspectivas.',
      icon: '👂'
    },
    {
      name: 'Establecer Normas',
      description: 'Crear reglas claras y consensuadas sobre la convivencia en el aula, definiendo comportamientos aceptables.',
      icon: '📋'
    },
    {
      name: 'Comunicación Asertiva',
      description: 'Enseñar a expresar opiniones y necesidades de manera clara y respetuosa, evitando agresividad.',
      icon: '💬'
    },
    {
      name: 'Mediación',
      description: 'Enseñar a resolver conflictos a través del diálogo y la negociación, con guía de un adulto.',
      icon: '🤝'
    },
    {
      name: 'Modelado',
      description: 'Mostrar cómo resolver conflictos de manera constructiva, utilizando lenguaje adecuado.',
      icon: '👨‍🏫'
    },
    {
      name: 'Espacios de Reflexión',
      description: 'Crear momentos para que los estudiantes reflexionen sobre sus acciones y consecuencias.',
      icon: '🤔'
    }
  ];

  const stats = [
    {
      number: '85%',
      label: 'Mejora en Resolución de Conflictos',
      icon: '🤝'
    },
    {
      number: '70%',
      label: 'Reducción de Problemas Disciplinarios',
      icon: '📉'
    },
    {
      number: '90%',
      label: 'Estudiantes Reportan Mejor Comunicación',
      icon: '💬'
    },
    {
      number: '95%',
      label: 'Docentes Recomiendan el Programa',
      icon: '👨‍🏫'
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about__hero">
        <div className="container">
          <div className="about__hero-content">
            <h1 className="about__hero-title">
              Educación Emocional y
              <span className="about__hero-highlight"> Resolución de Conflictos</span>
            </h1>
            <p className="about__hero-description">
              La educación emocional tiene un impacto positivo significativo en la resolución de conflictos escolares, 
              ayudando a los estudiantes a comprender y gestionar sus emociones mientras desarrollan empatía y habilidades de comunicación efectiva.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about__stats">
        <div className="container">
          <div className="about__stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about__stat-item">
                <div className="about__stat-icon">{stat.icon}</div>
                <div className="about__stat-number">{stat.number}</div>
                <div className="about__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about__features">
        <div className="container">
          <div className="about__section-header">
            <h2 className="about__section-title">Tips para Estudiantes</h2>
            <p className="about__section-description">
              Estrategias prácticas para mejorar la comunicación y resolver conflictos de manera pacífica
            </p>
          </div>
          <div className="about__features-grid">
            {features.map((feature, index) => (
              <Card 
                key={index}
                variant="default"
                padding="large"
                shadow="medium"
                className="about__feature-card"
              >
                <div className="about__feature-icon">{feature.icon}</div>
                <h3 className="about__feature-title">{feature.title}</h3>
                <p className="about__feature-description">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="about__technology">
        <div className="container">
          <div className="about__section-header">
            <h2 className="about__section-title">Estrategias para Docentes</h2>
            <p className="about__section-description">
              Herramientas y técnicas para facilitar la resolución de conflictos en el aula
            </p>
          </div>
          <div className="about__tech-grid">
            {teacherStrategies.map((strategy, index) => (
              <div key={index} className="about__tech-item">
                <div className="about__tech-icon">{strategy.icon}</div>
                <div className="about__tech-content">
                  <h4 className="about__tech-name">{strategy.name}</h4>
                  <p className="about__tech-description">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infographic Section */}
      <section className="about__infographic">
        <div className="container">
          <div className="about__section-header">
            <h2 className="about__section-title">Guía Visual de Conflictos Escolares</h2>
            <p className="about__section-description">
              Comprende las causas, efectos y soluciones de los conflictos en el ambiente educativo
            </p>
          </div>
          <div className="about__infographic-container">
            <img 
              src={conflictInfographic} 
              alt="Infográfico sobre conflictos escolares: causas, efectos y soluciones" 
              className="about__infographic-image"
            />
          </div>
        </div>
      </section>

      {/* Additional Tips Section */}
      <section className="about__architecture">
        <div className="container">
          <div className="about__section-header">
            <h2 className="about__section-title">Tips Adicionales para el Éxito</h2>
            <p className="about__section-description">
              Estrategias complementarias para crear un ambiente escolar más armonioso
            </p>
          </div>
          <div className="about__architecture-grid">
            <div className="about__architecture-item about__architecture-item--atomic">
              <div className="about__architecture-header">
                <div className="about__architecture-icon">👥</div>
                <h3 className="about__architecture-title">Para Estudiantes</h3>
              </div>
              <div className="about__architecture-content">
                <p className="about__architecture-description">
                  Habilidades adicionales para el desarrollo personal:
                </p>
                <ul className="about__architecture-list">
                  <li><strong>Lenguaje Positivo:</strong> En lugar de "No hagas esto", di "Por favor, haz esto otro"</li>
                  <li><strong>Trabajo en Equipo:</strong> Aprende a cooperar y valorar diferentes opiniones</li>
                  <li><strong>Reflexión:</strong> Después de un conflicto, analiza qué aprendiste</li>
                  <li><strong>Autocontrol:</strong> Practica técnicas de respiración y relajación</li>
                  <li><strong>Comunicación Respetuosa:</strong> Expresa lo que piensas sin gritar ni ofender</li>
                </ul>
              </div>
            </div>
            <div className="about__architecture-item about__architecture-item--clean">
              <div className="about__architecture-header">
                <div className="about__architecture-icon">👨‍🏫</div>
                <h3 className="about__architecture-title">Para Docentes</h3>
              </div>
              <div className="about__architecture-content">
                <p className="about__architecture-description">
                  Estrategias avanzadas para el manejo del aula:
                </p>
                <ul className="about__architecture-list">
                  <li><strong>Ambiente Seguro:</strong> Crear espacios donde los estudiantes se sientan seguros para expresarse</li>
                  <li><strong>Prevención:</strong> Promover actividades de cooperación y comunicación positiva</li>
                  <li><strong>Trabajo con Familias:</strong> Involucrar a los padres en la educación emocional</li>
                  <li><strong>Adaptación:</strong> Ajustar estrategias según la edad y contexto específico</li>
                  <li><strong>Formación Continua:</strong> Desarrollar programas de habilidades socioemocionales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about__cta">
        <div className="container">
          <div className="about__cta-content">
              <h2 className="about__cta-title">¿Listo para implementar la educación emocional?</h2>
              <p className="about__cta-description">
                Comienza a transformar tu entorno educativo aplicando estas estrategias de resolución de conflictos
              </p>
              <div className="about__cta-actions">
                <Button 
                  variant="success" 
                  size="large"
                  onClick={() => onNavigate('home')}
                >
                  Volver al Inicio
                </Button>
                <Button 
                  variant="ghost" 
                  size="large"
                  onClick={() => window.print()}
                >
                  Imprimir Recursos
                </Button>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;