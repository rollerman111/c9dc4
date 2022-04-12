import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, clearSeenAlerts, conversationId } = props;
  const lastMessage = messages.at(-1)

  useEffect(() => {


    if(messages.filter((message) => message.seen === false && message.senderId !== userId).length !== 0) 
      clearSeenAlerts(conversationId)

  }, [conversationId, messages, clearSeenAlerts, userId])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        if(message.id === lastMessage.id && userId === message.senderId && message.seen === true) {
          return <SenderBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        }

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
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
