import React, { Fragment, useCallback } from "react";
import './item.scss';

const GalleryItem = props => {
    const { item } = props;

    const imageUrl = item.image.url;
    const imageAlt = item.image.alt;
    const name = item.name;

    // const handleChange = useCallback(() => {
    // }, []);

    const options = item?.options?.colors.map((color, i) => {
        return (
            <li key={i} className="option">
                <button
                    // onClick={handleChange}
                    title={color}
                    style={{ backgroundColor: color }}
                    className="item-color"
                />
            </li>
        )
    })
    return (
        <Fragment>
            <div className="item">
                <div className="item-wrap">
                    <div className="item-image">
                        <a href="#">
                            <img src={imageUrl} alt={imageAlt} />
                        </a>
                    </div>
                    <div className="item-detais">
                        <h3 className="item-name">{name}</h3>
                        <ul className="item-options">
                            {options}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GalleryItem;