import { useCallback, useEffect, useState } from "react";
import "../utils/style/normalize.scss";
import style from "./App.module.scss";
import { MessageForm } from "../conponents/MessageForm/MessageForm";
import { MessageList } from "../conponents/MessageList/MessageList";
import { SignIn } from "../conponents/SignIn/SignIn";
import { IMessageForView, ISignInData } from "../service/types/other";
import { getCookie, setCookie } from "../service/cookie";
import { CookieName } from "../service/const";
import { Modal } from "../conponents/Modal/Modal/Modal";
import { Header } from "../conponents/Headers/Header";
import { NewChatForm } from "../conponents/NewChatForm/NewChatForm";
import { API } from "../service/Api";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [chatId, setChatId] = useState<string>("");
  const [messageList, setMessageList] = useState<Array<IMessageForView>>([]);

  const getNewMessage =  () => {
    API.receiveNotification()
      .then(async (res) => {
        if (res !== null) {
          if (res.body.typeWebhook === 'incomingMessageReceived' && res.body.messageData.typeMessage === 'textMessage') {
            const text = res.body.messageData.textMessageData.textMessage;
            const senderData = res.body.senderData.senderName;
            setMessageList((prev) => {
              return prev.concat({
                text: text,
                idMessage: res.body.idMessage,
                timestamp: new Date(res.body.timestamp * 1000),
                senderData: senderData,
              });
            })
          }
          API.deleteNotification(String(res.receiptId));
        }
      })
      .then(() => {
        getNewMessage();
      })
  };

  const sendMessage = async (message: string) => {
    await API.sendMessage({ chatId: chatId, message: message }).then((res) => {
      setMessageList(
        messageList.concat({
          text: message,
          timestamp: new Date(),
          idMessage: res.idMessage,
        })
      );
    });
  };

  const signIn = ({ idInstance, apiTokenInstance }: ISignInData) => {
    setCookie(CookieName.idInstance, idInstance);
    setCookie(CookieName.apiTokenInstance, apiTokenInstance);
    setIsAuth(true);
  };

  const getDataInCookie = useCallback(() => {
    const idInstance = getCookie(CookieName.idInstance);
    const apiTokenInstance = getCookie(CookieName.apiTokenInstance);
    if (idInstance && apiTokenInstance) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    getDataInCookie();
  }, []);

  const createChat = (number: string) => {
    setChatId(`${number}@c.us`);
    getNewMessage();
  };

  return (
    <>
      <section className={style.section}>
        <Header setIsAuth={setIsAuth} />
        <div className={style.list}>
          {chatId ? (
            <MessageList list={messageList} />
          ) : (
            <NewChatForm createChat={createChat} />
          )}
        </div>
        <MessageForm sendFunction={sendMessage} />
      </section>
      {!isAuth && (
        <Modal>
          <SignIn singInFunction={signIn} />
        </Modal>
      )}
    </>
  );
}

export default App;
