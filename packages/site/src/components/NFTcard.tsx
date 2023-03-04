import styled from 'styled-components';


const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '100%')};
  background-color: ${({ theme }) => theme.colors.card.default};
  /* margin-right: 2.4rem; */
  /* margin-left: 2.4rem; */
  /* margin-bottom: 1rem; */
  margin-top: 1.4rem;
  padding: 2.4rem;
  border: 1px solid orange;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    padding: 1.6rem;
  }
`;

const Head = styled.h2`
font-size: 2rem;

`


const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const Description = styled.div`
  margin-top: 1.4rem;
  margin-bottom: 1.4rem;

`;

const LeftContainer = styled.div`

`
const RightContainer = styled.div`
font-size: 2rem;
font-weight: bolder;

`

export const NFTcard = ({ tokenId,price }: any) => {
  return (
    <CardWrapper>
      <LeftContainer>
        <Head>You got an offer on NFT</Head>
      {tokenId && (
        <CardTitle>{tokenId}</CardTitle>
        )}
      {/* <Description>{description}</Description> */}
      </LeftContainer>
      <RightContainer>
      <Description>@{price} ETH</Description>
      {/* {button} */}
      </RightContainer>
    </CardWrapper>
  );
};
