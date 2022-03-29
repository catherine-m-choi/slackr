import { connect } from "react-redux";
import MessageItem from "./MessageItem";
import { openRightSidebar } from "../../actions/right_sidebar_actions";
import { saveMessage } from "../../actions/message_actions";
import { openModal } from "../../actions/modal_actions";
import { updatePinnedConvoMessages } from "../../actions/conversation_actions";
import { updatePinnedChannelMessages } from "../../actions/channel_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  let chat;
  if (ownProps.match.path === '/app/conversations/:id') {
    chat = state.entities.conversations[ownProps.match.params.id]
  }
  else if (ownProps.match.path === '/app/channels/:id') {
    chat = state.entities.channels[ownProps.match.params.id]
  }
  // debugger
  return {
    sender: state.entities.users[ownProps.message.userId],
    users: state.entities.users,
    currentUserId: state.session.id,
    savedMessages: state.session.savedMessages,
    replyCount: ownProps.message.replyCount,
    pinnedMessagesId: chat.pinnedMessages,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let updatePinnedMessages;
  if (ownProps.match.path === '/app/conversations/:id') {
    updatePinnedMessages = updatePinnedConvoMessages
  }
  else if (ownProps.match.path === '/app/channels/:id') {
    updatePinnedMessages = updatePinnedChannelMessages
  }
  return {
    openRightSidebar: (sidebarInfo) => dispatch(openRightSidebar(sidebarInfo)),
    saveMessage: (saveData) => dispatch(saveMessage(saveData)),
    unsaveMessage: (savedId) => dispatch(unsaveMessage(savedId)),
    openModal: (modal) => dispatch(openModal(modal)),
    updatePinnedMessages: (convoId, pinnedMessages) => dispatch(updatePinnedMessages(convoId, pinnedMessages)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageItem));