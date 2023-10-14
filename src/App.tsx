import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { routePaths } from './utils/routePaths'
import { Suspense, lazy } from 'react'
import { useToken } from './utils/tokenContext'
import { verifyJwt } from './utils/verifyToken'
import Loader from './components/loader'
import ScrollToTop from './utils/scrollToTop'

const Contact = lazy(() => import('../src/pages/contact'))
const Footer = lazy(() => import('../src/components/footer'))
const Navbar = lazy(() => import('../src/components/navbar'))
const Login = lazy(() => import('../src/pages/admin/login'))
const AddInventory = lazy(() => import('../src/pages/admin/addInventory'))
const DashBoard = lazy(() => import('../src/pages/admin/dashboard'))
const Home = lazy(() => import('../src/pages/home'))
const Sell = lazy(() => import('../src/pages/sell'))
const NotFound = lazy(() => import('../src/pages/notFound'))
const Inventory = lazy(() => import('../src/pages/inventory'))
const CarDetails = lazy(() => import('../src/pages/carDetails'))
const Warranty = lazy(() => import('../src/pages/warranty'))
const AboutUs = lazy(() => import('../src/pages/aboutUs'))
const SalesAssignment = lazy(() => import('../src/pages/salesAssignment'))

const AppLayout = (): JSX.Element => {
    return (
        <div className="main-wrapper">
            <Navbar />
            <div className="outlet-wrapper">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

const Loading = (): JSX.Element => {
    return (
        <>
            <Loader shouldHaveContainer={true} />
        </>
    )
}

const App = (): JSX.Element => {
    const tokenKey = process.env.REACT_APP_TOKEN_KEY
    const { token } = useToken()
    const verificationResult = verifyJwt(token, tokenKey)

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <ScrollToTop/>
                    <Routes>
                        {/* Admin Routes */}
                        <Route path={routePaths.login} element={<Login />} />
                        {verificationResult && (
                            <>
                                <Route
                                    path={routePaths.dashBoard}
                                    element={<DashBoard />}
                                />
                                <Route
                                    path={routePaths.add}
                                    element={<AddInventory />}
                                />
                            </>
                        )}

                        <Route element={<AppLayout />}>
                            {/* Public Routes */}
                            <Route index element={<Home />} />
                            <Route
                                path={routePaths.contact}
                                element={<Contact />}
                            />
                            <Route path={routePaths.sell} element={<Sell />} />
                            <Route
                                path={routePaths.inventory}
                                element={<Inventory />}
                            />
                            <Route
                                path={routePaths.carDetails}
                                element={<CarDetails />}
                            />
                            <Route
                                path={routePaths.warrantys}
                                element={<Warranty />}
                            />
                            <Route
                                path={routePaths.aboutus}
                                element={<AboutUs />}
                            />
                            <Route
                                path={routePaths.salesassignment}
                                element={<SalesAssignment />}
                            />
                            {/* 404 Route */}
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default App
