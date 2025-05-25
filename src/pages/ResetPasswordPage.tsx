import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { userService } from '../services/UserService';

function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const t = searchParams.get('token');
        if (t) setToken(t);
        else setError('Token de redefinição ausente ou inválido.');
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (password !== confirm) {
            setError('As senhas não coincidem');
            return;
        }

        if (!token) {
            setError('Token inválido.');
            return;
        }

        try {
            await userService.resetPassword(token, password);
            setMessage('Senha redefinida com sucesso. Você já pode fazer login.');
        } catch {
            setError('Erro ao redefinir a senha. Token inválido ou expirado.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-background transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Criar nova senha</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nova senha</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmar senha</label>
                        <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    </div>
                    {message && <p className="text-green-600 dark:text-green-400 text-sm">{message}</p>}
                    {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
                    <button type="submit" className="w-full py-2 bg-primary hover:bg-blue-700 dark:bg-dark-primary dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition">
                        Redefinir senha
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
