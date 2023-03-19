import {EditOutlined} from '@ant-design/icons';

export default function ProductCard(props){
   
    return (
        <div className="product-card">
            <img src={"https://270e-109-92-139-170.eu.ngrok.io/" + props.data.imageSeller?.srcUrl} alt="" />
            <h4>{props.data.seller.name}</h4>
            <p>{props.data.seller.phoneNo}</p>
            <p>{props.data.seller.description}</p>
            
        </div>
    )
}