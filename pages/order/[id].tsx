import { UserAuth } from "@/components/context/AuthContext"
import { db } from "@/utils/Firebase"
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { GetServerSideProps } from "next"
import Link from "next/link"
import React, { useCallback, useEffect } from "react"
interface Props {
    orderItemsData: any[]
    id: string
}
function Order({ orderItemsData, id }: Props) {
    const { user, getUserData } = UserAuth()
    const [orderFullfilled, setOrderFullfilled] = React.useState(false)

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

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 min-h-screen  py-12 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-6 px-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">
                    Order
                </h1>
                <div className="overflow-hidden bg-blue-900/50 shadow sm:rounded-md rounded-md border border-blue-200/50 backdrop-filter backdrop-blur-md">
                    <ul role="list" className="divide-y divide-blue-200">
                        {orderItemsData.map((orderItem: any) => (
                            <div
                                key={orderItem.name}
                                className="flex items-center px-4 py-4 sm:px-6"
                            >
                                <div className="flex min-w-0 flex-1 items-center">
                                    <div className="flex-shrink-0">
                                        <h1 className="text-sm font-medium text-blue-50 truncate">
                                            {orderItem.name}
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 pr-2">
                                    <p className="text-sm font-medium text-blue-300">
                                        Quantity {orderItem.quantity}
                                    </p>
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
                        Mark as {orderFullfilled ? "Unfulfilled" : "Fulfilled"}
                    </button>
                </div>
            </div>
        </div>
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
