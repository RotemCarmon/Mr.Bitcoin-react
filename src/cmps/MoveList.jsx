import React from "react";
import MovePreview from "./MovePreview";

const MoveList = (props) => {
  const moves = props.moves;
    
  if (!moves) return <div>Loading...</div>;
  return (
    <section className="move-list-container">
      <div className="moveilist">
        {moves.map((move, idx) => (
          <MovePreview move={move} isInContact={props.isInContact} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default MoveList;
