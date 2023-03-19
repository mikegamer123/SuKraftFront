import ProductCard from "../../components/ProductCard";
import React from "react";
import {uploadImage} from "../../hooks/uploadImage"
import { Table } from "antd";
import { 
    Button, 
    Modal, 
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect, 
    notification
} from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import ProductModal from "@/components/ProductModal";
import Axios from "axios";
import { useRouter } from 'next/router';


export default function sellerDashboard () {

  const router = useRouter()
    const [pageContent, setPageContent] = React.useState('products')
    const [open, setOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('')
    const [products, fetchProducts] = React.useState(undefined)
    const [orders, fetchOrders] = React.useState(undefined)
    const [categories, fetchCategories] = React.useState(undefined)
    const [isLoading, setIsLoading] = React.useState(false)
    const [refetcherProducts, setRefetcherProducts] = React.useState(false)
    const [refetcherOrders, setRefetcherOrders] = React.useState(false)
    const [refetcherCategories, setRefetcherCategories] = React.useState(false)
    const [activeProduct, setActiveProduct] = React.useState(null)


    console.log('categories: ', categories)



    // https://270e-109-92-139-170.eu.ngrok.io/api/media/products/${props.data.product.id}
      const onEditHandler = async (values) => {
    //ovde radis edit
    try {
        console.log('values: ', values)
      await Axios.post(
        `https://270e-109-92-139-170.eu.ngrok.io/api/products/put/${values.id}`,
        { ...values,
        categories: [values.categories] },
        { withCredentials: false, headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` } },
      );
      if(values.productImage !== undefined){
        await uploadImage(values.id, values.productImage.fileList[0].originFileObj)
      }
        	
      setRefetcherProducts(r => !r);
      notification.success({
        message: 'Podaci su ažurirani.',
        placement: 'bottomRight',
      });
    } catch (err) {
        console.log(err)
      notification.error({
        message: 'Problem sa ažuriranjem podataka, molimo pokušajte ponovo.',
        placement: 'bottomRight',
      });
    }
  };

     const post = async (values) => {
    //ovde radis edit
    try {
      await Axios.post(
        `https://270e-109-92-139-170.eu.ngrok.io/api/products/create`,
        { ...values,
            categories: [values.categories]
         },
        { withCredentials: false, headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` } },
        
      ).then(async function (response){
        console.log(response)
        if(values.productImage !== undefined){
        await uploadImage(response.data.id, values.productImage.fileList[0].originFileObj)
      }
        	
      }
      );
      setOpen(false)
      setRefetcherProducts(r => !r);
      notification.success({
        message: 'Podaci su ažurirani.',
        placement: 'bottomRight',
      });
    } catch (err) {
      notification.error({
        message: 'Problem sa dodavanjem proizvoda. Pokušajte ponovo',
        placement: 'bottomRight',
      });
    }
  };


    
    function onFinish(values, isNew){
        console.log('values:', values)
        if(!isNew){
            onEditHandler(values)
        }else{
            post(values)
        }
    }

      const fetchProductsFunc = async () => {
    try {
      setIsLoading(true)
      await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/products/getBySeller/${JSON.parse(localStorage.getItem("user")).seller.id}`, {
          withCredentials: false,
          headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
          fetchProducts(res.data);
          setIsLoading(false)
        });
      } catch (error) {
        console.log(error.message);
      }
  }
        const fetchCategoriesFunc = async () => {
    try {
      setIsLoading(true)
      await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/categories/getByType?type=product`, {
          withCredentials: false,
          headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
          fetchCategories(res.data);
          setIsLoading(false)
        });
      } catch (error) {
        console.log(error.message);
      }
  }
console.log(products)
 const handleClickProduct = (data) => {
    setActiveProduct(data)
    console.log(data)
 }
    const fetchOrdersFunc = async () => {
    try {
      setIsLoading(true)
      await Axios.get(`https://270e-109-92-139-170.eu.ngrok.io/api/sellers/orders/${JSON.parse(localStorage.getItem("user")).seller.id}`, {
          withCredentials: false,
          headers: { Authorization: `Bearer 2|SgEJgYb6RWWu4OCjzKDDZjzbVkdorzdwbvxdmIsr` },
        }).then((res) => {
          fetchOrders(res.data);
          setIsLoading(false)
        });
      } catch (error) {
        console.log(error.message);
      }
  }
  
    React.useEffect(() => {
        fetchProductsFunc()
    }, [refetcherProducts]);

        React.useEffect(() => {
        fetchOrdersFunc()
    }, [refetcherOrders]);

     React.useEffect(() => {
        fetchCategoriesFunc()
    }, [refetcherCategories]);




    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName"
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Products",
            dataIndex: "products",
            render: (products) => {
                return(
                    products.map((product, idx) => (<p key={idx}>{product.name}</p>))
                )
            }
            
        },
        {
            title: "Prices",
            dataIndex: "products",
            render: (products) => {
                return(
                    products.map((product, idx) => (<p key={idx}>{product.price}</p>))
                )
            }
            
        },
        {
            title: "Quantity",
            dataIndex: "products",
            render: (products) => {
                return(
                    products.map((product, idx) => (<p key={idx}>{product.count}</p>))
                )
            }
            
        },
        {
            title: "Total",
            dataIndex: "products",
            render: (products) => {
                return(
                    products.map((product, idx) => (<p key={idx}>{(Math.round(product.count * product.price * 100) / 100).toFixed(2)}</p>))
                )
            }
        },
    ]

    console.log('orders: ', orders)

    return(
        <section className="seller-info">
            
        
            <div className="seller-options-wrapper">
                <div className="container">
                    <ul className="seller-options">
                        <Button onClick={() => {
                            setOpen(true)
                            setModalType('add')
                            }}><li>Dodaj proizvod</li>
                        </Button>
                        <li onClick={() => {
                            setPageContent('products')
                        }
                            
                            }>Svi proizvodi</li>
                        <li onClick={() => {
                            setPageContent('orders')
                        }
                            }>Porudžbine</li>
                    </ul>
                </div>
            </div>

            <ProductModal categories={categories} onFinish={onFinish} setActiveProduct={setActiveProduct} data={activeProduct} modalType={modalType} open={open} setOpen={setOpen} />

            <div className={`seller-content-wrapper ${pageContent === 'orders' ? 'hidden' : ''}`}>
                <div className="container">

                    <div className="seller-content">

                        <div className='products'>

                            {
                                isLoading && pageContent==='products' && <LoadingOutlined style={{maxWidth: '50px', margin: '0 auto', textAlign: 'center'}}/>
                            }
 
                            {
                                !isLoading && pageContent === 'products' && 
                                (products?.map(product => (
                                    <ProductCard  key={product.id} setActiveProduct={setActiveProduct} data={product} setModalType={setModalType} setOpen={setOpen} />
                                )))
                                

                            }

                        </div>

                        <div className={`orders`}>

                            {
                                isLoading && pageContent==='orders' && <LoadingOutlined />
                            }
                            

                            {
                                !isLoading && pageContent === 'orders' &&  <Table dataSource={orders} columns={columns} /> 

                            }
                            
                        </div>

                    </div>

                </div>
            </div>
                

        </section>
        
        
    )
}