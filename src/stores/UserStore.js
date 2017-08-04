import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './index';
export class UserStore {
  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;
  @observable profile = JSON.parse(window.localStorage.getItem('userProfile'));
  constructor() {
    if(!this.profile){
      window.localStorage.setItem('userProfile',JSON.stringify({userNick: 'Anon'}));
    }
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        if (this.profile && user.email != this.profile['userNick']) {
          this.pullUserProfile(user);
        }
      }
    });
  }

  @action setUserProfile(user) {
    let profile = {
      userNick: user.email,
      isOnline: true,
      avatarUrl: '/assets/apple-touch-icon.png',
      desc: 'Say something about anything',
      msg_token: stores.msgStore.msg_token
    }
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.set(profile);
    userProfileRef.on('child_added', snap => {
      this.setLocalProfileInfo(snap.val());
    })
  }

  @action pullUserProfile(user) {
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.once('value')
      .then(userProfile => {
        if (userProfile.exists()) {
          // updste user msg_token for notifications
          this.setLocalProfileInfo(userProfile.val());
        } else {
          this.setUserProfile(user);
        }
      }
    )
  }

  @action setLocalProfileInfo(userProfile) {
    window.localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }
}
const userStore = window.userStore = new UserStore();
export default userStore;