import axios from "axios";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import * as Yup from "yup";

export default function Register() {
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(4, "Tên người dùng từ 6 đến 50 kí tự")
            .max(50, "Tên người dùng từ 6 đến 50 kí tự")
            .required("Phải có tên đăng nhập"),
        password: Yup.string()
            .min(6, "Mật khẩu từ 6 kí tự trở lên ")
            .required("Phải có mật khẩu"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận phải giống với mật khẩu đã nhập')
            .min(6)
    })
    let navigate = useNavigate()
    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    axios.post('http://localhost:8000/register', values)
                        .then(() => {
                            alert('Đăng ký thành công!');
                            navigate('');
                        });
                }}
            >
                {({errors, touched}) => (
                    <Form>
                        <h1 className={"text-center"}>REGISTER</h1>
                        <FormGroup className="mb-3" controlId="formBasicEmail">
                            <FormLabel>Username</FormLabel>
                            <Field
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                as={FormControl}
                            />
                            {errors.username && touched.username ? (
                                <div>{errors.username}</div>
                            ) : null}
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>Password</FormLabel>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                as={FormControl}
                            />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        </FormGroup>
                        <FormGroup className="mb-3" controlId="formBasicConfirmPassword">
                            <FormLabel>Confirm Password</FormLabel>
                            <Field
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter confirm password"
                                as={FormControl}
                            />
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <div>{errors.confirmPassword}</div>
                            ) : null}
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}
