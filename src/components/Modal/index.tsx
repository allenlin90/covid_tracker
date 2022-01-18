import { reverse } from 'dns';
import React, { useState, useEffect } from 'react';

import style from './Modal.module.css';

interface ModalProps {
  show: boolean;
  placeHolder?: boolean;
  trigger?: JSX.Element;
  title?: string;
  content?: JSX.Element | string;
  confirmBtn?: JSX.Element;
  closeModal: Function;
  persist?: boolean;
  children?: React.ReactElement | never[];
}

export const Modal = ({
  show = false,
  trigger,
  placeHolder = false,
  title = 'Modal title',
  content = '...',
  confirmBtn,
  closeModal,
  persist = false,
  children,
}: ModalProps): JSX.Element => {
  const [dialogTimeout, setDialogTimeout] = useState(400);
  const [showDialog, setShowDialog] = useState(false);

  // removal transition
  useEffect(() => {
    if (show) {
      setShowDialog(show);
    } else {
      setTimeout(() => {
        setShowDialog(show);
      }, dialogTimeout);
    }
  }, [show]);

  const closeByBackdrop = () => {
    if (!persist) {
      closeModal(false);
    }
  };

  const modalTrigger = (): JSX.Element => {
    if (trigger) return trigger;

    return (
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#theModal"
      >
        Launch demo modal
      </button>
    );
  };

  return (
    <>
      <div className={showDialog ? style.display : style.hide}>
        <div className={style.backdrop} onClick={closeByBackdrop}></div>
        <dialog
          open
          className={`${style.dialog} ${style.slide} ${
            show ? style.slideDown : style.slideUp
          }`}
        >
          <header className={style.header}>{title}</header>
          <section className={style.section}>{children}</section>
          <menu className={style.menu}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => closeModal(false)}
            >
              Close
            </button>
            {confirmBtn}
          </menu>
        </dialog>
      </div>
      <div className={show ? style.hide : style.display}>
        {placeHolder ? modalTrigger() : ''}
      </div>
    </>
  );
};
