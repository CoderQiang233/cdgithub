import React from 'react';
import styles from './matter.less';
import { connect } from 'dva';
import { Breadcrumb, Icon, Radio, Form, Input, Button, message, Col, Row, Modal } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import Signature from './Signature.js';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SDoctoralDelayed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      confirmLoading: false,
      previewImage: '',
      previewVisible: false,
    }
  }

  cancel = () => {
    hashHistory.goBack();
  }

  componentWillMount() {
    let data = {};
    const id = this.props.matterId;
    data['id'] = id;
    this.props.dispatch({ type: 'matterSDoctoralDelayed/getMatter', payload: data })
  }

  // 打开审批意见Modal
  showModal = () => {
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
        values['matterId'] = this.props.matterId;
        values['uNum'] = this.props.login.account.uNum;
        values['taskId'] = this.props.taskId;
        values['level'] = this.props.level;
        this.props.dispatch({ type: 'matterSDoctoralDelayed/approvalMatter', payload: values })
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
  showImg = (url) => {
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


  // 事项完成
  matterComplete=()=>{
    let data={};
    data['taskId'] = this.props.taskId;
    data['uNum'] = this.props.login.account.uNum;
    this.props.dispatch(
      { type: 'matterSDoctoralDelayed/doneMatter', payload: data }
    )
  }


  render() {
    const { matterSDoctoralDelayed } = this.props;

    const { opinion, tableData } = matterSDoctoralDelayed;

    let opinionTr = [];

    let cont = opinion.length;

    let level = null;





    for (let i = 0; i < cont; i++) {
      level = opinion[i]['level']
      if (level == 1) {
        opinionTr.push(<tr key={i}>
          <td className={styles.tdTitle}>任课教师意见</td>
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
      else if (level == 2) {
        opinionTr.push(<tr key={i}>
          <td className={styles.tdTitle}>研究生学院意见</td>
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
      else if (level == 3) {
        opinionTr.push(<tr key={i}>
          <td className={styles.tdTitle}>教学运行科意见</td>
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




    let files = [];
    if (tableData.file) {
      let filesArr = tableData.file.split(",");


      for (let i = 0; i < filesArr.length; i++) {
        files.push(
          <div key={i} className='ant-upload-list-item ant-upload-list-item-done' onClick={this.showImg.bind(this, filesArr[i])}>
            <div className='ant-upload-list-item-info'>
              <span>
                <a className='ant-upload-list-item-thumbnail' >
                  <img src={filesArr[i]} />
                </a>
              </span>
            </div>

          </div>
        )
      }



    }



    const { visible, confirmLoading } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>
          博士研究生缓考
      </h1>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.tdTitle}>学号</td>
              <td>{tableData.uNum}</td>
              <td className={styles.tdTitle}>姓名</td>
              <td>{tableData.uName}</td>
            </tr>

            <tr>
              <td className={styles.tdTitle}>专业</td>
              <td>
                {tableData.major}
              </td>
              <td className={styles.tdTitle}>缓考课程名称</td>
              <td>
                {tableData.course}

              </td>
             
            </tr>
            <tr>
              <td className={styles.tdTitle}>申请原因</td>
              <td colSpan='3'>{tableData.reasons}</td>
            </tr>


            <tr>
              <td className={styles.tdTitle}>相关证明</td>
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
            
            {
              this.props.level == 1 &&
              <FormItem>
                <Button type="primary" onClick={this.showModal}>审批</Button>
              </FormItem>
            }
            {
              this.props.level == 2 &&
              <FormItem>
                <Button type="primary" onClick={this.showModal}>审批</Button>
              </FormItem>
            }
            {
              this.props.level == 3 &&
              <FormItem>
                <Button type="primary" onClick={this.matterComplete.bind(this)}>完成</Button>
              </FormItem>
            }

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
          onSubmit={this.handleSubmit}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('opinion', {
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

            <Signature form={this.props.form}></Signature>


          </Form>
        </Modal>



        {/* 证明文件弹出框 */}
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleImgCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>



      </div>

    )
  }
}

function mapStateToProps({ matterSDoctoralDelayed, login, approvalMatters }) {
  return { matterSDoctoralDelayed, login, approvalMatters };
}
const SDoctoralDelayedForm = Form.create()(SDoctoralDelayed);
export default connect(mapStateToProps)(SDoctoralDelayedForm);
