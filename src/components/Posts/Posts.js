import React from "react";
import Post from "./Post/Post";
import useStyles from "./style";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({setCurrentId}) => {
  const classes=useStyles();
  const {posts} = useSelector((state) => state.posts);
  return !posts?.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post,i) => {
        return <Grid key={post.id} item xs={12} sm={12} lg={4} md={6}>
           <Post key={i} post={post} setCurrentId={setCurrentId}/>
        </Grid>;
      })}
    </Grid>
  );
};

export default Posts;
