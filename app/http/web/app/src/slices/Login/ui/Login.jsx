import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import { withOktaAuth } from '@okta/okta-react';

const Login = (props) => {
    const login = async () => {
        await props.oktaAuth.signInWithRedirect();
    }

    useEffect(() => {
        async function fetchData() {
            const response = await props.oktaAuth.isAuthenticated();
            console.log(response);
            console.log(props.oktaAuth.options.redirectUri);
        }

        fetchData();

        }, []);

    if (props.authState.isAuthenticated) {
      return <Redirect to='/home' />
    }


    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" onClick={login}>Login with Okta</Button>
        </div>
      )
}

export const WithOktaLogin = withOktaAuth(Login);