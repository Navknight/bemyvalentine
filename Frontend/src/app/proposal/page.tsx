'use client';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const [name, setName] = useState('Pardhiv');
	const [sender, setSender] = useState('DW');
	const [message, setMessage] = useState('Will you go to prom with me?');
	const handleLoad = async () => {
		try {
			const response = await fetch(`http://localhost:8000/get-proposal/${id}`, {
				method: "GET",
				headers: {
					'accept': 'application/json', // You can include this header as well
				},
			});
			if (response.ok) {
				const data = await response.json();
				setName(data.to);
				setSender(data.by);
				setMessage(data.message);
			} else {
				alert("Invalid Link");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [])

	const handleNoHover = (e) => {
		// Get the window's dimensions
		const windowHeight = window.innerHeight / 3;
		const windowWidth = window.innerWidth / 3;

		// Generate random x and y coordinates within the window's dimensions
		const randomX = Math.floor(Math.random() * windowWidth);
		const randomY = Math.floor(Math.random() * windowHeight);

		// Set the button's style to the random position
		e.target.style.position = 'absolute';
		e.target.style.left = `${randomX}px`;
		e.target.style.top = `${randomY}px`;
	};

	const handleYesClick = () => {

		window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${"Date with " + sender}&dates=20240214T143000Z%2F20240214T183000Z`, '_blank');
	};

	return (
		<div className='w-screen h-screen bg-pink-500'>
			<div className="absolute top-1/2 left-1/2 -transform-x-1/2 -transform-y-1/2 flex items-center justify-center space-x-2">
				<p>{name}, {message}</p>
				<Button onClick={handleYesClick}>YES!</Button>
				<Button onMouseEnter={handleNoHover}>No</Button>
			</div>
		</div>
	);
}
