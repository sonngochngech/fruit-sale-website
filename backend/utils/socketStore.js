class InMemorySocketStore {
  constructor() {
    this.sessions = new Map();
  }

  findSocketIdsByUserId(userId) {
    console.log("your",userId);
    const socketIds = [];
    for (const [socketId, storedUserId] of this.sessions.entries()) {
      console.log("hello socketId",socketId);
      console.log("hello sttoredUserid",storedUserId);
      if (storedUserId === userId) {
        socketIds.push(socketId);
      }
    }
    return socketIds;
  }

  addSession(userId, socketId) {
    this.sessions.set(socketId, userId);
  }

  removeSession(socketId) {
    this.sessions.delete(socketId);
  }

}

module.exports = InMemorySocketStore;
