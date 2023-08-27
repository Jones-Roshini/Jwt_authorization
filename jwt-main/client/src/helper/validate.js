import toast from 'react-hot-toast'
import { authenticate } from './hepler.js';


//validate login page username

export async function usernameValidate(values)
{
    const errors=usernameVerify({},values)
    if(values.username){
        //chaeck for user existence
     const {status}=await authenticate(values.username)
     if(status!=200){
    errors.exist=toast.error('user does not exist')
}
    }
}

//validate password

export async function passwordValidate(values)
{
    const errors=passwordVerify({},values);
    return errors;
}

//validatr password
function passwordVerify(errors={},values)
{
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?~]/;
    if(!values.password)
    {
        errors.password=toast.error("Password required")
    }
    else if(values.password.includes(" "))
    {
        errors.password=toast.error("Wrong password...")
    }
    else if(values.password.length<4)
    {
        errors.password=toast.error("Password must be more than 4 characters")
    }
    else if(!specialChars.test(values.password))
    {
        errors.password=toast.error("Password must contain spl characters")
    }
    return errors;
}

//validate username
function usernameVerify(error={},values)
{
    if(!values.username)
    {
        error.username=toast.error('Username required');
        
    }
    else if(values.username.includes(" "))
    {
        error.username=toast.error("Invalid username");
    }

    return error;
}


//validate reset password

export async function resetPasswordValidation(values)
{
    const errors=passwordVerify({},values);

    if(values.password!==values.confirm_pwd)
    {
        errors.cnfrm=toast.error("Password does not match..!")
    }
    return errors;
}

//validate regitser form//

export async function registerValidation(values)
{
    const errors=usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

    return errors;


}


//validate email

function emailVerify(error={},values)
{
    if(!values.email)
    {
        error.email=toast.error("email fiels required")
    }

    else if(values.email.includes(" "))
    {
        error.email=toast.error("wrong email")
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){ //test->like check
        error.email = toast.error("Invalid email address...!")
    }
    return error;
}


export async function profileValidation(values)
{
    const errors=emailVerify({},values)
    return errors;

}