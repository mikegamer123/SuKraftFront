import {EditOutlined} from '@ant-design/icons';

export default function ProductCard(props){
   
    return (
        <div className="product-card">
            <EditOutlined onClick={() => {
                props.setActiveProduct(props.data)
                props.setModalType('edit')
                props.setOpen(true)
                }}/>
            <img src={"https://270e-109-92-139-170.eu.ngrok.io/" + props.data.image?.srcUrl} alt="" />
            <h4>{props.data.product.name}</h4>
            <p>{props.data.product.price} RSD</p>
            <p>{props.data.product.isAvailable ? "Na stanju" : "Nema na stanju"}</p>
            
        </div>
    )
}