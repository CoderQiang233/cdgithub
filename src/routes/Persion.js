import React from 'react';
import { connect } from 'dva';
import styles from './Persion.css';

function Persion() {
  return (
    <div className={styles.normal}>
      Route Component: Persion
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Persion);
