import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import "../CSS/AdminNewPass.css"
function AdminNewPass() {
  const baseUrl="http://localhost:5001/admin/newPassword";
  const {state}=useLocation();
  const navigate=useNavigate();
  const [isFormSetted,setIsFormSetted]=useState(false);
  const [adminData,setAdminData]=useState({usn:""});
  const [formData,setFormData]=useState({usn:"",newPass:"",confirmedPass:""});
  const [isFormValidated,setIsFormValidated]=useState(false);
  const [formError,setFormError]=useState({});
  const [loading,setLoading]=useState(false);
  const handleNewPass=(e)=>{
    e.preventDefault();
    setIsFormValidated(false);
    setFormError({})
    setIsFormSetted(true);
    setFormData({usn:adminData?.usn,newPass:e.target[0].value,confirmedPass:e.target[1].value});
  }
  const formValidater=()=>{
    const error={}
    if(!formData.newPass){
      error.newPassError="Can't set empty password";
    }else if(formData.newPass!==formData.confirmedPass){
      error.confirmedPassError="Password not matched";
    }
    setFormError(error);
    return true;
  }
  useEffect(()=>{
    setAdminData({usn:state?.usn});
  },[])
  useEffect(()=>{
    if(isFormSetted){
      setIsFormValidated(formValidater());
      setIsFormSetted(false);
    }
  },[isFormSetted])

  useEffect(()=>{
    if(isFormValidated&&Object.keys(formError).length===0){
      (async ()=>{
        try{
          setLoading(true);
          const response=await axios.put(`${baseUrl}/${adminData.usn}`,{password:formData.confirmedPass});
         
          if(response.data?.status){
         
            navigate("/AdminLogin")
          }
        }catch(err){
          console.log(err);
        }finally{
          setLoading(false);
          console.log("finished")
        }
      }
       )();
    }
  },[isFormValidated])
  useEffect(()=>{
    if(!state?.otpVerified){
      navigate("/AdminLogin")
    }
},[state])
  return (
    <>
      <div className="admin-new-passs-container">
        <form onSubmit={handleNewPass}>
        <div
            className={`loading-overlay ${loading ? `form-loading` : ``}`}
          ></div>
          <div className={`progress-bar ${loading ? `form-loading` : ``}`}>
            <div className="progress-bar-value"></div>
          </div>
          <h1>Login to your account</h1>
          <input type="password" placeholder="New password..." />
          <input type="password" placeholder="Confirm password.." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default AdminNewPass;
