import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Portal from './Portal';
import Button from './Button';

const S = {};

S.Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: rgba(0, 0, 0, .9);
  font-size: 1.5rem;
  line-height: 1.5;
  overflow-y: auto;

  p + * {
    margin-top: 1em;
  }
`;

S.CloseButtonContainer = styled.div`
  float: right;
`;

const Modal = props => (
  <Portal>
    {props.show && (
      <S.Modal className={props.className}>
        <S.CloseButtonContainer>
          <Button onClick={props.onClose}>Close</Button>
        </S.CloseButtonContainer>

        {props.children}

      </S.Modal>
    )}
  </Portal>
);

Modal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;