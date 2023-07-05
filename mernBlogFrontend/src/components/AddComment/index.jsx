import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "../../axios";

export const Index = ( {handleCommentSubmit} ) => {

  const [comment, setComment] = useState();
  const { id } = useParams()

  const onSubmit = async (e)=> {
    e.preventDefault();
  
    handleCommentSubmit(comment);
    setComment("");
  }
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <form onSubmit={onSubmit} className={styles.form}>
          <TextField 
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value = {comment}
            onChange={(e)=> setComment(e.target.value)}
          />
          <Button type="Submit" variant="contained">Send</Button>
        </form>
      </div>
    </>
  );
};
