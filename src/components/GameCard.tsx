import React, { KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './GameCard.css';

interface GameCardProps {
  id: number;
  icon: IconDefinition;
  description: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  icon,
  description,
  isFlipped,
  isMatched,
  onClick,
}) => {
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isFlipped && !isMatched) {
        onClick();
      }
    }
  };

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick();
    }
  };

  const cardState = isMatched ? 'trouvée' : isFlipped ? 'retournée' : 'cachée';

  return (
    <div
      className={`game-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={isMatched ? -1 : 0}
      aria-label={`Carte ${description} ${cardState}`}
    >
      <div className="game-card-inner">
        <div className="game-card-front">
          <div className="card-pattern">
            <div className="pattern-circle"></div>
            <div className="pattern-circle"></div>
            <div className="pattern-circle"></div>
          </div>
        </div>
        <div className="game-card-back">
          <FontAwesomeIcon 
            icon={icon} 
            className="animal-icon" 
            size="2x"
          />
        </div>
      </div>
    </div>
  );
};

export default GameCard;