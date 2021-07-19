import { Link } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Grid, Header, Icon, Label, Message, Segment } from 'semantic-ui-react';
import TextInput from "../Common/Form/TextInput";
import { useContext } from 'react';
import { RootStoreContext } from '../../stores/rootStore';
import { IUserFormValues } from '../../models/users';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';


const Login = () => {
    
    const validate = combineValidators({
        email: isRequired("Email"),
        password: isRequired("Password")
    });
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;
    
    const handleSubmitForm = async(values:IUserFormValues) => {
        return login(values).catch((error) => ({ [FORM_ERROR]: error }))
    }

    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" />
                    Login for NetChat
                </Header>
                <FinalForm
                    onSubmit={handleSubmitForm}
                    validate={validate}
                    render={({ handleSubmit, submitting, form, submitError }) => (<Form size="large" onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Field
                                name="email"
                                placeholder="Email Address"
                                type="text"
                                icon="mail icon"
                                component={TextInput}
                                //validate={(value) => (value ? undefined: "Required")}
                            />
                            <Field
                                name="password"
                                placeholder="Password"
                                type="password"
                                icon="lock icon"
                                component={TextInput}
                                //validate={(value) => (value ? undefined : "Required")}
                                //whatever="test"
                            >
                                
                            </Field>
                       
                        <Button color="violet" fluid size="large" disabled={submitting}>
                                Submit
                        </Button>
                            {submitError && (<Label color="red" basic content={submitError.statusText}/>)}
                            <pre>{ JSON.stringify(form.getState(),undefined, 2)}</pre>
                    </Segment>
                    </Form>)}>
                    
                </FinalForm>
                <Message>
                    Don't have am account <Link to="/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login;