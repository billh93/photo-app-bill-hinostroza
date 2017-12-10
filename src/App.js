import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./App.css";
import DropdownMenu from 'react-dd-menu';

// We will store our style for our gray background here
// Look at line 119 for more info
let grayBackground = {};

// TODO: Make APP pretty using SASS
// TODO: Make APP responsive using custom Grid
// TODO: Create tests using jests

export class Sticky extends Component {
  componentDidMount() {
    const setInitialHeights = (elements) => {
      [].forEach.call(elements, (sticky) => {
        sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top);
      });
    };

    const stickies = document.querySelectorAll('[data-sticky]');
    setInitialHeights(stickies);

    document.addEventListener('scroll', () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      const bottom = document.documentElement.scrollHeight || document.body.scrollHeight;

      [].forEach.call(stickies, (sticky) => {
        const stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10);
        const stickyEnter = parseInt(sticky.getAttribute('data-sticky-enter'), 10) || stickyInitial;
        const stickyExit = parseInt(sticky.getAttribute('data-sticky-exit'), 10) || bottom;

        if (top >= stickyEnter && top <= stickyExit) {
          sticky.classList.add('sticky');
        } else {
          sticky.classList.remove('sticky');
        }
      });
    });
  }

  render() {
    const { className, enter, exit, children } = this.props;
    return (<div
      className={`Sticky ${className}`}
      data-sticky
      data-sticky-enter={enter}
      data-sticky-exit={exit}>
      {children}
    </div>);
  }
}

Sticky.propTypes = {
  className: PropTypes.string,
  enter: PropTypes.string,
  exit: PropTypes.string,
  children: PropTypes.node,
};

class DropMenu extends Component {
  constructor() {
    super();
    this.state = {
        isMenuOpen: false
    };
    this.click = this.click.bind(this);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close() {
    this.setState({ isMenuOpen: false });
  }

  click() {
    console.log('You clicked an item');
  }

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <span onClick={this.toggle}>Menu</span>,
      align: 'right'
    };
    return (
      <DropdownMenu {...menuOptions}>
        <li onClick={this.click}>Edit Profile</li>
        <li onClick={this.click}>Account Settings</li>
        <hr />
        <li onClick={this.click}>Log Out</li>
      </DropdownMenu>
    );
  }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: '',
            total_pages: '',
            query: '',
            photos: []
        };
    }

    // Sets the query state to the users input value
    handleChange = (e) => this.setState({query: e.target.value});

    // When submit is clicked or form is returned this function will run
    handleSubmit(e){
        // When user submits form and images are retrieved
        // imagesContainer background turns gray
        grayBackground = {'background-color': '#F5F5F5'};
        // URL we're going to call to get our images
        let API = "https://api.500px.com/v1/photos/search?consumer_key=vpwYm5gVpNd9PIcVRsNm8OdbcrTA0RUmqwnRj3af&term=";
        // We're appending the users query to the end of the API variable
        let url = API + this.state.query;
        // We're fetching the JSON data from our url variable
        fetch(url).then(results => {
            // We're getting our results back in a format that is friendly for the browser and our program
            return results.json();
        }).then(data => {
            // If data.photos is blank, show user 'No Results Found'
            if((data.photos || []).length === 0){
                // Removes styling in imagesContainer
                grayBackground = {};
                alert("Sorry, no results show up for your search!");
            }
            // We're essentially running a for loop and displaying the data into html
            let photos = data.photos.map(pics => {
                return(
                    <div key={pics.id} className="images">
                        <img src={pics.image_url} alt={pics.name}/>
                    </div>
                );
            });
            // We're setting the state of our objects to current values that hold data
            // Only exception is the query object since we're clearing it from the input text field form
            this.setState({
                page: data.current_page,
                total_pages: data.total_pages,
                query: '',
                photos: photos
            });
            // If there is an error with retrieving data from the API URL this will run
        }).catch(error => {
            console.log(error);
            alert("There was an error getting your pictures.\nPlease try again if error persists contact us!");
        });
        // Prevents the web page from reloading; Giving that SPA feel
        e.preventDefault();
    }

    render() {
        return (
            <div className="App">
                <Sticky className="navContainer" enter={1}>
                    <ul>
                        <li>Bill</li>
                        <li className="DDMenu"><DropMenu /></li>
                    </ul>
                </Sticky>
                <form className="searchBar" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" value={this.state.query} onChange={this.handleChange.bind(this)} placeholder="Search Here" />
                    <input type="submit" value="Submit"/>
                </form>
                <div className="imagesContainer" ref="imagesContainer" style={grayBackground}>
                    {this.state.photos}
                </div>
            </div>
        );
    }
}

export default App;
