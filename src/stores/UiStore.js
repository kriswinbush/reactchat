import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import peerStore from './PeerStore';
import { TweenMax, Bounce } from 'gsap';

export class UiStore {
  @observable showVideo = false;
  @observable showSideContacts = false;
  @observable sideDrawerElRef;
  constructor() {}
  @action openVideo() {
      this.showVideo = true;
    }
  @action closeVideo() {
    return new Promise((res, rej) =>{
      this.showVideo = false;
      res();
    })
  }
  @action openSideContacts() {
    this.showSideContacts = true;
  }
  @action closeSideContacts() {
    this.showSideContacts = false;
  }
  toggleSideContainer() {
    //recalc on window resize...
    let drawerBoundRect = this.sideDrawerElRef.getBoundingClientRect();
    let anime = this.showSideContacts ? ( 
      TweenMax.to( this.sideDrawerElRef, 0.5, { opacity:1, right: (-drawerBoundRect.width) }),
      this.closeSideContacts()
    ):( 
      TweenMax.to( this.sideDrawerElRef, 0.5, { opacity:1, right: 0 }),
      this.openSideContacts()
    )
  }  
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;
