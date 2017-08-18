import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import peerStore from './PeerStore';

export class UiStore {
  @observable showVideo = false;
  constructor(peerStore) {
    reaction(() => this.showVideo == false, () => {
      peerStore.disconnectPeer();
    })
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
