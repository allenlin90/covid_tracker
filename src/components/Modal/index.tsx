import { useState } from 'react';

interface ModalProps {
  trigger?: JSX.Element;
  triggerText?: string;
  title?: string;
  content?: JSX.Element | string;
  confirmBtn?: JSX.Element;
  active?: Boolean;
}

export const Modal = ({
  trigger,
  title = 'Modal title',
  content = '...',
  confirmBtn,
  active = false,
}: ModalProps): JSX.Element => {
  const [isActive, setActive] = useState(active);

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
    <div>
      {modalTrigger()}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        id="theModal"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {confirmBtn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
