import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const {id} = useParams();


  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error while getting the article');
      });
      fetchComments();
  }, []);
  
  

  
  const fetchComments = async () => {
    axios
    .get(`/comments?postId=${id}`)
    .then((res) => {
      setComments((prevComments) => {
        return res.data.map((item) => ({
          user: {
            fullName: item.user.fullName,
            avatarUrl: item.user.avatarUrl ? item.user.avatarUrl : "https://mui.com/static/images/avatar/1.jpg",
          },
          text: item.text,
        }));
      });
    })
    .catch((err) => {
      console.warn(err);
      alert('Error while getting the comments');
    });
  }
  const handleCommentSubmit = async (comment) => {
    try {
      const fields = {
        text: comment,
        postId: id,
      };

      await axios.post(`/comments`, fields);
      fetchComments(); // Fetch updated comments after submitting
    } catch (error) {
      console.warn(error);
      alert("Error, cannot create comment");
    }
  };



  if (isLoading) {
    return <Post isLoading={isLoading}></Post>
  }
  
  return (
    <>
      <Post
        id={data.id}
        title={data.title}
        imageUrl= {data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text}></ReactMarkdown>

      </Post>
      <CommentsBlock
        items={comments}
        // items={[
        //   {
        //     user: {
        //       fullName: "Oleksandr",
        //       avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
        //     },
        //     text: "Test commentar 555555",
        //   },
        //   {
        //     user: {
        //       fullName: "Ivan",
        //       avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
        //     },
        //     text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
        //   },
        // ]}
        isLoading={false}
      >
        <Index handleCommentSubmit={handleCommentSubmit}/>
      </CommentsBlock>
    </>
  );
};