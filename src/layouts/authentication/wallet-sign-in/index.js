/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import Button from '@mui/material/Button';

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
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
