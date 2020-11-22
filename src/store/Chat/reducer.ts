import { ChatState, ChatActionTypes, SEND_MESSAGE } from "./types";

const initialState: ChatState = {};

export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        [action.payload.userId]: (state[action.payload.userId] || []).concat(
          action.payload.message
        ),
      };
    default:
      return state;
  }
}
