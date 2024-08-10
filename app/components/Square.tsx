"use client";
import React from "react";

interface SquareProps {
    id: number;
    marker: string;
    onClick: (id: number) => void;
    isOnWinningLine?: boolean;
}

const Square = ({
    id,
    marker,
    isOnWinningLine = false,
    onClick,
}: SquareProps) => (
    <div
        className={`w-32 h-32 border-2 cursor-pointer flex items-center justify-center text-8xl ${
            isOnWinningLine ? "bg-green-300" : ""
        }`}
        onClick={() => onClick(id)}
    >
        {marker}
    </div>
);

export default Square;
