import React from "react";
import Axios from "axios";
import { Card } from 'antd';
import SellerCard from "@/components/SellerCard";

const { Meta } = Card;

export default function Krafteri(){

    const [sellers, fetchSellers] = React.useState(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [refetcherSellers, setRefetcherSellers] = React.useState(false)

const fetchSellersFunc = async () => {
    try {
    setIsLoading(true)
    await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/sellers/get`, {
        withCredentials: false,
        headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
        fetchSellers(res.data);
        setIsLoading(false)
        });
    } catch (error) {
        console.log(error.message);
    }
}

    React.useEffect(() => {
        fetchSellersFunc()
    }, [refetcherSellers]);
    console.log(sellers)
    return(
        <div className="seller-options-wrapper">
            <div className="container">
                <div className="products">
                    {
                sellers?.map((sellerInfo) => (
                    <SellerCard data={sellerInfo} />
                ))
            }

                </div>
            

        </div>

        </div>
        
    )
}