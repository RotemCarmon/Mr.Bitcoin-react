import React from "react";
import Moment from 'react-moment';

const MovePreview = (props) => {
  const move = props.move;
  if (!move) return <div>Loading...</div>;
  return (
    <section className="move-preview-container">
      {!props.isInContact && (
        <div className="move-to">
          <label>To </label>
          {move.to}
        </div>
      )}
      <div className="move-amount">
        <label>Amount: </label>
        {move.amount}
        coins
      </div>
      <div className="move-at">
        <Moment unix format="DD-MM-YYYY HH:mm">{move.at / 1000}</Moment>
        
      </div>
    </section>
  );
};

export default MovePreview;
