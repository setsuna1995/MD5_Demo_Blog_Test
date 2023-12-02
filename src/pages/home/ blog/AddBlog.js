import {Button, FormControl, FormGroup, FormLabel, FormSelect} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addBlogs} from "../../../service/blogsService";
import {toast} from "react-toastify";
import React from "react";
import "react-quill/dist/quill.snow.css";
import CustomQuill from "./CustomQuill";

export default function AddBlog() {
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.currentUser
    })
    const handleAdd = (values) => {
        let data = {...values, user: {id: user.id}}
        console.log(data)
        dispatch(addBlogs(data)).then(() => {
            toast.success('Create post successfully', {
                autoClose: 1000,
                onClose: () => {
                    navigate('/home');
                }
            })
        })
    }
    return (
        <Formik initialValues={
            {
                title: '',
                content: '',
                createdAt: '',
                status: ''
            }
        }
                onSubmit={(values) => {
                    handleAdd(values)
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
                <FormLabel>Content</FormLabel>
                <Field
                    name="content"
                    component={CustomQuill}
                    theme="snow"
                />
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
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
        </Formik>
    );
}
