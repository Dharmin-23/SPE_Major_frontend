import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/route";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardHeader } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </React.Fragment>
// );

function MyProfile() {
  // const { user, setUser } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  function checkLogin() {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  const handleMyProductsClick = () => {
    navigate(routes.MyProducts);
  };

  const handleTradeRequestsClick = () => {
    navigate(routes.TradeRequests);
  };


  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <Card sx={{ maxWidth: 345, maxHeight: 300, width: '100%' }}>
    <CardHeader
          title={`${user.fname}'s Profile Page`}
        />
      <div className="my-profile-page">
        <div className="person-details">
          
          <div>
          <Typography variant="h6" gutterBottom> ID: {user.id} </Typography>
          <Typography variant="h6" gutterBottom> First Name: {user.fname} </Typography>
          <Typography variant="h6" gutterBottom> Last Name: {user.lname} </Typography>
          <Typography variant="h6" gutterBottom> Email: {user.email} </Typography>
 
            {/* <h6></h6>
            <h6>First Name: {user.fname}</h6>
            <h6>Last Name: {user.lname}</h6>
            <h6>Email: {user.email}</h6> */}

            {/* <Link
              to={routes.MyProducts}
              className="btn btn-primary"
              style={{ margin: "5px" }}
            >
              My Products
            </Link>

            <Link
              to={routes.TradeRequests}
              className="btn btn-success"
              style={{ margin: "5px" }}
            >
              My Swap Requests
            </Link> */}

<Button
                variant="contained"
                color="primary"
                onClick={handleMyProductsClick}
                style={{ margin: "5px" }}
              >
                My Products
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleTradeRequestsClick}
                style={{ margin: "5px" }}
              >
                My Swap Requests
              </Button>
          </div>
        </div>
      </div>
    </Card>
  </Box>
  );
}

export default MyProfile;
