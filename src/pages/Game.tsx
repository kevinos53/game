import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonAlert,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonToggle,
} from '@ionic/react';
import {
  timeOutline,
  refreshOutline,
  trophyOutline,
  volumeHighOutline,
  volumeMuteOutline,
} from 'ionicons/icons';
import { 
  faCat, 
  faDog, 
  faFish, 
  faDove, 
  faSpider, 
  faHorse, 
  faFrog, 
  faBug,
  faDragon,
  faHippo,
  faOtter,
  faCrow
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Layout from '../components/Layout';
import GameCard from '../components/GameCard';
import SoundManager from '../utils/SoundManager';
import './Game.css';

// Cartes d'animaux avec leurs descriptions
const ANIMAL_CARDS: { icon: IconDefinition; description: string }[] = [
  { icon: faCat, description: 'chat' },
  { icon: faDog, description: 'chien' },
  { icon: faFish, description: 'poisson' },
  { icon: faDove, description: 'oiseau' },
  { icon: faSpider, description: 'araignée' },
  { icon: faHorse, description: 'cheval' },
  { icon: faFrog, description: 'grenouille' },
  { icon: faBug, description: 'insecte' },
  { icon: faDragon, description: 'dragon' },
  { icon: faHippo, description: 'hippopotame' },
  { icon: faOtter, description: 'loutre' },
  { icon: faCrow, description: 'corbeau' },
];

type Difficulty = 'facile' | 'moyen' | 'difficile';

interface Card {
  id: number;
  icon: IconDefinition;
  description: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const DIFFICULTY_SETTINGS = {
  facile: { pairs: 6, timeLimit: 80 },
  moyen: { pairs: 6, timeLimit: 60 },
  difficile: { pairs: 6, timeLimit: 10 },
};

const Game: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('facile');
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [bestScores, setBestScores] = useState<Record<Difficulty, number | null>>({
    facile: null,
    moyen: null,
    difficile: null,
  });

  const soundManager = SoundManager.getInstance();

  const initializeGame = (newDifficulty?: Difficulty) => {
    const currentDifficulty = newDifficulty || difficulty;
    const numPairs = DIFFICULTY_SETTINGS[currentDifficulty].pairs;
    const selectedAnimals = ANIMAL_CARDS.slice(0, numPairs);
    
    const shuffledCards = [...selectedAnimals, ...selectedAnimals]
      .sort(() => Math.random() - 0.5)
      .map((animal, index) => ({
        id: index,
        icon: animal.icon,
        description: animal.description,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setGameStarted(false);
    setGameCompleted(false);
    if (newDifficulty) setDifficulty(newDifficulty);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (flippedCards.length === 2 || cards[cardId].isFlipped || cards[cardId].isMatched) {
      return;
    }

    // Jouer le son de retournement de carte
    // soundManager.play('flip');

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];

      if (firstCard.icon === secondCard.icon) {
        setTimeout(() => {
          // Jouer le son de correspondance
          soundManager.play('match');
          
          setCards(prev => prev.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);

          // Vérifier la victoire
          if (cards.filter(card => !card.isMatched).length === 2) {
            handleGameComplete();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
    setGameStarted(false);
    const currentScore = moves;
    const previousBest = bestScores[difficulty];
    
    if (!previousBest || currentScore < previousBest) {
      setBestScores(prev => ({
        ...prev,
        [difficulty]: currentScore,
      }));
    }
    
    soundManager.play('victory');
    setShowAlert(true);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    initializeGame(newDifficulty);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= DIFFICULTY_SETTINGS[difficulty].timeLimit) {
            setGameStarted(false);
            soundManager.play('gameOver');
            setShowAlert(true);
            return prev;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, difficulty]);

  useEffect(() => {
    initializeGame();
  }, []);

  const timeLeft = DIFFICULTY_SETTINGS[difficulty].timeLimit - timer;

  const toggleSound = () => {
    const newMutedState = soundManager.toggleMute();
    setIsSoundMuted(newMutedState);
  };

  return (
    <Layout title="Memory Game">
      <div className="game-container">
        <div className="difficulty-selector">
          <IonSegment value={difficulty} onIonChange={e => handleDifficultyChange(e.detail.value as Difficulty)}>
            <IonSegmentButton value="facile">
              <IonLabel>Facile</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="moyen">
              <IonLabel>Moyen</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="difficile">
              <IonLabel>Difficile</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        <div className="game-stats">
          <div className="stat-item">
            <IonIcon icon={timeOutline} />
            <IonText>
              Temps: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </IonText>
          </div>
          <div className="stat-item">
            <IonIcon icon={trophyOutline} />
            <IonText>Coups: {moves}</IonText>
          </div>
          <div className="sound-toggle">
            <IonIcon 
              icon={isSoundMuted ? volumeMuteOutline : volumeHighOutline} 
              onClick={toggleSound}
              className="sound-icon"
            />
          </div>
          <IonButton onClick={() => initializeGame()} color="primary">
            <IonIcon icon={refreshOutline} slot="start" />
            Recommencer
          </IonButton>
        </div>

        <IonGrid className="game-grid">
          <IonRow>
            {cards.map(card => (
              <IonCol size="3" key={card.id}>
                <GameCard
                  id={card.id}
                  icon={card.icon}
                  description={card.description}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onClick={() => handleCardClick(card.id)}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={gameCompleted ? "Félicitations !" : "Temps écoulé !"}
          message={
            gameCompleted
              ? `Vous avez terminé le niveau ${difficulty} en ${moves} coups et ${Math.floor(timer / 60)}:${(timer % 60)
                  .toString()
                  .padStart(2, '0')} !${
                  bestScores[difficulty] === moves
                    ? " C'est un nouveau record !"
                    : ""
                }`
              : "Le temps est écoulé ! Essayez encore !"
          }
          buttons={[
            {
              text: 'Rejouer',
              handler: () => initializeGame(),
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default Game;