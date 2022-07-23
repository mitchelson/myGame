import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  position: absolute;
  top: 0;
  z-index: 100;
  right: 0px;
  padding: 20px;
  background-color: aliceblue;
  border-top-left-radius: 13px;
  border-bottom-left-radius: 13px;
  margin-top: ${getStatusBarHeight() + 20}px;
`;

export const Points = styled.Text`
  font-size: 30px;
  color: #000;
  font-weight: bold;
  text-align: right;
`;
