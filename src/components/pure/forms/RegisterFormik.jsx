import React from 'react';
// Import Formik
import { Formik, Field, Form, ErrorMessage } from 'formik';
// Import Yup
import * as Yup from 'yup'
// Import React-Router-Dom
import { useNavigate } from 'react-router-dom';
// Import Styles Css
import '../../../styles/forms.css'


const RegisterFormik = () => {

    const navigation = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    // Validation with YUP
    const registerSchema = Yup.object().shape(
        {
            email: Yup.string()
                    .email('Invalid Format Email')
                    .required('Email is Required'),
            password: Yup.string()
                        .min(8, 'Minimum 8 Characters')
                        .required('Password is required'),
            confirmPassword: Yup.string()
                                .when('password', {
                                    is: value => (value && value.length > 0 ? true : false),
                                    then: Yup.string().oneOf(
                                        [Yup.ref('password')],
                                        '¡Password must match!'
                                    )                    
                                }).required('You must confirm the password')
        }
    )

    return (
        <div className='container-forms'>
            <h2>Register</h2>
            <Formik
                initialValues={initialValues}
                // Yup validation Schemas
                validationSchema={registerSchema}
                // On submit event
                onSubmit= {async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    alert(JSON.stringify(values, null, 2));
                    navigation('/login')
                }}
            >
                {/* We obtain props from Formik */}
                {
                    ({errors, touched, isSubmitting, values, handleChange, handleBlur}) => (
                        <Form className='form'>
                            {/* Email */}
                            <div>
                               <Field
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                    type="text"
                                    className="campo"
                                /> 
                            </div>
                            {/* Email Errors */}
                            {
                                errors.email && touched.email &&
                                (
                                    <ErrorMessage name='email' component='div' className='error-message'/>
                                )
                            }
                            {/* Password */}
                            <div>
                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="Your Password"
                                    type="password"
                                    className="campo"
                                />
                            </div>
                            {/* Password Errors */}
                            {
                                errors.password && touched.password &&
                                (
                                    <ErrorMessage name='password' component='div' className='error-message' />
                                )
                            }
                            {/* Confirm Password */}
                            <div>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    className="campo"
                                />
                            </div>
                            {/* Errors Confirm Password */}
                            {
                                errors.confirmPassword && touched.confirmPassword &&
                                (
                                    <ErrorMessage name='confirmPassword' component='div' className='error-message' />
                                )
                            }
                            {/* Button Register Submit */}
                            <div>
                                <button type='submit' className='btn-forms '>
                                    Register
                                </button>
                            </div>
                            <div>
                                <button type='button' onClick={()=> navigation(-1)} className="btn-forms">
                                    <i class="fas fa-undo"></i>
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            
        </div>
    );
}

export default RegisterFormik;
