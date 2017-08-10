import {observable,computed} from 'mobx';
import fb from '../service/firebase';
import userStore from './UserStore';
import createHistory from 'history/createBrowserHistory';

export class NavStore {
  @observable history = createHistory();
  constructor() { 
    console.log(this.history)
  }
  push(to) {
    this.history.push(to);
  }
}
const navStore = window.navStore = new NavStore();
export default navStore;
