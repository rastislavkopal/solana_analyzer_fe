import VuiBox from "components/VuiBox";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state/auth';
import { useUserActions } from '_actions/user.actions';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import SolanaSignInButton from './solana-sign-in-button';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

function WalletSignIn() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) {
      history.push('/collections');
      window.location.reload(false);
    }
  }, []);

  return (
    <CoverLayout
      title="Welcome back!"
      color="white"
      description="Sign in with your Solysis PASS"
      premotto="Ultimate NFT trading tools"
      motto="SOLYSIS"
    >
      <VuiBox>
        <VuiBox mt={4} ml={1}>
          <WalletMultiButton />
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <SolanaSignInButton />
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default WalletSignIn;
