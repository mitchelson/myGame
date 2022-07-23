import styled from 'styled-components/native';

interface ObstacleProps {
  color: string;
  background: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const Container = styled.View<ObstacleProps>`
  position: absolute;
  border-style: solid;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
`;

export const Obstacle = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
