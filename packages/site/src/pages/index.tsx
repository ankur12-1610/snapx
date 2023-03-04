import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Card, ConnectButton, Footer, GetNotificationButton, Header, InstallFlaskButton, NotifySnap, RecoverPrivateKeyButton, RecoverySnap, SetupRecoveryKeyButton, Sidebar
} from '../components';
import { DaoCard } from '../components/DaoCard';
import { NFTcard } from '../components/NFTcard';
import Popup from '../components/Popup';
import TransactionCard from '../components/TransactionCard';
import { faceIO } from '../faceIO/fio.js';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { ToggleThemeContext } from '../Root';
import {
  connectSnap,
  getSnap, recoverPrivateKey, setupRecoveryKey, shouldDisplayReconnectButton
} from '../utils';
import { getParsedProposals } from '../utils/daos';
import { authenticateUser, enrollUser } from '../utils/faceio';
import { generateArray } from '../utils/opensea';
import { checkBalanceAndNotify, getBalance } from '../utils/transactions';
import { getWalletAddress } from '../utils/wallet';
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  height: 63vh;
  margin-bottom: 7.6rem;
  // background-color: #ffffff;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  // margin-top: 7.6rem;
  // backgroung-color: #ffffff;
  // height: 63vh;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const SidebarWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 75vh;
width: 30rem;
padding: 2.4rem;
border-right: 1px solid orange;
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: orange;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 68.8rem;
  width: 100%;
  height: 5rem;
  margin-top: 1.5rem;
`;

const RightWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  // background: green;
  align-items: center;
`

const RightHeaading = styled.div`
display: flex;
justify-content: center;
text-align: center;
font-size: 2rem;
font-weight: 700;
padding: 0.7rem 0;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 4rem;
  margin-top: 2rem;
  justify-content: center;
`
const RightTopBar = styled.div`
width: 100%;
// height: 7vh;
display:grid;
grid-template-columns: 1fr 1fr 1fr;
justify-items: center;
align-items: center;
`
const Button = styled.button`
  border-radius: 4rem;
  height: fit-content;
  margin-top: 1rem;
  color: black;
  border: 1px solid orange;
  background: orange;
  width: 70%;

`
const TrasactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  padding: 3rem 15%;
  overflow-y: scroll;
  max-height: 20vh;
   /* background: blue; */
`
const NoTransaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  font-size: 4rem;
  border: 1px solid orange;
  margin-top: 5rem;
  border-radius: ${({ theme }) => theme.radii.default};

`

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid orange;
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const PopupCard = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0%;
`

const CrossIcon = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  color: orange;
  font-size: 4rem;
  /* cursor: pointer; */
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  border: 2px solid orange;
`
const ConnectContainer = styled.div`
`

