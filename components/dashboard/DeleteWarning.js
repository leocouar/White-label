// Modal.js
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DeleteWarning = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!modalRef.current || modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="absolute bg-black bg-opacity-50 w-full h-full"
          ></div>
          <div className="z-50 bg-white p-4">{children}</div>
        </div>
      )}
    </>
  );
};

DeleteWarning.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default DeleteWarning;
