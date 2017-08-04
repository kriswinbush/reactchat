import { action, observable, computed, toJS, ObservableMap } from 'mobx';
import fb from '../service/firebase';
import stores from './';
export class Chat {
  id;
  user;
  group;
  msg;
  contacts = [];
  constructor(chat) {
    this.msg = chat.msg;
    this.id = fb.convo.push().key;
    this.user = stores.userStore.profile.userNick
    //some type of group mech
    this.group = 'winners'
  }
}

export class ChatStore {
  @observable chatMessages = observable.map();
  @observable isLoading = false;
  @observable filter = '';
  constructor() {
    fb.convo.on('value', action('Push from fb to chatMessage', (snapshot) => {
      if (snapshot.val() != null) {
        this.chatMessages = new Map(this.obj2Matrix(snapshot.val()));
      }
    }));
    this.addChatMsg = this.addChatMsg.bind(this);
  }
  *obj2Matrix(obj) {
    this.chatMessages = new Map()
        for (let key in obj)
        yield [key, obj[key]];
  }
  @computed get filteredChatMessages() {
    var matchFilter = new RegExp(this.filter, "i");
    return this.chatMessages.entries().filter(chat => {
      return chat.group == this.filter || matchFilter.test(chat.group)
    });
  }

  addChatMsg(chat) {
    const id = fb.convo.push().key
    const msg = new Chat({ msg: chat.msg })
    this.updateChatMsg(id, msg);
  }
  updateChatMsg(id, msg) {
    fb.convo.update({ [id]: { msg } });
  }
  delChatMsg(id) {
    fb.convo.child(id).remove();
  }
}
const chatStore = window.chatStore = new ChatStore();
export default chatStore;
