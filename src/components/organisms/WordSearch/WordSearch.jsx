import React, { useState, useCallback, useMemo } from 'react';
import Swal from 'sweetalert2';
import './WordSearch.css';

const WordSearchComponent = ({ words = [], gridSize = 15 }) => {
  const [grid, setGrid] = useState([]);
  const [placedWords, setPlacedWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentWords, setCurrentWords] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // 20 palabras de emociones basadas en la imagen
  const allEmotionWords = [
    'ADMIRACION', 'ALIVIO', 'COMPASION', 'DECEPCION', 'DESAMPARO', 'FELICIDAD',
    'FRUSTRACION', 'GRATITUD', 'ILUSION', 'INCOMPRENSION', 'PLACER', 'NOSTALGIA',
    'SOLEDAD', 'TENSION', 'TERNURA', 'ALEGRIA', 'TRISTEZA', 'AMOR', 'MIEDO', 'IRA'
  ];

  // Función para seleccionar 12 palabras aleatorias de las 20 disponibles
  const selectRandomWords = useCallback(() => {
    const availableWords = words.length > 0 ? words.map(word => word.toUpperCase()) : allEmotionWords;
    const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 12);
  }, [words, allEmotionWords]);

  // Usar palabras actuales del juego
  const wordsToUse = currentWords.length > 0 ? currentWords : selectRandomWords();

  // Direcciones para colocar palabras
  const directions = {
    horizontal: [0, 1],
    vertical: [1, 0],
    diagonal: [1, 1],
    diagonalUp: [-1, 1]
  };

  // Verificar si se puede colocar una palabra
  const canPlaceWord = useCallback((grid, word, row, col, direction) => {
    const [dRow, dCol] = directions[direction];

    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);

      if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
        return false;
      }

      if (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i]) {
        return false;
      }
    }

    return true;
  }, [gridSize]);

  // Colocar una palabra en el grid
  const placeWord = useCallback((grid, word, row, col, direction) => {
    const [dRow, dCol] = directions[direction];
    const newGrid = grid.map(row => [...row]);
    const wordPath = [];

    for (let i = 0; i < word.length; i++) {
      const newRow = row + (dRow * i);
      const newCol = col + (dCol * i);
      newGrid[newRow][newCol] = word[i];
      wordPath.push({ row: newRow, col: newCol });
    }

    return { grid: newGrid, path: wordPath };
  }, []);

  // Efecto para el cronómetro
  React.useEffect(() => {
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

  // Generar nuevo puzzle
  const generateNewPuzzle = useCallback(() => {
    // Seleccionar nuevas 12 palabras aleatorias
    const newSelectedWords = selectRandomWords();
    setCurrentWords(newSelectedWords);

    // Crear grid vacío
    let newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    const directionKeys = Object.keys(directions);
    const newPlacedWords = [];

    // Intentar colocar cada palabra
    newSelectedWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100;

      while (!placed && attempts < maxAttempts) {
        const direction = directionKeys[Math.floor(Math.random() * directionKeys.length)];
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          const result = placeWord(newGrid, word, row, col, direction);
          newGrid = result.grid;
          newPlacedWords.push({ word, path: result.path });
          placed = true;
        }
        attempts++;
      }
    });

    // Llenar espacios vacíos con letras aleatorias
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    setGrid(newGrid);
    setPlacedWords(newPlacedWords);
    setFoundWords([]);
    setGameCompleted(false);

    // Reiniciar cronómetro
    setTimer(0);
    setIsTimerRunning(false);
    setTimerStarted(false);
  }, [gridSize, selectRandomWords, canPlaceWord, placeWord]);

  // Función para obtener las celdas en una línea recta
  const getCellsInLine = useCallback((start, end) => {
    const cells = [];
    const rowDiff = end.row - start.row;
    const colDiff = end.col - start.col;

    // Verificar si es una línea válida (horizontal, vertical o diagonal)
    if (rowDiff !== 0 && colDiff !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
      return [];
    }

    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    if (steps === 0) return [start];

    const rowStep = rowDiff / steps;
    const colStep = colDiff / steps;

    for (let i = 0; i <= steps; i++) {
      cells.push({
        row: start.row + Math.round(rowStep * i),
        col: start.col + Math.round(colStep * i)
      });
    }

    return cells;
  }, []);

  // Función para verificar si una palabra fue encontrada
  const checkWord = useCallback((cells) => {
    if (cells.length < 2) return null;

    const word = cells.map(cell => grid[cell.row][cell.col]).join('');
    const reverseWord = word.split('').reverse().join('');

    const foundWord = placedWords.find(w =>
      w.word === word || w.word === reverseWord
    );

    return foundWord ? foundWord.word : null;
  }, [grid, placedWords]);

  // Funciones del cronómetro
  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
    setTimerStarted(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(false);
    setTimerStarted(false);
  }, []);

  // Formatear tiempo en MM:SS
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Función para mostrar instrucciones de la sopa de letras
  const showInstructions = () => {
    Swal.fire({
      title: '📋 Instrucciones de la Sopa de Letras',
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
          <h4 style="color: #4c1d95; margin-bottom: 10px;">🎯 Objetivo:</h4>
          <p>Encuentra todas las palabras relacionadas con emociones ocultas en la cuadrícula.</p>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">🎮 Cómo Jugar:</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Haz clic y arrastra para seleccionar palabras</li>
            <li>Las palabras pueden estar en cualquier dirección: horizontal, vertical o diagonal</li>
            <li>Las palabras pueden leerse de izquierda a derecha o de derecha a izquierda</li>
            <li>Busca las palabras de la lista en el lado derecho</li>
          </ul>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">💡 Consejos:</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Las palabras encontradas se marcarán en <strong style="color: #10b981;">verde</strong></li>
            <li>Las palabras seleccionadas se resaltan en <strong style="color: #fbbf24;">amarillo</strong></li>
            <li>Puedes pausar y reanudar el cronómetro cuando quieras</li>
          </ul>
          
          <h4 style="color: #4c1d95; margin-bottom: 10px; margin-top: 15px;">⏱️ Cronómetro:</h4>
          <p>El tiempo comienza automáticamente cuando haces tu primera selección. ¡Intenta encontrar todas las palabras lo más rápido posible!</p>
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

  // Manejadores de eventos del mouse
  const handleMouseDown = useCallback((row, col) => {
    // Iniciar cronómetro automáticamente en la primera interacción
    if (!timerStarted && !gameCompleted) {
      startTimer();
    }

    setIsSelecting(true);
    setStartCell({ row, col });
    setSelectedCells([{ row, col }]);
  }, [timerStarted, gameCompleted, startTimer]);

  const handleMouseEnter = useCallback((row, col) => {
    if (isSelecting && startCell) {
      const newPath = getCellsInLine(startCell, { row, col });
      setSelectedCells(newPath);
    }
  }, [isSelecting, startCell, getCellsInLine]);

  // Función para mostrar mensaje de felicitación (mover aquí)
  const showCongratulations = useCallback(() => {
    Swal.fire({
      title: '🎉 ¡Excelente Trabajo!',
      html: `
        <div style="text-align: center; font-size: 16px; line-height: 1.8;">
          <p style="font-size: 18px; color: #10b981; font-weight: bold;">¡Has encontrado todas las palabras!</p>
          
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 20px; font-weight: bold;">⏱️ Tiempo Final: ${formatTime(timer)}</p>
            <p style="margin: 5px 0; font-size: 16px;">🔍 Palabras encontradas: ${foundWords.length}/${placedWords.length}</p>
            <p style="margin: 5px 0; font-size: 14px;">🎯 ¡Perfecto! 100% completado</p>
          </div>
          
          <p style="color: #6b7280; font-style: italic;">¡Fantástico trabajo explorando el mundo de las emociones!</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '🎮 Jugar de Nuevo',
      confirmButtonColor: '#10b981',
      showCancelButton: true,
      cancelButtonText: '✨ Continuar',
      cancelButtonColor: '#6b7280',
      allowOutsideClick: false,
      width: '500px',
      customClass: {
        popup: 'swal-congratulations-popup',
        title: 'swal-congratulations-title'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        generateNewPuzzle();
      }
    });
  }, [timer, formatTime, foundWords, placedWords, generateNewPuzzle]);

  const handleMouseUp = useCallback(() => {
    if (isSelecting && selectedCells.length > 1) {
      const foundWord = checkWord(selectedCells);
      if (foundWord && !foundWords.includes(foundWord)) {
        const newFoundWords = [...foundWords, foundWord];
        setFoundWords(newFoundWords);
        
        // Verificar si se completó el juego
        if (newFoundWords.length === placedWords.length) {
          setGameCompleted(true);
          setIsTimerRunning(false);
          
          // Mostrar mensaje de felicitación después de un breve delay
          setTimeout(() => {
            showCongratulations();
          }, 500);
        }
      }
    }

    // Resetear estado de selección
    setIsSelecting(false);
    setStartCell(null);
    setSelectedCells([]);
  }, [isSelecting, selectedCells, checkWord, foundWords, placedWords.length, showCongratulations]);

  // Función para verificar si una celda está seleccionada
  const isCellSelected = useCallback((row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  }, [selectedCells]);

  // Función para verificar si una celda es parte de una palabra encontrada
  const isCellFound = useCallback((row, col) => {
    return placedWords.some(wordObj => {
      if (!foundWords.includes(wordObj.word)) return false;
      return wordObj.path.some(pos => pos.row === row && pos.col === col);
    });
  }, [placedWords, foundWords]);

  // Generar puzzle inicial solo una vez
  React.useEffect(() => {
    if (grid.length === 0) {
      generateNewPuzzle();
    }
  }, []);

  if (grid.length === 0) {
    return <div className="word-search-loading">Generando sopa de letras...</div>;
  }

  return (
    <div className="word-search-container">
      <div className="word-search-header">
        <h2>Sopa de Letras - Emociones</h2>
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
          <button
            className="new-game-btn"
            onClick={generateNewPuzzle}
          >
            Nuevo Juego
          </button>
        </div>
      </div>

      <div className="word-search-content">
        <div className="word-search-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((letter, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`grid-cell ${
                    isCellSelected(rowIndex, colIndex) ? 'selected' : ''
                  } ${
                    isCellFound(rowIndex, colIndex) ? 'found' : ''
                  }`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="words-list">
          <h3>Palabras a encontrar:</h3>
          <div className="words-grid">
            {placedWords.map((wordObj, index) => (
              <div
                key={index}
                className={`word-item ${
                  foundWords.includes(wordObj.word) ? 'found' : ''
                }`}
              >
                {wordObj.word}
              </div>
            ))}
          </div>

          <div className="progress">
            <p>Encontradas: {foundWords.length} / {placedWords.length}</p>
            {gameCompleted && (
              <div className="completion-section">
                <p className="completion-message">¡Felicidades! Has encontrado todas las palabras.</p>
                <p className="completion-time">Tiempo final: {formatTime(timer)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearchComponent;