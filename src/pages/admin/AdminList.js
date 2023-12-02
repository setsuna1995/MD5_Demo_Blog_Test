import React, {useEffect, useState} from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


export default function AdminList() {
    const [list, setList] = useState([]);
    let username = localStorage.getItem("username")
    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + "..."; // Trả về chuỗi cắt ngắn + dấu "..."
        }
        return content;
    };
    const loadList = () => {
        axios.get(`http://localhost:8000/blogs`)
            .then(response => {
                setList(response.data);
                console.log(list)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    useEffect(() => {
        loadList();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active ">
                                <img
                                    src="https://static.wixstatic.com/media/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg/v1/fill/w_640,h_360,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9d8ed5_4725657bd5b448478d19d54669ea0883~mv2.jpg"
                                    className="d-block w-auto" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://cdn.mekoong.com/wp-content/uploads/2022/10/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145-1024x683.jpg"
                                    className="d-block w-auto" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img
                                    src="https://dogily.vn/wp-content/uploads/2023/03/meo-aln-chan-ngan-tai-cup-lung-bicolor-cai-7.png"
                                    className="d-block w-auto" alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {list.map(blog => (
                    (1 === blog.status && username === blog.user?.username) || 0 === blog.status ? (
                        <div className="col-3" key={blog.id}>
                            <div className="card" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{blog.createdAt}</h6>
                                    <p className="card-text"
                                       dangerouslySetInnerHTML={{__html: truncateContent(blog.content, 50)}}></p>
                                    <button type="button" className="btn btn-info">
                                        <Link
                                            style={{textDecoration: "none", color: "black"}}
                                            to={'/home/detail-blog/' + blog.id}
                                        >
                                            More detail
                                        </Link>
                                    </button>
                                    {username === blog.user?.username && (
                                        <>

                                            <button type="button" className="btn btn-info">
                                                <Link
                                                    style={{textDecoration: "none", color: "black"}}
                                                    to={'/home/edit-blog/' + blog.id}
                                                >
                                                    Edit Student
                                                </Link>
                                            </button>
                                            <button className="btn btn-danger"
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: "Are you sure?",
                                                            text: "You won't be able to revert this!",
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#3085d6",
                                                            cancelButtonColor: "#d33",
                                                            confirmButtonText: "Yes, delete it!"
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                axios.delete('http://localhost:8000/blogs/' + blog.id).then(() => {
                                                                    loadList();
                                                                });
                                                            }
                                                        });
                                                    }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
}