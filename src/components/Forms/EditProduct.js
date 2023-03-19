import React from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';


const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default function EditProduct(props){

    const [form] = Form.useForm();
    function onFinishFailed(){
        console.log('error')
    }




      const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
        setLoading(true);
        return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        }
    };

    const uploadButton = (
        <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };




    return(
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={(values) => props.onFinish(values, false)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={props.data.product}
        >
            <Form.Item hidden name={'id'}></Form.Item>
            <Form.Item name={'productImage'} label="Slika proizvoda:"  value={props.data.image.srcUrl}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
   
                >
                    {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                        width: '100%',
                        }}
                    />
                    ) : (
                    uploadButton
                    )}

                </Upload>
              </Form.Item>
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your product name!' }]}
            
            
            >
            <Input  />
            </Form.Item>
            <Form.Item label="Opis" name="description" required>
                <TextArea  placeholder="Maksimum 100 slova" maxLength={100}/>
            </Form.Item>

            <Form.Item
            label="Cena: "
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
            >
            <InputNumber min={1}  defaultValue={100}  />
            </Form.Item>


            <Form.Item name='isAvailable' label="Na stanju:" rules={[{ required: true, message: 'Please upload an image!' }]}>
                <Checkbox checked={props.data.product.isAvailable}>Checkbox</Checkbox>
            </Form.Item>

            <Form.Item name={'categories'} label="Kategorije: ">
                <Select
                    style={{width: '100%'}}
                    placeholder="select one country"
                    defaultValue={undefined}
                    optionLabelProp="label"
                >
                    {
                        props.categories.map(category => <Option value={category.id}>{category.name}</Option>)
                    }

                </Select>
            </Form.Item>

              

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Button type="secondary" htmlType="reset">
                Reset
            </Button>
            </Form.Item>

        </Form>
    )
}