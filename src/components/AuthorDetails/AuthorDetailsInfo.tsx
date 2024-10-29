import { getUserImage } from "../../utils/getUserImage";
import { FollowAuthorButton } from "../EngagmentButtons/FollowUpButton";
interface AuthorInfoProps {
    username: string;
    image: string;
    bio: string;
}

export const AuthorDetailsInfo = ({ username, image, bio }: AuthorInfoProps): JSX.Element => {
    return (
        <div className="user-info">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <img src={getUserImage(image)} className="user-img" />
                        <h4>{username}</h4>
                        <p>{bio}</p>
                        <FollowAuthorButton username={username} />
                    </div>
                </div>
            </div>
        </div>
    );
};