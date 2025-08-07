import { useContext, useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate inputs
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-bold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-800 mt-[5px] mb-6">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            required
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.5">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            className="btn-primary cursor-pointer w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>

          <p className="text-[13px] text-slate-800 mt-3 text-center">
            Don't have an account?{' '}
            <Link 
              className="font-medium text-primary underline" 
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;