import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { routePaths } from './utils/routePaths'
import { Suspense, lazy } from 'react'
import Loader from './components/loader'
import ScrollToTop from './utils/scrollToTop'
import ContactWidget from './components/contactWidget'

const Contact = lazy(() => import('../src/pages/contact'))
const Footer = lazy(() => import('../src/components/footer'))
const Navbar = lazy(() => import('../src/components/navbar'))
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
                <ContactWidget />
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
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <ScrollToTop />
                    <Routes>
                        <Route element={<AppLayout />}>
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
