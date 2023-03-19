import React from "react";
import { Modal } from "antd";

import EditProduct from "../Forms/EditProduct";
import AddProduct from "../Forms/AddProduct";

export default function ProductModal(props){


    return (
        
        <div>
            {
                props.modalType === 'edit' 
                ?<Modal
                    title={'Edit product'}
                    centered
                    open={props.open}
                    onOk={() => props.setOpen(false)}
                    onCancel={() => {
                        props.setOpen(false)
                        props.setActiveProduct(null)
                    }}
                    footer={null}
                    width={600}
                >
                    <EditProduct categories={props.categories} data={props.data} onFinish={props.onFinish} />

                </Modal>

                : <Modal
                    title={'Add Product'}
                    centered
                    open={props.open}
                    onOk={() => props.setOpen(false)}
                    onCancel={() => {
                        props.setOpen(false)
                        props.setActiveProduct(null)
                    }}
                    width={600}
                    footer={null}
                >
  
                    <AddProduct categories={props.categories}  onFinish={props.onFinish} />
                    
                </Modal>



            }
            
        </div>
    )
}