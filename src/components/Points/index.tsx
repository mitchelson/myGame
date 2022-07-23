import React from 'react';

import * as S from './styles';
interface Props {
  points: number;
}

export const Points: React.FC<Props> = ({points}) => {
  return (
    <S.Container>
      <S.Points>⚽️ {points}</S.Points>
    </S.Container>
  );
};
