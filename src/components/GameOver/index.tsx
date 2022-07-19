import React from 'react';
import * as S from './styles';

interface Props {
  onPress: () => void;
}

export const GameOver: React.FC<Props> = ({onPress}) => {
  return (
    <S.Container onPress={onPress}>
      <S.Text>Game Over</S.Text>
    </S.Container>
  );
};
