import {body} from 'express-validator'


export const registerValidation = [
    body('email', 'incorrect email format').isEmail(),
    body('password', 'minimum length is 5').isLength({min: 5}),
    body("fullName", 'Write your name').isLength({min: 1}),
    body('avatarUrl', 'incorrect url').optional().isURL(),
]



export const loginValidation = [
    body('email', 'incorrect email format').isEmail(),
    body('password', 'minimum length is 5').isLength({min: 5}),
]


export const postCreateValidation = [
    body('title', 'Enter title for article').isLength({min:3}).isString(),
    body('text', 'Enter text of the article').isLength({min:3}).isString(),
    body('tags', 'Incorrect format of tags').optional().isString(),
    body('imageUrl', 'Incorrect url for image').optional().isString(),
]