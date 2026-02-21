import { Lock, Mail, User2Icon } from 'lucide-react'
import React from 'react'
import api from '../configs/api';
import { useDispatch } from 'react-redux';
import { login } from '../app/features/authSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = React.useState("login")
  const [otpSent, setOtpSent] = React.useState(false);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        otp: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(state === "register"){
                if(!otpSent){
                    const {data} = await api.post('/api/users/register/send-otp',{
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    });
                    setOtpSent(true);
                    toast.success(data.devOtp ? `${data.message} (DEV OTP: ${data.devOtp})` : data.message);
                    return;
                }

                const {data}=await api.post('/api/users/register', {
                    email: formData.email,
                    otp: formData.otp
                });
                if (!data?.token || !data?.user) {
                    throw new Error("Invalid server response. Check frontend API base URL.");
                }
                dispatch(login(data));
                localStorage.setItem('token', data.token);
                toast.success(data.message || "Registration successful");
                navigate('/app', { replace: true });
                return;
            }

            const {data}=await api.post('/api/users/login', {
                email: formData.email,
                password: formData.password
            });
            if (!data?.token || !data?.user) {
                throw new Error("Invalid server response. Check frontend API base URL.");
            }
            dispatch(login(data));
            localStorage.setItem('token', data.token);
            toast.success(data.message || "Login successful");
            navigate('/app', { replace: true });
        } catch (error) {
            toast(error?.response?.data?.message||error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    React.useEffect(() => {
        const query = new URLSearchParams(location.search);
        const urlState = query.get('state');
        if (urlState === "register" || urlState === "login") {
            setState(urlState);
        } else {
            setState("login");
        }
    }, [location.search]);

    React.useEffect(()=>{
        if(state === "login"){
            setOtpSent(false);
            setFormData(prev => ({...prev, otp:''}));
        }
    },[state]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                       <User2Icon size={16} color='#6B7280'/>
                      <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail size={13} color='#6B7280'/>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock size={13} color='#6B7280'/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                {state === "register" && otpSent && (
                    <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User2Icon size={13} color='#6B7280'/>
                        <input type="text" name="otp" placeholder="Enter OTP" className="border-none outline-none ring-0" value={formData.otp} onChange={handleChange} required />
                    </div>
                )}
                <div className="mt-4 text-left text-green-500">
                    {state === "login" ? (
                        <button className="text-sm" type="reset">Forget password?</button>
                    ) : (
                        otpSent && (
                            <button
                                className="text-sm"
                                type="button"
                                onClick={async ()=>{
                                    try {
                                        const {data} = await api.post('/api/users/register/send-otp',{
                                            name: formData.name,
                                            email: formData.email,
                                            password: formData.password
                                        });
                                        toast.success(data.devOtp ? `OTP resent (DEV OTP: ${data.devOtp})` : 'OTP resent successfully');
                                    } catch (error) {
                                        toast(error?.response?.data?.message||error.message);
                                    }
                                }}
                            >
                                Resend OTP
                            </button>
                        )
                    )}
                </div>
                <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
                    {state === "login" ? "Login" : (otpSent ? "Verify & Sign up" : "Send OTP")}
                </button>
                <p className="text-gray-500 text-sm mt-3 mb-11">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => {
                            setState(prev => prev === "login" ? "register" : "login");
                            setOtpSent(false);
                            setFormData({ name:'', email:'', password:'', otp:''});
                        }}
                        className="text-green-500 hover:underline"
                    >
                        click here
                    </button>
                </p>
            </form>
    </div>
  )
}

export default Login
