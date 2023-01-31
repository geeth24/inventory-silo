import { UserAuth } from "@/components/context/AuthContext"
import { db } from "@/utils/Firebase"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import React, { useCallback, useEffect } from "react"
interface Props {
    orderItemsData: any[]
    id: string
}
// import { jsPDF } from "jspdf"

function Order({ orderItemsData, id }: Props) {
    const { user, getUserData } = UserAuth()
    const [orderFullfilled, setOrderFullfilled] = React.useState(false)
    const [orderItems, setOrderItems] = React.useState(orderItemsData)

    const handleOrderFullFilled = async () => {
        const orderRef = doc(db, "orders", `${id}`)
        //update order status to fulfilled
        const orderData = await getDoc(orderRef)
        if (orderData.data()?.fullfilled === false) {
            await updateDoc(orderRef, {
                fullfilled: true,
            })
            setOrderFullfilled(true)
        } else {
            await updateDoc(orderRef, {
                fullfilled: false,
            })
            setOrderFullfilled(false)
        }
    }
    const orderRef = doc(db, "orders", `${id}`)
    const getOrderData = async () => {
        const orderData = await getDoc(orderRef)
        if (orderData.data()?.fullfilled === true) {
            setOrderFullfilled(true)
        } else {
            setOrderFullfilled(false)
        }
    }

    const getOrderDataCallback = useCallback(() => {
        getOrderData()
    }, [])

    useEffect(() => {
        getOrderDataCallback()
    }, [getOrderDataCallback])

    const [rdOnly, setRdOnly] = React.useState(true)

    return (
        <>
            <Head>
                <title>Order | {id} | Inventory Silo</title>
            </Head>
            <div className=" bg-[url(/house.jpg)] bg-cover h-full">
                <div className="w-full h-full bg-blue-900/80 backdrop-filter backdrop-blur-md  py-12 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto py-6 px-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">
                                Order
                            </h1>
                            <div className="flex items-center">
                                <span className="mr-3 text-sm font-medium text-white">
                                    {rdOnly ? "RD Only" : "All"}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer mr-2">
                                    <input
                                        type="checkbox"
                                        value="rdOnly"
                                        className="sr-only peer"
                                        onChange={() => setRdOnly(!rdOnly)}
                                    />
                                    <div
                                        className={`${
                                            rdOnly
                                                ? "bg-blue-900/50"
                                                : "bg-blue-900/50"
                                        } w-11 h-6 bg-blue-200 peer-focus:outline-none   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600`}
                                    ></div>
                                </label>
                                <Link
                                    href={`/order/${id}/pdf${
                                        rdOnly ? "?rdOnly=true" : ""
                                    }`}
                                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                >
                                    Generate PDF
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-blue-900/50 shadow sm:rounded-md rounded-md border border-blue-200/50 backdrop-filter backdrop-blur-md">
                            <ul
                                role="list"
                                className="divide-y divide-blue-200"
                            >
                                {orderItems.map((orderItem: any) => (
                                    <div
                                        key={orderItem.name}
                                        className="flex items-center px-4 py-4 sm:px-6"
                                    >
                                        <div className="flex min-w-0 flex-1 flex-col">
                                            <div className="flex-shrink-0">
                                                <h1 className="text-base md:text-xl font-bold text-blue-50 truncate">
                                                    {orderItem.name}
                                                </h1>
                                            </div>
                                            <div className="flex-shrink-0 pr-2">
                                                <div className="flex-shrink-0 pr-2">
                                                    <p className="text-sm md:text-lg font-medium text-blue-300">
                                                        Measurement:{" "}
                                                        <span className="text-blue-50">
                                                            {
                                                                orderItem.measurement
                                                            }
                                                        </span>
                                                    </p>
                                                </div>
                                                <p className="text-xs md:text-sm font-medium text-blue-300">
                                                    Quantity:{" "}
                                                    <span className="text-blue-50">
                                                        {orderItem.quantity}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0 pr-2">
                                            {orderItem.fullfilled ? (
                                                <CheckCircleIcon
                                                    className="w-5 h-5 text-green-400"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <XCircleIcon
                                                    className="w-5 h-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 pr-2">
                                            <button
                                                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => {
                                                    const orderRef = doc(
                                                        db,
                                                        "orders",
                                                        `${id}`,
                                                        "items",
                                                        `${orderItem.id}`
                                                    )
                                                    updateDoc(orderRef, {
                                                        fullfilled:
                                                            !orderItem.fullfilled,
                                                    })

                                                    const updateDate =
                                                        async () => {
                                                            const orderItemsRef =
                                                                collection(
                                                                    db,
                                                                    "orders",
                                                                    `${id}`,
                                                                    "items"
                                                                )
                                                            const orderItems =
                                                                await getDocs(
                                                                    orderItemsRef
                                                                )
                                                            const orderItemsData =
                                                                orderItems.docs.map(
                                                                    (doc) =>
                                                                        doc.data()
                                                                )
                                                            setOrderItems(
                                                                orderItemsData
                                                            )
                                                        }
                                                    updateDate()
                                                }}
                                            >
                                                {orderItem.fullfilled
                                                    ? "Unfullfill"
                                                    : "Fullfill"}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Link
                                href="/dashboard"
                                className="bg-transparent hover:bg-blue-300 text-blue-200 font-semibold hover:text-blue-800 py-3 px-4 border border-blue-500 hover:border-transparent rounded mt-4 mr-2"
                            >
                                Back to Dashboard
                            </Link>
                            <button
                                onClick={handleOrderFullFilled}
                                className={`bg-green-200 hover:bg-green-300 text-green-500 font-bold py-2 px-4 rounded mt-4 ${
                                    orderFullfilled
                                        ? "bg-red-200 hover:bg-red-300 text-red-500"
                                        : ""
                                }`}
                            >
                                Mark as{" "}
                                {orderFullfilled ? "Unfulfilled" : "Fulfilled"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const orderItemsRef = collection(db, "orders", `${params?.id}`, "items")
    const orderItems = await getDocs(orderItemsRef)
    const orderItemsData = orderItems.docs.map((doc) => doc.data())
    console.log(orderItemsData)

    return {
        props: {
            orderItemsData,
            id: params?.id,
        },
    }
}
