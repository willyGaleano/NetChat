import { Button, Form, Segment } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import { IMediaFormValues, IMessageFormValues } from "../../models/messages";
import TextInput from "../Common/Form/TextInput";
import { RootStoreContext } from "../../stores/rootStore";
import { useContext } from "react";
import { FORM_ERROR } from "final-form";
import FileModal  from "./FileModal";
import { observer } from "mobx-react-lite";

const MessageForm = () => {

  const rootStore = useContext(RootStoreContext);
  const { sendMessage, showModal, uploadImage} = rootStore.messageStore;
  const {getCurrentChannel } = rootStore.channelStore;

  const handleSubmitForm = async (values: IMessageFormValues) => {
    values.channelId = getCurrentChannel()?.id;
    await sendMessage(values).catch((error) => ({ [FORM_ERROR]: error }));
  }

  const uploadFile = async (image: Blob | null) => {
    const media: IMediaFormValues = {
      file: image!,
      channelId: getCurrentChannel()?.id,
    }
    await uploadImage(media).catch((error) => ({ [FORM_ERROR]: error }))
  }

  return (
    <FinalForm
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, form, invalid, dirtyFieldsSinceLastSubmit, pristine }) => (
      <Form >
        <Segment>
            <Field
              component={TextInput}
              fluid
              IconLabel
              name="content"
              style={{ marginBottom: "0.7em" }}
              labelPosition="left"
              placeholder="Write your messages"
          />
          <Button.Group icon widths="2">
              <Button
                  color="orange"
                  content="Add reply"
                  labelPosition="left"
                  disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}
                  icon="edit"
                  onClick={ () => handleSubmit()!.then(() => form.reset())}
              />
                <Button
                  color="teal"
                  content="Upload Media"
                  onClick={() => showModal(true)}
                  labelPosition="right"
                  icon="cloud upload"
              />
             <FileModal uploadFile={uploadFile} />
          </Button.Group>
    </Segment>
        </Form>
      
      )}
    >

    </FinalForm>
    
  );
};


export default observer(MessageForm);