import { action, reaction, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import userStore from './UserStore';
import uiStore from './UiStore';
import Rx from 'rxjs';

export class PeerStore {
  signalRef = fb.fbdb.child('signaling');
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
    this.peerInit();

    this.signalRef.on('child_added', this.recvMsg.bind(this));

    Rx.Observable.fromEvent(this.peer, 'track').subscribe(evt => this.addLargeVid(evt.streams));

    Rx.Observable.fromEvent(this.peer, 'icecandidate').subscribe(evt => evt.candidate ? ( 
      this.sendPeerMsg(JSON.stringify({ 'ice': evt.candidate }))  
    ):( 
      console.log('end of ice')) 
    );

    Rx.Observable.fromEvent(this.peer, 'datachannel')
      .subscribe(event => console.log('data channel event fired: ',event));

    Rx.Observable.fromEvent(this.peer, 'signalingstatechange')
      .subscribe(event =>{ 
        console.log('signal state changed event: ', event);
        console.log('signal state changed event -signalingState: ', event.target.signalingState);
        console.log('signal state changed event -iceConnectionState: ', event.target.iceConnectionState);
        console.log('signal state changed event -iceGatheringState: ', event.target.iceGatheringState);
      });

    Rx.Observable.fromEvent(this.peer, 'iceconnectionstatechange')
      .subscribe(event => {
        if(event.target.iceConnectionState == 'disconnect' || event.target.iceConnectionState == 'failed') {
          this.closeVidNExit()
            .then(()=> this.disconnectMyPeer());
          console.log(this); 
        }
        console.log('ice connection state changed event: ',event)
      });

    Rx.Observable.fromEvent(this.peer, 'connectionstatechange')
      .subscribe(event => {
        console.log('connection state changed event: ', event);
        switch(this.peer.connectionState) {
          case "connected":
            console.log('the conectionstate is stable');
            break;
          case "disconnected":
          case "failed":
            // One or more transports has terminated unexpectedly or in an error
            console.log('connection state failed || disconeected')
            break;
          case "closed":
            // The connection has been closed
            this.closeVidNExit()
            .then(()=> this.disconnectMyPeer());
            break;
        }

      });

    Rx.Observable.fromEvent(this.peer, 'negotiationneeded')
      .subscribe(event => console.log('negotiation needed event: ', event));

      this.peer.onconnectionstatechange = function(state){
        console.log('connection state change state event', state);
      }

  }
  closeVidNExit() {
    return uiStore.closeVideo();
  }

  disconnectMyPeer() {
    if(this.peer && this.peer.signalingState != 'closed') {
      this.rtcStreams.getTracks().forEach(track => track.stop());
      this.peer.close();
      this.peer = null;
    } else {
      console.log('peer connection closed');
    }
    
  }

  peerInit() {
    this.peer = new RTCPeerConnection({'iceServers':[{'urls':'stun:stun.l.google.com:19302'}]});
  }

  @action addLargeVid(streams) {
    this.rtcStreams = window.rtcStreamRef = streams[0];
    this.largeVidRef.srcObject = streams[0];
  }
 
  getLocalVideoFeed() {
    if(!this.peer || this.peer.signalingState === 'closed') {
      this.peerInit();
    }
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
    if(!this.peer) {
      this.peerInit();
    }
    userStore.findCalleeByEmail(email)
      .then(() =>{ 
        uiStore.openVideo();
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
        if(!this.peer || this.peer.signalingState === 'closed') {
          this.peerInit();
        }
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
      console.log('I have no idea')
    }
  }
}

}
const peerStore = window.peerStore = new PeerStore();
export default peerStore;
