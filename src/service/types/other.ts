export interface ISignInData {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IMessageForView {
  text: string;
  timestamp: Date;
  idMessage: string;
  senderData?:  string;
}