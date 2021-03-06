import React, {
    useEffect,
    useState,
} from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card,
    Avatar,
    Col,
    Typography,
    Row,
} from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage(props) {
    const [Video, setVideo] = useState([]);
    useEffect(() => {
        axios
            .get('/api/video/getVideos')
            .then((res) => {
                if (res.data.success) {
                    setVideo(res.data.videos);
                } else {
                    alert('비디오 가져오기 실패');
                }
            });
    }, []);
    const renderCard = Video.map(
        (video, index) => {
            let minutes = Math.floor(
                video.duration / 60
            );
            let seconds = Math.floor(
                video.duration - minutes * 60
            );
            return (
                <Col
                    lg={6}
                    md={8}
                    xs={24}
                    key={index}
                >
                    <a
                        href={`/video/${video._id}`}
                    >
                        <div
                            style={{
                                position:
                                    'relative',
                            }}
                        >
                            <img
                                src={`http://localhost:5000/${video.thumbnail}`}
                                style={{
                                    width: '100%',
                                }}
                                alt=""
                            />
                            <div
                                className=" duration"
                                style={{
                                    bottom: 0,
                                    right: 0,
                                    position:
                                        'absolute',
                                    margin: '4px',
                                    color: '#fff',
                                    backgroundColor:
                                        'rgba(17, 17, 17, 0.8)',
                                    opacity: 0.8,
                                    padding:
                                        '2px 4px',
                                    borderRadius:
                                        '2px',
                                    letterSpacing:
                                        '0.5px',
                                    fontSize:
                                        '12px',
                                    fontWeight:
                                        '500',
                                    lineHeight:
                                        '12px',
                                }}
                            >
                                <span>
                                    {minutes} :{' '}
                                    {seconds}
                                </span>
                            </div>
                        </div>
                    </a>
                    <br />
                    <Meta
                        avatar={
                            <Avatar
                                src={
                                    video.writter
                                        .image
                                }
                            />
                        }
                        title={video.title}
                        description=""
                    />
                    <span>
                        {video.writter.name}
                    </span>
                    <br />
                    <span
                        style={{
                            marginLeft: '3rem',
                        }}
                    >
                        {video.views} views
                    </span>{' '}
                    -{' '}
                    <span>
                        {moment(
                            video.createdAt
                        ).format('MMM Do YY')}
                    </span>
                </Col>
            );
        }
    );
    return (
        <div
            style={{
                width: '85%',
                margin: '3rem auto',
            }}
        >
            <Title level={2}> Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCard}
            </Row>
        </div>
    );
}

export default withRouter(LandingPage);
