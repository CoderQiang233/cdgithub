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
        console.log('Received values of form: ', values);
        values['matterId']=this.props.matterId;
        values['uNum']=this.props.login.account.uNum;
        values['taskId']=this.props.taskId;
        this.props.dispatch({ type: 'matterTLeave/approvalMatter', payload: values })
      }
    });

    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
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
      console.log(tableData.file)
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



                  <Modal title="审批"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                  >
                  <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                      {getFieldDecorator('opinion')(
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
                   </Form> 
                  </Modal>

                  <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleImgCancel}>
                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                  </Modal>        
    </div>
    )
  }
}

function mapStateToProps({matterTLeave,login}) {
  return {matterTLeave,login};
}
const TLeaveForm = Form.create()(TLeave);
export default connect(mapStateToProps)(TLeaveForm);
