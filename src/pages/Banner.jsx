import React, { useState } from 'react'
import axios from 'axios'

const Banner = () => {
    const [bannerData, setBannerData] = useState({
        header: '',
        title: null,
        link: '',
        image: '',
        isActive: '' // Updated to use a dropdown
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('header', bannerData.header)
            formData.append('title', bannerData.title)
            formData.append('image', bannerData.image)
            formData.append('description', bannerData.description)
            formData.append('link', bannerData.link)

            const response = await axios.post('http://13.233.139.58/banners', formData, {
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
        setBannerData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? e.target.files[0] : value
        }))
    }

    const [uploadedFiles, setUploadedFiles] = useState([])

    const handleInputChangeFile = (e) => {
        const files = e.target.files

        // Display the uploaded files
        const fileArray = Array.from(files).map((file) => ({
            url: URL.createObjectURL(file),
            id: Math.random().toString(36).substring(7) // Generate a unique ID for each file
        }))
        setUploadedFiles((prevFiles) => [...prevFiles, ...fileArray])
    }

    const handleDelete = (id) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
    }

    return (
        <>
            <div className="m-10">
                <div className="max-w-7xl mt-10 p-8 mx-auto bg-white rounded-md shadow-md border  flex flex-row justify-between">
                    <h1 className="font-serif	text-3xl font-bold	">Banner Form</h1>
                    <h3 className="text-right pr-5">
                        <a href="./Homes" className="text-[#2ca5e9] hover:text-blue-800">
                            Dashboard{' '}
                        </a>
                        / Banner Form
                    </h3>
                </div>
                <br />
                <br />

                <div className="flex flex-row gap-10">
                    <form
                        className="w-2/3 p-8 m-auto bg-white rounded-md shadow-md border "
                        onSubmit={handleFormSubmit}
                    >
                        <h1 className="font-serif	text-base font-bold">Basic information</h1>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    Header
                                </label>
                                <input
                                    id="header"
                                    type="text"
                                    name="header"
                                    placeholder="header"
                                    value={bannerData.header}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    placeholder="title"
                                    value={bannerData.title}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>
                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    link
                                </label>
                                <input
                                    id="link"
                                    type="text"
                                    name="link"
                                    placeholder="link"
                                    value={bannerData.link}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="image">
                                    Image
                                </label>

                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            id="logo"
                                            className="mx-auto h-12 w-12 text-black"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            {/* Your SVG path here */}
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file_upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span className="">Upload a file</span>
                                                <input
                                                    id="file_upload"
                                                    name="logo"
                                                    type="file"
                                                    onChange={handleInputChangeFile}
                                                    className="sr-only"
                                                    multiple // Allow multiple file selection
                                                />
                                            </label>
                                            <p className="pl-1 text-black">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-black">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                    {/* file upload option ends here */}

                                    {/* Display uploaded files */}
                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-4">
                                            <h2 className="text-lg font-semibold">Uploaded Files:</h2>
                                            <ul className="list-disc pl-4 mt-2">
                                                {uploadedFiles.map((file) => (
                                                    <li
                                                        key={file.id}
                                                        className="flex items-center justify-between mb-2"
                                                    >
                                                        <img
                                                            src={file.url}
                                                            alt={`uploaded-${file.id}`}
                                                            className="max-w-16 max-h-16 object-cover"
                                                        />
                                                        <button
                                                            onClick={() => handleDelete(file.id)}
                                                            className="text-red-500 hover:text-red-700 ml-2 focus:outline-none"
                                                        >
                                                            Delete
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="name">
                                    Description
                                </label>
                                <input
                                    id="Description"
                                    type=""
                                    name="title"
                                    placeholder="description"
                                    value={bannerData.description}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:gray-600 focus:blue-500 dark:focus:blue-500 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-black dark:text-gray-200" htmlFor="isActive">
                                    isActive
                                </label>
                                <select
                                    name="isActive"
                                    value={bannerData.isActive}
                                    onChange={handleInputChange}
                                    className="border-black mx-5 border"
                                >
                                    <option value="">Select Status</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>

                            <div className="text-right rounded-md">
                                <button
                                    type="submit"
                                    className="px-4 py-2 leading-5 text-base text-black transition-colors duration-200 transform bg-blue-400 rounded-md hover:bg-green-400 font-bold focus:outline-none focus:bg-gray-600"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Banner
