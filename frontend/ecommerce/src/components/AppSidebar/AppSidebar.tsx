import React from 'react'
import './AppSidebar.module.scss'
import {RootState, store} from '@redux/store'
import { useSelector } from "react-redux";
const AppSidebar = () => {

  const data =  useSelector((state: RootState) => state.appData.data)

  return (
    <div className='w-[18%] bg-slate-500'>
      <div className='bg-green-400 px-3 py-2'>Login</div>
      { data.category?.map((item:any) => (
        <div className='px-4 py-3 hover:bg-green-600 hover:text-green-800'>{item.name}</div>
      ))}
    </div>
  )
}

export default AppSidebar