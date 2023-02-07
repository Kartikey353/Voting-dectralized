import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import web3 from '../web3';
import Voting from '../Voting';
const TopicsAll = () => {
    const [AllTopics, setAllTopics] = useState([]);
    const [file, setfile] = useState([]);
    const [count, setcount] = useState(0);


    async function Retrive_Count_info() {
        let res = await Voting.methods.viewTopics_count().call();
        setcount(res);
        console.log(res);
    }

    async function Retrive_topic_info() {
        let array = [];
        for (let i = 0; i < count; i++) {
            let deatils = await Voting.methods.topicDetails(i).call();
            const topicdetail = {
                Total_options: deatils.Total_options,
                Total_voters: deatils.Total_voters,
                creator: deatils.creator,
                expiryTime: deatils.expiryTime,
                name: deatils.name
            }
            array.push(topicdetail);
            console.log("value fetched");
        }
        setAllTopics(array);
        console.log("all value update")
        console.log(AllTopics);
    }


    async function applytovote(i) {
        let accounts = await web3.eth.getAccounts();
        let date = new Date().toJSON().slice(0, 10); 
        let unixtimestamp = Date.parse(date);
        console.log(parseInt(unixtimestamp)); 
        console.log(i);
        let res = await Voting.methods.applyToVote(i-1, unixtimestamp).send({
            from: accounts[0]
        })
    }

    function addtopiclist() {
        Retrive_topic_info();
        const final = [];
        let i = 0;
        for (let topic of AllTopics) {
            let link = `/topics/${i}`
            final.push(<tr key={i}>
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                    {topic.name}
                </th>
                <td className="px-6 py-4">{i}</td>
                <td className="px-6 py-4">{topic.creator}</td>
                <td className="px-6 py-4">{topic.expiryTime}</td>
                <td className="px-6 py-4">{topic.Total_voters}</td>
                <td className="px-6 py-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            applytovote(i);
                        }}
                        className='mt-10  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>Apply</button>
                </td>
                <td className="px-6 py-4">
                    <Link
                        to={link}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        Edit
                    </Link>
                </td>
            </tr>)
            i++;
        }
        setfile(final);

    }
    useEffect(() => {
        Retrive_Count_info();
        Retrive_topic_info();
        addtopiclist();
    }, []);

    return (
        <div className="mt-20">
            <div className="text-center font-bold text-4xl">List of Polls created</div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[20vh]">
                <table className="w-full text-xl text-left">
                    <thead className="text-xs text-black uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Poll Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sr.NO
                            </th>
                            <th scope="col" className="px-8 py-3">
                                Creator Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Expiry Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Voters
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Register
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Vote
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                            >
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">1</td>
                            <td className="px-6 py-4">Red</td>
                            <td className="px-6 py-4">Wearables</td>
                            <td className="px-6 py-4">$999</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </a>
                            </td>
                        </tr> */}
                        {file}
                    </tbody>
                </table>
            </div>
            <div className="container flex justify-center mx-auto w-auto">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        addtopiclist();
                    }}
                    className="mt-10  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Refresh</button>
                <Link to="/createvote"><button type="button" className="mt-10  text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create Vote</button></Link>
            </div>
        </div>
    )
}

export default TopicsAll