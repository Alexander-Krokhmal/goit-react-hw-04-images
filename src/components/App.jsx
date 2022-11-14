import  { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import * as API from './services/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadBtnIsShown, setLoadBtnIsShown] = useState(false);

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  }

  const onLoadMoreBtn = () => {
    setPage(prevState => prevState + 1);
  }

  useEffect(() => {

    if (!query) return;

    searchImages();

    async function searchImages() {
      setIsLoading(true);
      setLoadBtnIsShown(false);
    
      try {
        const image = await API.fetchImage(query, page);
        if (image.totalHits === 0) {
          throw new Error('There are no images found for your request. Please, try more :)');
        }

        const remainingPages = Math.ceil(image.totalHits / image.hits.length) - page;

        if (remainingPages > 0) setLoadBtnIsShown(true);

        setImages(prevImages => [...prevImages, ...image.hits]);
        setIsLoading(false);
        

      }
      catch (error) {
        throw new Error('There is no images found for your request! Please, try more :)')
      }
    }


  }, [page, query]);
  
//   async componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;

//   if (prevState.query !== query || prevState.page !== page) {
//     this.setState({ isLoading: true, loadBtnIsShown: false });
//     try {
//       const image = await API.fetchImage(query, page);
//       if (image.totalHits === 0) {
//         throw new Error('There are no images found for your request. Please, try more :)');
//       }

//       const remainingPages = Math.ceil(image.totalHits / image.hits.length) - page;
//       console.log(remainingPages);
//       if (remainingPages > 0) this.setState({loadBtnIsShown: true});
        
//       this.setState(state => ({
//         images: [...state.images, ...image.hits],
//         isLoading: false,
//       }));
//     }
//     catch (error) {
//       throw new Error ('There is no images found for your request! Please, try more :)')
//     }
    
//   }
// }

    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery items={images} />

        {isLoading && (<Loader/>)}
              
        {loadBtnIsShown && (
          <Button onClick={onLoadMoreBtn}>Load More</Button>)}
        
      </div>
    );
}


