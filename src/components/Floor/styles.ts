import styled from 'styled-components/native';

interface FloorProps {
  color: string;
  background: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

export const Container = styled.View<FloorProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  right: ${props => props.right}px;
  top: ${props => props.top}px;
  bottom: ${props => props.bottom}px;
`;

export const Image = styled.Image`
  width: ${props => props.width}px;
  margin-top: -35px;
`;
