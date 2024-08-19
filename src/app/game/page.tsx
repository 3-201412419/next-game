import SnakeGame from "./SnakeGame";

export default function GamePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
            <h1 className = "text-4xl font-bold mb-8">Snake Game</h1>
            <SnakeGame />
        </main>
    )
}