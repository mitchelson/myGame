import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import {GameEngine} from 'react-native-game-engine';
import {Points} from './components/Points';
import {background} from './assets';
import entities from './entities';
// import Physics from './utils/physics';
import {GameOver} from './components/GameOver';
import Matter from 'matter-js';
import {getPipeSizePosPair} from './utils/random';

import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const kickSound = new Sound('kick.wav', Sound.MAIN_BUNDLE);
const collision = new Sound('lost.wav', Sound.MAIN_BUNDLE);
const start = new Sound('start.wav', Sound.MAIN_BUNDLE);

const App = () => {
  const [running, setRunning] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // Sound.setCategory('Playback');
  const [speed, setSpeed] = useState(3);
  const [stepSpeed, setStepSpeed] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const gameEngineRef = useRef(null);

  function startGame() {
    start.stop();
    start.play();
    setGameOver(false);
    setCurrentPoints(0);
    setRunning(true);
    gameEngineRef.current.swap(entities());
  }

  useEffect(() => {
    if (gameOver) {
      collision.stop();
      collision.play();
    }
  }, [gameOver]);

  const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine;

    touches
      .filter(t => t.type === 'press')
      .forEach(() => {
        kickSound.stop();
        kickSound.play();
        Matter.Body.setVelocity(entities.Bird.body, {
          x: 0,
          y: -8,
        });
      });

    touches
      .filter(t => t.type === 'long-press')
      .forEach(t => {
        // kickSound.stop();
        // kickSound.play();
        console.log('long press', t);
        // Matter.Body.setStatic(entities.Bird.body, true);
        Matter.Body.setMass(entities.Bird.body, 0.1);
        // Matter.Body.setVelocity(entities.Bird.body, {
        //   x: 0,
        //   y: -12,
        // });
      });

    Matter.Engine.update(engine, time.delta);

    for (let index = 1; index <= 2; index++) {
      if (
        entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
        !entities[`ObstacleTop${index}`].point
      ) {
        entities[`ObstacleTop${index}`].point = true;
        dispatch({type: 'new_point'});
      }

      if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
        const pipeSizePos = getPipeSizePosPair(windowWidth * 0.6);

        Matter.Body.setPosition(
          entities[`ObstacleTop${index}`].body,
          pipeSizePos.pipeTop.pos,
        );
        Matter.Body.setPosition(
          entities[`ObstacleBottom${index}`].body,
          pipeSizePos.pipeBottom.pos,
        );

        entities[`ObstacleTop${index}`].point = false;
      }

      Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
        x: speed * -1,
        y: 0,
      });
      Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
        x: speed * -1,
        y: 0,
      });
    }

    Matter.Events.on(engine, 'collisionStart', () => {
      dispatch({type: 'game_over'});
    });
    return entities;
  };

  useEffect(() => {
    if (currentPoints > 5) {
      let difficulty = currentPoints / 5;
      if (difficulty > stepSpeed) {
        setStepSpeed(difficulty);
        setSpeed(speed + 0.1);
      }
    }
  }, [currentPoints]);

  async function getHighScore() {
    if (currentPoints > bestScore) {
      setBestScore(currentPoints);
      await AsyncStorage.setItem('highScore', currentPoints.toString());
    }
  }

  useEffect(() => {
    async function getScore() {
      const highScore = await AsyncStorage.getItem('highScore');
      if (highScore) {
        setBestScore(parseInt(highScore, 10));
      } else {
        setBestScore(0);
        AsyncStorage.setItem('highScore', '0');
      }
    }
    setRunning(false);
    getScore();
  }, []);

  return (
    <ImageBackground
      resizeMethod="auto"
      resizeMode="stretch"
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      source={background}>
      <Points points={currentPoints} />
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setGameOver(true);
              setRunning(false);
              setSpeed(3);
              getHighScore();
              gameEngineRef.current.stop();
              break;
            case 'new_point':
              setGameOver(false);
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <StatusBar barStyle={'default'} hidden={true} />
      </GameEngine>

      {gameOver && <GameOver onPress={startGame} bestScore={bestScore} />}

      {!running && !gameOver ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
            onPress={startGame}>
            <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </ImageBackground>
  );
};

export default App;
