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
  /* border-style: solid; */
  /* border-width: 1px; */
  border-radius: 40px;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  transform: rotate(${props => props.rotation}deg);
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
  /* background-color: ${props => props.background}; */
`;

export const Bird = styled.ImageBackground`
  width: ${props => props.width}px;
  height: ${props => props.width}px;
`;
