//Chiave per storage
const STORAGE_KEY = 'minigames_progress';

//Definizione progerssi di default
const getDefaultProgress = (): [boolean, boolean, boolean] => [false, false, false];


export const getProgress = (): [boolean, boolean, boolean] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (!storedData) {
    return getDefaultProgress();
  }

  try {
    return JSON.parse(storedData) as [boolean, boolean, boolean];
  } catch (error) {
    console.error("Errore nella lettura dei salvataggi. Reset ai valori di default.", error);
    return getDefaultProgress();
  }
};

export const completeMiniGame = (gameIndex: number): void => {
  const currentProgress = getProgress();
  
  if (gameIndex >= 0 && gameIndex < currentProgress.length) {
    currentProgress[gameIndex] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProgress));
  } else {
    console.warn(`Indice minigioco non valido: ${gameIndex}`);
  }
};

//Se si vuole resettare il gioco
export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};