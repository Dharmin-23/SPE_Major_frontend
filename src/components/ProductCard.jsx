import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function ProductCard(props) {
  const { id, name, description, imgUrl } = props;

  function handleClick(e) {
    console.log("More info wanted");
  }

  return (
    <Card>
      <CardMedia component="img" height="140" image={imgUrl} alt="Product pic" />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      {id !== -1 && (
        <CardActions>
          <Button
            component={Link}
            to={`/productInfo/${id}`}
            variant="contained"
            color="info"
          >
            Know more
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default ProductCard;
