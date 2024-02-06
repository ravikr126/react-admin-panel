import React, { useState } from 'react'
import axios from 'axios'

const Notification = () => {
    const [noti, setNoti] = useState({
        title: '',
        message: ''
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            // Make sure to replace 'YOUR_API_ENDPOINT_URL' with your actual endpoint URL
            const response = await axios.post('http://13.233.139.58/notifications/admin/post', noti, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('Response:', response.data)
            // Optionally, you can handle the response data here, e.g., showing a success message to the user
        } catch (error) {
            console.error('Error:', error)
            // Optionally, handle the error, e.g., showing an error message to the user
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNoti((prevNoti) => ({
            ...prevNoti,
            [name]: value
        }))
    }

    return (
        <>
            <div className="m-10">
                <div className="max-w-7xl mt-10 p-8 mx-auto bg-white rounded-md shadow-md border flex flex-row justify-between">
                    <h1 className="font-serif text-3xl font-bold">Notification Form</h1>
                    <h3 className="text-right pr-5">
                        <a href="./Homes" className="text-[#2ca5e9] hover:text-blue-800">
                            Dashboard{' '}
                        </a>
                        / Notification Form
                    </h3>
                </div>
                <br />
                <br />

                <div className="flex flex-row gap-10">
                    <form className="w-2/3 p-8 m-auto bg-white rounded-md shadow-md border" onSubmit={handleFormSubmit}>
                        <h1 className="font-serif text-base font-bold">Create notification</h1>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={noti.title}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="message">
                                    Message
                                </label>
                                <input
                                    id="message"
                                    type="text"
                                    name="message"
                                    placeholder="Message"
                                    value={noti.message}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="text-right sm:col-span-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 leading-5 text-base text-black transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-green-400 font-bold focus:outline-none focus:bg-gray-600"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Notification
