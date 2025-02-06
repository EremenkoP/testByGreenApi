import { FC } from "react";
import style from './MessageList.module.scss'
import { IMessageForView } from "../../service/types/other";

interface IMessageList {
  list: Array<IMessageForView>;
}

export const MessageList: FC<IMessageList> = ({ list }) => {
  return (
    <ul className={style.ul}>
      {list.map((el) => {
        return (
          <li
            key={el.idMessage}
            className={
              style.message + " " + (el.senderData ? style.message_send : "")
            }
          >
            <p className={style.text}>{el.text}</p>
            <p className={style.text + " " + style.text_date}>
              {el.timestamp.toLocaleTimeString()}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
