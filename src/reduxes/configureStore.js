import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
 ...reducers,
 router: routerReducer
})

// 路由和redux结合起来了的组件
const history = new createHistory();

export { history }

const routerML = routerMiddleware(history);

export default function configureStore() {
 return createStore(rootReducer, applyMiddleware(thunk, routerML));

}