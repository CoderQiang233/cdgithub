import React from 'react';
import {connect} from 'dva';
import { Row, Col } from 'antd';
import classnames from 'classnames'
import styles from './Login.less';
import SLoginForm from '../components/login/SLoginForm';
import TLoginForm from '../components/login/TLoginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginForm:1
    };
  }

  chooseLogin=(value)=>{
    this.setState({loginForm:value});

    console.log(this.state.props)
  }


  render() {


    
    return ( 
      <div className = {styles.wrap} >
        <Row type="flex" justify="space-around" align="middle" >
        <Col span={10}>
         <div className={styles.loginBox}>
           <div className={styles.logo}>
             <img src={require('../assets/images/logo.png')}/>
           </div>
           <Row gutter={32}>
             <Col span={11}>
               <div className={styles.loginForm}>
                 <h1 className={styles.title}>统一身份验证</h1>
                 <Row>
                   <Col span={8}>
                     <a className={classnames(styles.chooseLogin,{[styles.active]:this.state.loginForm==1})} value='1' onClick={this.chooseLogin.bind(this,1)}>学生登录</a>
                   </Col>
                   <Col span={8}>
                     <a className={classnames(styles.chooseLogin,{[styles.active]:this.state.loginForm==2})} value='2' onClick={this.chooseLogin.bind(this,2)}>教师登录</a>
                   </Col>
                 </Row>
                 {
                   this.state.loginForm==1&&
                   <SLoginForm></SLoginForm>
                 }
                 {
                  this.state.loginForm==2&&
                   <TLoginForm></TLoginForm>
                 }
               </div>
             </Col>
             <Col span={13}>
               <div className={styles.infoBox}>
                 111111
               </div>
             </Col>
           </Row>
         </div>
        </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Login);
