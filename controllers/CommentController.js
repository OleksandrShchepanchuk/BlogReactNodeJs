
import CommentModel from "../models/Comment.js";



export const getAllCommentsByPost = async (req, res) => {
    try {
        const postId = req.query.postId;
        const comments = await CommentModel.find({
            post: postId,
        }).populate('user').populate('post').exec();

        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't get the comments",
        });
    }
}


export const getComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const doc = await CommentModel.findOneAndUpdate(
            { _id: commentId },
            { new: true },
        ).populate('user').populate('post').exec();

        if (!doc) {
            return res.status(404).json({
                message: "Comment is not found",
            });
        }

        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't get the Comment",
        });
    }
};

export const createComment = async (req, res) =>
{
    console.log({
        text: req.body.text,
        user: req.userId,
        post: req.body.postId,
    })
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            post: req.body.postId,
        });
        

        const comment = await doc.save();
        res.json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't create Comment",
        });
    }
}
