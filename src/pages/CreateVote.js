import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Voting from '../Voting';
import web3 from "../web3"
const CreateVote = () => {
    const [optionvalue, setoptionvalue] = useState([]);
    const [file, setfile] = useState([]);
    const [totaloptions, settotaloptions] = useState(0);


    const [VoteName, setVotename] = useState('');
    const [ExpireTime, setExpireTime] = useState('');
    const [options, setoptions] = useState([]);

    async function submitvotedetails() {
        setVotename(String(VoteName));
        let unixtimestamp = Date.parse(ExpireTime);
        console.log(parseInt(unixtimestamp));
        setExpireTime(parseInt(unixtimestamp));
        let accounts = await web3.eth.getAccounts();
        console.log(accounts);
        let res = await Voting.methods.viewTopics_count().call();
        let res1 = await Voting.methods.createTopic(VoteName, ExpireTime).send(
            {
                from: accounts[0],
            }
        );
        const string = options.toString()
        const ans_array = string.split(',')
        setoptions(ans_array);
        let res2 = await Voting.methods.addOption(res, options).send({
            from: accounts[0]
        })
    }

    function addoption() {
        const final = [];
        for (let option of options) {
            final.push(<div key={option} className="flex justify-between">
                <h1 className="font-bold text-xl my-auto">{option}</h1>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        let tempoptions = new Array();
                        tempoptions = options;
                        const index = tempoptions.indexOf(option);
                        if (index > -1) {
                            tempoptions.splice(index, 1);
                        }
                        setoptions(tempoptions);
                        setfile([]);
                        settotaloptions(totaloptions - 1);
                    }}
                    className="text-white border font-bold hover:cursor-pointer rounded-xl hover:bg-red-700 bg-red-500 pb-2 pt-2 px-2">Remove</button>
            </div>);
        }
        setfile(final);
    }


    useEffect(() => {
        addoption();
    }, [totaloptions]);


    return (
        <div className="w-screen h-screen text-black">
            <h1 className="text-3xl text-center font-bold pt-16">Fill details to create vote</h1>
            <form className='md:max-w-[400px] max-w-[340px] pt-20 mx-auto h-screen'>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block mb-2 text-sm font-medium"
                        >
                            Vote Name
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-black  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xl"
                            placeholder=""
                            required=""
                            onChange={(e) => {
                                setVotename(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="company"
                            className="block mb-2 text-sm font-medium"
                        >
                            Expire Time
                        </label>
                        <input
                            type="date"
                            id="company"
                            className="bg-gray-50 border border-gray-300  text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="enter Epoch & Unix Timestamp"
                            required=""
                            onChange={(e) => {
                                setExpireTime(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium "
                        >
                            Options
                        </label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300  text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""
                            required=""
                            onChange={(e) => {
                                setoptionvalue(e.target.value);
                            }}
                        />
                        <div
                            className="">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    let tempoptions = new Array();
                                    tempoptions = options;
                                    tempoptions.push(optionvalue);
                                    setoptions(tempoptions);
                                    settotaloptions(totaloptions + 1);
                                }}
                                className='text-white w-full hover:bg-green-800 hover:cursor-pointer text-xl mt-3 bg-green-600 text-bold border rounded-xl text-center pt-2 pb-2'>Add</button>
                        </div>
                        <div className="mt-6 space-y-6">
                            {/* <div className="flex justify-between">
                                <h1 className="font-bold text-xl my-auto">option 1</h1>
                                <p className="text-white border font-bold hover:cursor-pointer rounded-xl hover:bg-red-700 bg-red-500 pb-2 pt-2 px-2">Remove</p>
                            </div> */}
                            {file}
                        </div>
                    </div>
                </div>
                <div className="md:space-x-5">
                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            submitvotedetails();
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                    <Link to="/topics"> <button
                        type="submit"
                        className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Back to Vote
                    </button></Link>
                </div>
            </form>

        </div>
    )
}

export default CreateVote