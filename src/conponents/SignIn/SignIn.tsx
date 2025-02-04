import React, { FC, SyntheticEvent, useRef } from "react";
import { ISignInData } from "../../service/types/other";
import style from "./SignIn.module.scss";

interface ISignIn {
  singInFunction: (data: ISignInData) => void;
}

export const SignIn: FC<ISignIn> = ({ singInFunction }) => {
  const inputIdRef = useRef<HTMLInputElement | null>(null);
  const inputTokenRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (inputIdRef.current && inputTokenRef.current) {
      const idInstance = inputIdRef.current.value;
      const apiTokenInstance = inputTokenRef.current.value;
      if (idInstance && apiTokenInstance) {
        singInFunction({ idInstance, apiTokenInstance });
      } else {
        if (!idInstance) {
          inputIdRef.current.classList.add(style.input_error);
        }
        if (!apiTokenInstance) {
          inputTokenRef.current.classList.add(style.input_error);
        }
      }
    }
  };

  const onBlur = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    if (element) {
      if (element.value) {
        element.classList.remove(style.input_error);
      } else {
        element.classList.add(style.input_error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <p className={style.text}>idInstance:</p>
      <input
        type="text"
        placeholder="введите idInstance"
        ref={inputIdRef}
        className={style.form__idInput + " " + style.input}
        onBlur={onBlur}
      />
      <p className={style.text}>apiTokenInstance:</p>
      <input
        type="text"
        placeholder="введите apiTokenInstance"
        ref={inputTokenRef}
        onBlur={onBlur}
        className={style.form__tokenInput + " " + style.input}
      />
      <button
        type="submit"
        onClick={onSubmit}
        className={style.form__button + " " + style.button}
      >
        Подключиться
      </button>
    </form>
  );
};
