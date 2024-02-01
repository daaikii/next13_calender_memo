import Header from "../components/base/Header/Header"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>
    <div className=" bg-gray-100 min-h-full ">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white min-h-screen  p-6 ">
          <Header />
          {children}
        </div>
      </div >
    </div >
  </>
}

export default Layout