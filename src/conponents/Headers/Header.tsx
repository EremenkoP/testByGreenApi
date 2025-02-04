import React, { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";
import style from "./Header.module.scss";
import { deleteCookie } from "../../service/cookie";
import { CookieName } from "../../service/const";

interface IHeader {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsAuth }) => {
  const logOut = (event: SyntheticEvent) => {
    event.preventDefault();
    deleteCookie(CookieName.apiTokenInstance);
    deleteCookie(CookieName.idInstance);
    setIsAuth(false);
  };

  return (
    <header className={style.header}>
      <button className={style.button} onClick={logOut}>
        выйти
      </button>
    </header>
  );
};
