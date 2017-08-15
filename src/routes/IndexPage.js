import React from 'react';
import { connect } from 'dva';
import {Layout,Row,Col } from 'antd';
import styles from './IndexPage.css';

const {Header,Content,Footer} = Layout;




function IndexPage() {
  return (
    <Layout id={styles.warper} >
      <Layout>
        <div className={styles.topbar}>
          <Row type='flex' justify='center'>
            <Col  style={{width:'1170px'}}>
             <span className={styles.date}>2017年8月15日  星期二  丁酉年闰六月廿四</span>
            </Col>
          </Row>
        </div>
        <div className={styles.logo}>
          <Row type='flex' justify='center'>
            <Col style={{width:'1170px'}}>
             <img src={require('../assets/images/logo.png')} />
            </Col>
          </Row>
        </div>
      </Layout>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
