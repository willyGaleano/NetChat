import { observer } from 'mobx-react-lite';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Dropdown, Grid, Header, Icon, Image, Message } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

const UserPanel = () => {
    const rootStore = useContext(RootStoreContext);
    const {user, getUser,logout, IsLoggedIn} = rootStore.userStore;
    console.log(IsLoggedIn);
    console.log(user);
    const dropdownOptions = () => [
        {
            key: "user",
            text: (
                <span>
                    Logged as: <strong>{ user?.email}</strong>
                </span>
            ),
            disabled:true
        },
        {
            key: "avatar",
            text: (
                <span>
                    Change avatar
                </span>
            ),
            disabled:true
        },
        {
            key: "signout",
            text: <span onClick={() => logout(user?.id!)}>Sign Out</span>
        }
    ]

    console.log(IsLoggedIn, user);

    return (
        <Grid style={{ background: "#4c3c4c", margin:0}}> 
            <Grid.Column>
                <Grid.Row style={{ padding: "1.2rem", margin:0}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>
                            NetChat
                        </Header.Content>
                    </Header>
                </Grid.Row>
                <Header styles={{ padding: "0.25em" }} as="h4" inverted>
                    {IsLoggedIn && user ? (
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={
                      user.avatar ??
                      'http://www.gravatar.com/avatar/?=identicon'
                    }
                    spaced="right"
                    avatar
                  />
                  {user?.userName}
                </span>
              }
              options={dropdownOptions()}
            ></Dropdown>
          ) : (
            <Message>
              Don't han an account? <Link to="/register">Register</Link>
            </Message>
          )}
                </Header>
            </Grid.Column>
        </Grid>
    )
}

export default  observer(UserPanel);
