import React from 'react';
import { connect } from 'dva';
import {Layout,Row,Col,Tabs } from 'antd';
import styles from './IndexPage.css';
import Mytab from '../components/Mytab';

const {Header,Content,Footer} = Layout;

const TabPane = Tabs.TabPane;
const Panel = Mytab.Panel;




function IndexPage() {
  return (
    <Layout id={styles.warper} >
      <Layout>
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
      </Layout>
      <Content style={{backgroundColor:'#fff'}}>
          <div className={styles.tabs}>
             <div className={styles.tabwarp}>
              <Mytab >
                <Panel tab="首页"/>
                <Panel tab="服务中心"/>
                <Panel tab="个人中心"/>
              </Mytab>
             </div>
          </div>
          <div>
            <Tabs defaultActiveKey="1" className={styles.mytabs}>
               <TabPane tab="Tab 1" key="1" >Content of Tab Pane 1</TabPane>
               <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
               <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
