import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './index';

class Profile {
  constructor(msg_token) {
    this.userNick = 'Anonymous';
    this.isOnline = true;
    this.avatarUrl = 'https://placeimg.com/640/480/arch';
    this.desc = 'Say Something Memorable';
    this.msg_token = msg_token;
    this.contacts = [];
  }
}

export class UserStore {
  @observable currentUser = null;
  @observable callee;
   @observable caller;
  @observable profile = new Profile(stores.msgStore.msg_token || '')
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
    this.profile = new Profile(stores.msgStore.msg_token || '');
  }
  @action emptyCurrentUser() {
    this.currentUser = null;
    stores.routing.push('/');
  }
  //move fcm token to app level on db
  @action setUserProfile(user) {
    let profile = new Profile(stores.msgStore.msg_token || '');
    profile = { ...profile, userNick: user.email };
    const userProfileRef = fb.fbdb.child(`users/${user.uid}`);
    userProfileRef.set(profile);
    userProfileRef.on('child_added', snap => {
      this.profile = snap.val();
    })
  }

  findCalleeByEmail(email) {
    return new Promise((res, rej) => {
      fb.fbdb.child('users')
        .orderByChild('userNick')
        .equalTo(email)
        .on('value', user => {
          this.assignCallee(user.val());
          res();
        });

    })

  }

  @action assignCallee(userUidFromEmail) {
    this.callee = userUidFromEmail;
  }

  @action updateUserProfile(user) {
    let profile = new Profile(stores.msgStore.msg_token || '');
    profile = { ...profile, userNick: user.email };
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
        if (!userProfile.exists()) { this.setUserProfile(user); }
        this.profile = userProfile.val();
      }
      ))
  }
}
const userStore = window.userStore = new UserStore();
export default userStore;