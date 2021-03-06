import React from 'react';
import { connect } from 'dva';
import {Layout,Row,Col,Tabs,Icon } from 'antd';
import { Router, Route, Link, hashHistory } from 'react-router';
import styles from './IndexPage.less';
import Mytab from '../components/Mytab';
import Home from './Home';

const {Header,Content,Footer} = Layout;

const TabPane = Tabs.TabPane;
const Panel = Mytab.Panel;


class IndexPage extends React.Component{


    constructor(props) {
      super(props);
    }


    componentWillMount(){
      this.props.dispatch({
        type: 'login/enterUser',
        payload: {}
    });
    
    }
  
    logout=()=>{
      this.props.dispatch({
        type: 'login/logout',
        payload: {}
    });
    }

  render(){


    return (
      <Layout id={styles.warper} >
        <div>
          <div className={styles.topbar}>
            <Row type='flex' justify='center'>
              <Col  style={{width:'1170px'}}>
               <span className={styles.date}>2017年8月15日  星期二  丁酉年闰六月廿四</span>
               <ul className={styles.tbr}>
                  <li>
                    <a href="javascript:;"><span>信息门户</span></a>
                  </li>
                  <li>
                    <a href="javascript:;"><span>教育网入口</span></a>
                  </li>
                  <li>
                    <a href="javascript:;"><span>联通入口</span></a>
                  </li>
                  <li>
                    <a href="javascript:;"><span>VPN专网</span></a>
                  </li>
               </ul>
              </Col>
            </Row>
          </div>
          <div className={styles.logo}>
            <Row type='flex' justify='center'>
              <Col style={{width:'1170px',height:'134px'}}>
               <img src={require('../assets/images/logo.png')} />
              </Col>
            </Row>
          </div>
        </div>
        <Content style={{backgroundColor:'#fff'}}>
            <div className={styles.tabs}>
               <div className={styles.tabwarp}>
                <Mytab >
                  <Panel key="1" tab="首页" path="/home" />
                  <Panel key="2" tab="服务中心" path="/service" />
                  <Panel key="3" tab="个人中心" path="/persion" />
                </Mytab>
                <div className={styles.loginBox}>
                  {
                    this.props.login.isLogin==true&&
                    <div className={styles.logout}><Icon style={{ fontSize: 20, color: '#0B70AA',marginRight:'5px' }} type="user" />
                    欢迎 {this.props.login.account.uName}  <a onClick={this.logout}>[退出]</a>
                    </div>
                  }
                  {
                    this.props.login.isLogin==false&&
                    <Link to='/login'  className={styles.loginBtn}><Icon style={{ fontSize: 20, color: '#0B70AA',marginRight:'5px' }} type="user" />用户登录</Link>
                  }
                  
                </div>
               </div>
            </div>
            <div className={styles.pageMain}>
                {this.props.children}

            </div>
        </Content>
        <Footer className={styles.footer}>

        </Footer>
      </Layout>
    );

  }

}

IndexPage.propTypes = {
};

function mapStateToProps({login}) {
  return {login};
}

export default connect(mapStateToProps)(IndexPage);
