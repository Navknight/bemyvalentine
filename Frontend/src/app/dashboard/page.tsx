'use client'

import { Button } from "@/components/ui/button";

export default function Dashboard() {

    let proposals = [
        {
            name: "Mia",
            message: "Loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee you Mia",
            status: "Pending"
        },
        {
            name: "Lana",
            message: "Love you Lana",
            status: "Accepted"
        }
    ]

    return (
        <div className="flex min-h-screen">
            <div className="left-half grid min-w-[50vw] place-items-center bg-pink-500 p-16 border-r-4 border-pink-700">

                <div className="h-96 w-96 rounded-md bg-pink-300 p-5 pt-0 shadow-lg">
                    <header className="flex h-16 items-center justify-between font-bold text-pink-950">
                        <span>Send A Proposal!</span>
                    </header>
                    <form className="grid gap-5">
                        <input className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="text" placeholder="Enter Their Name" />
                        <textarea className="h-40 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="text" placeholder="Enter A Loving Message" />
                        <button className="flex h-10 items-center justify-between rounded-sm bg-pink-700 px-2 text-pink-100 transition-colors duration-300 hover:bg-pink-800 focus:outline-none focus:ring focus:ring-pink-400" type="button">
                            <span>Create</span>
                            <span>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>

            </div>


            <div className="right-half min-w-[50vw] bg-pink-500 p-4">
                <center>
                    <div className="w-96 justify-content-center flex-col space-y-5">
                        {proposals.map((proposal, index) => (
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
                                    {proposal.status === "Pending" ? (<center><Button className="max-w-80" variant={"destructive"}>Delete</Button></center>) : (<span className="font-bold text-center">She Accepted!!</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </center>
            </div>
        </div>
    );
}