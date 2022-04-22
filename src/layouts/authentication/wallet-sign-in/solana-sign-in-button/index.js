import { useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React, { FC, useCallback } from 'react';
import { sign } from 'tweetnacl';

import { useWalletNfts } from "@nfteyez/sol-rayz-react";
import {
    resolveToWalletAddress,
    getParsedNftAccountsByOwner,
    Options,
  } from "@nfteyez/sol-rayz";

import Button from '@mui/material/Button';

import { useUserActions } from '_actions/user.actions';
import { authAtom } from '_state/auth';
import { useRecoilValue } from 'recoil';

export default function SolanaSignInButton() {

    const auth = useRecoilValue(authAtom);

    useEffect(() => {
        // redirect to home if already logged in
        if (auth) {
          history.push('/collections');
          window.location.reload(false);
        }
      }, []);

    const userActions = useUserActions();
    const { publicKey, signMessage } = useWallet();


    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            
            const nftArray = await getParsedNftAccountsByOwner({
                publicAddress: publicKey,
            });
            
            const ownedMints = []
            nftArray.forEach(nft => {
                ownedMints.push(nft.mint);
            });

            // const resp = {"mints": ownedMints};
            // console.log(resp)

            userActions.tokenLogin(ownedMints)
                .catch(error => {  
                    // setError('apiError', { message: error });
                    console.error(error);
                });
            
        } catch (error) {
            console.error(`Signing failed: ${error?.message}`)
        }
    }, [publicKey]);


    const onClickO = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');

            // Encode anything as bytes
            const message = new TextEncoder().encode('Hello, world!');
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');

            alert(`Message signature: ${bs58.encode(signature)}`);
            
        } catch (error) {
            alert(`Signing failed: ${error?.message}`);
        }
    }, [publicKey, signMessage]);


    return signMessage ? (
        <Button onClick={ () => onClick() } type="submit" variant="contained" color="info" fullWidth disabled={!publicKey}>
            SIGN IN
        </Button>
      ) : null;
}
