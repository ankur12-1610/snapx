export const getWalletAddress = async()=>{
  const address = await
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
    return address;
}
