/* eslint-disable jsx-a11y/alt-text */
import {
    Document,
    Page,
    View,
    Text,
    Image,
    PDFViewer,
    StyleSheet,
    Font,
} from "@react-pdf/renderer"
import Head from "next/head"
import { useState, useEffect } from "react"

Font.register({
    family: "Inter",
    fonts: [
        {
            src: "/fonts/Inter-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "/fonts/Inter-Medium.ttf",
            fontWeight: 500,
        },
        {
            src: "/fonts/Inter-SemiBold.ttf",
            fontWeight: 600,
        },
        {
            src: "/fonts/Inter-Bold.ttf",
            fontWeight: 700,
        },
    ],
})

interface Props {
    id: string
    orderItemsData: any[]
    date: string
    rdOnly?: boolean
}

const styles = StyleSheet.create({
    body: {
        padding: 20,
        fontFamily: "Inter",
    },
})

const PDF = ({ id, orderItemsData, date, rdOnly }: Props) => {
    const [omProduce, setOmProduce] = useState<any[]>([])
    const [indiangrocery, setIndiangrocery] = useState<any[]>([])
    const [meat, setMeat] = useState<any[]>([])
    const [restaurantdepot, setRestaurantdepot] = useState<any[]>([])
    const [samsclub, setSamsclub] = useState<any[]>([])

    useEffect(() => {
        if(rdOnly){
             orderItemsData.map((item) => {
                 //remove all the items after the "(" and before the ")"
                 if (item !== undefined) {
                     const splitItem = item?.name.split("(")
                     const splitItem2 = splitItem[1].split(")")
                     const restaurantdepot = splitItem2[0]
                     if (restaurantdepot === "restaurantdepot") {
                         var itemName = item.name
                         var index = itemName.indexOf(" (")
                         if (index > -1) {
                             itemName = itemName.substring(0, index)
                         }
                         //if not undefined, return the item

                         setRestaurantdepot((prev) => [
                             ...prev,
                             {
                                 name: itemName,
                                 quantity: item.quantity,
                                 price: item.price,
                                 measurement: item.measurement,
                             },
                         ])
                     }
                 }
             })
        }else{
            //split the items after the "(" and before the ")"
            orderItemsData.map((item) => {
                //remove all the items after the "(" and before the ")"
                if (item !== undefined) {
                    const splitItem = item?.name.split("(")
                    const splitItem2 = splitItem[1].split(")")
                    const omProduce = splitItem2[0]
                    if (omProduce === "omproduce") {
                        var itemName = item.name
                        var index = itemName.indexOf(" (")
                        if (index > -1) {
                            itemName = itemName.substring(0, index)
                        }
                        //if not undefined, return the item

                        setOmProduce((prev) => [
                            ...prev,
                            {
                                name: itemName,
                                quantity: item.quantity,
                                price: item.price,
                                measurement: item.measurement,
                            },
                        ])
                    }
                }
            })

            orderItemsData.map((item) => {
                //remove all the items after the "(" and before the ")"
                if (item !== undefined) {
                    const splitItem = item?.name.split("(")
                    const splitItem2 = splitItem[1].split(")")
                    const indiangrocery = splitItem2[0]
                    if (indiangrocery === "indiangrocery") {
                        var itemName = item.name
                        var index = itemName.indexOf(" (")
                        if (index > -1) {
                            itemName = itemName.substring(0, index)
                        }
                        //if not undefined, return the item

                        setIndiangrocery((prev) => [
                            ...prev,
                            {
                                name: itemName,
                                quantity: item.quantity,
                                price: item.price,
                                measurement: item.measurement,
                            },
                        ])
                    }
                }
            })

            orderItemsData.map((item) => {
                //remove all the items after the "(" and before the ")"
                if (item !== undefined) {
                    const splitItem = item?.name.split("(")
                    const splitItem2 = splitItem[1].split(")")
                    const meat = splitItem2[0]
                    if (meat === "meat") {
                        var itemName = item.name
                        var index = itemName.indexOf(" (")
                        if (index > -1) {
                            itemName = itemName.substring(0, index)
                        }
                        //if not undefined, return the item

                        setMeat((prev) => [
                            ...prev,
                            {
                                name: itemName,
                                quantity: item.quantity,
                                price: item.price,
                                measurement: item.measurement,
                            },
                        ])
                    }
                }
            })

            orderItemsData.map((item) => {
                //remove all the items after the "(" and before the ")"
                if (item !== undefined) {
                    const splitItem = item?.name.split("(")
                    const splitItem2 = splitItem[1].split(")")
                    const restaurantdepot = splitItem2[0]
                    if (restaurantdepot === "restaurantdepot") {
                        var itemName = item.name
                        var index = itemName.indexOf(" (")
                        if (index > -1) {
                            itemName = itemName.substring(0, index)
                        }
                        //if not undefined, return the item

                        setRestaurantdepot((prev) => [
                            ...prev,
                            {
                                name: itemName,
                                quantity: item.quantity,
                                price: item.price,
                                measurement: item.measurement,
                            },
                        ])
                    }
                }
            })

            orderItemsData.map((item) => {
                //remove all the items after the "(" and before the ")"
                if (item !== undefined) {
                    const splitItem = item?.name.split("(")
                    const splitItem2 = splitItem[1].split(")")
                    const samsclub = splitItem2[0]
                    if (samsclub === "sams") {
                        var itemName = item.name
                        var index = itemName.indexOf(" (")
                        if (index > -1) {
                            itemName = itemName.substring(0, index)
                        }
                        //if not undefined, return the item

                        setSamsclub((prev) => [
                            ...prev,
                            {
                                name: itemName,
                                quantity: item.quantity,
                                price: item.price,
                                measurement: item.measurement,
                            },
                        ])
                    }
                }
            })
        }
    }, [])

    return (
        <Document title={`Order ${id}`}>
            <Page style={styles.body}>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",

                            alignItems: "flex-end",
                        }}
                    >
                        <Image
                            src="/ISAppIcon.png"
                            style={{
                                width: 30,
                                height: 30,
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: "bold",
                                marginLeft: 10,
                            }}
                        >
                            Inventory Silo
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                marginTop: 10,

                                fontWeight: "semibold",
                            }}
                        >
                            Order ID: {id}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                marginTop: 10,

                                fontWeight: "semibold",
                            }}
                        >
                            Date: {date}
                        </Text>
                    </View>

                    {omProduce[0] !== undefined && (
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "semibold",
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                OM Produce
                            </Text>
                            {omProduce?.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            border: "1px solid #000",
                                            fontSize: 10,
                                        }}
                                        key={index}
                                    >
                                        <View style={{}}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderLeft: "1px solid #000",

                                                width: "25%",
                                            }}
                                        >
                                            <Text>
                                                {item.quantity}{" "}
                                                {item.measurement}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </>
                    )}
                    {indiangrocery[0] !== undefined && (
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "semibold",
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Indian Grocery
                            </Text>
                            {indiangrocery?.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            border: "1px solid #000",
                                            fontSize: 10,
                                        }}
                                        key={index}
                                    >
                                        <View style={{}}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderLeft: "1px solid #000",

                                                width: "25%",
                                            }}
                                        >
                                            <Text>
                                                {item.quantity}{" "}
                                                {item.measurement}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </>
                    )}

                    {meat[0] !== undefined && (
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "semibold",
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Meat
                            </Text>
                            {meat?.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            border: "1px solid #000",
                                            fontSize: 10,
                                        }}
                                        key={index}
                                    >
                                        <View style={{}}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderLeft: "1px solid #000",

                                                width: "25%",
                                            }}
                                        >
                                            <Text>
                                                {item.quantity}{" "}
                                                {item.measurement}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </>
                    )}

                    {restaurantdepot[0] !== undefined && (
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "semibold",
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Restaurant Depot
                            </Text>
                            {restaurantdepot?.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            border: "1px solid #000",
                                            fontSize: 10,
                                        }}
                                        key={index}
                                    >
                                        <View style={{}}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderLeft: "1px solid #000",

                                                width: "25%",
                                            }}
                                        >
                                            <Text>
                                                {item.quantity}{" "}
                                                {item.measurement}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </>
                    )}

                    {samsclub[0] !== undefined && (
                        <>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: "semibold",
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                Sam&apos;s Club
                            </Text>
                            {samsclub?.map((item, index) => {
                                return (
                                    <View
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                            border: "1px solid #000",
                                            fontSize: 10,
                                        }}
                                        key={index}
                                    >
                                        <View style={{}}>
                                            <Text>{item.name}</Text>
                                        </View>
                                        <View
                                            style={{
                                                borderLeft: "1px solid #000",

                                                width: "25%",
                                            }}
                                        >
                                            <Text>
                                                {item.quantity}{" "}
                                                {item.measurement}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </>
                    )}
                </View>
            </Page>
        </Document>
    )
}

const PDFView = ({ id, orderItemsData, date, rdOnly }: Props) => {
    const [client, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])

    return (
        <PDFViewer style={{ height: "100vh", width: "100%" }}>
            <>
                <Head>
                    <title>Order {id} | Inventory Silo</title>
                </Head>
                <PDF
                    id={id}
                    orderItemsData={orderItemsData}
                    date={date}
                    rdOnly={rdOnly}
                />
            </>
        </PDFViewer>
    )
}
export default PDFView
