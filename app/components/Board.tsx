"use client";
import React, { useState, useEffect } from "react";
import Square from "./Square";

interface BoardProps {
    activePlayer: string;
    setNewActivePlayer: () => void;
    setWinnerName: (name: string) => void;
    onGameOver: () => void;
    isGameOver: boolean;
    isClear: boolean;
}

interface BoardMap {
    [id: number]: string;
}

interface Line {
    squares: number[];
}

interface Winner {
    name: string;
    line: Line;
}

const lines: Line[] = [
    { squares: [0, 1, 2] },
    { squares: [3, 4, 5] },
    { squares: [6, 7, 8] },
    { squares: [0, 3, 6] },
    { squares: [1, 4, 7] },
    { squares: [2, 5, 8] },
    { squares: [0, 4, 8] },
    { squares: [2, 4, 6] },
];

const Board = ({
    activePlayer,
    setNewActivePlayer,
    setWinnerName,
    onGameOver,
    isGameOver,
    isClear,
}: BoardProps) => {
    const [virtualBoard, setVirtualBoard] = useState<BoardMap>();
    const [winner, setWinner] = useState<Winner>();

    useEffect(() => {
        if (isClear) {
            setVirtualBoard({
                0: "",
                1: "",
                2: "",
                3: "",
                4: "",
                5: "",
                6: "",
                7: "",
                8: "",
            });
            setWinner({
                name: "",
                line: { squares: [-1] },
            });
        }
    }, [isClear]);

    const getMoveCount = (virtualB: BoardMap): number => {
        let tmpMoveCount = 0;

        for (const id in virtualB) {
            if (virtualB[id].length > 0) {
                ++tmpMoveCount;
            }
        }
        return tmpMoveCount;
    };

    const getWinnerLineByIds = (
        tmpVirtualBoard: BoardMap,
        ids: number[]
    ): Winner => {
        let rowWinner: Winner = { name: "", line: { squares: [-1] } };
        let row = [
            tmpVirtualBoard[ids[0]],
            tmpVirtualBoard[ids[1]],
            tmpVirtualBoard[ids[2]],
        ];
        if (row.every((player) => player === activePlayer)) {
            rowWinner = { name: activePlayer, line: { squares: ids } };
        }

        return rowWinner;
    };

    const getWinnerLine = (tmpVirtualBoard: BoardMap): Winner => {
        let lineWinner: Winner = { name: "", line: { squares: [-1] } };

        lines.every((line) => {
            lineWinner = getWinnerLineByIds(tmpVirtualBoard, line.squares);
            console.log("line", line);
            console.log("lineWinner", lineWinner);
            return lineWinner.line.squares.length !== 3;
        });

        return lineWinner;
    };

    const handleClick = (id: number): void => {
        let tmpVirtualBoard: BoardMap = { ...virtualBoard };
        if (tmpVirtualBoard[id].length === 0 && !isGameOver) {
            tmpVirtualBoard[id] = activePlayer;
            setVirtualBoard(tmpVirtualBoard);

            let moveCount = getMoveCount(tmpVirtualBoard);

            if (moveCount > 4) {
                // Check for winner
                let tmpWinner = getWinnerLine(tmpVirtualBoard);
                if (tmpWinner.line.squares.length === 3) {
                    onGameOver();
                    setWinnerName(tmpWinner.name);
                    setWinner(tmpWinner);
                }
            }

            if (moveCount < 9) {
                setNewActivePlayer();
            } else {
                onGameOver();
            }
        }
    };

    return virtualBoard ? (
        <div className="border-black border-2 mt-4">
            <div className="flex">
                {[0, 1, 2].map((id) => (
                    <Square
                        key={id}
                        id={id}
                        marker={virtualBoard[id]}
                        isOnWinningLine={winner?.line.squares.includes(id)}
                        onClick={handleClick}
                    />
                ))}
            </div>
            <div className="flex">
                {[3, 4, 5].map((id) => (
                    <Square
                        key={id}
                        id={id}
                        marker={virtualBoard[id]}
                        isOnWinningLine={winner?.line.squares.includes(id)}
                        onClick={handleClick}
                    />
                ))}
            </div>
            <div className="flex">
                {[6, 7, 8].map((id) => (
                    <Square
                        key={id}
                        id={id}
                        marker={virtualBoard[id]}
                        isOnWinningLine={winner?.line.squares.includes(id)}
                        onClick={handleClick}
                    />
                ))}
            </div>
        </div>
    ) : (
        <div>...Loading</div>
    );
};

export default Board;
