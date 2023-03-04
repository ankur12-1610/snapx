import { deriveBIP44AddressKey, JsonBIP44CoinTypeNode } from '@metamask/key-tree';
import { BN } from 'bn.js';

const CryptoJS = require("crypto-js");
const zeroBn = new BN(0);

export async function findAllAddressesForNode (node: JsonBIP44CoinTypeNode) {
    const recoveredAddresses = [];
    let accountIndex = 0;
    while (true) {
      let foundAddressForAccount = false;
      let addressIndex = 0;
      /* eslint-disable no-await-in-loop */
      while (true) {
        const address = await deriveBIP44AddressKey(node, { account: accountIndex, address_index: addressIndex });
        const numTransactionsHex = await wallet.request({
          method: 'eth_getTransactionCount',
          params: [
            address.address,
            'latest',
          ],
        }) as string;
        const numTransactions = parseInt(numTransactionsHex, 16);
        const balanceHex = await wallet.request({
          method: 'eth_getBalance',
          params: [
            address.address,
            'latest',
          ],
        }) as string;
        const balanceInWei = new BN(balanceHex.replace('0x', ''), 16);
  
        if (numTransactions > 0 || balanceInWei.gt(zeroBn)) {
          recoveredAddresses.push({
            // accountIndex,
            pk: address.privateKey,
          });
  
          addressIndex += 1;
          foundAddressForAccount = true;
        } else {
          break;
        }
      }

      if (foundAddressForAccount) {
        accountIndex += 1;
      } else {
        break;
      }
    }

    return recoveredAddresses;
  };