import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import userStore from './UserStore';
import uiStore from './UiStore';
import Rx from 'rxjs';

export class PeerStore {
  signalRef = fb.fbdb.child('signaling');
  //userProfiles;
  userProfile;
  @observable smallVidRef;
  @observable largeVidRef;
  @observable calleeStream;
  @observable isCallee = false;
  iceStorage = [];
  constraints = {
    mandatory: {
      'OfferToReceiveAudio': true,
      'OfferToReceiveVideo': true
    },
    'offerToReceiveAudio': true,
    'offerToReceiveVideo': true
  }
  rtcStreams;
  constructor(uiStore, userStore) {
    this.peer = new RTCPeerConnection({'iceServers':[{'urls':'stun:stun.l.google.com:19302'}]});
    //fb.fbdb.child('users').on('value', (snap) => this.userProfiles = snap.val());

    this.signalRef.on('child_added', this.recvMsg.bind(this));

    Rx.Observable.fromEvent(this.peer, 'track')
      .subscribe(event => console.log(event.streams))

    Rx.Observable.fromEvent(this.peer, 'icecandidate')
      .subscribe(evt => evt.candidate ? this.sendPeerMsg(JSON.stringify({ 'ice': evt.candidate })) : console.log('end of ice'))
    Rx.Observable.fromEvent(this.peer, 'datachannel')
      .subscribe(event => console.log(event));

    Rx.Observable.fromEvent(this.peer, 'removestream')
      .subscribe(event => console.log(event));

    Rx.Observable.fromEvent(this.peer, 'iceconnectionstatechange')
      .subscribe(event => console.log(event));

      this.peer.ontrack = e => {
        this.addLargeVid(e.streams);
      };
  }
  @action disconnectMyPeer() {
    console.log('disconnect fired');
    console.log(this.rtcStreams);
    //stream.getTracks().forEach(track => track.stop());
    this.rtcStreams.getTracks().forEach(track => track.stop());
  }
  @action addLargeVid(streams) {
    this.rtcStreams = streams;
    this.largeVidRef.srcObject = streams[0];
  }
 
  getLocalVideoFeed() {
    return navigator.mediaDevices.getUserMedia({audio:true, video: {width: 1024, height: 576}})
  }

  sendPeerMsg(data) {
    let recv = userStore.caller || Object.keys(userStore.callee)[0];
    const msg = this.signalRef.push({
      sender: userStore.currentUser.uid,
      receiver: recv,
      message: data
    })
    msg.remove();
  }
  @action setIsCallee(val) {
    this.callee = val;
  }
  makePeerConnection(email) {
    userStore.findCalleeByEmail(email)
      .then(() =>{ 
        uiStore.openVideo(); // might be a race condition ???
        return this.getLocalVideoFeed()
      })
      .then((stream) =>{
        this.smallVidRef.srcObject = stream;
         return stream.getTracks().forEach(track => this.peer.addTrack(track,stream))
      })
      .then(() => this.peer.createOffer(this.constraints))
      .then(offer => this.peer.setLocalDescription(offer)) //ICE candidate immediately start firing
      .then(() => this.sendPeerMsg(JSON.stringify({ 'sdp': this.peer.localDescription })))
      .catch(err => console.log(err));
  }
  @action recvMsg(data) {
    let { message, receiver, sender } = data.val();
    message = JSON.parse(message);
    if (userStore.currentUser.uid == receiver) {
// if (confirm('Except Video Call from')) 
      if (message.ice) {
        console.log('ice firing off correctly')
        this.iceStorage.push(message.ice)
      } else if (message['sdp'] != undefined && message['sdp']['type'] == "offer") {
        userStore.caller = sender;
        this.peer.setRemoteDescription(new RTCSessionDescription(message.sdp))
          .then(() => { 
            uiStore.openVideo(); // might be a race condition ???
            return this.getLocalVideoFeed()
          })
          .then((stream) => {
            this.smallVidRef.srcObject = stream;
            return stream.getTracks().forEach(track => this.peer.addTrack(track,stream))
          })
          .then(() => this.peer.createAnswer(this.constraints))
          .then(answer => this.peer.setLocalDescription(answer))
          .then(() => this.iceStorage.forEach(icee => this.peer.addIceCandidate(new RTCIceCandidate(icee))))
          .then(() => this.setIsCallee(true))     
          .then(() => this.sendPeerMsg(JSON.stringify({ 'sdp': this.peer.localDescription })))
          .catch(err => console.log(err))
    } else if (message['sdp'] != undefined && message['sdp']['type'] == "answer") {
      this.peer.setRemoteDescription(new RTCSessionDescription(message.sdp))
    } else {
      console.log('fuck it')
    }
  }
}
}
const peerStore = window.peerStore = new PeerStore();
export default peerStore;
