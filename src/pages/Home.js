import React, { useEffect } from 'react'

const Home = () => {
    function ConnectToWallet() {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(res => { 
                    let message = "Wallet is connected and current address is  " + res;
                    alert(message);
                        window.location.href = '/topics';
                })
        } else {
            alert("install metamask extension!!")
        }

    }
    return (
        <>
            <div className=" bg-black w-[100vw] h-[100vh]">
                <div className="text-white text-center font-bold text-4xl pt-[20vh] leading-normal">Create votes/Polls with the power of <br /> Decentralized Technique.</div>
                <div className="text-center mt-9">
                    <button
                        type="button"
                        onClick={ConnectToWallet}
                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-2xl px-5 py-2.5 text-center mr-2 mb-2">Connect Wallet</button>
                </div>
            </div>
        </>
    )
}

export default Home