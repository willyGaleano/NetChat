import React, { useContext, useEffect, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'
import { IUser } from '../../models/users'
import { toJS } from 'mobx'
const DirectMessages = () => {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  )
  const rootStore = useContext(RootStoreContext)
  const { loadUsers, users, user } = rootStore.userStore
  const { changePrivateChannel, getCurrentChannel } = rootStore.channelStore
  const { loadMessages } = rootStore.messageStore

  const getNumberOfUsers = (users: IUser[]) =>
    users.filter((x) => x.id !== user?.id).length

  const changeChannel = async (user: IUser) => {
    await changePrivateChannel(toJS(user).id)
    let currentChannelId = getCurrentChannel()?.id!
    loadMessages(currentChannelId)
    setSelectedChannelId(user.id)
  }
  useEffect(() => {
    loadUsers()
  }, [loadUsers, changePrivateChannel])

  const isUserOnline = (user: IUser) => user.isOnline
  return (
    <Menu.Menu className="menu">
      <Menu.Item>
        <span>
          <Icon name="mail" /> DIRECT MESSAGES
        </span>
        ({getNumberOfUsers(users)})
      </Menu.Item>
          {users
              //user! para decirle a ts que ese objeto no es nulo
        .filter((x) => x.id !== user!.id)
        .map((user) => (
          <Menu.Item
            key={user.userName}
            style={{ opacity: 0.7, fontStyle: 'italic' }}
            onClick={() => changeChannel(user)}
            active={selectedChannelId === user.id}
          >
            <Icon name="circle" color={isUserOnline(user) ? 'green' : 'red'} />@
            {user.userName}
          </Menu.Item>
        ))}
    </Menu.Menu>
  )
}

export default observer(DirectMessages)