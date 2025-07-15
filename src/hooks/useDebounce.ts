// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

// T adalah tipe generik, membuat hook ini bisa digunakan untuk semua jenis nilai (string, number, dll.)
function useDebounce<T>(value: T, delay: number): T {
  // State untuk menyimpan nilai yang sudah di-debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Atur timer untuk mengubah nilai setelah delay yang ditentukan
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Fungsi cleanup: Batalkan timer jika 'value' atau 'delay' berubah sebelum timer selesai.
      // Ini adalah inti dari debouncing.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Jalankan ulang effect hanya jika value atau delay berubah
  );

  return debouncedValue;
}

export default useDebounce;