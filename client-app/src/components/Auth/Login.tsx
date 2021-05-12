import { Link } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

const Login = () => {
    const showResults = async(values:any) => {
        console.log(values);
    }
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" />
                    Login for NetChat
                </Header>
                <FinalForm
                    onSubmit={showResults}
                    render={({ handleSubmit, submitting, values }) => (<Form size="large" onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Field
                                name="email"
                                component="input"
                                validate={(value) => (value ? undefined: "Required")}
                            />
                            <Field
                                name="password"
                                placeholder="Password"
                                type="text"
                                validate={(value) => (value ? undefined : "Required")}
                                whatever="test"
                            >
                                {({input, meta, placeholder}) => (
                                    <div>
                                        <input {...input} placeholder={placeholder} />
                                        {meta.error && meta.touched && <span>{ meta.error}</span>}
                                    </div>
                                    
                                )}
                            </Field>
                        <Form.Input
                            fluid
                            name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder="Email Addres"
                            type="email"
                        />
                        <Form.Input
                            fluid
                            name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Button color="violet" fluid size="large" disabled={submitting}>
                                Submit
                        </Button>
                            <pre>{ JSON.stringify(values,undefined, 2)}</pre>
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