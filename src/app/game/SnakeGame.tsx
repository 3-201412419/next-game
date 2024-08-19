'use client'
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/ui/button";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{x : 10, y : 10}];
const INITIAL_DIRECTION = {x : 1, y : 0};
const INITIAL_FOOD = {x : 15, y : 15};

const SnakeGame = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [eaten, setEaten] = useState(false);

    const moveSnake = useCallback(() => {
        if (gameOver) return;

        setSnake((prevSnake) => {
            const newSnake = [...prevSnake];
            const head = {...newSnake[0]};
            head.x += direction.x;
            head.y += direction.y;

            if(head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                return prevSnake;
            }

            if(newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                return prevSnake;
            }

            newSnake.unshift(head);

            if(head.x === food.x && head.y === food.y) {
                setEaten(true);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver]);

    useEffect(() => {
        if (eaten) {
            setScore(prevScore => prevScore + 1);
            setFood(getRandomFood());
            setEaten(false);
        }
    }, [eaten]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch(e.key) {
                case 'ArrowUp':
                    setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
                    break;
                case 'ArrowDown':
                    setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
                    break;
                case 'ArrowLeft':
                    setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
                    break;
                case 'ArrowRight':
                    setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        const gameInterval = setInterval(moveSnake, 100);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            clearInterval(gameInterval);
        }
    }, [moveSnake]);

    const getRandomFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    }, []);

    const resetGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(INITIAL_FOOD);
        setGameOver(false);
        setScore(0);
        setEaten(false);
    }, []);

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-bold">Score: {score}</div>
            <div style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                backgroundColor: '#eee',
                position: 'relative'
            }}>
                {snake.map((segment, index) => (
                    <div key={index} style={{
                        position: 'absolute',
                        left: segment.x * CELL_SIZE,
                        top: segment.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                        backgroundColor: 'green',
                    }} />
                ))}
                <div style={{
                    position: 'absolute',
                    left: food.x * CELL_SIZE,
                    top: food.y * CELL_SIZE,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: 'red',
                    borderRadius: '50%',
                }} />
            </div>
            {gameOver && (
                <div className="text-xl font-bold text-red-500">Game Over!</div>
            )}
            <Button onClick={resetGame}>Reset Game</Button>
        </div>
    );
};

export default SnakeGame;