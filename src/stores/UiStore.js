import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import peerStore from './PeerStore';

export class UiStore {
  @observable showVideo = false;
  constructor() {}
  @action openVideo() {
      this.showVideo = true;
    }
  @action closeVideo() {
    peerStore.disconnectMyPeer();
    this.showVideo = false;
  }
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;
