import React from "react";
import Axios from "axios";
import { Card } from 'antd';
import SellerCard from "@/components/SellerCard";
import Kraft from "@/components/Kraft";

const { Meta } = Card;

export default function Krafteri(){

    const [posts, fetchPosts] = React.useState(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [refetcherPosts, setRefetcherPosts] = React.useState(false)

const fetchPostsFunc = async () => {
    try {
    setIsLoading(true)
    await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/posts/get`, {
        withCredentials: false,
        headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
        fetchPosts(res.data);
        setIsLoading(false)
        });
    } catch (error) {
        console.log(error.message);
    }
}

    React.useEffect(() => {
        fetchPostsFunc()
    }, [refetcherPosts]);
console.log(posts)
    return(
        <div className="seller-options-wrapper">
            <div className="container">
                <div className="products">
                    {

                        !isLoading && posts &&
                posts?.map((post) => (
                    <Kraft data={post}/>
                ))
            }

                </div>
            

        </div>

        </div>
        
    )
}