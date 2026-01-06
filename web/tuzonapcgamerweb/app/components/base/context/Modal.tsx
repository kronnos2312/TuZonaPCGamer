'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Props del modal
 * isOpen   -> Controla si el modal se renderiza o no
 * onClose  -> Callback para cerrar el modal (ESC o botón ✕)
 * title    -> Título opcional mostrado en el header
 * children -> Contenido dinámico del modal
 */
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

  /**
   * Referencia directa al contenedor del modal.
   * Se usa para:
   * - Obtener su posición real en pantalla
   * - Calcular correctamente el desplazamiento al arrastrar
   */
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Estado que almacena la posición X/Y del modal.
   * Se usa para aplicar transform: translate(x, y)
   * y permitir que el modal se mueva libremente.
   */
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * Indica si el usuario está actualmente arrastrando el modal.
   * Se activa en onMouseDown y se desactiva en onMouseUp.
   */
  const [dragging, setDragging] = useState(false);

  /**
   * Offset entre el punto donde el usuario hace click
   * y la esquina superior izquierda del modal.
   * Evita que el modal "salte" al comenzar el drag.
   */
  const offset = useRef({ x: 0, y: 0 });

  /**
   * Maneja el cierre del modal con la tecla ESC.
   * También bloquea el scroll del body cuando el modal está abierto.
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
   * Se ejecuta cuando el usuario presiona el mouse
   * sobre el header del modal.
   * Inicializa el estado de arrastre.
   */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!modalRef.current) return;

    setDragging(true);

    const rect = modalRef.current.getBoundingClientRect();

    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  /**
   * Se ejecuta mientras el usuario mueve el mouse.
   * Actualiza la posición del modal en tiempo real.
   */
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  /**
   * Finaliza el drag cuando el usuario
   * suelta el botón del mouse.
   */
  const onMouseUp = () => {
    setDragging(false);
  };

  /**
   * Registra y elimina los eventos globales del mouse
   * solo cuando el drag está activo.
   * Esto evita fugas de memoria y eventos innecesarios.
   */
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
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <header
          className="modal-header"
          onMouseDown={onMouseDown}
        >
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </header>

        <section className="modal-content">
          {children}
        </section>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 640px;
          max-height: 90vh;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          position: absolute;
          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.15),
            0 4px 10px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.25s ease-out;
        }

        .modal-container.dragging {
          cursor: grabbing;
          opacity: 0.95;
        }

        .modal-header {
          background: linear-gradient(135deg, #0f172a, #1e293b);
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          cursor: grab;
          user-select: none;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .modal-header button {
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .modal-header button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .modal-content {
          padding: 1.25rem;
          overflow-y: auto;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .modal-container {
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
          }

          .modal-header {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
