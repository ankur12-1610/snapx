import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "hello" method from the example snap.
 */

export const sendHello = async () => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'setupRecoveryKey',
      },
    ],
  });
};

export const setupRecoveryKey = async (faceId:any) => {
  console.log('faceId', faceId);
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'setupRecoveryKey',
        params: {
          faceId: faceId,
        },
      },
    ],
  });
};

export const recoverPrivateKey = async (faceId:any, recoveryKey:any) => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'recoverPrivateKey',
        params:{
          faceId:faceId,
          recoveryKey:recoveryKey,
        }
      },
    ],
  });
};
export const sendNotify = async () => {
  console.log('Sending notify');
  console.log('window.ethereum', window.ethereum);

  await window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(async (handleAccountsChanged) => {
      const response = await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: [defaultSnapOrigin, {
            method: 'storeAddress',
            params: {
            addressToStore: handleAccountsChanged
            }
          }, ]
        })
    });
};

export const stopNotify = async () => {
  console.log('Stopping notify');
  const response = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [defaultSnapOrigin, {
      method: 'storeAddress',
      params: {
      addressToStore: ''
      }
    }, ]
  })
}

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
