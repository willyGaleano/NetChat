import "./App.css"
import 'semantic-ui-css/semantic.min.css'
import { Grid } from 'semantic-ui-react';
import SidePanel from "./components/SidePanel/SidePanel";
import ColorPanel from "./components/ColorPanel/ColorPanel";
import Messages from "./components/Messages/Messages";
import MetaPanel from "./components/MetaPanel/MetaPanel";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { RootStoreContext } from "./stores/rootStore";
import { LoadingComponent } from "./components/LoadingComponent";

function App() {

  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, appLoaded, token } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  const { createHubConnection, stopHubConnection } = rootStore.messageStore;

  useEffect(() => {

    

    if (token) {
      getUser().finally(() => setAppLoaded())
    }
    else{ 
      setAppLoaded()
    }

    createHubConnection();

    return () => {
      stopHubConnection();
    }

    console.log(`is apploaded : ${appLoaded}`)
  }, [getUser, setAppLoaded, token, appLoaded])
    
    if(!appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <Grid columns="equal" className="app">  
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{marginLeft:320}}>
        <Messages />
      </Grid.Column>
      
      <Grid.Column width={4}>
        <MetaPanel/>
      </Grid.Column>
      
   </Grid>
  );
}

export default observer(App); 
