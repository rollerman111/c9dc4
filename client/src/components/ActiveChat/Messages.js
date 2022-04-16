import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, clearSeenAlerts, conversationId, notSeenCount } = props;
  const lastSeenMessage = useRef(-1)

  useEffect(() => {
    if(userId && notSeenCount != null && notSeenCount !== 0) {
      clearSeenAlerts(conversationId)
    }

  }, [conversationId, clearSeenAlerts, userId, notSeenCount])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        if(message.seen && message.senderId === userId) {
          lastSeenMessage.current = message.id
        }


        return message.senderId === userId ? (
          <SenderBubble key={message.id} id={message.id} text={message.text} time={time} lastSeenMessage={lastSeenMessage} otherUser={otherUser}/>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
