import Header from '../../component/Header'
import Content from '../../component/Content'
import Footer from '../../component/Footer'

export const MainLayout = () => {
  return (
    <div>
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <Header />
      <div className="flex-grow-1 bg-[#FBF9F6]">
        <Content />
      </div>
      <Footer />
    </div>
  </div>
  )
}
