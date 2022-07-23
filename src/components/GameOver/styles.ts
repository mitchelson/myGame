import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
`;

export const ViewTitle = styled.View`
  /* background-color: #f55; */
  padding: 10px;
  border-radius: 10px;
`;

export const Button = styled.TouchableOpacity`
  background-color: black;
  border-radius: 10px;
  padding: 10px;
`;
export const TextButton = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
export const Text = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #000;
  text-align: center;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background: #000;
`;

export const Description = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin: 20px;
  color: #000;
  text-align: center;
`;
