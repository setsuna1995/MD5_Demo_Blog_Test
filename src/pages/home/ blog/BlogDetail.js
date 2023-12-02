import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlogs, getBlogsById} from "../../../service/blogsService";
import {toast} from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-quill/dist/quill.snow.css";
import purify from "dompurify";

export default function BlogDetail() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const blogs = useSelector(state => {
        return state.blogs.blogs;
    })
    const user = useSelector(state => {
        return state.user.currentUser
    })
    const handleDelete = async (id) => {
        await dispatch(deleteBlogs(id)).then(async () => {
            navigate('/home');
            await toast.success('Delete successfully', {
                autoClose: 500
            })

        })
    }
    useEffect(() => {
        dispatch(getBlogsById(id));
    }, []);

    return (
        <div className="container px-4 px-xxl-5 container-xl"
             style={{
                 backgroundImage: `url('https://i.imgur.com/9rkrIyj.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 width: '100%',
             }}>
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-8">
                    <header className="masthead">
                        <div className="container position-relative px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <div className="post-heading">
                                        <h1>{blogs.title}</h1>
                                        <span className="meta">
                                Posted by
                                <a>  {blogs.user?.username} </a>
                                on August 24, 2023
                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <article className="mb-4 w-100">
                        <div className="container px-8 px-xxl-12">
                            <div className="row mx-n4 w-100 justify-content-center">
                                <div
                                    dangerouslySetInnerHTML={{__html: purify.sanitize(blogs.content)}}
                                />
                            </div>
                            <div className="col-12 col-xl-12">
                            <button type="button" className="btn btn-info me-2 offset-3" onClick={() => {
                                    navigate('/home')
                                }}>
                                    Back to home
                                </button>
                                <br/>
                                {user.username === blogs.user?.username && (
                                    <button type="button" className="btn btn-info me-2 offset-3" onClick={() => {
                                        navigate("/home/edit-blog/" + blogs.id)
                                    }}>
                                        Edit
                                    </button>
                                )}
                                {user.username === blogs.user?.username && (
                                    <>
                                        <Button variant="primary" onClick={handleShow}>
                                            Delete
                                        </Button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modal heading</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Do you confirm to delete this?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <Button variant="danger" onClick={() => handleDelete()}>
                                                    Delete
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                )}
                            </div>
                        </div>
                    </article>
                    <footer className="border-top">
                        <div className="container px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <ul className="list-inline text-center">
                                        <li className="list-inline-item">
                                            <a>
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a>
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a>
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="small text-center text-muted fst-italic">Copyright &copy; Your
                                        Website 2023
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
