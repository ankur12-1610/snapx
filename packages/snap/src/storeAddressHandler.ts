export async function storeAddress(address, state) {
    //Change this if you want to hard code address.

    state.address = address;
    await wallet.request({
        method: 'snap_manageState',
        params: ['update', state],
      });
      // return wallet.request({
      //   method: 'snap_confirm',
      //   params: [
      //     {
      //       prompt: `Hello, user!`,
      //       description: 'Store address?',
      //       textAreaContent: `Address: ${state.address}\n`,
      //     },
      //   ],
      // });
}
