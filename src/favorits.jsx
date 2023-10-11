import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorits } from "./contentSlice";
import { } from "./style.scss"
export default function Favorits() {
    const favorits = useSelector((state) => state.favorits.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavorits());
    }, [dispatch]);

    const styleForImg = {
        width: "100px",
        height: "100px",
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/favorites/${id}`, {
                method: "DELETE",
            });
            dispatch(fetchFavorits());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Link className="NavMenu" to={"/"}>Go back  </Link >

            {favorits.map((favorite, index) => (
                <div key={index}>
                    <img src={favorite.img} style={styleForImg} alt="error" />
                    <p>{favorite.name}</p>
                    <button onClick={() => handleDelete(favorite.id)}>Delete</button>
                </div>
            ))}
        </>
    );
}
