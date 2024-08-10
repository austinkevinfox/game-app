import Game from "./components/Game";

export default function Home() {
    return (
        <main className="flex flex-col items-center p-24">
            TicTacToe
            <Game />
        </main>
    );
}
