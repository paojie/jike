import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './router/AppRouter'

import configureStore from './store/configureStore'

// 创建 store 对象
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
, document.getElementById('root'))