import Card from '../../components/atoms/Card';
import Button from '../../components/atoms/Button';
import primerPerfil from '../../assets/images/profiles/primer-perfil.jpg';
import segundoPerfil from '../../assets/images/profiles/segundo-perfil.jpg';
import tercerPerfil from '../../assets/images/profiles/tercer-perfil.jpg';
import logoUniversidad from '../../assets/images/profiles/logo-universidad.jpg';
import './Team.css';

const Team = ({ onNavigate }) => {
  const profiles = [
    {
      id: 1,
      name: 'Gómez Damas Azeneth',
      image: primerPerfil,
      details: {
        carrera: 'Licenciatura en Pedagogía',
        modalidad: 'Modalidad Mixta',
        gradoGrupo: '9° Cuatrimestre'
      }
    },
    {
      id: 2,
      name: 'Guillermo Herrera María Mercedes',
      image: segundoPerfil,
      details: {
        carrera: 'Licenciatura en Pedagogía',
        modalidad: 'Modalidad Mixta',
        gradoGrupo: '9° Cuatrimestre'
      }
    },
    {
      id: 3,
      name: 'Martinez Castillejos Cristell Margarita',
      image: tercerPerfil,
      details: {
        carrera: 'Licenciatura en Pedagogía',
        modalidad: 'Modalidad Mixta',
        gradoGrupo: '9° Cuatrimestre'
      }
    },
    {
      id: 4,
      name: 'Mtro. Alejandro De la Cruz Méndez',
      image: null, // Sin imagen para el docente
      isTeacher: true,
      details: {
        rol: 'Docente',
        carrera: 'Licenciatura en Pedagogía',
        materia: 'Reporte de investigación educativa',
        gradoGrupo: '9° Cuatrimestre'
      }
    }
  ];

  return (
    <div className="team">
      <div className="team__container">
        <div className="team__header">
          <h1 className="team__title">Nuestro Equipo</h1>
          <p className="team__description">
            Conoce a los estudiantes y docentes detrás de este proyecto educativo enfocado en la educación emocional
            y la resolución de conflictos en el entorno escolar.
          </p>
        </div>

        <div className="team__profiles">
          {profiles.map((profile) => (
            <div key={profile.id} className="team__profile-flip-container">
              <div className="team__profile-flip-card">
                {/* Frente de la tarjeta */}
                <div className="team__profile-flip-front">
                  <Card
                    variant="default"
                    padding="large"
                    shadow="medium"
                    className="team__profile-card"
                  >
                    {profile.image ? (
                      <img 
                        src={profile.image} 
                        alt={profile.name} 
                        className="team__profile-image" 
                      />
                    ) : (
                      <div className="team__profile-image-placeholder">
                        <span className="team__profile-icon">👨‍🏫</span>
                      </div>
                    )}
                    <h3 className="team__profile-name">{profile.name}</h3>
                    <p className="team__profile-role">
                      {profile.isTeacher ? 'Docente' : 'Estudiante'}
                    </p>
                    <div className="team__profile-action">
                      Ver detalles →
                    </div>
                  </Card>
                </div>
                
                {/* Parte trasera de la tarjeta */}
                <div className="team__profile-flip-back">
                  <Card
                    variant="primary"
                    padding="large"
                    shadow="medium"
                    className="team__profile-card team__profile-card--back"
                  >
                    <h3 className="team__profile-name">{profile.name}</h3>
                    
                    <div className="team__profile-details">
                      {profile.isTeacher ? (
                        <>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Rol:</span>
                            <span className="team__profile-detail-value">{profile.details.rol}</span>
                          </div>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Carrera:</span>
                            <span className="team__profile-detail-value">{profile.details.carrera}</span>
                          </div>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Materia:</span>
                            <span className="team__profile-detail-value">{profile.details.materia}</span>
                          </div>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Grado y grupo:</span>
                            <span className="team__profile-detail-value">{profile.details.gradoGrupo}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Carrera:</span>
                            <span className="team__profile-detail-value">{profile.details.carrera}</span>
                          </div>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Modalidad:</span>
                            <span className="team__profile-detail-value">{profile.details.modalidad}</span>
                          </div>
                          <div className="team__profile-detail">
                            <span className="team__profile-detail-label">Grado y grupo:</span>
                            <span className="team__profile-detail-value">{profile.details.gradoGrupo}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de Universidad */}
        <div className="team__university">
          <div className="team__university-content">
            <img 
              src={logoUniversidad} 
              alt="Logo Universidad" 
              className="team__university-logo" 
            />
            <h2 className="team__university-name">Instituto Universitario Luis Felipe Domínguez Suárez</h2>
            <p className="team__university-location">Sede Palenque</p>
            <h3 className="team__project-title">
              Efecto de la educación emocional en la resolución de conflictos escolares en estudiantes de secundaria
            </h3>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="team__actions" style={{ marginTop: 'var(--spacing-xl)', textAlign: 'center' }}>
          <Button 
            variant="primary" 
            size="large"
            onClick={() => onNavigate('home')}
          >
            Volver al Inicio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Team;