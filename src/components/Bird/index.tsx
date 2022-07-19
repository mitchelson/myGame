import Matter, {use} from 'matter-js';
import React, {useEffect} from 'react';
import {bird} from '../../assets';
import * as S from './styles';

interface PropsBird {
  color: string;
  body: Matter.Body;
}

const Bird = (props: PropsBird) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  const [position, setPosition] = React.useState(0);

  const [rotation, setRotation] = React.useState(0);

  function rotationBird() {
    if (props.body.position.y > position) {
      setRotation(30);
    } else {
      setRotation(-30);
    }
  }

  useEffect(() => {
    rotationBird();
    setPosition(props.body.position.y);
  }, [props.body.position.y]);

  return (
    <S.Container
      left={xBody}
      top={yBody}
      width={widthBody}
      height={heightBody}
      background={color}
      rotation={rotation}>
      <S.Bird source={bird} />
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
  size: {
    width: number;
    height: number;
  };
}

export default (props: Props) => {
  const initialBird = Matter.Bodies.rectangle(
    props.pos.x,
    props.pos.y,
    props.size.width,
    props.size.height,
    {label: 'Bird'},
  );
  Matter.World.add(props.world, initialBird);

  return {
    body: initialBird,
    color: props.color,
    pos: props.pos,
    renderer: <Bird body={initialBird} color={props.color} />,
  };
};
