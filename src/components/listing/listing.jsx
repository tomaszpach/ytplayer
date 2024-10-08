import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClips } from '../../API/clips/clips';
import './listing.scss';
import { Sort } from '../sort/sort';
import { timeAgo } from '../../helpers/dates';
import { SORTING_OPTIONS } from '../../consts/consts';

export const Listing = () => {
    const [videList, setVideList] = React.useState(null);
    const [sortBy, setSortBy] = React.useState(SORTING_OPTIONS.newest);

    useEffect(() => {
        getClips(sortBy).then((data) => {
            setVideList(data);
        });
    }, [sortBy]);

    return (
        <div id="listing">
            <Sort setSortBy={setSortBy} />
            <div className="videos">
                {videList ? (
                    videList.map((video) => {
                        const { id, name, thumbnail, created_at, likes } =
                            video;
                        return (
                            <Link to={`video/${id}`} key={id}>
                                <div className="video-item">
                                    <h2 className="title">{name}</h2>
                                    <img
                                        className="thumbnail"
                                        src={thumbnail}
                                        alt={name}
                                    />
                                    <div className="dates">
                                        <span className="time-ago">
                                            {timeAgo(created_at)}
                                        </span>
                                        <span className="created-at">
                                            ({created_at})
                                        </span>
                                    </div>

                                    <div className="likes">
                                        <span className="like-count">
                                            {likes} likes
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};
