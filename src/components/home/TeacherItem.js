import React from 'react';
import {Row,div} from 'antd';
import styles from './TeacherItem.less';

function TeacherItem() {
  return (
    <div className={styles.normal}>
      <div >
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </a>
      </div>


    </div>
  );
}

export default TeacherItem;
