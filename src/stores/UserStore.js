import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './index';
export class UserStore {
  @observable currentUser = null;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable profile = {
        userNick: 'Anonymous',
        isOnline: true,
        avatarUrl: 'https://placeimg.com/640/480/arch',
        desc: 'Say something about anything',
        msg_token: stores.msgStore.msg_token || '',
        contacts:[]
      };
  constructor() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        if (this.profile && user.email != this.profile['userNick']) {
          this.pullUserProfile(user);
        }
      } else {
        this.emptyCurrentUser()
      }
    });
  }
  @action anonUserProfile() {
    let anonProfile = {
        userNick: 'Anonymous',
        isOnline: true,
        avatarUrl: 'https://placeimg.com/640/480/arch',
        desc: 'Say something about anything',
        msg_token: stores.msgStore.msg_token,
        contacts:[]
      }
      this.profile = anonProfile;
  }
  @action emptyCurrentUser() {
    this.currentUser = null;
    stores.routing.push('/')
  }
  //move fcm token to app level on db
  @action setUserProfile(user) {
    let profile = {
      userNick: user.email,
      isOnline: true,
      avatarUrl: 'https://placeimg.com/640/480/arch',
      desc: 'Say something about anything',
      msg_token: stores.msgStore.msg_token,
      contacts:[]
    }
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.set(profile);
    userProfileRef.on('child_added', snap => {
      this.profile = snap.val();
    })
  }
  @action updateUserProfile(user) {
    let profile = {
      userNick: user.email,
      isOnline: true,
      avatarUrl: 'https://placeimg.com/640/480/arch',
      desc: 'Say something about anything',
      msg_token: stores.msgStore.msg_token,
      contacts:[]
    }
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.set(profile);
    userProfileRef.on('child_added', snap => {
      this.profile = snap.val();
    })
  }
  
  @action pullUserProfile(user) {
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.once('value')
      .then(action(userProfile => {
        if (!userProfile.exists()) {this.setUserProfile(user);} 
        this.profile = userProfile.val();
      }
    ))
  }
}
const userStore = window.userStore = new UserStore();
export default userStore;