import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Comment, Segment } from 'semantic-ui-react';
import { IMessage } from '../../models/messages';
import { RootStoreContext } from '../../stores/rootStore';
import Message from './Message';
import MessageForm  from './MessageForm';
import MessagesHeader  from './MessagesHeader';

const Messages = () => {

    const rootStore = useContext(RootStoreContext);
    const { messages, loadMessages } = rootStore.messageStore;
    const { getCurrentChannel, isChannelLoaded, activeChannel } = rootStore.channelStore;
    const { user} = rootStore.userStore;

  useEffect(() => {
    
     
    }, [loadMessages, getCurrentChannel, isChannelLoaded, activeChannel]);

  const displayMessages = (message: IMessage[]) => {
    return (
      message.length > 0 &&
      message.map((message) => (

        <Message
          key={message.createdAt.toString()}
          message={message}
          currentUser={user}
        ></Message>
      ))
    )
  }

    return (
        <>
            {/*Header */}
            <MessagesHeader currentChannel={getCurrentChannel()} currentUser={user }/>
            <Segment>
                <Comment.Group className="messages">
                    {displayMessages(messages)}
                </Comment.Group>
            </Segment>
            <MessageForm/>
        
        </>
    )
}

export default observer(Messages);