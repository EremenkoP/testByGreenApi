import style from './ModalOverlay.module.scss';
import { FC } from 'react';

export const ModalOverlay: FC = () => {
  return <div  className={style.overlay} />;
};