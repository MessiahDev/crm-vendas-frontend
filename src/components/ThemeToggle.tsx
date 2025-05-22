import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-4 right-4 bg-accent dark:bg-dark-accent text-white px-4 py-2 rounded-lg"
    >
      {dark ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}