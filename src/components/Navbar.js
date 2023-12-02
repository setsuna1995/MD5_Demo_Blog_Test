import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

export default function Navbar() {
    let navigate = useNavigate()
    const currentUser = useSelector(state => {
        return state.user.currentUser;
    })
    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <Link to={"/home"}>Navbar</Link>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={() => {
                                        navigate("add-blog")
                                    }}>Create blog</a></li>
                                    <li><a className="dropdown-item">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>

                    </div>
                    <div className="form-inline my-2 my-lg-0">
                        {currentUser.username}
                        <button className=" ml-3 btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => {
                            localStorage.clear()
                            navigate('/')
                        }}>Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
        ;
}
