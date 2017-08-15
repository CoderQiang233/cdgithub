import React from 'react';
import styles from './Mytab.less';


class Mytab extends React.Component{

    constructor(props) {
      super(props);
      console.log(props);
      this.state = {};
  }





    render(){

      return(

        <div className={styles.mytabs}>

          <ul>
            <li className={styles.zitemActive} style={{display:'block',transform:'translate3d(0px, 0px, 0px)',width:'90px'}}></li>
              {
                  this.props.children.map((ii,index) =>(

                     <Panel key={index} tab={ii.props.tab}/>

      )
                  )


              }


          </ul>

        </div>




      );

    }



}
function Panel(props){


  return (

      <li><a>{props.tab}</a></li>

  );


}


Mytab.Panel = Panel;

export default Mytab;
