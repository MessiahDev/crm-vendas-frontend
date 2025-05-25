import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  }); 

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(prev => !prev)}
      className="fixed top-4 right-4 bg-accent dark:bg-dark-accent text-white px-4 py-2 rounded-lg"
    >
      {dark ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}
