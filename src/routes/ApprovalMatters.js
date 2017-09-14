import React from 'react';
import { connect } from 'dva';
import styles from './ApprovalMatters.less';

function ApprovalMatters() {
  return (
    <div className={styles.normal}>
      Route Component: ApprovalMatters
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(ApprovalMatters);
