import React, { useContext, useEffect } from "react";
import { Icon, Menu} from "semantic-ui-react";
import { IChannel } from "../../models/channels";
import ChannelForm from "./ChannelForm";
import { ChannelItem } from "./ChannelItem";
import { RootStoreContext} from "../../stores/rootStore";
import {observer } from "mobx-react-lite";


const Channels = () => {
  const rootStore = useContext(RootStoreContext);
  const {channels, loadChannels, showModal} = rootStore.channelStore

  //const openModal = () => setModal(true);
  //const closeModal = () => setModal(false);

  useEffect(() => {
    loadChannels();
  }, [loadChannels]);
  
  
  const displayChannels = (channels: IChannel[]) => {
    
    return (
      channels.length > 0 &&
      channels.map((channel) => (
          <ChannelItem key={channel.id} channel={ channel}/>
      ))
    );
  };

  console.log(channels);
  return (
    <>
      
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>
          {"  "}({channels.length}) <Icon name="add" onClick={() => showModal(true)} />
        </Menu.Item>
        {displayChannels(channels)}
      </Menu.Menu>
      <ChannelForm />
    </>
  );
};

export default observer(Channels);