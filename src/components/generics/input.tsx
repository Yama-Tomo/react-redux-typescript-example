import styled from 'styled-components';

export const Input = styled.input`
  display: flex;
  box-sizing: border-box;
  margin: ${props => props.theme.margin}px;
  padding: ${props => props.theme.padding}px;
`;

Input.defaultProps = {
  theme: {
    margin: 0,
    padding: 0,
  }
};
