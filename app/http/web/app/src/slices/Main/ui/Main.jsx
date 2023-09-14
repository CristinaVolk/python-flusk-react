import React from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import clientSecrets from '../model/clientSecrets.json';
import { WithOktaLogin } from '../../Login/ui/Login';
import {HomeWithOktaAndStyles} from '../../Home/ui/Home';

export const Main = (props) => {
    const history = useHistory();
    const oktaAuth = new OktaAuth({
            issuer: clientSecrets.web.issuer,
            clientId: clientSecrets.web.client_id,
            redirectUri: window.location.origin + '/callback',
        });

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        console.log({originalUri});
      props.history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    const redirectToHome = () => {
        history.push('/home');
    }

    if (!oktaAuth) {
        return;
    }

    return (
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Switch>
                <Route exact path="/" component={WithOktaLogin}/>
                <Route path="/callback" component={LoginCallback}/>
                <SecureRoute path="/home" component={HomeWithOktaAndStyles}/>
            </Switch>
        </Security>
    );
}