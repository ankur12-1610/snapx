async function getBalance(address: any, etherScanApiKey: any) {
    const response = await fetch(
      //use api.etherscan.io in prod.
      `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherScanApiKey}`,
    );
    return response.text();
  }

// Etherscan API key, get your own key from https://etherscan.io/apis and replace the below key with your own key.
// Etherscan provides only 5 requests per second, so if you are using this in production, you should use your own key.
const APIKEY = "HRFXAVJGIDCB3D1ZY2ZR458EXK2W4M9ERS";

export async function checkBalanceAndNotify(state: any) {
    const resp = await getBalance(
        state.address,
        APIKEY,
      );
      if(!resp){
        return wallet.request({
          method: 'snap_notify',
          params: [
            {
              type: 'native',
              message: `Use your own api key`,
            },
          ],
        });
      }
      const resObj = JSON.parse(resp);
      let balance = 0;
      if (resObj['status'] == 1 && resObj['message'] == 'OK') {
        //converting from wei to ether
        balance = parseInt(resObj['result']) / 1000000000000000000.0;
      }
      let oldBalance = state.balance;

      state.balance = balance;
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', state],
      });
      if (balance - oldBalance > 0) {
        let toShow =  `added:${
          balance - oldBalance
          }`.substring(0,50);
        return wallet.request({
          method: 'snap_notify',
          params: [
            {
              type: 'native',
              message: toShow,
            },
          ],
        });
      }
// for debugging purposes
      // else{
      //   return wallet.request({
      //     method: 'snap_notify',
      //     params: [
      //       {
      //         type: 'native',
      //         message: `${oldBalance}:${balance}`,
      //       },
      //     ],
      //   });
      // }
}
