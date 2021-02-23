import { useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

type ModalType = {
  isOpened: boolean,
  className?: string,
  modalRef?: string,
}

export default function ModalDrink({ isOpened, className, modalRef }: ModalType) {
  let [opened, setOpened] = useState(isOpened);
  // const { className, modalRef } = props;

  useEffect(() => {
    console.log('modal');
  }, []);

  function closeModal() {
    setOpened(false);
  }

  let result = null;
  if (opened) {
    result =
    <div ref={modalRef} className={`${className} modal`}>
      <div className="modal-content">
        <button type="button" className="modal-close" onClick={closeModal}>Fechar</button>
        <div className="modal-header">Hey</div>
        <div className="modal-body">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed sit suscipit non fugit doloribus.</div>
      </div>
      <div className="overlay" onClick={closeModal}></div>
    </div>
  }
  return result
}
