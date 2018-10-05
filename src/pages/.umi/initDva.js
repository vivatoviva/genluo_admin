import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('D:/github/GenluoAdmin/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('D:/github/GenluoAdmin/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('D:/github/GenluoAdmin/src/models/login.js').default) });
app.model({ namespace: 'project', ...(require('D:/github/GenluoAdmin/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('D:/github/GenluoAdmin/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('D:/github/GenluoAdmin/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('D:/github/GenluoAdmin/src/pages/User/models/register.js').default) });
app.model({ namespace: 'article', ...(require('D:/github/GenluoAdmin/src/pages/Article/models/article.js').default) });
app.model({ namespace: 'rules', ...(require('D:/github/GenluoAdmin/src/pages/Article/models/rules.js').default) });
