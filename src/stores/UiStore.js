import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import peerStore from './PeerStore';

export class UiStore {
  @observable showVideo = false;
  constructor() {
    console.log(peerStore);
    /* reaction(() => this.showVideo == false, (val) => {
      console.log(val);
      this.peerStore.disconnectMyPeer()
    }) */
  }
  @action openVideo() {
      this.showVideo = true;
    }
  @action closeVideo() {
    this.showVideo = false;
  }
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;
