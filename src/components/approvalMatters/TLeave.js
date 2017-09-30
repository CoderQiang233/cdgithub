import React from 'react';
import styles from './TLeave.less';
import { connect } from 'dva';
import { Breadcrumb, Icon ,Radio,Form, Input, Button, message,Col,Row,Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



class TLeave extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false,
      confirmLoading: false,
      previewImage:'',
      previewVisible:false,
      signatureModal:false,
      signatureLoading:false
    }
  }

  cancel=()=>{
    hashHistory.goBack();
  }


  componentWillMount(){
    let data={};
    const id=this.props.matterId;
    data['id']=id;
    this.props.dispatch({ type: 'matterTLeave/getMatter', payload: data })
  }

  componentDidMount(){
    
  }

// 打开审批意见Modal
  showModal=()=>{
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
        console.log('Received values of form: ', values);
        values['matterId']=this.props.matterId;
        values['uNum']=this.props.login.account.uNum;
        values['taskId']=this.props.taskId;
        values['level']=this.props.level;
        console.log(values)
        this.props.dispatch({ type: 'matterTLeave/approvalMatter', payload: values })
      }
    });

    
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

// 打开图片Modal
  showImg=(url)=>{
    console.log(url)
    this.setState({
      previewImage: url,
      previewVisible: true,
    });
  }
  handleImgCancel = () => {
    this.setState({
      previewVisible: false,
    });
  }

  // 签名
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

  render(){
    const {matterTLeave}=this.props;

    const {opinion,tableData}=matterTLeave;
    
       let opinionTr=[];
    
       let cont=opinion.length;
    
    
    for(let i=0;i<cont;i++){
        console.log(opinion[i])
        if(i==0){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>单位意见</td>
                <td colSpan='3'>
                    <div className={styles.opinion}>
                    <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                     <Radio value={'同意'}>同意</Radio>
                     <Radio value={'不同意'}>不同意</Radio>
                     </RadioGroup>
                    <p>{opinion[i]['opinionText']}</p>
                    </div>
                </td>
              </tr>)
        }
        else if(i==1){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>人事处意见</td>
                <td colSpan='3'>
                    <div className={styles.opinion}>
                    <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                     <Radio value={'同意'}>同意</Radio>
                     <Radio value={'不同意'}>不同意</Radio>
                     </RadioGroup>
                    <p>{opinion[i]['opinionText']}</p>
                    </div>
                </td>
              </tr>)
        }
        else if(i==2){
            opinionTr.push(<tr key={i}>
                <td className={styles.tdTitle}>分管校领导意见</td>
                <td colSpan='3'>
                    <div className={styles.opinion}>
                    <RadioGroup disabled={true} defaultValue={opinion[i]['opinion']}>
                     <Radio value={'同意'}>同意</Radio>
                     <Radio value={'不同意'}>不同意</Radio>
                     </RadioGroup>
                    <p>{opinion[i]['opinionText']}</p>
                    </div>
                </td>
              </tr>)
        }
    }
    let files=[];
    if(tableData.file){
      // console.log(tableData.file)
      let filesArr=tableData.file.split(",");
      
      
          for(let i=0;i<filesArr.length;i++){
            files.push(
                <div key={i} className='ant-upload-list-item ant-upload-list-item-done'  onClick={this.showImg.bind(this,filesArr[i])}>
                  <div className='ant-upload-list-item-info'>
                  <span>
                    <a className='ant-upload-list-item-thumbnail' >
                      <img src={filesArr[i]}/>
                    </a>
                  </span>
                  </div>
                  
                </div>
            )
          }
    }
   


    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;
    // const{tableData,opinion}=this.props.matterTLeave.matterTLeave
    return(
    <div className={styles.normal}>
      <h1 className={styles.title}>
                教职工请假条
      </h1>
      <table className={styles.table}>
      <tbody>
                     <tr>
                       <td className={styles.tdTitle}>部门</td>
                       <td>{tableData.department}</td> 
                       <td className={styles.tdTitle}>姓名</td>
                       <td>{tableData.uName}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>请假原因</td>
                       <td colSpan='3'>{tableData.reason}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>起</td>
                       <td>{tableData.dateStart}</td>
                       <td rowSpan='2' className={styles.tdTitle}>请假天数</td>
                       <td rowSpan='2'>{tableData.dateDays}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>止</td>
                       <td>{tableData.dateEnd}</td>
                     </tr>
                     <tr>
                       <td className={styles.tdTitle}>请假证明</td>
                       <td colSpan='3'>
                         <div className='ant-upload-list ant-upload-list-picture-card'>
                         {files}
                         </div>
                       </td>
                     </tr>
                     {opinionTr}
                   </tbody>
              </table> 

                    <Row>
                    <Col span={6} offset={8}>
                    <FormItem>
                    <Button type="primary" onClick={this.showModal}>审批</Button>
                    </FormItem>
                    </Col>
                    <Col span={3}>
                    <FormItem>
                    <Button type="primary" onClick={this.cancel}>取消</Button>
                    </FormItem>
                    </Col>
                  </Row>


                  {/* 审批弹出框 */}
                  <Modal title="审批"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                  >
                  <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                      {getFieldDecorator('opinion',{
                          rules: [{ required: true, message: '请选择意见' }],
                        })(
                        <RadioGroup>
                          <Radio value="同意" checked={true} >同意</Radio>
                          <Radio value="不同意">不同意</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem>
                       {getFieldDecorator('opinionText', {
                          rules: [{ required: true, message: '请输入审批意见' }],
                        })(
                          <TextArea placeholder="请输入审批意见" rows={3} />
                         )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('signature', {
                        rules: [{ required: true, message: '请签名' }],
                        initialValue:this.props.approvalMatters.signatureUrl
                      })(
                        <div>
                          {
                            !this.props.approvalMatters.signatureUrl&&
                            <Button type="primary" onClick={this.showSignature.bind(this)}>签名</Button>
                          }
                          {
                            this.props.approvalMatters.signatureUrl&&
                            <img src={this.props.approvalMatters.signatureUrl} />
                          }
                          <Input style={{ display: 'none'}} defaultValue={this.props.approvalMatters.signatureUrl}></Input>
                        </div>
                        
                      )}
                    </FormItem>
                   </Form> 
                  </Modal>
                  {/* 证明文件弹出框 */}
                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleImgCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                  </Modal>


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
const TLeaveForm = Form.create()(TLeave);
export default connect(mapStateToProps)(TLeaveForm);
