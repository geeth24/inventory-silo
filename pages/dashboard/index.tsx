import { UserAuth } from "@/components/context/AuthContext"
import {
    CheckCircleIcon,
    XCircleIcon,
    ChevronRightIcon,
    EnvelopeIcon,
} from "@heroicons/react/20/solid"
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

    const { user, getUserData } = UserAuth()
    const [isLoading, setIsLoading] = React.useState(false)
    const callback = useCallbackOnce(() => {
        getUserData()
    })
    React.useEffect(() => {
        callback()
    }, [callback])

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 min-h-screen py-12 sm:px-6 lg:px-8">
            <div className="max-w-7xl  mx-auto py-6 px-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-7">
                    Dashboard
                </h1>

                <div className="overflow-hidden bg-blue-900/50 shadow sm:rounded-md rounded-md border border-blue-200/50 backdrop-filter backdrop-blur-md">
                    <ul role="list" className="divide-y divide-blue-200">
                        {user.orders?.map((order: any, index: number) => (
                            <li key={order.email}>
                                <Link
                                    href={`/order/${order.orderID}`}
                                    className="block hover:bg-blue-600"
                                    onClick={() => {
                                        setIsLoading(true)
                                    }}
                                >
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="flex min-w-0 flex-1 items-center">
                                            <div className="flex-shrink-0">
                                                <h1 className="text-sm font-medium text-blue-50 truncate">
                                                    {index + 1}. {order.name}
                                                </h1>
                                            </div>
                                            <div className="flex-1 min-w-0 px-4 sm:grid md:grid-cols-2 md:gap-4 hidden">
                                                <div>
                                                    <p className="text-sm text-blue-100 truncate">
                                                        {order.orderID}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 pr-2">
                                            <p className="text-sm font-medium text-blue-300">
                                                Total Items: {order.totalItems}
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0 pr-2">
                                            {order.fullfilled ? (
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
                                        <div>
                                            <ChevronRightIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        {isLoading && (
                                            <div className="flex-shrink-0 pr-2">
                                                <div role="status">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
