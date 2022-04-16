class PeerClass {
    constructor(id, userName, peer, ref, element, stream) {
      this.socketId = id;
      this.userName = userName;
      this.peer = peer;
      this.audioRef = ref;
      this.audioElement = element;
      this.stream = stream;
    }
  };
  
  module.exports = PeerClass;