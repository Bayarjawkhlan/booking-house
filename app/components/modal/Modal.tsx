"use client";

import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import Button from "../Button";

import { IoMdClose } from "react-icons/io";

interface ModalProps {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  actionLabel: string;
  onSubmit: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState<boolean | undefined>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled) {
      return;
    }

    if (secondaryAction) secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  console.log("=================>" + secondaryAction, secondaryActionLabel);

  return (
    <>
      <div className="px-4 sm:px-0 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto">
          <div
            className={clsx(
              "translate duration-300 h-full",
              showModal
                ? "translate-y-0 opacity-100"
                : "opacity-0 translate-y-full"
            )}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              <div className="relative p-6 flex-auto">{body}</div>

              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    label={actionLabel}
                    onClick={handleSubmit}
                    disabled={disabled}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Modal;
