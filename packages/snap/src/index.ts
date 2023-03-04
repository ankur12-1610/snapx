import { OnRpcRequestHandler } from '@metamask/snap-types';
import { OnTransactionHandler } from "@metamask/snap-types";
import { OnCronjobHandler } from '@metamask/snap-types';

import { getParsedProposals } from './daos';
import { getContractDetails } from './contractVerifier';
import { storeAddress } from './storeAddressHandler';
import { checkBalanceAndNotify } from './onRecieveTransactionNotification';
import { findAllAddressesForNode } from './get_account_addresses';

const CryptoJS = require("crypto-js");

// recovery key functions
async function parentEtheriumNode(){
  const node = await wallet.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 60,
    },
  });

  return node;
}

async function nodeEncryption(faceID){
  const node = await parentEtheriumNode();
  const encrypted_node = CryptoJS.AES.encrypt(JSON.stringify(node), faceID).toString();

  return encrypted_node;
}

async function nodeDecryption(faceID, encrypted_node) {
  const decrypted_node = JSON.parse(CryptoJS.AES.decrypt(encrypted_node, faceID).toString(CryptoJS.enc.Utf8));

  return decrypted_node;
}

async function getPrivateKeyByAddresses(faceID, encrypted_node) {
  const node = await nodeDecryption(faceID, encrypted_node);
  var i= 0;
  const privateKeys = await findAllAddressesForNode(node);
  const parsed_keys = JSON.stringify(privateKeys).replace(/,/g, "\n");
  return parsed_keys;
}

async function setupRecoveryKey(faceID){
  const encrypted_node = await nodeEncryption(faceID);
  return encrypted_node;
}

async function recoverPrivateKey(faceID, encrypted_node){
  const privateKeys = await getPrivateKeyByAddresses(faceID, encrypted_node);
  return privateKeys;
}

/////////////////////////////////////////////////////////////////////////////////


// all rpc handlers are here
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'storeAddress':
      let state = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });

      if (!state) {
        state = { address: '', balance: 0.0 };
      }
      return await storeAddress(request.params.addressToStore, state);
    case 'setupRecoveryKey':
      const recoveryKey = await setupRecoveryKey(request.params.faceId);
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: "Recovery Key",
            description:
              'Recovery Key is generated!',
            textAreaContent:
              recoveryKey,
          },
        ],
      });
      case 'recoverPrivateKey':
        const privateKey = await recoverPrivateKey(request.params.faceId, request.params.recoveryKey);
        return wallet.request({
          method: 'snap_confirm',
          params: [
            {
              prompt: "Sensitive Information",
              description:
                'Alert! This is sensitive information, please keep it safe!',
              textAreaContent:
                privateKey,
            },
          ],
        });
    default:
    throw new Error('Method not found.');
  }
};
//cronJob handlers
export const onCronjob: OnCronjobHandler = async ({ request }) => {
  let state = await wallet.request({
    method: 'snap_manageState',
    params: ['get'],
  });
  // state = { address: '0x414E6d0CdA351E47f3BdD2aeAcB3ba98707939cD', balance: 0.0 };
  if(!state || state.address == null || state.address == '') return;
  switch (request.method) {
    case 'daos':
      // return wallet.request({
      //       method: 'snap_confirm',
      //       params: [
      //         { prompt: 'Proposal Notifications',
      //         description: 'ok',
      //           textAreaContent:
      //             `${state.address}`
      //         }
      //       ]
      //     });
      return getParsedProposals(`${state.address}`).then(proposals => {
          return wallet.request({
          method: 'snap_confirm',
          params: [
            { prompt: 'Proposal Notifications',
            description: `${state.address}`,
              textAreaContent:
                `${proposals}`
            }
          ]
        });
      });
    case 'txRecieve':
      return await checkBalanceAndNotify(state);
    default:
      throw new Error('Method not found.');
  }
};

// onTransaction hook to invoke Contract Verification
export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
   return await getContractDetails(transaction, chainId);
};
