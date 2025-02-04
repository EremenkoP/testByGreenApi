import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

import style from './Modal.module.scss';

import {ModalOverlay} from "./ModalOverlay/ModalOverlay";

const modalsContainer = document.querySelector("#modals") as HTMLElement;

interface IModal {
  children: ReactNode,
  className?: string,
}

export const Modal: FC<IModal> = ({children}) => {


  return ReactDOM.createPortal(
    <section>
      <div className={style.box}>
        {children}
      </div>
      <ModalOverlay/>
    </section>,
    modalsContainer
  );
};