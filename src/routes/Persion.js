import React from 'react';
import { connect } from 'dva';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Breadcrumb, Icon,Row,Col,Avatar,Modal, Button  } from 'antd';
const confirm = Modal.confirm;
import styles from './Persion.less';

import MyThing from '../components/person/MyThing';
import MyQuestion from '../components/person/MyQuestion';
import MyProfile from '../components/person/MyProfile';



class Persion extends React.Component{
        constructor(props){
          
                  super(props)
          
                  this.state={
                   leftMenuAcitve:1
                  }                                         
        }

        

        LeftMenuClick=(id,event)=>{
          this.setState({
            leftMenuAcitve:id
          })
       }

       componentWillMount(){
        const isLogin=this.props.login.isLogin;
        if(!isLogin){
          
          confirm({
            title: '您还未登录，是否前往登录页？',
            onOk() {
              console.log('OK');
              hashHistory.push('/login')
            },
            onCancel() {
              console.log('Cancel');
              hashHistory.goBack();
            },
          });
        }
      }
       

        render(){

        

         

        const menuList=[
          {
            id:1,
            name:"我的事项"
          },
          {
            id:2,
            name:"我的疑问"
          },
          {
            id:3,
            name:"我的资料"
          }
        ]

          return(
            <div className={styles.container}>
              <div className={styles.breadcrumbBox}>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                      <Icon type="home" />
                      <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      个人中心
                    </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <Row>
                <Col span={5}>
                <div className={styles.leftMenuBox}>
                  <div className={styles.center}>
                    <h1 className={styles.title}><span className={styles.blod}>个人</span>中心</h1>
                    <h1 className={styles.etitle}><span className={styles.blod}>PERSION</span>CENTER</h1>
                    <div className={styles.headImg}>
                      <img src={require("../assets/images/person/tx.jpg")}/>
                    </div>  
                    <div className={styles.userName}>{this.props.login.account.uName}</div>
                  </div>
                  <LeftMenuList LeftMenuClick={this.LeftMenuClick} leftMenuAcitve={this.state.leftMenuAcitve} menuList={menuList}></LeftMenuList>
                </div>
                   
                </Col>
                <Col span={18} offset={1}>
                   <RightContent leftMenuAcitve={this.state.leftMenuAcitve}></RightContent>
                </Col>
              </Row>
            </div>
          )
        }
}

class LeftMenuList extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
               activeMenu:this.props.leftMenuAcitve
            }
              
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeMenu: nextProps.leftMenuAcitve
    });
 }

  LeftMenuClick=(id,event)=>{
     this.props.LeftMenuClick(id)
  }
  
 
  render(){
    
    
    
    let newArry=[];
    this.props.menuList.map((item)=>
          
          newArry.push( <li className={this.state.activeMenu==item.id?'active':''}  onClick={this.LeftMenuClick.bind(this,item.id)} key={item.id}><a>{item.name}</a></li>) ,
         
    );


    return(
      <div>
        <ul className={styles.leftMenu}>
          
         {newArry}
          
        </ul>
      </div>
    )
  }

}

class RightContent extends React.Component{
  constructor(props){
    
            super(props)
    
            this.state={
              activeMenu:this.props.leftMenuAcitve
            }
              
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeMenu: nextProps.leftMenuAcitve
    });
 }

 

  render(){
    
     
    
    return(
      <div>
        {
           this.state.activeMenu ==1 &&
          <MyThing  {...this.props.MyTingProps}></MyThing>
        }
        {
           this.state.activeMenu ==2 &&
          <MyQuestion></MyQuestion>
        }
        {
           this.state.activeMenu ==3 &&
          <MyProfile></MyProfile>
        }
      </div>
    )
  }

}



function mapStateToProps({persion,login}) {
  return {persion,login};
}

export default connect(mapStateToProps)(Persion);
