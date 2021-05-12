import React from 'react'
import { Comment, Segment } from 'semantic-ui-react';
import { MessageForm } from './MessageForm';
import { MessagesHeader } from './MessagesHeader';

const Messages = () => {
    return (
        <>
            {/*Header */}
            <MessagesHeader/>
            <Segment>
                <Comment.Group className="messages">
                </Comment.Group>
            </Segment>
            <MessageForm/>
        
        </>
    )
}

export default Messages;