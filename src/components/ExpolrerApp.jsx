import '../styles/Global.css';
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import MainComponent from "./MainComponent";
import FooterComponent from "./FooterComponent";
import {AppProvider, useAppContext} from "../AppContext";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import CategoriesComponent from "./CategoriesComponent";
import EditCategoryComponent from "./EditCategoryComponent";
import NewSpotComponent from "./NewSpotComponent";
import SpotComponent from "./SpotComponent";
import UpdateSpotComponent from "./UpdateSpotComponent";
import AddCategoryComponent from "./AddCategoryComponent";
import ImpressumComponent from "./ImpressumComponent";
import ContactFormComponent from "./ContactFormComponent";
import ScrollToTop from "./ScrollToTop";
import ResultsComponent from "./ResultsComponent";
import NotFoundComponent from "./NotFoundComponent";
import LoginComponent from "./LoginCompotent";
import RegisterComponent from "./RegisterComponent";
import TravelBlogComponent from "./TravelBlogComponent";
import ProtectedComponent from "./ProtectedComponent";

export default function ExplorerApp() {
    return (
        <div className="ExplorerApp">
            <AppProvider>
                <BrowserRouter>
                    <MainRoutes />
                </BrowserRouter>
            </AppProvider>
        </div>
    );
}

function MainRoutes() {
    const { isAuthenticated} = useAppContext();
    const location = useLocation();
    const isLoginRoute = location.pathname === '/login';
    const signUpRoute = location.pathname === '/signUp';

    return (
        <>
            {!isLoginRoute && !signUpRoute && <HeaderComponent />}
            {!isLoginRoute && !signUpRoute && <SidebarComponent />}
            <ScrollToTop />
            <Routes>
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/signUp" element={<RegisterComponent />} />
                <Route path="/" element={<MainComponent />} />
                <Route path="/categories" element={<CategoriesComponent />} />
                <Route path="/categories/:category/update" element={<EditCategoryComponent />} />
                <Route path="/addSpot" element={<NewSpotComponent />} />
                <Route path="/spot/:name" element={<SpotComponent />} />
                <Route path="/spot/:name/update" element={<UpdateSpotComponent />} />
                <Route path="/addCategory" element={<AddCategoryComponent />} />
                <Route
                    path="/travelBlog/:username"
                    element={
                        <ProtectedComponent isAuth={isAuthenticated}>
                            <TravelBlogComponent />
                        </ProtectedComponent>
                    }
                />
                <Route path="/legalNotice" element={<ImpressumComponent />} />
                <Route path="/contactForm" element={<ContactFormComponent />} />
                <Route path="/results" element={<ResultsComponent />} />
                <Route path="/notFound" element={<NotFoundComponent />} />
            </Routes>
            {!isLoginRoute && !signUpRoute && <FooterComponent />}
        </>
    );
}
