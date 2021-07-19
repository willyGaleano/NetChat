import { observer } from 'mobx-react-lite'
import React from 'react'
import { Header, Icon, Segment } from 'semantic-ui-react'
import { ChannelType, IChannel } from '../../models/channels'
import { IUser } from '../../models/users'
import { SearchInput } from './SearchInput'

interface IProps {
  currentChannel: IChannel | null
  currentUser: IUser | null
  //handleStar: () => void
  //handleSearchChange: (event: any) => void
  //numUniqueUsers: number
}

const MessagesHeader: React.FC<IProps> = ({
  currentChannel, currentUser
}) => {
    const isChannelStarred = currentChannel?.channelType === ChannelType.Starred;
    const isPrivateChannel = () =>
        currentChannel?.channelType === ChannelType.Room;
    return (
        <Segment clearing>
            {isPrivateChannel() ? (
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {'@' +
              (currentUser?.userName === currentChannel?.name
                ? currentChannel?.description
                : currentChannel?.name)}
          </span>
        </Header>
      ) : (
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {currentChannel?.name}
            <Icon
              name={isChannelStarred ? 'star' : 'star outline'}
              color={isChannelStarred ? 'yellow' : 'black'}
              //onClick={handleStar}
            />
          </span>
          <Header.Subheader>{ /*numUniqueUsers*/2 + ' Users'} </Header.Subheader>
        </Header>
      )}
            <SearchInput/>
        </Segment>
    )
}

export default observer(MessagesHeader);