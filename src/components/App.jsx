import React, {Component} from "react";
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import axios from 'axios';

const API_KEY = '40102553-33a3d48fe948215f1948fb075';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle', // 'idle', 'pending', 'resolved', 'rejected'
    isOpen: false,
    selectedImage: '',
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({
      query: searchQuery,
      images: [],
      page: 1,
      status: 'pending',
    });

    axios
      .get(`https://pixabay.com/api/?q=${searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then((response) => {
        this.setState({
          images: response.data.hits,
          page: 2,
          status: 'resolved',
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          images: [],
          status: 'rejected',
        });
      });
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.setState({
      status: 'pending',
    });

    axios
      .get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then((response) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          status: 'rejected',
        });
      });
  };

  handleImageClick = (largeImageURL) => {
    this.setState({
      isOpen: true,
      selectedImage: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      selectedImage: '',
    });
  };

  render() {
    const { images, status, isOpen, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={this.handleImageClick} />
            <Button shouldRenderButton={true} onLoadMore={this.handleLoadMore} />
          </>
        )}
        {status === 'rejected' && <p>Error loading images.</p>}
        {isOpen && <Modal isOpen={isOpen} largeImageURL={selectedImage} onClose={this.closeModal} />}
        {/* {isOpen && <Modal isOpen={isOpen} largeImageURL={selectedImage} />} */}
      </div>
    );
  }
}

export default App;
