interface FavoriteCounterProps {
    favoritesCount: number;
}
export const FavoriteCounter = ({ favoritesCount }: FavoriteCounterProps): JSX.Element => {
    return (
        <button className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" />
            &nbsp; <span className="counter">{favoritesCount}</span>
        </button>
    )
};

