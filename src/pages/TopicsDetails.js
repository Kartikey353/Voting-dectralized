import { parse } from 'postcss';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import web3 from '../web3';
import Voting from '../Voting';
const TopicsDetails = () => {

    let { topicid } = useParams();
    const [expirydate, setexpirydate] = useState('');
    const [options, setoptions] = useState([]);
    const [voters, setvoters] = useState([]);
    const [result, setresult] = useState([]);
    const [selectedoption, setselectedoption] = useState();
    const [topicdetails, settopicdetails] = useState({
        Total_options: "Total_options",
        Total_voters: "Total_voters",
        creator: "creator",
        name: "name"
    });
    async function retrivetopicdetails() {

        let deatils = await Voting.methods.topicDetails(topicid).call();
        const topicdetail = {
            Total_options: deatils.Total_options,
            Total_voters: deatils.Total_voters,
            creator: deatils.creator,
            name: deatils.name
        }
        settopicdetails(topicdetail);
        setexpirydate(deatils.expiryTime);
    }


    async function approvevoters(id, number) {

        let accounts = await web3.eth.getAccounts();
        await Voting.methods.approveVoter(id, number).send({
            from: accounts[0]
        });

    }

    async function listofvoters() {

        let res = await Voting.methods.Listofvoters(topicid).call();
        setvoters(res);

    }

    async function getoptionsdetails() {

        let res = await Voting.methods.Listofoption(topicid).call();
        setoptions(res);

    }

    async function submitResult() {
        let accounts = await web3.eth.getAccounts();
        let index = options.indexOf(selectedoption);
        await Voting.methods.vote(topicid, index).send({
            from: accounts[0]
        })
    }

    async function getresult() {
        let res = await Voting.methods.getResults(topicid).call();
        setresult(res);
        console.log(result);
    }

    useEffect(() => {
        getresult();
        retrivetopicdetails();
        getoptionsdetails();
        listofvoters();
    }, [])

    return (
        <>
            <div className="mt-20">
                <h1 className="text-center font-bold text-3xl">Poll</h1>
                <form className='max-w-[400px] mx-auto mt-10'>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-bold"
                        >
                            Details of Vote
                        </label>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[5vh]">
                            <table className="w-full text-xl font-bold text-left border border-black">
                                <thead className="text-xs text-black uppercase border border-black">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Details
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                        >
                                            Name/Question
                                        </th>
                                        <td className="px-6 py-4">{topicdetails.name}</td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                        >
                                            Total_voters
                                        </th>
                                        <td className="px-6 py-4">{topicdetails.Total_voters}</td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                        >
                                            Total_options
                                        </th>
                                        <td className="px-6 py-4">{topicdetails.Total_options}</td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                        >
                                            Expiry_time
                                        </th>
                                        <td className="px-6 py-4">{new Date(expirydate * 1).toDateString()}</td>
                                    </tr>
                                    <tr>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                        >
                                            Result
                                        </th>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-lg font-medium  "
                        >
                            Options
                        </label>
                        <div className="space-y-3">
                            {
                                options.map((item, idx) => {
                                    return (
                                        <div key={idx} className="flex items-center justify-between pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input
                                                id="bordered-radio-1"
                                                type="radio"
                                                value={item}
                                                name="bordered-radio"
                                                onChange={(e) => {
                                                    setselectedoption(e.target.value);
                                                }}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
                                            />
                                            <label
                                                htmlFor="bordered-radio-1"
                                                className="w-full py-4 ml-2 text-sm font-medium"
                                            >
                                                <div className="justify-between flex">
                                                    <span className="">{item}</span>
                                                    <span className="">{
                                                        result[idx]
                                                    }</span>
                                                </div>
                                            </label>
                                            <div className="mr-5">

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            submitResult();
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit Vote
                    </button>
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            getresult();
                        }}
                        className="text-white ml-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Result
                    </button>
                </form>
                <div className="">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[20vh]">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-black uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Sr.NO
                                    </th>
                                    <th scope="col" className="px-8 py-3">
                                        Voter Address
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    voters.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                                                >
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4">{item}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            approvevoters(topicid, index);
                                                        }}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Approv
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopicsDetails