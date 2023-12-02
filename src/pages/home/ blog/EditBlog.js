import {Button, FormControl, FormGroup, FormLabel, FormSelect} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editBlogs, getBlogsById} from "../../../service/blogsService";
import "react-quill/dist/quill.snow.css";
import CustomQuill from "./CustomQuill";

export default function EditBlog() {
    const dispatch = useDispatch();
    const blogs = useSelector(state => {
        return state.blogs.blogs;
    })
    const currentUser = useSelector(state => {
        return state.user.currentUser;
    })
    console.log(blogs)
    let navigate = useNavigate()
    const {id} = useParams();
    const handleEdit = (values) => {
        let data = {...values, user: {id: currentUser.id}}
        dispatch(editBlogs({id: id, data: data})).then(() => {
            navigate('/home')
        })
    }
    useEffect(() => {
        dispatch(getBlogsById(id))
    }, []);
    return (
        <>
            <Formik initialValues={
                {
                    id: id,
                    title: blogs.title,
                    content: blogs.content,
                    createdAt: blogs.createdAt,
                    status: blogs.status,
                }
            }
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        handleEdit(values)
                    }}>
                <Form>
                    <h1 className={"text-center"}>Create Blog</h1>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <FormLabel>Title</FormLabel>
                        <Field
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            as={FormControl}
                        />
                    </FormGroup>
                    <FormLabel>Content</FormLabel>
                    <div>
                        <label htmlFor="content">Content</label>
                        <Field
                            name="content"
                            component={CustomQuill}
                            theme="snow"
                        />
                    </div>
                    <FormGroup className="mb-3" controlId="formBasicPassword">
                        <FormLabel>Create At</FormLabel>
                        <Field
                            type="text"
                            name="createdAt"
                            placeholder="Enter Create at"
                            as={FormControl}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="formStatus">
                        <FormLabel>Status</FormLabel>
                        <Field
                            as={FormSelect}
                            name="status"
                            defaultValue="0"
                            custom
                        >
                            <option value="0">Public</option>
                            <option value="1">Only me</option>
                        </Field>
                    </FormGroup>
                    <Button variant="primary" type="submit" className="btn btn-primary me-2 offset-5">
                        Save
                    </Button>
                    <button type="button" className="btn btn-info me-2" onClick={() => {
                        navigate('/home')
                    }}>
                        Back to home
                    </button>
                </Form>
            </Formik>
        </>
    );
}
