import { observable, decorate } from 'mobx';
import { observer } from 'mobx-react';

const Store =
observer(class Store {
    logined = false;
    userID = undefined;
});

decorate(Store, {
    logined: observable,
    userID: observable
});

const STORE = new Store();

export default STORE;