import React from 'react';

const Button = ({text, onClick, showPlayAgain, playAgain}) => (
  <div className="start">
    <button onClick={onClick} className="button-primary">{text}</button>
    {showPlayAgain
      ? <button onClick={playAgain} className="button-primary">Chơi lại</button>
      : null
    }
  </div>
);

Button.defaultProps = {
  onClick: () => {},
};

export default Button;