import React from "react";
import { getUserImage } from "../../utils/getUserImage";

interface AuthorInfoProps {
    username: string;
    image: string;
    bio: string;
    isFollowed: boolean;
}

export const AuthorDetailsInfo = ({ username, image, bio }: AuthorInfoProps): JSX.Element => {
    return (
        <div className="user-info">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <img src={getUserImage(image)} className="user-img" />
                        <h4>{username}</h4>
                        <p>
                            {bio}
                        </p>
                        <button className="btn btn-sm btn-outline-secondary action-btn">
                            <i className="ion-plus-round" />
                            &nbsp; Follow {username}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

