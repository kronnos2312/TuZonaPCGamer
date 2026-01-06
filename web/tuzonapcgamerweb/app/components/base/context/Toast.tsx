'use client';

import { useEffect } from "react";
import { useToastStore } from "@/app/store/useToastStore";

export default function Toast() {
  const { message, type, visible, hideToast } = useToastStore();

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(hideToast, 3000);
    return () => clearTimeout(timer);
  }, [visible, hideToast]);

  if (!visible) return null;

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-800",
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`${styles[type]} text-white px-6 py-3 rounded-lg shadow-lg`}
      >
        {message}
      </div>
    </div>
  );
}
