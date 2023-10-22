import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import axios from 'axios';

const API_KEY = '40102553-33a3d48fe948215f1948fb075';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    status: 'idle',
    showModal: false,
    selectedImage: '',
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

    handleScroll = () => {
    const { status } = this.state;
    if (status === 'resolved' && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.handleLoadMore();
    }
    };

    handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1, status: 'pending' }), this.fetchImages);
  };

fetchImages = () => {
  const { query, page } = this.state;
  this.setState({ status: 'pending' });

  axios
    .get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)

    .then((response) => {
      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
        status: 'resolved',
      }));
    })
    .catch((error) => {
      this.setState({ status: 'rejected' });
      console.error('Error fetching data: ', error);
    });
};

  handleSearchSubmit = (query) => {
    this.setState({
      query,
      images: [],
      page: 1, 
      status: 'pending',
    });
  };

  handleLoadMoreClick = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchImages);
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ showModal: true, selectedImage: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, status, showModal, selectedImage } = this.state;
    const shouldRenderButton = status === 'resolved' && images.length > 0 && images.length >= 12 && status !== 'pending';
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={this.handleImageClick} />
            {shouldRenderButton && <Button
              shouldRenderButton={true}
              onLoadMore={this.handleLoadMore}
              onClick={this.handleLoadMoreClick}
              isHidden={images.length === 0}
            />}
          </>
        )}
        {status === 'rejected' && <p>Error loading images.</p>}
        {showModal &&
          <Modal
            largeImageURL={selectedImage}
            onClose={this.handleCloseModal}
            isOpen={showModal}
            onModalClick={this.handleModalClick}
            onEscKeyDown={this.handleKeyDown}
          />}
      </div>
    );
  }
};

export default App;


  