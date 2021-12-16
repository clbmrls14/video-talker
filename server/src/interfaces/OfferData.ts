import { IUser } from "./User";

export interface IPreOfferData {
  callee: IUser;
  caller: { username: string };
}

export interface IPreOfferAnswerData {
  callerSocketId: string;
  answer: string;
}

export interface IWebRTCOfferData {
  calleeSocketId: string;
  offer: any;
}

export interface IWebRTCAnswerData {
  callerSocketId: string;
  answer: any;
}

export interface IWebRTCCandidateData {
  candidate: any;
  connectedUserSocketId: string;
}
