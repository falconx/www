import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button',
})`
  display: inline-flex;
  border: 4px solid;
  border-color: rgba(255, 255, 255, .1);
  border-radius: 50px;
  color: #ffd62e;
  cursor: pointer;
  padding: 10px 20px;
  transition: all .25s linear;

  &:hover,
  &:focus {
    color: #fff;
    border-color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export default Button;