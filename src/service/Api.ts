import { CookieName } from "./const";
import { getCookie } from "./cookie";
import { IGetMessage, IResSendMessage, ISendMessage } from "./types/ApiTypes";

interface ImainApi {
  baseUrl: string;
}

class mainApi {
  private _baseUrl: string;
  private _idInstance: string | undefined;
  private _apiTokenInstance: string | undefined;
  constructor({ baseUrl }: ImainApi) {
    this._baseUrl = baseUrl;
    this._idInstance = undefined;
    this._apiTokenInstance = undefined;
  }

  private responseHandler = (res: Response) =>
    res.ok ? res.json() : Promise.reject(res);

  private _fetcher(
    path: string,
    method: "GET" | "POST" | "DELETE",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any,
    query?: string
  ) {
    this._idInstance = getCookie(CookieName.idInstance);
    this._apiTokenInstance = getCookie(CookieName.apiTokenInstance);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method,
      headers,
      body,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const realQuery = query ? `/${query}` : "";
    return fetch(
      `${this._baseUrl}/waInstance${this._idInstance}/${path}/${this._apiTokenInstance}${realQuery}`,
      options,
    ).then(this.responseHandler);
  }

  sendMessage = (body: ISendMessage): Promise<IResSendMessage> =>
    this._fetcher("sendMessage", "POST", body);
  receiveNotification = (): Promise<IGetMessage | null> =>
    this._fetcher("receiveNotification", "GET");
  deleteNotification = (id: string) => {
    this._fetcher("deleteNotification", 'DELETE', undefined, id );
  };
}

const baseUrl = import.meta.env.VITE_URL_BACKEND;

console.log(baseUrl);

if (!baseUrl) {
  alert("check your env file");
}

export const API = new mainApi({baseUrl: baseUrl!});