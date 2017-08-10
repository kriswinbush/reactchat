import { action, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './';
import Rx from 'rxjs';
import stores from './index';
export class PeerStore {
  @observable pc = new RTCPeerConnection({'iceServers':[{'urls':'stun:stun.l.google.com:19302'}]});
  constructor() {
    console.log(Rx)
    reaction(() => pc ,data =>{})
   this.pc.onicecandidate = function(event){
      console.log(event.candidate)
    };
    this.pc.createOffer()
      .then(offer => pc.setLocalDescription(offer) );
  }
  
}
const peerStore = window.peerStore = new PeerStore();
export default peerStore;




    
    