import React, { useState } from 'react'
import axios from 'axios'
import { message } from 'antd'

const Notification = () => {
    const [noti, setnoti] = useState({
        name: '',
        message: '' // Updated to use a dropdown
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('name', noti.name)
            formData.append('message', noti.message)

            const response = await axios.post('', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log('Response:', response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type } = e.target
        // If the input is a file or dropdown, update state differently
        setnoti((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? e.target.files[0] : value
        }))
    }

    return (
        <>
            <div className="m-10">
                <div className="max-w-7xl mt-10 p-8 mx-auto bg-white rounded-md shadow-md border  flex flex-row justify-between">
                    <h1 className="font-serif	text-3xl font-bold	">Notification Form</h1>
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
                    <form
                        className="w-2/3 p-8 m-auto bg-white rounded-md shadow-md border "
                        onSubmit={handleFormSubmit}
                    >
                        <h1 className="font-serif	text-base font-bold">Create notification</h1>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={noti.name}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    Message
                                </label>
                                <input
                                    id="message"
                                    type="text"
                                    name="message"
                                    placeholder="mesage"
                                    value={noti.message}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div className="text-right rounded-md">
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
