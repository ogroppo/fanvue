import { User } from "../Users/types";
import { ChatActionTypes, Message, SEND_MESSAGE } from "./types";

export function sendMessage(
  userId: User["id"],
  message: Message
): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: {
      userId,
      message,
    },
  };
}
