import React from 'react';
import { connect } from 'dva';
import styles from './Service.css';

function Service() {
  return (
    <div className={styles.normal}>
      <a href="#/home">首页</a>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Service);
