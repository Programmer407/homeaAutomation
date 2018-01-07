import io from 'socket.io-client'

// // import {
//   fetchRecentNotifications,
//   receiveComment,
//   receiveActionUpdateComment,
//   receiveActionDeleteComment,
//   receiveActionLikeComment,
//   receiveActionUndoLikeComment,
//   receiveActionGoing,
//   receiveActionUndoGoing
// } from '../actions'

// import {
//   NEW_COMMENT,
//   NEW_NOTIFICATION,
//   COMMENT_UPDATED,
//   COMMENT_DELETED,
//   LIKE_ON_COMMENT,
//   UNDO_LIKE_ON_COMMENT,
//   GOING,
//   UNDO_GOING
// } from '../../shared/socketIoMessageTypes'

let socket

export default function configureSocketIO(store) {
  if (socket) {
    console.log(`socketIO is already configured`)
    return
  }

  debugger;
  socket = io("http://localhost:3010/")
    socket.on('connect', function(){ console.log('socket connected')});

  socket.on("Testing",     msg     => console.log('it is working'))

  
  //SEE LIST OF ALL INCOMING NOTIFICATION TYPES IN socketIoMessageTypes.js
}
