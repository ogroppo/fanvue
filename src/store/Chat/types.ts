import { User } from "../Users/types";

export type Message = string;

export type ChatState = Record<User["id"], Message[]>;

export const SEND_MESSAGE = "SEND_MESSAGE";

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: {
    userId: User["id"];
    message: string;
  };
}

export type ChatActionTypes = SendMessageAction;
