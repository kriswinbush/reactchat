import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import userStore from './UserStore';
import uiStore from './UiStore';
import Rx from 'rxjs';

export class PeerStore {
  stunTurn = { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] }
  signalRef = fb.fbdb.child('signaling');
  userProfiles;
  userProfile;
  @observable calleeVidRef;
  @observable isCallee = false;
  iceStorage = [];
  replyTo;
  constraints = {
    mandatory: {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    },
    'offerToReceiveAudio': true,
    'offerToReceiveVideo': true
  }
  constructor(uiStore, userStore) {
    this.pc = new RTCPeerConnection(this.stunTurn);
    fb.fbdb.child('users').on('value', (snap) => this.userProfiles = snap.val());

    this.signalRef.on('child_added', this.recvMsg.bind(this));

    Rx.Observable.fromEvent(this.pc, 'icecandidate')
      .subscribe(evt => evt.candidate ? this.sendPeerMsg(JSON.stringify({ 'ice': evt.candidate })) : console.log('end of ice'))

    Rx.Observable.fromEvent(this.pc, 'addStream')
      .subscribe(event => this.addCallee(event.stream))
  }

  @action addCallee(stream) {
    this.calleeVidRef.srcObject = stream;
  }
  makePeerConnection(email) {
    userStore.findCalleeByEmail(email)
      .then(() => this.pc.createOffer(this.constraints))
      .then(offer => this.pc.setLocalDescription(offer))
      .then(() => {
        this.sendPeerMsg(JSON.stringify({ 'sdp': this.pc.localDescription }))
      })
      .catch(err => console.log(err))
  }
  sendPeerMsg(data) {
    let recv = userStore.caller || Object.keys(userStore.callee)[0];
    const msg = this.signalRef.push({
      sender: userStore.currentUser.uid,
      receiver: recv,
      message: data
    })
    //msg.remove();
  }
  @action setIsCallee(val) {
    this.callee = val;
  }
  @action recvMsg(data) {
    console.log(data.val());

    let { message, receiver, sender } = data.val();
    
    message = JSON.parse(message);
    if (userStore.currentUser.uid == receiver) {
      if (message.ice) {
        console.log('ice firing off correctly')
        this.iceStorage.push(message.ice)
      } else if (message['sdp'] != undefined && message['sdp']['type'] == "offer") {
        this.replyTo = sender;
        userStore.caller = sender;
        let setOfferRemote = this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
        setOfferRemote
          .then(() => {
            // if (confirm('Except Video Call from')) 
            this.setIsCallee(true);
             return this.pc.createAnswer(this.constraints)
          })
            .then(answer => this.pc.setLocalDescription(answer))
              .then(() => this.sendPeerMsg(JSON.stringify({ 'sdp': this.pc.localDescription })))
              .then(() => uiStore.openVideo())
              .catch(err => console.log(err))
      }
    } else if (message['sdp'] != undefined && message['sdp']['type'] == "answer") {
      debugger;
      let setAnswerRemote = this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp));
      setAnswerRemote
        .then(() => { this.iceStorage.forEach( icee => this.pc.addIceCandidate(new RTCIceCandidate(icee)) ) })
      .then(() => uiStore.openVideo());
    } else {
      console.log('fuck it')
    }
  }
}
const peerStore = window.peerStore = new PeerStore();
export default peerStore;
