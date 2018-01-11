import { asyncComponent } from 'lib/utils'

const new_laywer = asyncComponent('third/new_lawyer')

export let r = [
    //新建律师
    {
        path: 'new_lawer',
        name: 'new_lawer',
        component: new_laywer
    },
    //编辑律师
    {
        path: 'new_lawer/:id',
        name: 'update_lawer',
        component: new_laywer
    }
]