const getOpenSea = async(address: any)=>{
  const data =await fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${address}&order_direction=desc&offset=0&limit=20&include_orders=true`)
  const res = await data.json();
  return res;
}
const getOfferCnt = async(address: any,token_id:any)=>{
  console.log("address",address,"tokenid",token_id);

const data =await fetch(`https://testnets-api.opensea.io/v2/orders/goerli/seaport/offers?asset_contract_address=${address}&token_ids=${token_id}&order_by=created_date&order_direction=desc&limit=1`)
setTimeout(() => {
  console.log("waiting");
},10000)
const res = await data.json();
console.log(res);

const len = res.orders.protocol_data.parameters.consideration.length;
return len;
}
export const generateArray = async(address: any)=>{
    var arr: any =[];
    const data = await getOpenSea(address);
    const nfts = data.assets;
    const len  = await getOfferCnt(nfts[0].asset_contract.address,nfts[0].token_id)
    const name = nfts[0].token_id;
    arr.push({
      name,
      length:len
    })
  return {arr,nfts};
}

const compare = async(address: any)=>{
  const {arr,nfts} = await generateArray(address);
  const tmp = localStorage.getItem("opensea");
  const state = JSON.parse(tmp);
  for(let i=0;i<nfts.length;i++){
      for(let j=0;j<arr.length;j++){
      if(arr[j].name == nfts[i].token_id){
          if(arr[j].length != state[j].length){
              const length = arr[j].length;
              const price = 0;
              const token_id = nfts[i].token_id;
              console.log(nfts[i].token_id,length,);
              return {token_id,length,price};
          }
      }
  }
}
  return null;
}
export const notify = async(address: any)=>{
  const x = await compare(address);
  if(x != null){
      const {token_id,length,price} = x;
      return {token_id,length,price};
  }
  return null;
}


// API Key: e14c1fad2dc14825e68c
//  API Secret: 6f846a404f35a3740162ee1fbbc0cb61243ef7dcdc377c1604851ef062e50f41
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjMzk5NmJmMy0wOWQzLTRjMTItOTFhYS03ZWJlZDdlMDE1OWIiLCJlbWFpbCI6InBhcnRpa2J1bXJhaDEzNTA4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlMTRjMWZhZDJkYzE0ODI1ZTY4YyIsInNjb3BlZEtleVNlY3JldCI6IjZmODQ2YTQwNGYzNWEzNzQwMTYyZWUxZmJiYzBjYjYxMjQzZWY3ZGNkYzM3N2MxNjA0ODUxZWYwNjJlNTBmNDEiLCJpYXQiOjE2NzU2NzM2MTd9.tewQTga0DX097LsOuBWRiMHvVHyjI8KMh5rVMhJ4in4
