import React from 'react';
import {connect} from 'dva';
import styles from './SLoginForm.less';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class SLoginForm extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);


        this.props.dispatch(
          { type: 'login/slogin', payload: values }
        )
      }
    });
    
  }
  
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('uNum', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名（请输入本人学生证号）" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('uPwd', {
            rules: [{ required: true, message: '请输入密码!' }],
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
          <span className={styles.tips}>登录提示：</span>在校学生登录，账号为自己的学生证号，密码与教务管理系统或研究生管理系统的密码相同。
        </div>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SLoginForm);

function mapStateToProps(login) {
  return {login};
}

export default connect(mapStateToProps)(WrappedNormalLoginForm);