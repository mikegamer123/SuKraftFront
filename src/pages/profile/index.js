import React from "react";
import Axios from "axios";
import { Card } from 'antd';
import SellerCard from "@/components/SellerCard";
import Kraft from "@/components/Kraft";

const { Meta } = Card;

export default function Krafteri(){

    const [profile, fetchProfile] = React.useState(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [refetcherProfile, setRefetcherProfile] = React.useState(false)

const fetchProfileFunc = async () => {
    try {
    setIsLoading(true)
    await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/sellers/get/${JSON.parse(localStorage.getItem("user")).seller.id}`, {
        withCredentials: false,
        headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
     
        fetchProfile(res.data);
        setIsLoading(false)
        });
    } catch (error) {
        console.log(error.message);
    }
}

    React.useEffect(() => {
        fetchProfileFunc()
    }, [refetcherProfile]);
console.log(profile)
    return(
        <div className="seller-options-wrapper">
            {!isLoading && profile && <div className="container">
            <div className="profile-editor">
                <div className="profile-content">

                    <div className="main-profile-info">

                        <div className="profile-img-container">
                            <img style={{maxWidth: 300, width: '100%', borderRight: '5px solid #dee2e6'}} src={"https://270e-109-92-139-170.eu.ngrok.io/" + profile.imageSeller.srcUrl} alt="" />
                            
                        </div>

                        <h2>{profile.user.firstName + " " + profile.user.lastName}</h2>

                    </div>
                    
                    <div className="side-profile-info">
                        <div className="text">
                            <p className="side-profile-info-text" style={{marginTop: '40px'}}><span className="font-bolder">Ime Brenda:</span> {profile.seller.name}</p>
                    <p className="side-profile-info-text"><span className="font-bolder">Opis brenda: </span> {profile.seller.description}</p>
                    <p className="side-profile-info-text"><span className="font-bolder">Broj telefona: </span> {profile.seller.phoneNo}</p>
                    <p className="side-profile-info-text"><span className="font-bolder">Username: </span>{profile.user.username}</p>

                        </div>
                        
                    <div className="profile-user-img">
                        <img style={{maxWidth: 300, width: "100%"}} src={`https://270e-109-92-139-170.eu.ngrok.io/${profile.imageUser.srcUrl}`} alt="" />
                    </div>
                    </div>
                    
                    
                    
                </div>

            </div>
  
</div>}
        </div>
        
    )
}