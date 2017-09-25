import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();




app.model(require("./models/ModMytab"));




app.model(require("./models/approvalMatters"));




app.model(require("./models/teacher"));




app.model(require("./models/matterTLeave"));




app.model(require("./models/login"));




app.model(require("./models/persion"));




// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
