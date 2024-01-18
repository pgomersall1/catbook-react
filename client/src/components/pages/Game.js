import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
import { drawCanvas } from "../../canvasManager";
import { handleInput } from "../../input";

import "../../utilities.css";
import "./Game.css";

const Game = (props) => {
  const canvasRef = useRef(null);

  // TODO (Step 5.5): initialize winnerModal state (1 line)

  // add event listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleInput);

    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
      // TODO (Step 5.4): send a post request with user id to despawn api (1 line)
    };
  }, []);

  // update game periodically
  useEffect(() => {
    socket.on("update", (update) => {
      processUpdate(update);
    });
    return () => {
      socket.off("update");
    }
  }, []);

  const processUpdate = (update) => {
    // TODO (Step 5.5): set winnerModal if update has defined winner
      // Your code goes here (Step 5.5)
    drawCanvas(update, canvasRef);
  };

  // set a spawn button if the player is not in the game
  let spawnButton = null;
  if (props.userId) {
    spawnButton = (
      <div>
        <button
          onClick={() => {
            // TODO (Step 5.3): send a post request with user id to spawn api (1 line)
          }}
        >
          Spawn
        </button>
      </div>
    );
  }

  // display text if the player is not logged in
  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <>
      <div>
        {/* important: canvas needs id to be referenced by canvasManager */}
        <canvas ref={canvasRef} width="500" height="500" />
        {loginModal}
        {/* TODO (Step 5.5): display winnerModal (1 line) */}

        {spawnButton}
      </div>
    </>
  );
};

export default Game;
