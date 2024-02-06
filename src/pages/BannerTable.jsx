import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function RecentOrders() {
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleChange = async (isChecked, id) => {
        try {
            setLoading(true)

            // Make an API request to update the status
            const response = await axios.post(`http://13.233.139.58/notifications/admin/post`, {
                status: isChecked
            })

            // Assuming the API response contains the updated item with the new status
            const updatedItem = response.data

            // Handle the updated item as needed (e.g., update state in your component)
            // Example:
            // updateStateWithNewItem(updatedItem);
        } catch (error) {
            console.error('Error updating status:', error)
            // Handle the error as needed
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (itemId) => {
        try {
            // Send a DELETE request to the API endpoint for deleting a category
            const response = await axios.delete(`http://penguinfe.golu.in:7000/banners/${itemId}`)

            // Update the local data array after successful deletion
            const updatedData = data.filter((item) => item.id !== itemId)
            setData(updatedData)

            console.log('Delete Response:', response.data)
        } catch (error) {
            console.error('Delete Error:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use axios to fetch data
                const response = await axios.get('http://penguinfe.golu.in:7000/banners')

                // Access the data property from the response
                const result = response.data

                // Set the state with the fetched data
                setData(result.data)

                // Note: You won't see the updated state immediately due to the asynchronous nature of setState.
                // If you want to log the updated state, you can use a separate useEffect hook.
                console.log(result.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <div className="max-w-7xl mb-5 p-8 mx-auto bg-white rounded-md shadow-md border border-gray-200 flex flex-row justify-between">
                <h1 className="font-serif text-3xl font-bold">Banner Table</h1>
                <h3 className="text-right pr-5">
                    <Link to="/dashboard" className="text-[#2ca5e9] hover:text-blue-800">
                        Dashboard
                    </Link>{' '}
                    / BannerTable
                </h3>
            </div>

            <div className="flex justify-end">
                <Link to="/Banner" className="bg-green-200 hover:bg-green-500 hover:text-black border rounded p-3 mr-5">
                    <span className="font-bold text-xl">+</span> Add New
                </Link>
            </div>
            <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1 mt-5">
                {' '}
                {/* Add margin-top here */}
                <strong className="text-gray-700 font-medium">Recent Orders</strong>
                <div className="border-x border-gray-200 rounded-sm mt-3">
                    <table className="w-full text-gray-700">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>image</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </>
    )
}
