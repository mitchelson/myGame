import Matter from 'matter-js';
import React, {useEffect} from 'react';
import {bird} from '../../assets';
import * as Animated from 'react-native-animatable';
import * as S from './styles';

interface PropsBird {
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
  body: Matter.Body;
}

const Bird = (props: PropsBird) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const [position, setPosition] = React.useState(0);
  const [running, setRunning] = React.useState(true);
  const [rotation, setRotation] = React.useState(0);

  function rotationBird() {
    if (props.body.position.y > position) {
      setRotation(30);
    } else {
      setRotation(-20);
    }
  }

  useEffect(() => {
    rotationBird();
    setPosition(props.body.position.y);
  }, [props.body.position.y]);

  useEffect(() => {
    if (props.physics.engine.pairs.collisionStart.length > 0) {
      setRunning(false);
    } else {
      setRunning(true);
    }
  }, [props]);

  return (
    <S.Container
      left={xBody}
      top={yBody}
      width={widthBody}
      height={widthBody}
      rotation={rotation}>
      <Animated.View
        animation={running ? 'rotate' : ''}
        easing={running ? 'linear' : 'ease-out'}
        iterationCount={'infinite'}
        duration={1000}>
        <S.Bird source={bird} width={widthBody} height={widthBody} />
      </Animated.View>
    </S.Container>
  );
};

interface Props {
  physics: {
    engine: Matter.Engine;
    world: Matter.World;
  };
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
  const initialBird = Matter.Bodies.circle(
    props.pos.x,
    props.pos.y,
    Math.sqrt((props.size.width * props.size.width) / Math.PI),
    {label: 'Bird'},
  );
  Matter.World.add(props.physics.world, initialBird);

  return {
    body: initialBird,
    physics: props.physics,
    pos: props.pos,
    renderer: <Bird body={initialBird} physics={props.physics} />,
  };
};
