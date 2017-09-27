import React from 'react';
import {  Icon } from 'antd';
import styles from './InfoList.less';



class InfoList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }


  render(){
    return(
      <div className={styles.normal}>
        <h1 className={styles.title}>通知公告</h1>
        <ul className={styles.infoList}>
          <li><Icon style={{ float: 'left',lineHeight:'30px' }} type="caret-right" /><span className={styles.text}>山西财经大学邮箱封禁列表山西财经大学邮箱封禁列表</span><span className={styles.time}>2017-07-20</span></li>
          <li><Icon style={{ float: 'left',lineHeight:'30px' }} type="caret-right" /><span className={styles.text}>山西财经大学邮箱封禁列表山西财经大学邮箱封禁列表</span><span className={styles.time}>2017-07-20</span></li>
          <li><Icon style={{ float: 'left',lineHeight:'30px' }} type="caret-right" /><span className={styles.text}>山西财经大学邮箱封禁列表山西财经大学邮箱封禁列表</span><span className={styles.time}>2017-07-20</span></li>
        </ul>
      </div>
    )
  }
}

export default InfoList;
