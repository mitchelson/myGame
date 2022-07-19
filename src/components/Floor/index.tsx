import Matter from 'matter-js';
import React from 'react';
import * as S from './styles';
import {floor} from '../../assets';

interface PropsFloor {
  color: string;
  body: Matter.Body;
}

const Floor = (props: PropsFloor) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <S.Container
      source={floor}
      left={xBody}
      top={yBody}
      width={widthBody}
      height={heightBody}
      background={color}
      resizeMethod="auto"
      resizeMode="stretch"
    />
  );
};

interface Props {
  world: Matter.World;
  color: string;
  pos: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}

export default (props: Props) => {
  const initialFloor = Matter.Bodies.rectangle(
    props.pos.x,
    props.pos.y,
    props.size.width,
    props.size.height,
    {
      label: 'Floor',
      isStatic: true,
    },
  );
  Matter.World.add(props.world, initialFloor);

  return {
    body: initialFloor,
    color: props.color,
    pos: props.pos,
    renderer: <Floor body={initialFloor} color={props.color} />,
  };
};
