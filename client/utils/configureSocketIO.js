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

import {toggleApplianceSocket,changeSensorValueSocket} from '../actions'

import {SWITCH_STATUS,sensorStatus} from '../../shared/socketIoMessageTypes'

let socket


let store;
export default function configureSocketIO(st) {
    store=st;
  if (socket) {
    console.log(`socketIO is already configured`)
    return
  }

  socket = io(location.origin+"/")

  socket.on('connect', function(){ console.log('socket connected')});

}



export const configureSocketNowPage = function (user) {
    socket = io(location.origin+"/now")
    socket.on('connect', function(){
        console.log('socket connected to namespace now')
        socket.emit('token',{user})
        socket.emit("subscribe", { room: user.accountAccountId });



    });

    socket.on(SWITCH_STATUS,     (msg)     => {
        console.log('switchStatus')
        console.log(msg)
        store.dispatch(toggleApplianceSocket(msg))
    })

    socket.on(sensorStatus,     (msg)     => {
        console.log('sensorValue')
        console.log(msg)
        store.dispatch(changeSensorValueSocket(msg))
    })



    //SEE LIST OF ALL INCOMING NOTIFICATION TYPES IN socketIoMessageTypes.js
}