export default function Index () {

  const toggleTheme = useContext(ToggleThemeContext);
  const [state, dispatch] = useContext(MetaMaskContext);
  const [openPrompt, setOpenPrompt] = useState<boolean>(false);
  const [publicKey, setPublicKey] = useState<any>(null);
  const [address, setAddress] = useState(null)
  // const [get, set] = useState('notify');
  const [mode , setMode] = useState<string>('recovery');

const [faceio, setFaceio] = useState<any>(null)

// setting API key, this API has certain limits so use your own api key
useEffect(() => {
  let faceI = new faceIO("fioaa77b")
  setFaceio(faceI)
}, [])
const [data, setData] = useState<any>(null)
const [topbarMode, setTopbarMode] = useState("dao")
useEffect(() => {
  const interval = setInterval(() => {
    // setTransac(!transac)

    checkBalanceAndNotify(address)
  }, 6000);

  return () => {
    clearInterval(interval);
  }
}, [])

const getBalanceData = async()=>{
  console.log("getBalanceData",address);
  if(!address){
    setAddress(localStorage.getItem("address"))
    console.log(address);

  }
  const balance = await getBalance(address,"HRFXAVJGIDCB3D1ZY2ZR458EXK2W4M9ERS")
  const result = JSON.parse(balance).result/1000000000000000000.0;
  localStorage.setItem("balance",result.toString())
}
const getOpenseaData = async()=>{
  const da = generateArray(address)
  localStorage.setItem("opensea",JSON.stringify(da))
}

const getData = async()=>{
  if(topbarMode == "dao"){
   const da = await getParsedProposals(address);
    setData(da)
  }
  if(topbarMode == "transaction"){
    const da = localStorage.getItem("transactions")
    setData(JSON.parse(da))
    // console.log(da);
  }
  if(topbarMode == "nft"){
  }
}
const getAddress = async() =>{
  const tmp = await getWalletAddress();
  console.log(tmp);
  setAddress(tmp[0])
  localStorage.setItem("address",tmp[0])
}


useEffect(() => {
 if(state.isFlask) {localStorage.setItem("transactions",JSON.stringify([]))
  getAddress()
  getBalanceData()
}
}, [address])

useEffect(() => {

  getData()
}, [topbarMode])


  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleRecoverPrivateClick = async (faceId:any,publicKey:any) => {
    try {
      console.log("FaceId",faceId);
      console.log("publicKey",publicKey);
      await recoverPrivateKey(faceId,publicKey);

    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
      window.location.reload();
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      if(publicKey == null){
        return;
      }
      const res = await authenticateUser(faceio)
      if(res.error==false){
        const faceId = res.data.facialId
        await handleRecoverPrivateClick(faceId,publicKey)
        setOpenPrompt(false)
      }
      else {
        console.log("error");
        dispatch({ type: MetamaskActions.SetError, payload: res.message });
        setOpenPrompt(false)
        return;
      }
    } catch (error) {
      console.error(error)
      dispatch({ type: MetamaskActions.SetError, payload: error });
      setOpenPrompt(false)
    }
  }


  const handleSetupRecoveryKeyClick = async () => {
    try {
      const res = await enrollUser(faceio)
      console.log(typeof res);
      if(res.error==false){
        const faceId = res.data.facialId
        await setupRecoveryKey(faceId);
        window.location.reload();
      }
      else {
        console.log("error");
        dispatch({ type: MetamaskActions.SetError, payload: res.message });
        window.location.reload();
      }
    } catch (e) {
      dispatch({ type: MetamaskActions.SetError, payload: e });
      window.location.reload();
    }
  };
  function capitalizeFirstLetter(string:any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  return (
    <>
    <div style={openPrompt ?{filter:"blur(2px)"} : {}}>
    <Header handleToggleClick={toggleTheme} />
    <Container>
    <SidebarWrapper>
    <Sidebar
            content={{
              title: 'Recover-Key',
              description:
                'Use to recover the private key of your account using your recovery key.',
              button: <RecoverySnap  onClick={()=>{setMode('recovery')
              console.log(mode);}}  disabled={mode=="recovery"} />,
            }}
          />
    <Sidebar
            content={{
              title: 'Snap-Alert',
              description:
                'Get notifications by installing the notify snap',
              button: <NotifySnap onClick={()=>{setMode('notify')
            console.log(mode);
            }} disabled={mode=="notify"} />,
            }}
    />
    </SidebarWrapper>

    <Main>
      <Heading>
        Welcome to <Span> SnapX</Span>
      </Heading>
      <div id="faceio-modal"></div>
     {
        mode == "recovery" &&
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}

    {
      (state.isFlask && state.installedSnap &&  mode == "recovery") ?
      <>
      <Card
          content={{
            title: `Setup Recovery Key`,
            description:
              'Setup a recovery key to recover your account in case you lose access to your device.',
            button: (
              <SetupRecoveryKeyButton
                onClick={handleSetupRecoveryKeyClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Recover Private Key',
            description:
              'Recover your private key using your recovery key.',
            button: (
              <RecoverPrivateKeyButton
                onClick={()=>{setOpenPrompt(true)}}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            state.isFlask &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
      </>
      :
      <>
      </>

    }
      </CardContainer>

      }

      {
        (mode == "notify" && state.installedSnap && state.isFlask) &&
        <>
        {
          state.installedSnap && state.isFlask &&
          <ButtonWrapper>
            <GetNotificationButton/>
          </ButtonWrapper>

          }
        <RightWrapper>
        <RightHeaading>
          Notification
        </RightHeaading>
         <RightTopBar>
          <Button onClick={()=>{setTopbarMode("nft")}} disabled={topbarMode == "nft"} >
            NFT
          </Button>
          <Button onClick={()=>{setTopbarMode("dao")}} disabled={topbarMode == "dao"} >
            DAO
          </Button>
          <Button onClick={()=>{setTopbarMode("transaction")}} disabled={topbarMode == "transaction"} >
          Transaction
          </Button>
        </RightTopBar>
          {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
          )}
          {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
          )}
          {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the Notify-snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!state.isFlask}
                />
              ),
            }}
            disabled={!state.isFlask}
          />
          )}
          {
            state.installedSnap && topbarMode == "nft" &&
            <TrasactionContainer>
            <NFTcard tokenId={"Azuki #494"} price="0.01"/>
            </TrasactionContainer>
          }
          {state.installedSnap  && topbarMode == "dao" &&

          (
            (data!=null && data.length!=0) ?
          <TrasactionContainer>
            {data.map((item:any,index:any)=>{
              return(
                <DaoCard key={index}
                content={{
                  title: item.space,
                  description: item.title,
                  time: item.timeLeft
                }}
                />
              )
            })}
            </TrasactionContainer>
            :
            <NoTransaction>No Proposals Yet</NoTransaction>
            )
          }
          {(state.installedSnap && topbarMode == "transaction") &&
          (
            (data!=null && data.length!=0 ) ?
            <TrasactionContainer>
            {
                data.map((item:any,index:any)=>{
                  return(
                     <TransactionCard key={index} item={item}/>
                  )
                })
            }

          </TrasactionContainer>
            :
              <NoTransaction>No Transactions Yet</NoTransaction>
          )
          }
        </RightWrapper>
        </>

      }
        <ConnectContainer>
        {!state.installedSnap && (
          <Card
          content={{
            title: 'Connect',
            description:
              'Get started by connecting to and installing the Notify-snap.',
            button: (
              <ConnectButton
                onClick={handleConnectClick}
                disabled={!state.isFlask}
              />
            ),
          }}
          disabled={!state.isFlask}
          />
        )}


        </ConnectContainer>
    </Main>
    </Container>
    <Footer />
    </div>

    {
       openPrompt ?
       <PopupCard>
        <CrossIcon style={openPrompt ? {"display":"block","cursor":"pointer"} : {display:"none","cursor":"pointer"}}
         onClick={()=>{setOpenPrompt(false)}}>
          &#x2715;
        </CrossIcon>
         <Popup setPublicKey={setPublicKey} handleSubmit={handleSubmit} />
       </PopupCard>
       :
       <></>
      }
    </>
  );
};
