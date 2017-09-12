import React from 'react';
import {Row,Col} from 'antd';
import styles from './Servicelist.less';


class Servicelist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activemenu:1,
    };
}

activeMenu=(id)=>{

    this.setState({

        activemenu:id,

    })

}





 render(){

  //  const topmenu = this.props.list.map((todo)=>

  //    <Col span={6} key={todo.id}>
  //          <a href="javascript:;"  onClick={this.activeMenu.bind(this,todo.id)} >
  //                <img  src={todo.imgpath} />
  //                <span>
  //                <strong>{todo.name}</strong>
  //                </span>
  //                <span>
                  
  //                  </span>
  //                  <small>{todo.bottom}</small>
  //          </a>
  //    </Col>
  //  );
  function in_array(search,array){
    for(var i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
  };


const _this=this;
  const topmenu=this.props.list.map(function(value,index){
    if(!_this.props.selectedTags.length){
      return  <Col span={6} key={value.id}>
      <a href="javascript:;"  onClick={_this.activeMenu.bind(this,value.id)} >
        <img  src={value.imgpath} />
        <span><strong>{value.name}</strong></span>
        <span></span>
        <small>{value.bottom}</small>
        </a>
        </Col>
    }else{
      const inarry=in_array(value.name,_this.props.selectedTags);

      if(inarry){
        return  <Col span={6} key={value.id}>
        <a href="javascript:;"  onClick={_this.activeMenu.bind(this,value.id)} >
          <img  src={value.imgpath} />
          <span><strong>{value.name}</strong></span>
          <span></span>
          <small>{value.bottom}</small>
          </a>
          </Col>
      }
    }
  })

  

     return (

       <Row type="flex"  className="wrap">


         {topmenu}

         {/* {
           this.state.activemenu ==1 &&
          <TeacherItem />
        }
        {
          this.state.activemenu ==2 &&
         <StudentItem />
        } */}


       </Row>


     );


 }


}

export default Servicelist;
