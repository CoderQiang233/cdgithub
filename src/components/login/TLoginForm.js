import React from 'react';
import styles from './TLoginForm.less';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class TLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名（请输入本人网络工号）" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码（初始密码为身份证后六位）" />
          )}
        </FormItem>
        <FormItem>
          <div style={{overflow:'hidden'}}>
          <a className="login-form-forgot" href="">忘记密码？</a>
          </div>
          <div style={{textAlign:'center'}}>
          <Button type="primary" htmlType="submit" className="login-form-button submitBtn">
            登录
          </Button>
          </div>
          
        </FormItem>
        <div>
          <span className={styles.tips}>登录提示：</span>账号为本人的网络工号，密码与科研管理平台为同一密码。
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(TLoginForm);

export default WrappedNormalLoginForm;
