import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import {Points} from './components/Points';
import {background} from './assets';
import entities from './entities';
import Physics from './utils/physics';
import {GameOver} from './components/GameOver';

const App = () => {
  const [running, setRunning] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gameEngineRef = useRef(null);

  function startGame() {
    setGameOver(false);
    setCurrentPoints(0);
    setRunning(true);
    gameEngineRef.current.swap(entities());
  }

  useEffect(() => {
    setRunning(false);
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

      {gameOver && <GameOver onPress={startGame} />}

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
