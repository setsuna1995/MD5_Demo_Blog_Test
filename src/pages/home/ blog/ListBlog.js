import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs} from "../../../service/blogsService";
import purify from "dompurify";

export default function ListBlog() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const blogs = useSelector(state => {
        return Array.from(state.blogs.blogs);
    })
    const currentUser = useSelector(state => {
        return state.user.currentUser;
    })

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "...";
        }
        return content;
    };
    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    useEffect(() => {
        dispatch(getBlogs())
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="offset-2 col-8">
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                    className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img
                                    src="https://static.wixstatic.com/media/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg/v1/fill/w_640,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg"
                                    className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://static.wixstatic.com/media/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg/v1/fill/w_640,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg"
                                    className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://static.wixstatic.com/media/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg/v1/fill/w_640,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg"
                                    className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {blogs.map(blog => (
                    (0 === blog.status || (1 === blog.status && currentUser.username === blog.user?.username)) ? (
                        <div className="col-3 mb-xl-5" key={blog.id}>
                            <div className="card" style={{
                                backgroundImage: `url('https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/cach-thiet-ke-background-dep-2.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: "18rem",
                                height: '100%',
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <div className="card-body" style={{flex: "1 1 auto"}}>
                                    <h5 className="card-title">{blog.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{blog.createdAt}</h6>
                                    <p className="card-text">
                                        {truncateContent(stripHtmlTags(blog.content), 100)}
                                    </p>
                                    <div style={{alignSelf: "flex-end"}}>
                                    </div>
                                </div>
                                <button type="button" className="btn btn-info" onClick={() => {
                                    navigate('/home/detail-blog/' + blog.id)
                                }}>
                                    More detail
                                </button>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}