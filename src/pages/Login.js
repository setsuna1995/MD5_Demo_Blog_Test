import {useNavigate} from "react-router";
import {Field, Form, Formik} from "formik";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {loginUser} from "../service/userService";
import {toast} from "react-toastify";

export default function Login() {
    const dispatch = useDispatch();
    let navigate = useNavigate()
    const handleLogin = async (values) => {
        await dispatch(loginUser(values)).then((res) => {
            if (res.type === 'user/login/fulfilled') {
                toast.success('Logged in successfully', {
                    autoClose: 1500,
                    onClose: () => {
                        navigate('home');
                    }
                });
            } else {
                toast.error('Login failed, you entered the wrong name or password\n', {
                    autoClose: 500,
                    onClose: () => {
                        navigate('');
                    },
                });
            }
        });
    };
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100"
                 style={{
                     backgroundImage: `url('https://wallpapers.com/images/featured/4k-nature-ztbad1qj8vdjqe0p.jpg')`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     width: '100%',
                 }}>
                <Formik initialValues={{
                    username: '',
                    password: ''
                }}
                        onSubmit={
                            (values) => {
                                handleLogin(values).then()
                            }
                        }>
                    <Form>
                        <FormGroup className="mb-3">
                            <FormLabel style={{fontWeight: 'bold', color: 'red'}}>
                                Username:</FormLabel>
                            <Field
                                type="text"
                                name={"username"}
                                placeholder="Enter username"
                                as={FormControl}
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <FormLabel style={{fontWeight: 'bold', color: 'red'}}>
                                Password:</FormLabel>
                            <Field
                                type="password"
                                name={'password'}
                                placeholder="Enter password"
                                as={FormControl}
                            />
                        </FormGroup>
                        <div className="d-grid gap-5 d-flex">
                            <Button className='offset-1' variant="primary" type="submit">
                                Login
                            </Button>
                            <Button className='offset-1' variant="primary" type="button" onClick={() => {
                                navigate('/register')
                            }}>
                                Register
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}