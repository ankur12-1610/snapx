import React from 'react'
import styled from 'styled-components'
import Approval from "../../public/icons/Approval.svg"
type Props ={
  item:{
    amount?:string,
  }
}
const Container = styled.div`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.card.default};
  height: 10%;
  justify-content: space-between;
  border: 1px solid orange;
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2rem 1rem;
  margin-bottom: 1rem;

`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 2rem;


`
const RightContainer = styled.div`
  display: flex;
  height: 100%;

`
const Amount = styled.div`
  font-size: 3rem;
`

const Received = styled.div`
  font-size: 1.5rem;
`

const TransactionCard = ({item}:Props) => {
  return (
    <Container>
      <LeftContainer>
        <Amount>
          {item.amount} ETH
        </Amount>
        <Received>
        Received
        </Received>
        </LeftContainer>

        <RightContainer>
            <img src={Approval}placeholder="Approval"  />
          </RightContainer>
    </Container>
  )
}

export default TransactionCard
