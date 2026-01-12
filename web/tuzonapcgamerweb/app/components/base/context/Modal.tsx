'use client';

import React, { useEffect, useRef, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Posición real del modal
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState(false);

  // Diferencia exacta entre cursor y esquina del modal
  const offset = useRef({ x: 0, y: 0 });

  /**
   * Centra el modal SOLO cuando se abre
   */
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();

      setPosition({
        x: window.innerWidth / 2 - rect.width / 2,
        y: window.innerHeight / 2 - rect.height / 2,
      });
    }
  }, [isOpen]);

  /**
   * Cierra con ESC y bloquea scroll
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  /**
   * Inicia el drag
   */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;

    setDragging(true);

    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  /**
   * Mueve el modal siguiendo EXACTAMENTE el cursor
   */
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        ref={modalRef}
        className={`modal-container ${dragging ? 'dragging' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header" onMouseDown={onMouseDown}>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>

        <section className="modal-content">{children}</section>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          z-index: 1000;
        }

        .modal-container {
          position: fixed;
          background: white;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          border-radius: 14px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
        }

        .modal-container.dragging {
          cursor: grabbing;
          opacity: 0.95;
        }

        .modal-header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: white;
          padding: 1rem 1.25rem;
          display: flex;
          justify-content: space-between;
          cursor: grab;
          user-select: none;
        }

        .modal-content {
          padding: 1.25rem;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}