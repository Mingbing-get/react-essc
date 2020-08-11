import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Index from './page/index';
import Message from './page/message';
import ShopCar from './page/shopCar';
import Mine from './page/mine';
import History from './page/history';
import GoodsPage from './page/goodsPage';
import Details from './page/details';
import Login from './page/login';
import Register from './page/register';
import UpdateMine from './page/updateMine';
import Order from './page/order';
import Mall from './page/mall';
import UpdateGoods from './page/mall/updateGoods';
import TalkBox from './page/message/talkBox';
import NewFriend from './page/newFriend';

function App() {
  return (
    <div>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={Index}/>
                <Route exact path='/message' component={Message}/>
                <Route exact path='/shopcar' component={ShopCar}/>
                <Route exact path='/mine' component={Mine}/>
                <Route exact path='/history' component={History}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/updatemine' component={UpdateMine}/>
                <Route exact path='/order/:zhanghu' component={Order}/>
                <Route exact path='/mall/:zhanghu' component={Mall}/>
                <Route exact path='/newfriend/:zhanghu' component={NewFriend}/>
                <Route exact path='/talkbox/:firend' component={TalkBox}/>
                <Route exact path='/goodspage/:serch' component={GoodsPage}/>
                <Route exact path='/details/:id' component={Details}/>
                <Route exact path='/updategoods/:id' component={UpdateGoods}/>
            </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
