'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAccessToken } from "@/context/accessToken";

export default function Dashboard() {
    const { accessToken, setAccessToken }: AccessContextType = useAccessToken();
    console.log("accessToken: " + accessToken);
    useEffect(() => {
        console.log("at" + accessToken);
    }, []);
    
    const [formData, setFormData] = useState({
        by: '',
        to: '',
        message: '',
    })
    const [id, setId] = useState(0);
    const [link, setLink] = useState('http://localhost:3000/proposals/')
    const [proposals, setProposals] = useState([{
        name: '',
        message: '',
        status: ''
    }])
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8000/proposal/create-proposal", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'accept': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const data = await response.json();
                setId(data.owner_id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLink(link + id);
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/proposal/profile', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(prevProposals => [...prevProposals, ...data.proposals]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (accessToken) {
            console.log("access_token load: " + accessToken);
            fetchData();
        }
    }, [accessToken]);


    const handleCopy = () => {
        navigator.clipboard.writeText(link);
    }


    return (
        <div className="flex min-h-screen">
            <div className="left-half grid min-w-[50vw] place-items-center bg-pink-500 p-16 border-r-4 border-pink-700">

                <div className="h-96 w-96 rounded-md bg-pink-300 p-5 pt-0 shadow-lg">
                    <header className="flex h-16 items-center justify-between font-bold text-pink-950">
                        <span>Send A Proposal!</span>
                    </header>
                    <form className="grid gap-5">
                        <input className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="text" placeholder="Enter Their Name" />
                        <textarea className="h-40 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" placeholder="Enter A Loving Message" />
                        <button onClick={handleSubmit} className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400" type="button">
                            <span>Create</span>
                            <span>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </button>
                        {id ? (<button onClick={handleCopy} className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400" type="button">
                            <span>Copy the link</span>
                            <span>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </span>
                        </button>) : (<></>)}
                    </form>
                </div>

            </div>


            <div className="right-half min-w-[50vw] bg-pink-500 p-4">
                <center>
                    <div className="w-96 justify-content-center flex-col space-y-5">
                        {proposals.length > 1 && proposals.map((proposal, index) => (
                            <div key={index} className="shadow-lg w-full py-4 px-4 flex items-center space-x-4 bg-pink-300 rounded-md justify-center">
                                <div className="flex flex-col">
                                    <span className="font-bold text-center mb-2px">{proposal.name}</span>
                                    <span className="text-sm text-center mb-10px">
                                        {proposal.message.length > 30 ? (
                                            <>
                                                {proposal.message.substring(0, 30)}...
                                                <button className="text-blue-500 ml-2" onClick={() => alert(proposal.message)}>Read More</button>
                                            </>
                                        ) : (
                                            proposal.message
                                        )}
                                    </span>
                                    {proposal.status === "Accepted" ? (<center><Button className="max-w-80" variant={"destructive"}>Delete</Button></center>) : (<span className="font-bold text-center">She Accepted!!</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </center>
            </div>
        </div>
    );
}