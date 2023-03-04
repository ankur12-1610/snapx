export async function getBalance(address: any, etherScanApiKey: any) {
  if(address == null){
    address = localStorage.getItem('address');
  }
  const response = await fetch(
    //use api.etherscan.io in prod.
    `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherScanApiKey}`,
  );
  return response.text();
}

export async function checkBalanceAndNotify(address:any) {
  console.log('checkBalanceAndNotify',address);
  console.log(address);
  if(address == null){
    address = localStorage.getItem('address');
    console.log("address",address);

  }

  let tmp:any = localStorage.getItem('transactions');
  console.log(tmp);
  let arr = JSON.parse(tmp);
  const resp = await getBalance(
      address,
      'HRFXAVJGIDCB3D1ZY2ZR458EXK2W4M9ERS',
    );
    const resObj = JSON.parse(resp);
    let balance = 0;
    if (resObj['status'] == 1 && resObj['message'] == 'OK') {
      //converting from wei to ether
      balance = Number(resObj['result']) / 1000000000000000000.0;
    }
    let oldBalance = Number(localStorage.getItem('balance'));
    // oldBalance =(oldBalance);
    console.log("Old",oldBalance);
    console.log("New",balance);

    if (balance - oldBalance > 0) {
      let toShow =  {
        amount: ((balance-oldBalance).toPrecision(8)).toString(),
      };
      // let toShow = balance-oldBalance;
      arr.push(toShow);
      // console.log(toShow);
    }else{
      console.log("no change");
      // console.log("arr", arr);
    }
    if(balance==0){
      balance = oldBalance;
    }
    localStorage.setItem("transactions",JSON.stringify(arr));
    localStorage.setItem('balance', balance.toString());
    return balance;
}
