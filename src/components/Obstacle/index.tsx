import Matter from 'matter-js';
import React from 'react';
import {Image, ImageBackground} from 'react-native';
import {bottomObstacle, topObstacle} from '../../assets';
import * as S from './styles';

interface PropsObstacle {
  color: string;
  body: Matter.Body;
}

const Obstacle = (props: PropsObstacle) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  const isTop = props.body.position.y > 0;

  console.log('isTop', isTop, props.body.position.y);

  return (
    <S.Container
      left={xBody}
      top={yBody}
      width={widthBody}
      height={heightBody}
      background={color}
      style={{
        justifyContent: !isTop ? 'flex-end' : 'flex-start',
      }}>
      <Image
        resizeMethod="auto"
        resizeMode="stretch"
        style={{
          position: 'absolute',
          width: '100%',
          height: '35%',
        }}
        source={isTop ? bottomObstacle : topObstacle}
      />
    </S.Container>
  );
};

interface Props {
  world: Matter.World;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  label: string;
  size: {
    width: number;
    height: number;
  };
}

export default (props: Props) => {
  const initialObstacle = Matter.Bodies.rectangle(
    props.pos.x,
    props.pos.y,
    props.size.width,
    props.size.height,
    {
      label: props.label,
      isStatic: true,
    },
  );
  Matter.World.add(props.world, initialObstacle);

  return {
    body: initialObstacle,
    color: props.color,
    pos: props.pos,
    renderer: <Obstacle body={initialObstacle} color={props.color} />,
  };
};
