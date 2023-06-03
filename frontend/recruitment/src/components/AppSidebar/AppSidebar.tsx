import './AppSidebar.scss';
import { RootState, store } from '@redux/store';
import { useSelector } from 'react-redux';
const AppSidebar = () => {

  // const data = useSelector((state: RootState) => state.appData);
  // const data = store.getState().appData

  // const [isOpen, setIsOpen] = useState(false);

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // };
  return (
    <>
    sidebar
      {/* { data.category?.map((item:any) => (
        <div className='px-4 py-3 hover:bg-green-600 hover:text-green-800'>{item.name}</div>
      ))} */}
   </>
  );
};

export default AppSidebar;
