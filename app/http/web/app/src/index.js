import React from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Main } from './slices/Main/ui/Main.jsx';

const history = createBrowserHistory();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Router history={history}>
        <Main history={history} />
    </Router>
);


