# SnapX
> **Silver Medalist 🥈** submission in ConsenSys' MetaMask Snap Development Hackathon conducted at InterIIT Tech Meet 11.0 | February 2023

SnapX is a metamask snap powered with notifications and account recovery features using biometric authentication.

## Demo
To see the working of SnapX, please click [here](https://drive.google.com/file/d/1fxyAIQFGg-8MRubKODfb4-Ux3k4-riC8/view?usp=sharing).

## Setup and Run
  - #### Run the following commands:

    
```
yarn install
yarn start
```
> *Note*: If the build takes too long, kill the process and run `yarn start` again.
    

  - #### After this go to [localhost:8000](https://localhost:8000)

  - #### Now start exploring SnapX

## About
  SnapX mainly offers two features SnapX-Notify (Snap for getting notifications), SnapX-Recovery (Snap to recover the private key).
<br/>
  - ## SnapX-Notify
      This is a notification snap, helps user to get notifications regarding:
      - DAO Proposals
      - Balance Updates
      - NFT Offers
    ### Steps Involved
      - Open the Dapp.
      - Install Metamask flask and click on connect.
      - Click on SnapX notify in the sidebar.
      - Now click no get notifications.
      - Even if the dapp is closed you will get the browser notifications.
      - You can also view notifications on the dapp by clicking on the correspoding section.
      - To turn off notifications click on turn off notificaitions.

<br>

- ## SnapX-RecoveryKit
    This is a recovery snap which helps user to recover private key using biometric authentication:
    ### Steps Involved
    - Open the Dapp.
    - Install Metamask flask and click on connect.
    - Click on SnapX recovery kit in the sidebar.
      - ### Setup up recovery key:
        - Click on setup recovery key.
        - Follow the on-screen instructions to scan your face.
        - Set the pin.
        - Get your recovery key and copy it to some place.
      - ### Recover private key:
        - In order to retrieve the lost accounts switch to the respective network in which the accounts was present.
        - Click on get private key.
        - Enter the recovery key of the wallet you need to recover, which was generated using your above.
        - Follow the on screen instructions to authenticate your face.
        - Use the recovered private keys to import your accounts in the new wallet using the metamask extension.
<br>

## Aims to Accomplish

  ### Pain points users
  - Users do not receive any update when a transaction is made to their wallet.
  - Users don't receive any notifications about offers made on their NFT on OpenSea.
  - No updates regarding proposals being launched on registered
 DAO to users.
 - If users have lost their private key, they may struggle to recover their MetaMask account.
 - Private key is very sensitive hence we need to safely store it.
 - If users have forgotten their seed phrase, they may have trouble accessing their account.

 ### Our Solution
 - #### SnapX-Notify
    - Receive notification whenever a proposal is launched by any of the DAOs you follow.
    - Receive updates whenever someone send ether to their Metamask wallet.
    - Receive alerts when a buyer makes an offer on your published NFT on OpenSea.
 - #### SnapX-RecoveryKit
    - In case where the users lose their private key, we provide a method to recover the wallet via recovery key.
    - Since the recoveryKey is public (since it is encrypted) we can freely store it anywhere.
