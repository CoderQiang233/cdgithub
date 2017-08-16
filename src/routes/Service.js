import React from 'react';
import { connect } from 'dva';
import styles from './Service.css';

function Service() {
  return (
    <div className={styles.normal}>
      Route Component: Service
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Service);
