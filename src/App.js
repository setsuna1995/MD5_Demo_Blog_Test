import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import AddBlog from "./pages/home/ blog/AddBlog";
import ListBlog from "./pages/home/ blog/ListBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditBlog from "./pages/home/ blog/EditBlog";
import BlogDetail from "./pages/home/ blog/BlogDetail";
import {useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
function App() {
    const user = useSelector(state => {
        return state.user.currentUser
    })
    return (

            <div className="container-fluid">
                <Routes>
                    <Route path={''} element={<Login></Login>}> </Route>
                    <Route path={'register'} element={<Register></Register>}> </Route>
                    {
                        user != null ?
                            <Route path={'/home'} element={<Home></Home>}>
                                <Route path={'add-blog'} element={<AddBlog></AddBlog>}></Route>
                                <Route path={''} element={<ListBlog></ListBlog>}></Route>
                                <Route path={'edit-blog/:id'} element={<EditBlog></EditBlog>}></Route>
                                <Route path={'detail-blog/:id'} element={<BlogDetail></BlogDetail>}></Route>
                            </Route>
                            :
                            <Route path={'*'} element={<Login></Login>}> </Route>
                    }
                </Routes>
                <ToastContainer/>
            </div>
    )
        ;
}

export default App;
