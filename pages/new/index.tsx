import { db } from "@/utils/Firebase"
import { addDoc, collection } from "firebase/firestore"
import React from "react"

function NewItem() {
    const [collectionString, setCollectionString] = React.useState("")

    const [name, setName] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [quantity, setQuantity] = React.useState("")
    const [added, setAdded] = React.useState(false)

    const handleSubmit = () => {
        const itemRef = collection(db, collectionString)
        addDoc(itemRef, {
            name: name,
            price: price,
            quantity: quantity,
            inStock: true,
        })
        setAdded(true)

        setName("")
        setPrice("")
        setQuantity("")
        setCollectionString("")

        setTimeout(() => {
            setAdded(false)
        }, 3000)
    }

    return (
        <div className=" bg-cover h-screen ">
            <div className="w-full h-full bg-blue-900/80 backdrop-filter backdrop-blur-md  py-12 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto py-6 px-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">
                        Add New Item
                    </h1>
                    <div className="overflow-hidden bg-blue-900/50 shadow sm:rounded-md rounded-md border border-blue-200/50 backdrop-filter backdrop-blur-md">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="collection"
                                        className="block text-sm font-medium text-white"
                                    >
                                        Collection
                                    </label>
                                    <select
                                        id="collection"
                                        name="collection"
                                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        defaultValue="omproduce"
                                        onChange={(e) => {
                                            setCollectionString(e.target.value)
                                        }}
                                    >
                                        <option value="omproduce">
                                            OM Produce
                                        </option>
                                        <option value="indiangrocery">
                                            Indian Grocery
                                        </option>
                                        <option value="meat">Meat</option>
                                        <option value="restaurantdepot">
                                            Restaurant Depot
                                        </option>
                                        <option value="sams">Sams</option>
                                        <option value="test">Test</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        autoComplete="name"
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-white"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                        }}
                                        autoComplete="price"
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label
                                        htmlFor="quantity"
                                        className="block text-sm font-medium text-white"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => {
                                            setQuantity(e.target.value)
                                        }}
                                        autoComplete="quantity"
                                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        {added && (
                            <div
                                className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
                                role="alert"
                            >
                                <p className="font-bold">Item Added!</p>
                                <p>Item has been added to the database.</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleSubmit}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewItem
