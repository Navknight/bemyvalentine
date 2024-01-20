'use client'
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Verify() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    const verification = async () => {
        try {
			const response = await fetch(`http://localhost:8000/users/verify/${email}/${otp}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			if (response.ok) {
                alert("You are verified, Log In to continue.");
                window.open("http://localhost:3000/")
			} else {
				alert("Incorrect Username or Password.")
			}
		} catch (error) {
			// Handle network error
		}
    } 

    useEffect(() => {
        verification();
    }, [])

    return (
        <section className="grid min-h-screen place-items-center bg-pink-500 p-16">
            <div className="w-72 rounded-md bg-pink-300 p-4 pt-0 shadow-lg">
                <header className="flex h-16 items-center justify-between font-bold text-pink-950">
                    <span>Verifying</span>
                </header>
            </div>
        </section>
    )
}