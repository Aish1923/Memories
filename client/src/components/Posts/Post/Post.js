import React from "react";
import useStyles from "./style";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import {deletePost,likePost} from '../../../actions/post'

const Post = ({ post,setCurrentId }) => {
  const dispatch=useDispatch();
  const classes = useStyles();
  const removePost=()=>{
    dispatch(deletePost(post._id));
  };
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <Card raised elevation={6} className={classes.card}>
    <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
    <div className={classes.overlay}>
      <Typography variant="h6">{post.name}</Typography>
      <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && <div className={classes.overlay2}>
      <Button style={{ color: 'white' }} size="small" onClick={() => {}}><MoreHorizIcon fontSize="medium" onClick={()=>setCurrentId(post._id)} /></Button>
    </div>}
    <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
    </div>
    <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likes?.length} </Button>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&<Button size="small" color="primary" onClick={() => {removePost()}}><DeleteIcon fontSize="small" /> Delete</Button>}
    </CardActions>
  </Card>
  );
};

export default Post;
