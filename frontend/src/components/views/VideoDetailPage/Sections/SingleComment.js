import React, { useState } from 'react';
import {
    Avatar,
    Input,
    Button,
    Comment,
} from 'antd';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import LikeDislikes from "./LikeDislikes"

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(
        (state) => state.user
    );

    const [OpenReply, setOpenReply] = useState(
        false
    );
    const [
        CommentValue,
        setCommentValue,
    ] = useState('');
    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    };
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (
            user.userData &&
            !user.userData.isAuth
        ) {
            return props.history.push('/login');
        }
        const variables = {
            content: CommentValue,
            writter: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
        };
        Axios.post(
            '/api/comment/saveComment',
            variables
        ).then((res) => {
            if (res.data.success) {
                setCommentValue('');
                setOpenReply(false);
            } else {
                alert('댓글 작성 실패');
            }
        });
    };
    const actions = [
        <LikeDislikes userId={localStorage.getItem("userId")} commentId={props.comment._id} />
        ,<span
            onClick={onClickReplyOpen}
            key="comment-basic-reply-to"
        >
            Reply to
        </span>,
    ];

    return (
        <div>
            <Comment
                actions={actions}
                author={
                    props.comment.writter.name
                }
                avatar={
                    <Avatar
                        src={
                            props.comment.writter
                                .image
                        }
                        alt
                    />
                }
                content={props.comment.content}
            />
            {OpenReply && (
                <form
                    onSubmit={onSubmit}
                    style={{ display: 'flex' }}
                >
                    <TextArea
                        style={{
                            width: '100%',
                            borderRadius: '5px',
                        }}
                        value={CommentValue}
                        placeholder="코멘트를 작성해주세요."
                        onChange={onHandleChange}
                    ></TextArea>
                    <br />
                    <Button
                        style={{
                            width: '20%',
                            height: '52px',
                        }}
                        onClick={onSubmit}
                    >
                        등록
                    </Button>
                </form>
            )}
        </div>
    );
}

export default withRouter(SingleComment);
