class PeerClass {
    constructor() {
        this.peers = [];
    }

    AddPeer(peer) {
        this.peers.push(peer);
    }

    RemovePeer(peerId) {
        this.peers = this.peers.filter(function (ele) {
            return ele.socketId != peerId;
        });
    }
}

module.exports = PeerClass;
