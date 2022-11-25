import React, { useState } from 'react';
// Import Formik
import { Formik, Field, Form, ErrorMessage } from 'formik';
// Import Yup
import * as Yup from 'yup'
// Import React-Router-Dom
import { useNavigate } from 'react-router-dom';
// Import Styles Css
import '../../../styles/forms.css'

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
                .email('Invalid Format Email')
                .required('Email is Required'),
        password: Yup.string().required('Password is required')
                    
    }
)

const LoginFormik = ({loggedIn}) => {

    const [logged, setLogged] = useState(loggedIn)

    const navigation = useNavigate();

    const initialCredentials = {
        email: '',
        password: ''
    }

    const navigate = useNavigate();

    return (
        <div className='container-forms'>
            <h2> Login </h2>
            <Formik
                // *** Initial values that the form will take ***
                initialValues={initialCredentials}
                // *** Yup Validation Schema ***
                validationSchema={loginSchema} 
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    setLogged(true);
                    navigate('/home')
                }}           
            > 
                {/* We obtain props from Formik */}
                {
                    ({errors, touched, isSubmitting, values, handleChange, handleBlur}) => (
                
                        <Form className="form">
                            <div>
                                <Field
                                id="email"
                                name="email"
                                placeholder="jane@acme.com"
                                type="email"
                                className="campo"
                                />
                            </div>
                            <div>
                                {/* Email Errors */}
                                {
                                    errors.email && touched.email && 
                                    (
                                        <ErrorMessage className='error-message' name='email' component='div'></ErrorMessage>
                                    )
                                }
                            </div>
                            <div>
                                <Field 
                                    type='password' 
                                    id="password" 
                                    name="password" 
                                    placeholder="password"
                                    className="campo" 
                                />
                                {/* Password Errors */}
                                {
                                    errors.password && touched.password && 
                                    (
                                        <ErrorMessage className='error-message' name='password' component='div'></ErrorMessage>
                                    )
                                }                                  
                            </div>
                            <div>
                                <button type="submit" className='btn-forms'>Login</button>
                            </div>
                            <div>
                                <button onClick={()=> navigation('/register')} type="button" className='btn-forms'>Register</button>
                            </div>
                            
                            {isSubmitting ? (<p>Login your Credentials...</p>) : null}
                        </Form>
                    )
                }

            </Formik>

        </div>
    );
}

export default LoginFormik;
