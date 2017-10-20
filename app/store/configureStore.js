import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

// 注意： action异步操作，引入redux-thunk中间件处理。在creatStore函数中applyMiddleware传入中间件
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
// 导入reducer
import rootReducer from '../reducers/index';


// 这里配合了redux 调试工具需要先在应用商店安装，然后import
// 具体参考：http://lyn.s76.org/
import {
    composeWithDevTools
} from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function (initState) {
    return process.env.NODE_ENV === 'development' ? createStore(rootReducer, initState, composeEnhancers(applyMiddleware(thunkMiddleware,createLogger()))
        
         ) : createStore(rootReducer, initState, composeEnhancers(applyMiddleware(thunkMiddleware)))
}
