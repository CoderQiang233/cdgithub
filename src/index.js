import dva from 'dva';
import './index.css';
// import createLoading from 'dva-loading';
// 1. Initialize
const app = dva();


//2. Plugins
// app.use();


app.model(require("./models/ModMytab"));




app.model(require("./models/approvalMatters"));









app.model(require("./models/matterTLeave"));




app.model(require("./models/login"));




app.model(require("./models/persion"));

app.model(require("./models/infoList"));





// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
