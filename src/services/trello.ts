import axios from "axios";

const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;

export interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
  avatarUrl?: string;
  initials?: string;
}

export interface TrelloLabel {
  id: string;
  name: string;
  color: string;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  idList: string;
  url: string;
  dateLastActivity: string;
  idMembers: string[];
  members: TrelloMember[];
  labels: TrelloLabel[];
}

export interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
}

export const getBoardCards = async (
  boardId: string,
  token: string,
): Promise<TrelloCard[]> => {
  const response = await axios.get(`${BASE_URL}/boards/${boardId}/cards`, {
    params: {
      key: API_KEY,
      token,
      fields: "name,desc,url,dateLastActivity,idList,idMembers,labels",
      members: "true",
      member_fields: "fullName,username,avatarUrl,initials",
      attachments: "false",
      checklists: "none",
    },
  });
  return response.data;
};

export const getBoardLists = async (
  boardId: string,
  token: string,
): Promise<TrelloList[]> => {
  const response = await axios.get(`${BASE_URL}/boards/${boardId}/lists`, {
    params: {
      key: API_KEY,
      token,
      fields: "name,closed,idBoard,pos",
      filter: "open",
    },
  });
  return response.data.sort((a: TrelloList, b: TrelloList) => a.pos - b.pos);
};

export const getListCards = async (
  listId: string,
  token: string,
): Promise<TrelloCard[]> => {
  const response = await axios.get(`${BASE_URL}/lists/${listId}/cards`, {
    params: {
      key: API_KEY,
      token,
      fields: "name,desc,url,dateLastActivity,idList,idMembers,labels",
      members: "true",
      member_fields: "fullName,username,avatarUrl,initials",
      attachments: "false",
    },
  });
  return response.data;
};

export const getCardMembers = async (
  cardId: string,
  token: string,
): Promise<TrelloMember[]> => {
  const response = await axios.get(`${BASE_URL}/cards/${cardId}/members`, {
    params: {
      key: API_KEY,
      token,
      fields: "fullName,username,avatarUrl,initials",
    },
  });
  return response.data;
};

export const getBoardMembers = async (
  boardId: string,
  token: string,
): Promise<TrelloMember[]> => {
  const response = await axios.get(`${BASE_URL}/boards/${boardId}/members`, {
    params: {
      key: API_KEY,
      token,
      fields: "fullName,username,avatarUrl,initials",
    },
  });
  return response.data;
};

export const getBoardName = async (
  boardId: string,
  token: string,
): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/boards/${boardId}`, {
    params: {
      key: API_KEY,
      token,
      fields: "name",
    },
  });
  return response.data.name;
};

export const getToken = (): string => {
  return `https://trello.com/1/authorize?expiration=never&scope=read&response_type=token&name=Trello%20Viewer&key=${API_KEY}`;
};
