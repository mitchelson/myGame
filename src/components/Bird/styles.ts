import styled from 'styled-components/native';

interface BirdProps {
  color: string;
  background: string;
  left: number;
  right: number;
  top: number;
  width: number;
  height: number;
  bottom: number;
  rotation: number;
}

export const Container = styled.View<BirdProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  align-items: center;
  justify-content: center;
`;

export const Bird = styled.ImageBackground`
  width: ${props => props.width + 4}px;
  height: ${props => props.width + 4}px;
`;
