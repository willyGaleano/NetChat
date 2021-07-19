import { useContext, useEffect } from "react";
import { Icon, Menu} from "semantic-ui-react";
import { IChannel } from "../../models/channels";
import ChannelForm from "./ChannelForm";
import ChannelItem from "./ChannelItem";
import { RootStoreContext} from "../../stores/rootStore";
import {observer } from "mobx-react-lite";

const Channels = () => {
  const rootStore = useContext(RootStoreContext);
  const { channels, loadChannels, showModal, setActiveChannel, getCurrentChannel } = rootStore.channelStore
  const { loadMessages } = rootStore.messageStore;
  
  useEffect(() => {
    loadChannels();
  }, [loadChannels, setActiveChannel]);
  
  const changeChannel = (channel: IChannel) => {
    setActiveChannel(channel);
    loadMessages(getCurrentChannel()?.id!);
    //console.log(getCurrentChannel());
  }
  
  const displayChannels = (channels: IChannel[]) => {
    
    return (
      channels.length > 0 &&
      channels.map((channel) => (
        <ChannelItem key={channel.id} channel={channel} changeChannel={ changeChannel}/>
      ))
    );
  };

  return (
    <>
      
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>
          ({channels.length}) <Icon name="add" onClick={() => showModal(true)} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>
      <ChannelForm />
    </>
  );
};

export default observer(Channels);