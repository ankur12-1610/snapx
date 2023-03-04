import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
  background: ${({theme}) => theme.colors.card.default};
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid ${({theme}) => theme.colors.border.default};
  position: absolute;
  width: 20%;
  top: 35%;
  height: 30%;
  left: 40%;

`
const Input = styled.input`
  outline: none;
  border: 1px solid ${({theme}) => theme.colors.border.default};
  border-radius: 5px;
  font-size: 2rem;
  padding:  1rem 1rem;
  margin-bottom: 2rem;

`
const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`
const Button = styled.button`

`
const Popup = ({setPublicKey,handleSubmit}) => {
  return (
    <Container>
      <H1>Enter Your Recovery Key</H1>
        <Input type="text" placeholder='09xac.....2fn29' onChange={(e)=>{setPublicKey(e.target.value)}} required  />
        <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  )
}

export default Popup
