export interface ISendMessage {
  chatId: string;
  message: string;
}

export interface IResSendMessage {
  idMessage: string;
}

export interface IGetTextMessage {
  typeMessage: "textMessage";
  textMessageData: {
    textMessage: string;
    isTemplateMessage?: boolean;
  };
  quotedMessage?: {
    stanzaId: string;
    participant: string;
    typeMessage: string;
  };
}

interface instanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface IOutgoingMessageStatus {
  sendByApi: boolean;
  status:
    | "sent"
    | "delivered"
    | "read"
    | "failed"
    | "noAccount"
    | "notInGroup"
    | "yellowCard";
  timestamp: number;
  typeWebhook: "outgoingMessageStatus";
  chatId: string;
  idMessage: string;
  instanceData: instanceData;
}

export interface IIncomingMessageReceived<T> {
  typeWebhook: "incomingMessageReceived";
  instanceData: instanceData;
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    sender: string;
    chatName: string;
    senderName: string;
    senderContactName: string;
  };
  messageData: T;
}

export interface IGetMessage {
  receiptId: number;
  body: IIncomingMessageReceived<IGetTextMessage> | IOutgoingMessageStatus;
}
