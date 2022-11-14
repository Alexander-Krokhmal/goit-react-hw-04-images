import { useState } from 'react';
import Modal from 'components/Modal/Modal';

import propTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGalleryItem({ previewImage, largeImage, tags }) {
    const [showModal, setShowModal] = useState(false);
      
    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
        return(
            <>
                <li className={css.ImageGalleryItem} onClick={toggleModal}>
                        <img className={css.ImageGalleryItem_image} src={previewImage} alt={tags} />
                </li>
    
                {showModal && (
                    <Modal onClose={toggleModal}>
                        <img src={largeImage} alt={tags} />
                    </Modal>
                )}
            </>
        )
}

ImageGalleryItem.propTypes = {
    previewImage: propTypes.string.isRequired,
    largeImage: propTypes.string.isRequired,
    tags: propTypes.string.isRequired,
  }