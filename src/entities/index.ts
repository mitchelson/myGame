import Matter from 'matter-js';
import Bird from '../components/Bird';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';

import {Dimensions} from 'react-native';
import {getPipeSizePosPair} from '../utils/random';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default () => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  world.gravity.y = 0.94;

  const pipeSizePosA = getPipeSizePosPair();
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
  return {
    physics: {engine, world},

    Bird: Bird({
      physics: {engine, world},
      pos: {x: 50, y: 300},
      size: {height: 40, width: 40},
    }),
    ObstacleTop1: Obstacle({
      world,
      label: 'ObstacleTop1',
      color: 'red',
      pos: pipeSizePosA.pipeTop.pos,
      size: pipeSizePosA.pipeTop.size,
    }),
    ObstacleBottom1: Obstacle({
      world,
      label: 'ObstacleBottom1',
      color: 'blue',
      pos: pipeSizePosA.pipeBottom.pos,
      size: pipeSizePosA.pipeBottom.size,
    }),
    ObstacleTop2: Obstacle({
      world,
      label: 'ObstacleTop2',
      color: 'red',
      pos: pipeSizePosB.pipeTop.pos,
      size: pipeSizePosB.pipeTop.size,
    }),
    ObstacleBottom2: Obstacle({
      world,
      label: 'ObstacleBottom2',
      color: 'blue',
      pos: pipeSizePosB.pipeBottom.pos,
      size: pipeSizePosB.pipeBottom.size,
    }),
    Floor: Floor({
      world,
      color: 'green',
      pos: {x: windowWidth / 2, y: windowHeight - 20},
      size: {height: 100, width: windowWidth},
    }),
  };
};
