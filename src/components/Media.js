import styled from 'styled-components';

export const DesktopOnly = styled.div`
  display: none;

  @media screen and (min-width: 576px) {
    display: block;
  }
`;

export const MobileOnly = styled.div`
  display: block;

  @media screen and (min-width: 576px) {
    display: none;
  }
`;