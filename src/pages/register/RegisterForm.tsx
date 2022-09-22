import React from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './RegisterForm.module.css'
import axios from "axios";
import { useHistory } from "react-router-dom";


export const RegisterForm: React.FC = () => {
const history = useHistory()
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    // 请求成功，状态码是 204 no content
    try {
      // await axios.post('http://123.56.149.216:8080/auth/register',{
      //   email: values.username,
      //   password: values.password,
      //   confirmPassword: values.confirm
      // })
      history.push('/signIn')
    } catch (error) {
      alert('注册失败')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    className={styles['register-form']}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Confirm Password"
      name="confirm"
      hasFeedback
      rules={[{ required: true, message: 'Please input your confirm password!' },
      (({getFieldValue}) => ({
        validator(_,value) {
          if(!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject('The two passwords that you entered do not match!')
        }
      }))
    ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}