import { FC, SyntheticEvent, useRef } from "react";
import style from './MessageForm.module.scss'

interface IMessageForm {
  sendFunction: (message: string) => void;
}

export const MessageForm: FC<IMessageForm> = ({ sendFunction }) => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      const message = inputRef.current.value
      sendFunction(message);
      inputRef.current.value = '';
    }
  };

  return (
    <form className={style.form} onSubmit={sendMessage}>
      <input
        type='text'
        maxLength={20000}
        placeholder="Введите сообщение"
        className={style.input}
        ref={inputRef}
      />
      <button type="submit" className={style.button} onClick={sendMessage}>
        Отправка сообщения
      </button>
    </form>
  );
};
