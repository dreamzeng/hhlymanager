//竟标管理
const consumption_list = resolve => require(['components/consumption/consumption_list'], resolve)

export let r = [
	{
	    path:'consumption_list',
	    name:'consumption_list',
	    component:consumption_list
	}
]