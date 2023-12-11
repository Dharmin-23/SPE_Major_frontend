import React, { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import routes from "../router/route";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ProductInfoCard(props) {
  let navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const { id, imgLink, name, description, owner, ownerId } = props;

  async function deletePrd(prdId) {
    await axios.delete(baseUrl + `/product/delete/${prdId}`);
    alert(
      "Product deleted successfully!!!.\nRedirecting to My Products page."
    );
    setShowConfirm(false);
    navigate(routes.MyProducts);
  }

  return (
    <Card style={{ maxWidth: 400, margin: "auto" }}>
      <CardMedia
        component="img"
        height="140"
        image={imgLink}
        alt="Product pic"
        style={{ width: "100%", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Name: {name}
        </Typography>
        <Typography variant="subtitle1">Product Id: {id}</Typography>
        <Typography variant="subtitle1">Owner: {owner}</Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
      <CardActions>
        {user == null && (
          <Link
            component={RouterLink}
            to={routes.LoginPage}
            variant="contained"
            color="primary"
          >
            Login to Swap
          </Link>
        )}
        {user != null && user.id !== ownerId && (
          <Link
            component={RouterLink}
            to={`/createSwapRequestPage/${id}`}
            variant="contained"
            color="primary"
          >
            Request Swap
          </Link>
        )}
        {user != null && user.id === ownerId && (
          <Link
            component={RouterLink}
            to={`/editProduct/${id}`}
            variant="contained"
            color="primary"
            style={{ marginRight: "15px", marginLeft: "40px"}}
          >
            Update Product
          </Link>
        )}
        {user != null && user.id === ownerId && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowConfirm(true)}
            style={{ marginLeft: "15px"}}
          >
            Delete Product
          </Button>
        )}
      </CardActions>

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deletePrd(id)} color="error">
            Yes
          </Button>
          <Button onClick={() => setShowConfirm(false)}>No</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default ProductInfoCard;
