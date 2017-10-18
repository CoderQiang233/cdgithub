import React from 'react';
import {Row,div} from 'antd';
import {  Link } from 'react-router';
import styles from './TeacherItem.less';

function TeacherItem() {
  return (
    <div className={styles.normal}>
      <div>
          <Link to="matter/TLeave" >
            <img src={require('../../assets/images/jiaoshi/qjsxbl1.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>请假手续</small>
          </Link>
      </div>
      <div span={6}>
          <a href="#/matter/TCAccountCopy" >
            <img src={require('../../assets/images/jiaoshi/hkdy.png')}/>
            <span>
               <strong>教职工（子女）</strong>
            </span>
            <small>户口复印</small>
          </a>
      </div>
      <div span={6}>
          <a href="#/matter/TCAccountBorrow" >
            <img src={require('../../assets/images/jiaoshi/hkjy.png')}/>
            <span>
               <strong>教职工（子女）</strong>
            </span>
            <small>户口借用</small>
          </a>
      </div>
      <div span={6}>
          <a href="#/matter/TCIDCardReplaceRecruitment" >
            <img src={require('../../assets/images/jiaoshi/sfzhfds.png')}/>
            <span>
               <strong>教职工（子女）</strong>
            </span>
            <small>身份证换发、丢失补办</small>
          </a>
      </div>
      <div span={6}>
          <a href="#/matter/TPoliticalCensorship" >
            <img src={require('../../assets/images/jiaoshi/zhenshen.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>政审（无犯罪记录证明）</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/zzzm.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>在职证明办理</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/srzmfcg.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>收入证明（非出国）办理</small>
          </a>
      </div>
      <div span={6}>
          <a href="javascript" >
            <img src={require('../../assets/images/jiaoshi/gzzbl.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>工作证办理</small>
          </a>
      </div>
      <div span={6}>
          <a href="#/matter/TFurtherApproval" >
            <img src={require('../../assets/images/jiaoshi/gzzbl.png')}/>
            <span>
               <strong>教职工</strong>
            </span>
            <small>进修审批表</small>
          </a>
      </div>

    </div>
  );
}

export default TeacherItem;
