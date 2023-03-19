import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import { Form, Input, Button, notification } from 'antd';
import Axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

const router = useRouter();


if(Cookies.get("user")){
  router.push("/seller-dashboard")
}

         const post = async (values) => {
          try {
            await Axios.post(
              `https://270e-109-92-139-170.eu.ngrok.io/api/login`,
              { ...values },
              { withCredentials: false },
              
            ).then( async function (response){
              Cookies.set('user',JSON.stringify(response.data.seller) , { expires: 7, path: '/' });
              localStorage.setItem("user",JSON.stringify(response.data))
              console.log(response.data)
            })
                
            notification.success({
              message: 'Uspesno ste se prijavili.',
              placement: 'bottomRight',
            });

            
            location.reload(true)

            
          } catch (err) {
            notification.error({
              message: 'Problem sa logovanjem. Pokušajte ponovo',
              placement: 'bottomRight',
            });
          }
        };


  function handleSubmit(values){

    post(values)
   
  }

  function onFinishFailed(){
        console.log('error')
    }



  return (
    <>
      <div className='login-bg'>
        <div className="container">
        <div className="login-card">
          
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              onFinish={(values) => handleSubmit(values)}
              onFinishFailed={onFinishFailed}
              autoComplete="off"

            >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="secondary" htmlType="reset">
                Reset
              </Button>
            </Form.Item>
          </Form>

          </div>
          
        </div>
      </div>
    </>
  )
}
