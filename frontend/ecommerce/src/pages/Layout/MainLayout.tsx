import AppHeader from '../../component/AppHeader'
import AppContent from '../../component/AppContent'
import AppFooter from '../../component/AppFooter'

export const MainLayout = () => {
  return (
    <div>
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div className="flex-grow-1 bg-[#FBF9F6]">
        <AppContent />
      </div>
      <AppFooter />
    </div>
  </div>
  )
}
