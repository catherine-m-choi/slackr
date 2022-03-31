import React, { useEffect, useState } from "react";
import GiphySearch from "./GiphySearch";

function MessageForm(props) {

  const [body, setBody] = useState(props.message.body);
  const [sent, setSent] = useState(false);
  const [showGiphy, setShowGiphy] = useState(false);
  const [giphySearchQuery, setGiphySearchQuery] = useState("");

  let newMessage;
  const handleSubmit = () => {
    let messageType;
    setSent(true);

    if (giphySearchQuery.length > 0) {
      // <GiphySearch giphySearchQuery={giphySearchQuery} />
      setShowGiphy(true);
    } else {

      if (props.parentMessage) {
        console.log("thread reply")
        console.log("not a new convo")
        messageType = props.parentMessage.messageableType;

        newMessage = {
          body: body,
          user_id: props.currentUser.id,
          parent_message_id: props.parentMessage.id,
          messageable_type: props.parentMessage.messageableType,
          messageable_id: props.parentMessage.messageableId,
        }

        props.messageAction(newMessage)
          .then(props.incrementReplyCount(props.parentMessage.id))
        // props.incrementReplyCount(props.parentMessage.id);
      } else {

        switch (props.match.path) {
          case '/app/conversations/:id':
            messageType = "Conversation";

            newMessage = {
              body: body,
              user_id: props.currentUser.id,
              parent_message_id: null,
              messageable_type: messageType,
              messageable_id: props.match.params.id,
            }
      
            props.messageAction(newMessage).then( (res) => {
              props.updateRecentConvoMessage(res.payload.messageableId, res.payload.id)
            })

            break;
          case '/app/drafts':
            messageType = "Conversation"
            let convoId;

            props.addConvo()
              .then((res) => {
                // debugger
                props.recipients.forEach((userId) => {
                  // debugger
                  props.addMember(userId, res.payload.id)
                })

                newMessage = {
                  body: body,
                  user_id: props.currentUser.id,
                  parent_message_id: null,
                  messageable_type: messageType,
                  messageable_id: res.payload.id,
                }

                convoId = res.payload.id
                props.messageAction(newMessage)
                .then( (res) => props.updateRecentConvoMessage(convoId, res.payload.id))
                .then( () => {
                  props.history.push(`/app/conversations/${convoId}`)
                  console.log("pushing to new convoid")
                })

              })
            break;
          case '/app/channels/:id':
            messageType = "Channel"
            debugger

            newMessage = {
              body: body,
              user_id: props.currentUser.id,
              parent_message_id: null,
              messageable_type: messageType,
              messageable_id: props.match.params.id,
            }
      
            props.messageAction(newMessage).then( (res) => {
              props.updateRecentChannelMessage(res.payload.messageableId, res.payload.id)
            })

            break;
          default:
            break;
        }
      }
    }
    setBody("");
  }

  useEffect(() => {
    if (body.slice(0,7) === "/giphy ") {
      setGiphySearchQuery(body.slice(7));
    }
  }, [body])

  useEffect(() => {
    if (body !== "" && sent === false) {
      console.log("SAVE DRAFT!")
      setBody("");
    }
  }, [props.location])
  
  return (
    <div>

      {showGiphy &&
        <GiphySearch 
          giphySearchQuery={giphySearchQuery} 
          setShowGiphy={setShowGiphy} 
          currentUser={props.currentUser}
          messageAction={props.messageAction}
        />
      }

      <div className={`MessageForm__container ${(props.parentMessage) ? "thread" : ""}`}>
        <form className="MessageForm">
          [This is the textbox area]
          <br />
          <input type="text" value={body} onChange={(e) => setBody(e.target.value) }/>
          <button onClick={handleSubmit}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default MessageForm;