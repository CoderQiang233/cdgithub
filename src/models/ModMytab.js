import { hashHistory } from 'dva/router';
export default {
  namespace: 'ModMytab',
  state: {
    index:1,
    transform:'translate3d(0px, 0px, 0px)',
    width:'90'
  },
  reducers: {
        activeHome(state,action){
          
          return { ...state, ...action.payload };
        },
        activeService(state,action){
          return { ...state, ...action.payload };
        },
        activePersion(state,action){
          return { ...state, ...action.payload };
        }



  },
  effects: {},
  subscriptions: {

    setup({ dispatch, history }) {
       history.listen(location => {
         if (location.pathname === '/home') {
           dispatch({
             type: 'activeHome',
             payload: {
               index:1,
               transform:'translate3d(0px, 0px, 0px)'
             }
           });
         }
         if(location.pathname === '/service'){

           dispatch({
             type: 'activeService',
             payload: {
               index:2,
               transform:'translate3d(90px, 0px, 0px)'
             }
           });


         }

         if(location.pathname === '/persion'){
             dispatch({
               type: 'activePersion',
               payload: {
                 index:3,
                 transform:'translate3d(180px, 0px, 0px)'
               }
             });

         }


       });
     },


  },
};
