import Image from 'next/image';
import avatarImage from '@/images/avatar.jpg';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
    // Hook
    const { login, loading, user, error } = useAuth();

    // Router
    const router = useRouter();

    // Redirect to home if user is auth
    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    // Form
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        login(form);
    };
    // End form

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading && user && <p>You are already logged in as {user.name}.</p>}
            {!loading && !user && (
                <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-sm space-y-10">
                        <div>
                            <Image src={avatarImage} alt="" sizes={'4rem'} className={'mx-auto h-10 w-auto'} priority />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                                Sign in to your account
                            </h2>
                        </div>
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="relative -space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={onChange}
                                    />
                                    {error && <p className="text-sm text-red-600">{error}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative mt-4 block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 ring-1 ring-inset ring-black placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-zinc-600 sm:text-sm sm:leading-6"
                                        placeholder="Password"
                                        value={form.password}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-zinc-600 focus:ring-zinc-600"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-3 block text-sm leading-6 text-gray-900 dark:text-white"
                                    >
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-zinc-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="text-center text-sm leading-6 text-gray-500">
                            <Link href="/" className="font-semibold text-zinc-600 hover:text-zinc-500">
                                Go to home
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
