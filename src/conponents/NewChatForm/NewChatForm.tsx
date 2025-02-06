import { FC, SyntheticEvent, useRef } from "react";
import style from './NewChatForm.module.scss';

export const NewChatForm: FC<{
  createChat: (number: string) => void;
}> = ({ createChat }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onBlur = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    if (element) {
      if (element.value.length === 11) {
        element.classList.remove(style.input_error);
      } else {
        element.classList.add(style.input_error);
      }
    }
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const input = inputRef.current;
    if (input) {
      const { value, validity } = input;
      if (validity.valid && value) {
        createChat(value);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <p className={style.text + " " + style.form__text}>
        Введите номер абонента в международном формате без +
      </p>
      <input
        type="phone"
        inputMode="tel"
        ref={inputRef}
        pattern="[0-9]{11}"
        onBlur={onBlur}
        className={style.input + " " + style.form__input}
      />
      <button
        type="submit"
        onClick={onSubmit}
        className={style.button + " " + style.form__button}
      >
        создать чат
      </button>
    </form>
  );
};