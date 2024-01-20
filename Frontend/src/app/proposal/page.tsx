'use client';
import { Button } from '@/components/ui/button';

export default function Home() {
	const name = "abhinav";

	const handleNoHover = (e) => {
		// Get the window's dimensions
		const windowHeight = window.innerHeight/3;
		const windowWidth = window.innerWidth/3;

		// Generate random x and y coordinates within the window's dimensions
		const randomX = Math.floor(Math.random() * windowWidth);
		const randomY = Math.floor(Math.random() * windowHeight);

		// Set the button's style to the random position
		e.target.style.position = 'absolute';
		e.target.style.left = `${randomX}px`;
		e.target.style.top = `${randomY}px`;
	}

	const handleYesClick = () => {
		window.open(`https://www.google.com/calendar/render?action=TEMPLATE&text=${"Date with "+ name}&dates=20240214T143000Z%2F20240214T183000Z`, '_blank');
	}

	return (
		<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Button onClick={handleYesClick}>YES!</Button>
			<Button onMouseEnter={handleNoHover}>No</Button>
		</div>
	);
}
