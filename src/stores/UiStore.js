import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';


export class UiStore {
  @observable showVideo = false;
  constructor() {}
  @action openVideo() {
      this.showVideo = true;
    }
  @action closeVideo() {
    this.showVideo = false;
  }
}
const uiStore = window.uiStore = new UiStore();
export default uiStore;