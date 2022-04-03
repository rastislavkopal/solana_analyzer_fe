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

function SignIn() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const [rememberMe, setRememberMe] = useState(true);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) history.push('/');
  }, []);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

    // form validation rules 
    // const validationSchema = Yup.object().shape({
    //   username: Yup.string().required('Username is required'),
    //   password: Yup.string().required('Password is required')
    // });
    // const formOptions = { resolver: yupResolver(validationSchema) };

    const handleSubmit = e => {
      e.preventDefault();
      return userActions.login(username, password)
        .catch(error => {  
            // setError('apiError', { message: error });
            console.error(error);
        });
    };


  return (
    <CoverLayout
      title="Welcome back!"
      color="white"
      description="Enter your email and password to sign in"
      premotto="Ultimate NFT trader tools"
      motto="SOLYSIS.IO"
      // image={bgSignIn}
    >
      <form onSubmit={handleSubmit}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              name="username" 
              type="email"
              placeholder="Your email..."
              fontWeight="500"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              name="password"
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>

        <VuiBox mt={4} mb={1}>
          <Button type="submit" variant="contained" color="info" fullWidth>
            SIGN IN
          </Button>
        </VuiBox>
      </form>
    </CoverLayout>
  );
}

export default SignIn;
