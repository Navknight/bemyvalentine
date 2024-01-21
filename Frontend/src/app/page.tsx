'use client'
import React, { useState } from 'react';
import { useAccessToken } from '@/context/accessToken';
import { useRouter } from 'next/navigation';
export default function Home() {
	const router = useRouter();
    const { accessToken, setAccessToken }: AccessContextType = useAccessToken();


    const [signUp, setSignUp] = useState(false); // Corrected TypeScript syntax
    const [formDataSignIn, setFormDataSignIn] = useState({
        username: '',
        password: ''
    });
    const [formDataSignUp, setFormDataSignUp] = useState({
        username: '',
        email: '',
        password: '',
    });

	const handleSignIn = async () => {
		try {
			// Send a POST request to the FastAPI router
			const response = await fetch('http://localhost:8000/login/token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					username: formDataSignIn.username,
					password: formDataSignIn.password,
					grant_type: 'password',
					scope: '',
				}),
			});

			if (!response.ok) {
				throw new Error('Login failed');
			}
			const { access_token } = await response.json();
			// localStorage.setItem('accessToken', access_token);
			setAccessToken(access_token);
			// localStorage.setItem('username', username);
			console.log(access_token);
			// console.log(username)
			// window.location.href = "http://localhost:3000/dashboard";
			router.push('/dashboard');
		} catch (error) {
			console.error(error);
		}
	};


	const handleSignUp = async () => {
		try {
			const response = await fetch('http://localhost:8000/users/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formDataSignUp),
			});
	
			if (response.ok) {
				alert("Please check your email for the verification link!");
			} else {
				alert("Failed to sign up.");
			}
		} catch (error) {
			console.error(error);
		}
	};
	

	const handleChangeSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormDataSignUp({
			...formDataSignUp,
			[e.target.name]: e.target.value
		});
		console.log(formDataSignUp);
	};

	const handleChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(formDataSignIn)
		setFormDataSignIn({
			...formDataSignIn,
			[e.target.name]: e.target.value
		})
	};

	return (
		<>{
			signUp == false ?
				(<section className="grid min-h-screen place-items-center bg-pink-500 p-16">
					<div className="w-72 rounded-md bg-pink-300 p-4 pt-0 shadow-lg">
						<header className="flex h-16 items-center justify-between font-bold text-pink-950">
							<span>Sign In</span>
						</header>
						<form className="grid gap-3">

							<input
								className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400"
								type="email"
								name="username"
								placeholder="Enter your email"

								onChange={handleChangeSignIn}
							/>
							<input
								className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400"
								type="password"
								name="password"
								placeholder="Enter your password"

								onChange={handleChangeSignIn}
							/>
							<button
								className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
								type="button"
								onClick={handleSignIn}
							>
								<span>Sign In</span>
								<span>
									<svg
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</span>
							</button>
							<p className="hover:cursor-pointer text-center text-pink-800 mt-2" onClick={() => setSignUp(true)}>
								Don't have an account? Sign Up
							</p>
						</form>
					</div>
				</section>) :
				(<section className="grid min-h-screen place-items-center bg-pink-500 p-16">
					<div className="w-72 rounded-md bg-pink-300 p-4 pt-0 shadow-lg">
						<header className="flex h-16 items-center justify-between font-bold text-pink-950">
							<span>Sign Up</span>
						</header>
						<form className="grid gap-3">
							<input
								className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400"
								type="email"
								name="email"
								placeholder="Enter your email"
								onChange={handleChangeSignUp}
							/>
							<input
								className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400"
								type="text"
								name="username"
								placeholder="Enter your username"
								onChange={handleChangeSignUp}
							/>
							<input
								className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400"
								type="password"
								name="password"
								placeholder="Enter your password"
								onChange={handleChangeSignUp}
							/>
							<button
								className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
								type="button"
								onClick={handleSignUp}
							>
								<span>Sign Up</span>
								<span>
									<svg
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</span>
							</button>
							<p className="hover:cursor-pointer text-center text-pink-800 mt-2" onClick={() => setSignUp(false)}>
								Already have an account? Sign in
							</p>
						</form>
					</div>
				</section>)

		}
		</>
	)
}