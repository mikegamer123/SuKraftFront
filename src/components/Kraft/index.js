import {EditOutlined} from '@ant-design/icons';

export default function Kraft(props){


    return (
        <div className="product-card">
            {
                props.data.imagePost.type === 'video' ?
                <video controls width="100%" height={200}>
                    <source src={"https://270e-109-92-139-170.eu.ngrok.io/"+props.data.imagePost.srcUrl} type="video/mp4">
                    </source>
                </video>
                    : <img src={"https://270e-109-92-139-170.eu.ngrok.io/"+props.data.imagePost.srcUrl} alt="" />
            }
            <h4 style={{color: props.data.seller.brandColors}}>Krafter: {props.data.seller.name}</h4>

            <p>{props.data.post.description}</p>
            
        </div>
    )
}