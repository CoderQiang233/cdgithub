import React from 'react';
import {Row,div} from 'antd';
import {  Link } from 'react-router';
import styles from './StudentItem.less';

function StudentItem() {
  return (
    <div className={styles.normal}>
      <div>
          <a href={"#/matter/SLostCard"} >
            <img src={require('../../assets/images/xuesheng/yjszdsbb.png')}/>
            <span>
               <strong>研究生证</strong>
            </span>
            <small>丢失补办</small>
          </a>
      </div>
      <div>
          <a href={"#/matter/SGraduationAccount"} >
            <img src={require('../../assets/images/xuesheng/byshkqy.png')}/>
            <span>
               <strong>毕业生</strong>
            </span>
            <small>户口迁移</small>
          </a>
      </div>
      <div>
          <a href={"#/matter/SIDCardReplacement"} >
            <img src={require('../../assets/images/xuesheng/byssfzhf.png')}/>
            <span>
               <strong>毕业生</strong>
            </span>
            <small>身份证换发、丢失补办</small>
          </a>
      </div>
      <div>
          <a href={"#/matter/SDropoutAccount"} >
            <img src={require('../../assets/images/xuesheng/txshkqy.png')}/>
            <span>
               <strong>退学学生</strong>
            </span>
            <small>户口迁移</small>
          </a>
      </div>
      <div>
          <a href={"#/matter/SSettleProcedures"} >
            <img src={require('../../assets/images/xuesheng/xslhsxbl.png')}/>
            <span>
               <strong>新生</strong>
            </span>
            <small>落户手续办理</small>
          </a>
      </div>
      <div>
          <a href={"#/matter/SAccountCopy"} >
            <img src={require('../../assets/images/xuesheng/xshkfy.png')}/>
            <span>
               <strong>学生</strong>
            </span>
            <small>户口复印</small>
          </a>
      </div>
      <div>
          <Link to="matter/SAccountBorrow" >
            <img src={require('../../assets/images/xuesheng/zxxshkjy.png')}/>
            <span>
               <strong>在校学生</strong>
            </span>
            <small>户口借用</small>
          </Link>
      </div>
      <div>
          <a href={"javascript"} >
            <img src={require('../../assets/images/xuesheng/xszzsczm.png')}/>
            <span>
               <strong>学生</strong>
            </span>
            <small>政治审查证明</small>
          </a>
      </div>
    </div>
  );
}

export default StudentItem;
