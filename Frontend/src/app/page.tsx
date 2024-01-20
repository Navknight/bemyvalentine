'use client';

export default function Home() {
	return (
		<section className="grid min-h-screen place-items-center bg-pink-500 p-16">
			<div className="w-72 rounded-md bg-pink-300 p-4 pt-0 shadow-lg">
				<header className="flex h-16 items-center justify-between font-bold text-pink-950">
					<span>Login</span>
				</header>
				<form className="grid gap-3">
					<input className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="text" placeholder="Enter your username" />
					<input className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="password" placeholder="Enter your password" />
					<button className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400" type="button">
						<span>Sign In</span>
						<span>
							<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</span>
					</button>
					<button className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400" type="button">
						<span>Sign up</span>
						<span>
							<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
								<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</span>
					</button>
				</form>
			</div>
		</section>
	);
}
