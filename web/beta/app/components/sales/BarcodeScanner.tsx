'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BrowserMultiFormatReader,
  NotFoundException,
} from '@zxing/browser';

/**
 * Componente para leer QR y códigos de barras
 * usando la cámara del navegador.
 */
export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!scanning) return;

    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromVideoDevice(
        undefined, // usa cámara trasera si existe
        videoRef.current!,
        (res, err) => {
          if (res) {
            setResult(res.getText());
            setScanning(false);
            codeReader.reset();
          }

          if (err && !(err instanceof NotFoundException)) {
            setError('Error leyendo el código');
          }
        }
      );

    return () => {
      codeReader.reset();
    };
  }, [scanning]);

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>Escanear QR / Código de Barras</h2>

      {!scanning && (
        <button onClick={() => setScanning(true)}>
          Iniciar escaneo
        </button>
      )}

      {scanning && (
        <video
          ref={videoRef}
          style={{ width: '100%', borderRadius: 8 }}
        />
      )}

      {result && (
        <p>
          <strong>Resultado:</strong> {result}
        </p>
      )}

      {error && (
        <p style={{ color: 'red' }}>{error}</p>
      )}
    </div>
  );
}
