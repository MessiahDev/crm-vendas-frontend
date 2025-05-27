import React from 'react';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => (
    <footer className="h-20 px-4 py-2 bg-indigo-100 dark:bg-gray-800 border-t dark:border-gray-700 text-center text-sm flex flex-col items-center justify-center">
        <p className="mb-1">
            Desenvolvido por{' '}
            <a
                href="https://www.linkedin.com/in/alex-alle/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-secondary hover:underline"
            >
                Alex Messias
            </a>
        </p>
        <span>© {currentYear} CRM App. Todos os direitos reservados.</span>
    </footer>
);

export default Footer;