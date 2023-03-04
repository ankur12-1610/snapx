import styled, { useTheme } from 'styled-components';
// import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';
import { MetaMask } from './MetaMask';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2.4rem;
  width 100%;
  padding-bottom: 2.4rem;
  border-top: 1px solid orange;
`;


export const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
          Made with ❤ and efforts.
    </FooterWrapper>
  );
};
