import React from 'react';
import styles from './Signature.css';
import { connect } from 'dva';
import {Form, Input,Icon, Button, message,Col,Row,Modal } from 'antd';
const FormItem = Form.Item;




class Signature extends React.Component{
  constructor(props){
    super(props)
    this.state={
      signatureModal:false,
      signatureLoading:false
    }
  }

  showSignature=()=>{
    this.setState({
      signatureModal: true,
    });
  }
  handleSignatureOk=()=>{
    let signaturePwd=this.props.form.getFieldsValue(['signaturePwd']);
    if(signaturePwd.signaturePwd==undefined||signaturePwd.signaturePwd==null||signaturePwd.signaturePwd==''){
      this.props.form.setFields({
        signaturePwd: {
          errors: [new Error('请输入签名密码')],
        },
      });
    }else{
      signaturePwd.uNum=this.props.login.account.uNum;
      this.props.dispatch({ type: 'approvalMatters/getSignature', payload: signaturePwd });
      this.setState({ signatureLoading: true });
      setTimeout(() => {
        this.setState({ signatureLoading: false, signatureModal: false });
      }, 2000);
    }
   
  }
  handleSignatureCancel=()=>{
    this.setState({ signatureModal: false });
  }


  componentWillReceiveProps(nextProps){
    
    if(this.props.approvalMatters.signatureUrl==null&&nextProps.approvalMatters.signatureUrl!=null){
      console.log(nextProps);
      this.props.form.setFieldsValue({'signature':nextProps.approvalMatters.signatureUrl})
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    return(
     <div className={styles.normal}>
       <FormItem>
       {getFieldDecorator('signature', {
                        rules: [{ required: true, message: '请签名' }],
                        initialValue:this.props.approvalMatters.signatureUrl
                      })(
                        <Input style={{ display: 'none'}}  ></Input> 
                        
                      )}
                      {
                            !this.props.approvalMatters.signatureUrl&&
                            <Button type="primary" onClick={this.showSignature.bind(this)}>签名</Button>
                          }
                          {
                            this.props.approvalMatters.signatureUrl&&
                            <img src={this.props.approvalMatters.signatureUrl} />
                          }
                      </FormItem>              

       {/* 签名密码弹出框 */}
       <Modal
                    visible={this.state.signatureModal}
                    title="请输入签名密码"
                    onOk={this.handleSignatureOk}
                    onCancel={this.handleSignatureCancel}
                    footer={[
                      <Button key="submit" type="primary" size="large" loading={this.state.signatureLoading} onClick={this.handleSignatureOk.bind(this)}>
                        确定
                      </Button>,
                    ]}
                  >
                  <FormItem required={true}>
                     {getFieldDecorator('signaturePwd', {})(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入签名密码" />
                      )}
                  </FormItem>
                  </Modal>                       
    </div>
    )
  }
}

function mapStateToProps({matterTLeave,login,approvalMatters}) {
  return {matterTLeave,login,approvalMatters};
}

export default connect(mapStateToProps)(Signature);
