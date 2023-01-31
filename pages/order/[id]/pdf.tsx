import { db } from "@/utils/Firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { GetServerSideProps } from "next"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const InvoicePDF = dynamic(() => import("../../../components/context/PDF"), {
    ssr: false,
})
interface Props {
    id: string
    orderItemsData: any[]
    date: string
    rdOnly?: boolean
}
const View = ({ id, orderItemsData, date }: Props) => {
    const [client, setClient] = useState(false)
    const [rdOnlyValue, setRdOnlyValue] = useState(false)
    const router = useRouter()

    const { rdOnly } = router.query

    useEffect(() => {
        setClient(true)
        if (rdOnly === "true") {
            setRdOnlyValue(true)
        }
    }, [])

    return (
        <>
            <Head>
                <title>Order {id} | Inventory Silo</title>
            </Head>
            <InvoicePDF
                id={id}
                orderItemsData={orderItemsData}
                date={date}
                rdOnly={rdOnlyValue}
            />
        </>
    )
}

export default View

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const orderItemsRef = collection(db, "orders", `${params?.id}`, "items")
    const orderItems = await getDocs(orderItemsRef)
    const orderItemsData = orderItems.docs.map((doc) => doc.data())
    console.log(orderItemsData)

    const orderRef = doc(db, "orders", `${params?.id}`)
    const order = await getDoc(orderRef)
    const orderData = order.data()
    console.log(orderData?.date)

    return {
        props: {
            orderItemsData,
            id: params?.id,
            date: orderData?.date,
        },
    }
}
