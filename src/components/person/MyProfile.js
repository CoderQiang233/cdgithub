import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Radio,Select,DatePicker   } from 'antd';
const FormItem = Form.Item;
import styles from './MyProfile.less';


 

class MyProfile extends React.Component{
  constructor(props){
    super(props)
    this.state={}  
  }

  componentWillMount(){
    
  }


  render(){


    return(
      <div className={styles.profileContent}>
      <div className={styles.titleBar}>
        <h2 className={styles.title}>我的资料</h2>
      </div>
      <div className={styles.profileMain}>
         <WrappedProfileForm ></WrappedProfileForm>
      </div>
    </div>
    )
  }
}

const ProfileForm=(props)=>{

  const formItemLayout = {
    labelCol: {
      span:8
    },
    wrapperCol: {
      span:8
    },
  };

   return(
     <Form layout='horizontal'>
        <FormItem label='真实姓名' {...formItemLayout}>
           王强
        </FormItem>
        <FormItem label='性别' {...formItemLayout}>
        男
        </FormItem>
        <FormItem label='出生日期' {...formItemLayout}>
           <DatePicker  />
        </FormItem>
        <FormItem label='身份证号' {...formItemLayout}>
           <Input></Input>
        </FormItem>
        <FormItem label='手机号码' {...formItemLayout}>
           <Input></Input>
        </FormItem>
        <FormItem label='邮箱' {...formItemLayout}>
           <Input></Input>
        </FormItem>
        <FormItem label='地址' {...formItemLayout}>
           <Input></Input>
        </FormItem>
        <FormItem label='入学时间' {...formItemLayout}>
           2016年7月
        </FormItem>
        <FormItem wrapperCol={{span:4,offset:8}}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
     </Form>
   )

}
const WrappedProfileForm = Form.create()(ProfileForm);

function mapStateToProps({login}) {
  return {login};
}



export default connect(mapStateToProps)(MyProfile);
