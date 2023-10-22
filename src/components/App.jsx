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
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    isOpen: false,
    selectedImage: '',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;

    if (query !== prevState.query) {
      this.setState({
        images: [], 
        page: 1, 
        status: 'pending', 
      });

      this.fetchImages(query, 1);
    }
  }

  handleScroll = () => {
    const { status } = this.state;
    if (status === 'resolved' && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.handleLoadMore();
    }
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({
      query: searchQuery,
      images: [],
      page: 1,
      status: 'pending',
    });

    this.fetchImages(searchQuery, 1);
  };

  handleLoadMore = () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    this.fetchImages(query, page);
  };

  fetchImages = (searchQuery, pageNum) => {
    axios
      .get(`https://pixabay.com/api/?q=${searchQuery}&page=${pageNum}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then((response) => {
        this.setState((prevState) => ({
           images: response.data.hits,
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
    const shouldRenderButton = status === 'resolved' && images.length > 0 && images.length >= 12 && status !== 'pending';

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={this.handleImageClick} />
            {shouldRenderButton && <Button shouldRenderButton={true} onLoadMore={this.handleLoadMore} />}
          </>
        )}
        {status === 'rejected' && <p>Error loading images.</p>}
        {isOpen && (
          <Modal
            isOpen={isOpen}
            largeImageURL={selectedImage}
            onClose={this.closeModal}
            onModalClick={this.handleModalClick}
            onEscKeyDown={this.handleKeyDown}
          />
        )}
      </div>
    );
  };
};

export default App;