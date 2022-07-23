import React from 'react';
import * as S from './styles';

interface Props {
  onPress: () => void;
  bestScore: number;
}

export const GameOver: React.FC<Props> = ({onPress, bestScore}) => {
  return (
    <S.Container>
      <S.ViewTitle>
        <S.Text>Game Over</S.Text>
      </S.ViewTitle>
      <S.Line />
      <S.Description>{'Recorde ' + bestScore}</S.Description>
      <S.Button onPress={onPress}>
        <S.TextButton>Restart 🔄</S.TextButton>
      </S.Button>
    </S.Container>
  );
};
