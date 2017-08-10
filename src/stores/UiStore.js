import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './';

export class UiStore {
  @observable showVideo = false;
  constructor() {}
  @action toggleVideoView() {
    console.log('fires off iin ui store')
    if(this.showVideo == false) {
      this.showVideo = true;
    } else {
      this.showVideo = false;
    }
    //this.showVideo = this.showVideo ? !this.showVideo : this.showVideo;
  }
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;