import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './router/AppRouter'

ReactDOM.render(
    <Provider>
        <AppRouter/>
    </Provider>
, document.getElementById('root'))