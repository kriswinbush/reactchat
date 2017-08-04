import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';

export class MsgStore {
  @observable msg_token = ''
  constructor() {
     if(navigator.serviceWorker) {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => {
            fb.messaging.useServiceWorker(reg)
          })
          .catch(function(err) {
            console.error('Unable to register service worker.', err);
          }
        );
      }
    fb.messaging.requestPermission()
      .then(()=>{
        console.log('got permission')
        return fb.messaging.getToken();
      })
      .then(action(token => {
        console.log(token)
        this.msg_token = token
      }))
      .catch(err => {
        console.log('permission denied', err)
      })
  }
}
const msgStore = window.msgStore = new MsgStore();
export default msgStore;