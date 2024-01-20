'use client'

export default function Dashboard() {


    return (
        <div className="flex min-h-screen">
            <div className="left-half grid min-w-[50vw] place-items-center bg-pink-500 p-16 border-r-4 border-pink-700">

                <div className="w-96 rounded-md bg-pink-300 p-4 pt-0 shadow-lg">
                    <header className="flex h-16 items-center justify-between font-bold text-pink-950">
                        <span>Send A Proposal!</span>
                    </header>
                    <form className="grid gap-3">
                        <input className="h-10 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="text" placeholder="Enter Their Name" />
                        <input className="h-20 rounded-sm bg-pink-100/50 px-2 text-pink-950 placeholder:text-pink-600/80 focus:outline-none focus:ring focus:ring-pink-400" type="password" placeholder="Enter A Loving Message" />
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
                    <div className="max-w-[25vw] justify-content-center  flex ">
                        <div className="flex justify-between py-6 px-4 bg-pink-300 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="flex flex-col space-y-1">
                                    <span className="font-bold">Leonard Krashner</span>
                                    <span className="text-sm">Yeah same question here too 🔥</span>
                                </div>
                            </div>
                            <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
                                17m ago
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    );
}