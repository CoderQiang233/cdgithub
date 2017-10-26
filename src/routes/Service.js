import React from 'react';
import { connect } from 'dva';
import styles from './Service.less';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Tag } from 'antd';
import { Pagination } from 'antd';
import Servicelist from '../components/Service/Servicelist';
  //标签
const CheckableTag = Tag.CheckableTag;
let tagsFromServer = [];
let arr=[]

class Service extends React.Component{

  constructor(props){

      super(props)

      this.state={
        current: 1, //当前页
        pageSize:12, //每页条数
        total:arr.length, //数据总数
        selectedTags: [],
        listArry:arr, //获取当前操作的总数据
        pagelist:[], //获取当前操作的页的总数据
      }


  }


// 数据初始化
componentWillMount(){
    let data={};
    if(this.props.params.matterType){
        data={matterType:this.props.params.matterType}
    }
    this.props.dispatch({ type: 'serviceCenter/getAllMatters' ,payload:data});
//    let list= this.loadData(this.state.current,this.state.pageSize,this.state.listArry);
//    this.setState({
//     pagelist:list
//    })
}

componentWillReceiveProps(nextProps){
    if(nextProps.serviceCenter.getMattersSuccess){
       let list=nextProps.serviceCenter.AllMatters;
       let arry=[];
       for(let i=0;i<list.length;i++){
        arry.push({
               id:list[i]['id'],
               imgpath:list[i]['img1'],
               name:list[i]['dName'],
               bottom:list[i]['matterName'],
               matterKey:list[i]['matterKey']
           })
       }
       arr=arry;
        this.setState({listArry:arry},function(){
            let list= this.loadData(this.state.current,this.state.pageSize,this.state.listArry);
            this.initPage(arr);
            this.setState({pagelist:list})
        })
    }
    if(nextProps.serviceCenter.getDepartmentsSuccess){
        let department=nextProps.serviceCenter.Department;
        let departmentArray=[];
        for(let i=0;i<department.length;i++){
            departmentArray.push(department[i]['dName'])
        }
        tagsFromServer=departmentArray;
    }
}
  //分页

  pageChange = (page) => {
    
    this.setState({
      current: page,
    });

    let list= this.loadData(page,this.state.pageSize,this.state.listArry);
    this.setState({
        pagelist:list
    })
  }

//   获取数据

loadData=(current,pageSize,datalist)=>{
    let offset = (current - 1) * pageSize;  
    let list=(offset + pageSize >= datalist.length) ? datalist.slice(offset, datalist.length) : datalist.slice(offset, offset + pageSize);
    
    return list;
 }

//标签

  handleChange(tag, checked)  {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });

    let list=[];

    if(!nextSelectedTags.length) {
        list=arr; 
        
    } else { 
        for(let i=0;i<arr.length;i++) { 
            if(this.in_array(arr[i].name,nextSelectedTags)) { 
                list.push(arr[i]);
            }
        }
        
    }
    this.setState({
        listArry:list
    });
    this.initPage(list);

    // for(let i=0;i<arr.length;i++) {
    //     if(this.in_array(arr[i].name,nextSelectedTags)){
    //         list.push(arr[i]);
    //     }
    // }  
    
                    

    // //初始化分页
    
    // this.setState({
    //     listArry:list
    // });
    // console.log(list)
    // // // console.log(this.state.listArry)
    // this.initPage(list);
  }

  in_array=(search,array)=>{
    for(var i in array){
        if(array[i]==search){
            return true;
        }
    }
    return false;
  }
//初始化分页
initPage=(datalist)=>{
    let list= this.loadData(1,this.state.pageSize,datalist);
    this.setState({
        current:1,
        total:datalist.length?datalist.length:1,
        pagelist:list
    })
}

search=(value)=>{
const data={matterName:value};
this.props.dispatch({ type: 'serviceCenter/getSearchMatters', payload: data })
}

 
  render(){
      //搜索
    const Search = Input.Search;
     //标签
    const { selectedTags } = this.state;
    

      return (

        <div className={styles.normal}>
            <div className={styles.banner}>
                <img src={require('../assets/images/banner.jpg')} />
            </div>
            <div className={styles.searchBox}>
            <Search
                placeholder="请输入搜索内容"
                style={{ width:600,paddingTop:10,paddingBottom:10}}
                onSearch={value => this.search(value)}
             />
            </div>
           
        <div  className={styles.content}>
            <div className={styles.tag}>
             <strong className={styles.labal} style={{ marginRight: 8 }}>服务部门:</strong>
                {tagsFromServer.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => this.handleChange(tag, checked)}
                    color='red'
                >
                    {tag}
                </CheckableTag>
        ))}
      </div>

              <div className={styles.zmenu}>
                  <Servicelist current={this.state.current} selectedTags={this.state.selectedTags}  list={this.state.pagelist} />
              </div>
              <div className={styles.pagination}>
                  
              <Pagination  current={this.state.current} pageSize={this.state.pageSize} onChange={this.pageChange} total={this.state.total}
              />
              </div>
        </div>
        </div>

      );


  }

}



function mapStateToProps({serviceCenter}) {
  return {serviceCenter};
}

export default connect(mapStateToProps)(Service);
