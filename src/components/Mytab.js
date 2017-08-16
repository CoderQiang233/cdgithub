import React from 'react';
import styles from './Mytab.less';


class Mytab extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
          transform:'translate3d(0px, 0px, 0px)'

      };

  }

    onHungry= (index) =>{

          console.log(this.props.width)
          let offset = ((index-1) * this.props.width)+'px';

          this.setState({

              transform:'translate3d('+offset+', 0px, 0px)'

          });



  }


    render(){

      return(

        <div className={styles.mytabs}>

          <ul>
            <li className={styles.zitemActive}  style={{display:'block',transform:this.state.transform,width:'90px'}}></li>
              {
                  this.props.children.map((ii) =>(

                     <Panel key={ii.key}  onHungry={this.onHungry}  index={ii.key} tab={ii.props.tab}/>

                     )
                  )


              }


          </ul>

        </div>




      );

    }



}


class Panel extends React.Component{

    constructor(props) {
      super(props);
      console.log(props);
      this.state = {};
  }

  handleClick= ()=> {
    this.props.onHungry(this.props.index)
}

  render(){


    return(

        <li><a href="javascript:;" onClick={this.handleClick} >{this.props.tab}</a></li>

    );

  }


}



Mytab.Panel = Panel;

export default Mytab;
