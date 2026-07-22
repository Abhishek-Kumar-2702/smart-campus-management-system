import { useNavigate } from "react-router-dom";

function Login(){

const navigate = useNavigate();


return(

<div>

<h1>Smart Campus Login</h1>


<button onClick={()=>navigate("/student")}>
Student Login
</button>


<button onClick={()=>navigate("/faculty")}>
Faculty Login
</button>


<button onClick={()=>navigate("/admin")}>
Admin Login
</button>


</div>

)

}

export default Login;