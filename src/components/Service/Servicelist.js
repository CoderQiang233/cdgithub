import React from 'react';
import {Row,Col} from 'antd';
import styles from './Servicelist.less';
import {  Link } from 'react-router';


class Servicelist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activemenu:1,
      current:this.props.current
    };
}

activeMenu=(id)=>{

    this.setState({

        activemenu:id,

    })

}





 render(){

   const topmenu = this.props.list.map((todo)=>

     <Col span={6} key={todo.id}>
           <Link to={'matter/'+todo.matterKey} className={styles.matterItem}  onClick={this.activeMenu.bind(this,todo.id)} >
             <div className={styles.top} style={{backgroundImage:"url("+todo.imgpath+')'}} >
              <div className={styles.department}>
                 <strong>{todo.name}</strong>
              </div>
             </div>
             <div className={styles.bottom}>
             <small >{todo.bottom}</small>   

             </div>
             
                 
                
           </Link>
     </Col>
   );
//   function in_array(search,array){
//     for(var i in array){
//         if(array[i]==search){
//             return true;
//         }
//     }
//     return false;
//   };


// const _this=this;
//   const topmenu=this.props.list.map(function(value,index){
//     if(!_this.props.selectedTags.length){
    //   return  <Col span={6} key={value.id}>
    //   <a href="javascript:;"  onClick={_this.activeMenu.bind(this,value.id)} >
    //     <img  src={value.imgpath} />
    //     <span><strong>{value.name}</strong></span>
    //     <span></span>
    //     <small>{value.bottom}</small>
    //     </a>
    //     </Col>
    // }else{
    //   const inarry=in_array(value.name,_this.props.selectedTags);

      // if(inarry){
      //   return  <Col span={6} key={value.id}>
      //   <a href="javascript:;"  onClick={_this.activeMenu.bind(this,value.id)} >
      //     <img  src={value.imgpath} />
      //     <span><strong>{value.name}</strong></span>
      //     <span></span>
      //     <small>{value.bottom}</small>
      //     </a>
      //     </Col>
      // }
//     }
//   })

  

     return (

       <Row type="flex"  className="wrap" gutter={40}>


         {topmenu}


       </Row>


     );


 }


}

export default Servicelist;
