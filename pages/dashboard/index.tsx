import { UserAuth } from "@/components/context/AuthContext"
import DashboardLink from "@/components/DashboardLink"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { useCallback, useEffect, useRef } from "react"

export default function Dashboard() {
    const useCallbackOnce = <T extends (...args: any[]) => any>(
        callback: T
    ): T => {
        const ref = useRef<T>(callback)
        useEffect(() => {
            ref.current = callback
        }, [callback])
        return useCallback((...args: any[]) => ref.current(...args), []) as T
    }

    const { user, getUserData, logout } = UserAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const callback = useCallbackOnce(() => {
        getUserData()
    })
    React.useEffect(() => {
        callback()
    }, [callback])

    return (
        <div className="bg-[url(/house.jpg)] bg-cover h-screen ">
            <Head>
                <title>Dashboard | Inventory Silo</title>
            </Head>
            <div className="w-full h-full bg-blue-900/80 backdrop-filter backdrop-blur-md py-12 sm:px-6 lg:px-8">
                <div className="max-w-7xl  mx-auto py-6 px-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">
                        Dashboard
                    </h1>

                    <div className="overflow-hidden bg-blue-900/50 shadow sm:rounded-md rounded-md border border-blue-200/50 backdrop-filter backdrop-blur-md">
                        <ul role="list" className="divide-y divide-blue-200">
                            {user.orders?.map((order: any, index: number) => (
                                <DashboardLink
                                    key={index}
                                    orderID={order.orderID}
                                    name={index + 1 + ". " + order.name}
                                    totalItems={order.totalItems}
                                    fullfilled={order.fullfilled}
                                    isLoading={isLoading}
                                    date={order?.date}
                                />
                            ))}
                        </ul>
                    </div>
                    <Link
                        className="mt-4 mr-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        href="/new"
                    >
                        Add New Item
                    </Link>
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            logout()
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
