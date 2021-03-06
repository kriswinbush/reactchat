import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './index';

export class AuthStore {
  @observable errorMessage = '';
  constructor() {
    this.loginUser = this.loginUser.bind(this);
    this.signOut = this.signOut.bind(this);
    fb.auth.onAuthStateChanged(user => {
      if(!user) {
        this.setErrMsg(`Sign In or Sign Up to get started`);   
      } else {
        this.setUser(user);
      }
    })
    reaction(()=> this.errorMessage.length, () => console.log('error message reaction called'))
  }
  @action setUser(user){
    stores.userStore.currentUser = user;
  }
  @action setErrMsg(msg){
    this.errorMessage = msg;
  }
  @action createUser(email, password) {
    return fb.auth.createUserWithEmailAndPassword(email, password)
      .catch(err => this.errorLookUp(err));
  }
  @action loginUser(email, password) {
    return fb.auth.signInWithEmailAndPassword(email, password)
      .catch(err =>this.errorLookUp(err));
  }
  @action signOut() {
    fb.auth.signOut();
  }
  errorLookUp(err){
    let act = {
      "auth/email-already-in-use":() => {
        return this.setErrMsg(err.message)
      },
      "auth/invalid-email": () => {
        return this.setErrMsg(err.message);
      },
      "auth/user-not-found": () => {
        return this.setErrMsg(err.message);
      },
      "auth/wrong-passwor":() => {
        return this.setErrMsg(err.message);  
      }
    };
    if (typeof act[err.code] !== 'function') {
      return 'default';
    }
    return act[err.code]()
  }
}
const authStore = window.authStore = new AuthStore();
export default authStore;