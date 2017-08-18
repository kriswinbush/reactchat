import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import peerStore from './PeerStore';

export class UiStore {
  @observable showVideo = false;
  constructor(peerStore) {
    console.log(peerStore);
  }
  @action openVideo() {
      this.showVideo = true;
    }
  @action closeVideo() {
    this.peerStore.disconnectMyPeer()
    this.showVideo = false;
  }
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;
