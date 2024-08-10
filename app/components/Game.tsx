"use client";
import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
    const [activePlayer, setActivePlayer] = useState("X");
    const [winnerName, setWinnerName] = useState("");
    const [isClear, setIsClear] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);

    const setNewActivePlayer = (): void => {
        let tmpActivePlayer = activePlayer === "X" ? "O" : "X";
        setActivePlayer(tmpActivePlayer);
        setIsClear(false);
    };

    const reset = (): void => {
        setWinnerName("");
        setIsGameOver(false);
        setIsClear(true);
    };

    return (
        <>
            <div>Game {isGameOver ? "Over" : "On"}</div>
            {isGameOver && winnerName.length > 0 && (
                <div>Winner: {winnerName}</div>
            )}
            {isGameOver && winnerName.length === 0 && <div>No Winner</div>}
            {!isGameOver && <div>&nbsp;</div>}
            <div>Active Player: {activePlayer}</div>

            <button
                className="bg-sky-300 rounded-full my-2 py-2 px-4"
                onClick={reset}
            >
                Reset
            </button>
            <Board
                activePlayer={activePlayer}
                setNewActivePlayer={setNewActivePlayer}
                setWinnerName={(tmpWinnerName) => setWinnerName(tmpWinnerName)}
                onGameOver={() => setIsGameOver(true)}
                isGameOver={isGameOver}
                isClear={isClear}
            />
        </>
    );
};

export default Game;
