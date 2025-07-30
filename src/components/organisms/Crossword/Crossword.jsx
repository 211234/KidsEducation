import { useState, useEffect, useCallback, useRef } from 'react';
import { Crossword as ReactCrossword } from '@jaredreisinger/react-crossword';
import { useTheme } from '../../../contexts/ThemeContext';
import Card from '../../atoms/Card';
import Button from '../../atoms/Button';
import crosswordData from './crosswordData';
import Swal from 'sweetalert2';
import './Crossword.css';

const Crossword = ({ title = "Descubre Tus Emociones" }) => {
  const { isDarkMode } = useTheme();
  
  // Estados del juego
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completedWords, setCompletedWords] = useState([]);
  const [currentCrosswordIndex, setCurrentCrosswordIndex] = useState(() => Math.floor(Math.random() * crosswordData.length));
  const [hints, setHints] = useState({ wordHint: 1, letterHint: 1, solutionHint: 1 });
  const [usedHints, setUsedHints] = useState({ wordHint: false, letterHint: false, solutionHint: false });
  const [showingSolution, setShowingSolution] = useState(false);
  const [cellValidation, setCellValidation] = useState({});
  const crosswordRefInternal = useRef(null);
  
  // Estados del cronómetro
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Obtener el crucigrama actual
  const currentCrossword = crosswordData[currentCrosswordIndex];
  const crosswordDataset = currentCrossword.data;

  // Función para obtener todas las palabras del crucigrama
  const getAllWords = () => {
    const words = [];
    Object.entries(crosswordDataset.across).forEach(([number, clue]) => {
      words.push({ direction: 'across', number, ...clue });
    });
    Object.entries(crosswordDataset.down).forEach(([number, clue]) => {
      words.push({ direction: 'down', number, ...clue });
    });
    return words;
  };

  // Función para usar pista de palabra completa
  const useWordHint = () => {
    if (usedHints.wordHint || !crosswordRefInternal.current) return;
    
    const words = getAllWords();
    const uncompletedWords = words.filter(word => 
      !completedWords.includes(`${word.direction}-${word.number}`)
    );
    
    if (uncompletedWords.length === 0) return;
    
    const randomWord = uncompletedWords[Math.floor(Math.random() * uncompletedWords.length)];
    
    // Llenar la palabra completa
    for (let i = 0; i < randomWord.answer.length; i++) {
      const row = randomWord.direction === 'across' ? randomWord.row : randomWord.row + i;
      const col = randomWord.direction === 'across' ? randomWord.col + i : randomWord.col;
      crosswordRefInternal.current.setGuess(row, col, randomWord.answer[i]);
    }
    
    setUsedHints(prev => ({ ...prev, wordHint: true }));
  };

  // Función para usar pista de letra
  const useLetterHint = () => {
    if (usedHints.letterHint || !crosswordRefInternal.current) return;
    
    const words = getAllWords();
    const availablePositions = [];
    
    words.forEach(word => {
      for (let i = 0; i < word.answer.length; i++) {
        const row = word.direction === 'across' ? word.row : word.row + i;
        const col = word.direction === 'across' ? word.col + i : word.col;
        availablePositions.push({ row, col, letter: word.answer[i] });
      }
    });
    
    if (availablePositions.length === 0) return;
    
    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    crosswordRefInternal.current.setGuess(randomPosition.row, randomPosition.col, randomPosition.letter);
    
    setUsedHints(prev => ({ ...prev, letterHint: true }));
  };

  // Función para mostrar solución completa por 3 segundos
  const useSolutionHint = () => {
    if (usedHints.solutionHint || !crosswordRefInternal.current) return;
    
    setShowingSolution(true);
    
    // Llenar todo el crucigrama
    const words = getAllWords();
    words.forEach(word => {
      for (let i = 0; i < word.answer.length; i++) {
        const row = word.direction === 'across' ? word.row : word.row + i;
        const col = word.direction === 'across' ? word.col + i : word.col;
        crosswordRefInternal.current.setGuess(row, col, word.answer[i]);
      }
    });
    
    // Después de 3 segundos, limpiar el crucigrama
    setTimeout(() => {
      crosswordRefInternal.current.reset();
      setShowingSolution(false);
    }, 3000);
    
    setUsedHints(prev => ({ ...prev, solutionHint: true }));
  };

  // Función para obtener pistas disponibles
  const getAvailableHints = () => {
    return [
      { type: 'word', label: 'Palabra Completa', action: useWordHint, disabled: usedHints.wordHint },
      { type: 'letter', label: 'Una Letra', action: useLetterHint, disabled: usedHints.letterHint },
      { type: 'solution', label: 'Ver Solución 3s', action: useSolutionHint, disabled: usedHints.solutionHint }
    ];
  };

  // Funciones del cronómetro
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
    setTimerStarted(true);
    if (!gameStarted) {
      setGameStarted(true);
    }
  }, [gameStarted]);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(false);
    setTimerStarted(false);
  }, []);

  // Efecto del cronómetro
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Effect to apply cell validation styles
  useEffect(() => {
    const applyValidationStyles = () => {
      // Buscar todos los inputs del crucigrama
      const inputs = document.querySelectorAll('.crossword input');
      
      inputs.forEach((input, index) => {
        // Obtener posición del input de diferentes maneras
        const row = input.getAttribute('data-row') || 
                    input.getAttribute('row') || 
                    input.dataset.row;
        const col = input.getAttribute('data-col') || 
                    input.getAttribute('col') || 
                    input.dataset.col;
        
        // Si no hay atributos, usar el índice como fallback
        const cellKey = (row && col) ? `${row}-${col}` : `cell-${index}`;
        
        if (cellValidation[cellKey]) {
          input.setAttribute('data-validation', cellValidation[cellKey]);
          console.log(`Aplicando validación ${cellValidation[cellKey]} a celda ${cellKey}`);
        } else {
          input.removeAttribute('data-validation');
        }
      });
    };
  
    // Aplicar estilos con un delay más largo
    const timeoutId = setTimeout(applyValidationStyles, 500);
    return () => clearTimeout(timeoutId);
  }, [cellValidation]);

  // Debug: mostrar información de los inputs
  useEffect(() => {
    const debugInputs = () => {
      const inputs = document.querySelectorAll('.crossword input');
      console.log('Total inputs encontrados:', inputs.length);
      inputs.forEach((input, i) => {
        console.log(`Input ${i}:`, {
          value: input.value,
          row: input.getAttribute('data-row'),
          col: input.getAttribute('data-col'),
          validation: input.getAttribute('data-validation')
        });
      });
      console.log('Estado cellValidation:', cellValidation);
    };
    
    setTimeout(debugInputs, 1000);
  }, [cellValidation]);

  // Función para mostrar instrucciones del crucigrama
  const showInstructions = () => {
    Swal.fire({
      title: '📋 Instrucciones del Crucigrama',
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
          <h4 style="color: #4c1d95; margin-bottom: 10px;">🎯 Objetivo:</h4>
          <p>Completa el crucigrama encontrando las emociones correctas según las pistas dadas.</p>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">🎮 Cómo Jugar:</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Haz clic en una celda para comenzar a escribir</li>
            <li>Lee las pistas en las secciones HORIZONTALES y VERTICALES</li>
            <li>Escribe las respuestas letra por letra</li>
            <li>Las palabras se cruzan entre sí</li>
          </ul>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">💡 Pistas Disponibles:</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li><strong>Palabra Completa:</strong> Revela una palabra aleatoria</li>
            <li><strong>Una Letra:</strong> Revela una letra en una posición aleatoria</li>
            <li><strong>Ver Solución 3s:</strong> Muestra toda la solución por 3 segundos</li>
          </ul>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">⏱️ Cronómetro:</h4>
          <p>El tiempo comienza cuando haces tu primer clic. ¡Intenta completarlo lo más rápido posible!</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '¡Entendido!',
      confirmButtonColor: '#8b5cf6',
      width: '600px',
      customClass: {
        popup: 'swal-instructions-popup',
        title: 'swal-instructions-title'
      }
    });
  };

  // Función para mostrar mensaje de felicitación
  const showCongratulations = () => {
    const hintsUsed = (usedHints.wordHint ? 1 : 0) + (usedHints.letterHint ? 1 : 0) + (usedHints.solutionHint ? 1 : 0);
    
    Swal.fire({
      title: '🎉 ¡Felicitaciones!',
      html: `
        <div style="text-align: center; font-size: 16px; line-height: 1.8;">
          <p style="font-size: 18px; color: #10b981; font-weight: bold;">¡Has completado el crucigrama exitosamente!</p>
          
          <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 20px; font-weight: bold;">⏱️ Tiempo Final: ${formatTime(timer)}</p>
            <p style="margin: 5px 0; font-size: 16px;">💡 Pistas utilizadas: ${hintsUsed}/3</p>
          </div>
          
          <p style="color: #6b7280; font-style: italic;">¡Excelente trabajo desarrollando tus habilidades emocionales!</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '🎮 Nuevo Crucigrama',
      confirmButtonColor: '#10b981',
      showCancelButton: true,
      cancelButtonText: '✨ Continuar',
      cancelButtonColor: '#6b7280',
      width: '500px',
      customClass: {
        popup: 'swal-congratulations-popup'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        resetGame();
      }
    });
  };

  // Manejar finalización del juego
  const onCrosswordComplete = useCallback(() => {
    if (!showingSolution) {
      setGameCompleted(true);
      pauseTimer();
      // Mostrar mensaje de felicitación después de un breve delay
      setTimeout(() => {
        showCongratulations();
      }, 500);
    }
  }, [pauseTimer, showingSolution, timer, usedHints]);

  // Manejar cuando se completa una palabra individual
  const onCorrect = useCallback((direction, number, answer) => {
    // No marcar palabras como completadas durante la visualización de la solución
    if (showingSolution) {
      return;
    }
    
    setCompletedWords(prev => {
      const wordKey = `${direction}-${number}`;
      if (!prev.includes(wordKey)) {
        return [...prev, wordKey];
      }
      return prev;
    });
  }, [showingSolution]);

  // Función para obtener la respuesta correcta de una celda
  const getCorrectAnswerForCell = (row, col) => {
    const words = getAllWords();
    for (const word of words) {
      for (let i = 0; i < word.answer.length; i++) {
        const wordRow = word.direction === 'across' ? word.row : word.row + i;
        const wordCol = word.direction === 'across' ? word.col + i : word.col;
        if (wordRow === row && wordCol === col) {
          return word.answer[i];
        }
      }
    }
    return null;
  };

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setGameCompleted(false);
    setCompletedWords([]);
    resetTimer();
    setGameStarted(false);
    setHints({ wordHint: 1, letterHint: 1, solutionHint: 1 });
    setUsedHints({ wordHint: false, letterHint: false, solutionHint: false });
    setShowingSolution(false);
    setCellValidation({});
    // Cambiar a un crucigrama aleatorio
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * crosswordData.length);
    } while (newIndex === currentCrosswordIndex && crosswordData.length > 1);
    setCurrentCrosswordIndex(newIndex);
  }, [resetTimer, currentCrosswordIndex]);

  // Manejar el primer clic para iniciar el cronómetro
  const handleCellClick = useCallback(() => {
    if (!gameStarted && !timerStarted) {
      startTimer();
    }
  }, [gameStarted, timerStarted, startTimer]);



  return (
    <div className="crossword">
      <div className="crossword__header">
        <div className="title-section">
          <h2 className="crossword__title">{currentCrossword.title || title}</h2>
          <p className="crossword__subtitle">{currentCrossword.subtitle || "Encuentra las Emociones según tu Estado de Ánimo"}</p>
          <div className="crossword__progress">
            <span className="crossword__progress-text">
              Crucigrama {currentCrosswordIndex + 1} de {crosswordData.length}
            </span>
          </div>
        </div>
        <div className="header-controls">
          {/* Botón de Instrucciones */}
          <button className="instructions-btn" onClick={showInstructions}>
            📋 Instrucciones
          </button>
          
          <div className="timer-section">
            <div className="timer-display">
              <span className="timer-label">Tiempo:</span>
              <span className="timer-time">{formatTime(timer)}</span>
            </div>
            <div className="timer-controls">
              {!timerStarted ? (
                <button className="timer-btn start" onClick={startTimer}>
                  Iniciar
                </button>
              ) : (
                <>
                  <button 
                    className={`timer-btn ${isTimerRunning ? 'pause' : 'resume'}`}
                    onClick={isTimerRunning ? pauseTimer : startTimer}
                  >
                    {isTimerRunning ? 'Pausar' : 'Reanudar'}
                  </button>
                  <button className="timer-btn reset" onClick={resetTimer}>
                    Reiniciar
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="hints-section">
             <h4>Pistas Disponibles:</h4>
             <div className="hints-buttons">
               {getAvailableHints().map((hint, index) => (
                 <button 
                   key={hint.type}
                   className={`hint-btn ${hint.disabled ? 'used' : ''}`}
                   onClick={hint.action}
                   disabled={hint.disabled || showingSolution}
                 >
                   {hint.label} {hint.disabled ? '✓' : ''}
                 </button>
               ))}
             </div>
           </div>
          <button className="new-game-btn" onClick={resetGame}>
             🎮 Nuevo Juego
          </button>
        </div>
      </div>

      <div className="crossword__content">
        <Card className="crossword__grid-container" padding="medium">
          <div onClick={handleCellClick}>
            <ReactCrossword
              key={currentCrosswordIndex}
              data={crosswordDataset}
              onCrosswordComplete={onCrosswordComplete}
              onCorrect={onCorrect}
              onCellChange={(row, col, char) => {
                if (!char) {
                  setCellValidation(prev => {
                    const newValidation = { ...prev };
                    delete newValidation[`${row}-${col}`];
                    return newValidation;
                  });
                  return;
                }
                
                // Verificar si la letra es correcta
                const correctAnswer = getCorrectAnswerForCell(row, col);
                if (correctAnswer) {
                  const isCorrect = char.toUpperCase() === correctAnswer.toUpperCase();
                  setCellValidation(prev => ({
                    ...prev,
                    [`${row}-${col}`]: isCorrect ? 'correct' : 'incorrect'
                  }));
                }
              }}
              ref={(ref) => {
                crosswordRefInternal.current = ref;
              }}
              useStorage={false}
              theme={{
                gridBackground: isDarkMode ? '#1f2937' : '#ffffff',
                cellBackground: isDarkMode ? '#374151' : '#ffffff',
                cellBorder: isDarkMode ? '#6b7280' : '#000000',
                textColor: isDarkMode ? '#f9fafb' : '#000000',
                numberColor: isDarkMode ? '#d1d5db' : '#000000',
                focusBackground: isDarkMode ? '#4f46e5' : '#ffeb3b',
                highlightBackground: isDarkMode ? '#312e81' : '#fff9c4'
              }}
            />
          </div>
        </Card>
      </div>

       {/* Sección de pistas */}
       <div className="crossword__clues">
         <div className="clues-container">
           <div className="clues-section">
             <h3 className="clues-title">HORIZONTALES</h3>
             <div className="clues-list">
               {Object.entries(crosswordDataset.across).map(([number, clue]) => {
                 const isCompleted = completedWords.includes(`across-${number}`);
                 return (
                   <div 
                     key={`across-${number}`} 
                     className={`clue-item ${isCompleted ? 'completed' : ''}`}
                   >
                     <span className="clue-number">{number}:</span>
                     <span className="clue-text">{clue.clue}</span>
                   </div>
                 );
               })}
             </div>
           </div>
           
           <div className="clues-section">
             <h3 className="clues-title">VERTICALES</h3>
             <div className="clues-list">
               {Object.entries(crosswordDataset.down).map(([number, clue]) => {
                 const isCompleted = completedWords.includes(`down-${number}`);
                 return (
                   <div 
                     key={`down-${number}`} 
                     className={`clue-item ${isCompleted ? 'completed' : ''}`}
                   >
                     <span className="clue-number">{number}:</span>
                     <span className="clue-text">{clue.clue}</span>
                   </div>
                 );
               })}
             </div>
           </div>
         </div>
       </div>

       {gameCompleted && (
        <div className="crossword__completion">
          <Card variant="success" padding="large" className="text-center">
            <h3>¡Excelente trabajo!</h3>
            <p>Has completado el crucigrama correctamente</p>
            <p className="completion-time">Tiempo final: {formatTime(timer)}</p>
            <p className="completion-hints">Pistas utilizadas: {(usedHints.wordHint ? 1 : 0) + (usedHints.letterHint ? 1 : 0) + (usedHints.solutionHint ? 1 : 0)}/3</p>
            <Button variant="success" onClick={resetGame}>
              Nuevo Crucigrama
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Crossword;