import { useState } from "react"
import AuthLayout from "../../components/AuthLayout";
import {useNavigate, Link} from "react-router-dom"
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from "../../utils/apiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);


  const navigate = useNavigate()

  // handle Login

  const handleLogin =  async (e) =>{
  e.preventDefault();
  if(!validateEmail(email)) {
    setError(" Please enter a valid email address.");
    return;
  }

  if(!password){
    setError("Please enter a password");
    return;
  }
  setError("");

  //Login API call

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    const {token, user} = response.data;

    if(token){
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  } catch (error) {
    if(error.response && error.response.data.message){
      setError(error.response.data.message);
    }else{
      setError("Somthing went wrong. Please try again.")
    }
  }
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-xl font-bold text-black">Welcomce Back</h3>
      <p className="text-xs text-slate-800 mt-[5px] mb-6">Please Enter Your Detail To Login</p>

      <form onSubmit={handleLogin}>
      <Input
      value= {email}
      onChange={({ target }) => setEmail(target.value)}
      label="Email Address"
      placeholder="john@example.com"
      type="text"
      />

    <Input
      value= {password}
      onChange={({ target }) => setPassword(target.value)}
      label="Password"
      placeholder="Password must be 8 charachter"
      type="password"
      />

      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

      <button type="submit" className="btn-primary">
       LOGIN
      </button>

      <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{' '}
        <Link className = "font-medium text-primary underline " to="/signup">
        SignUp
        </Link>
    </p>

      </form>

      </div>
    </AuthLayout>
  )
}

export default Login