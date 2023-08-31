import { useEffect, useState } from 'react';
import './AppSidebar.scss';
import { useRouter } from 'next/router';
import { Avatar, Icon } from '@mui/material';
import { useAppSelector } from '@redux/store';
import { ArrowBack as ArrowBackIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { Customer } from '@models/CustomerModel';
import { motion } from 'framer-motion';
import { Category } from '@models/CategoryModel';
import { Subcategory } from '@models/SubcategoryModel';
import { useTranslation } from 'next-i18next';

const AppSidebar = () => {
  const router = useRouter();
  const currentUser: Customer = useAppSelector((state) => state.auth.currentUser);
  const category: Category[] = useAppSelector((state) => state.category.data);
  const subcategory: Subcategory[] = useAppSelector((state) => state.subcategory.data);
  const { t } = useTranslation('common');
  const [showSubSidebar, setShowSubSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [listSubcategory, setListSubcategory] = useState<Subcategory[]>([]);

  const handleShowSubSidebar = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setShowSubSidebar(true);
  };

  useEffect(() => {
    const result = subcategory.filter((item: Subcategory) => item.category?.id === selectedCategory);
    setListSubcategory(result);
  }, [selectedCategory, subcategory]);

  return (
    <motion.div
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-96 h-full bg-white border border-black overflow-y-scroll">
      <div className="bg-green-500 flex px-10 py-3 items-center">
        <Avatar src={currentUser && currentUser.userData.image} alt={''} />
        {/* <Image src={currentUser ? currentUser.userData.image : DefaultUser} alt={''} /> */}
        <span className="text-white font-semibold text-xl ml-3">
          {t('common.hello')}, {currentUser ? currentUser.userData.name.split(' ')[0] : <>signin</>}
        </span>
      </div>
      <div className="border-b border-gray-400">
        <h3 className="font-semibold text-lg pl-6">{t("common.Category")}</h3>
        {category?.map((item: Category) => (
          <div key={item.id} className="hover:bg-gray-100 hover:cursor-pointer px-6 py-2 flex justify-between" onClick={() => handleShowSubSidebar(item.id)}>
            <span>{item.name}</span>
            <Icon component={ArrowForwardIosIcon} fontSize="small" />
          </div>
        ))}
      </div>
      <div className="border-b border-gray-400">
        <h3 className="font-semibold text-lg pl-6">{t("sidebar.help_and_settings")}</h3>
        <div className="hover:bg-gray-100 px-6 py-2">{t("sidebar.your_account")}</div>
        <div className="hover:bg-gray-100 px-6 py-2">{t("sidebar.customer_service")}</div>
      </div>

      {showSubSidebar && (
        <motion.div initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="bg-white w-96 h-full top-0 absolute">
          <div className="px-3 py-2 hover:cursor-pointer hover:bg-gray-100 border-b border-b-gray-300" onClick={() => setShowSubSidebar(false)}>
            <Icon component={ArrowBackIcon} />
            <span className="ml-2">{t('common.back')}</span>
          </div>
          {listSubcategory.map((item: Subcategory) => (
            <div key={item.id} className="hover:bg-gray-100 hover:cursor-pointer px-6 py-2 flex justify-between" onClick={() => router.push(`/product/subcategory/${item.id}`)}>
              <span>{item.name}</span>
              <Icon component={ArrowForwardIosIcon} fontSize="small" />
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AppSidebar;
