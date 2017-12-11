import React, { Component } from "react";
import Sticky from './components/sticky.js';
import DropMenu from './components/dropmenu.js';
import "./App.css";

// Global Variables
// We will store our style for our gray background here
// Look at line 31 for more info
let grayBackground = {};

// TODO: Create tests using jests

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
        grayBackground = {'backgroundColor': '#F5F5F5'};
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
                        <p><span className="picViews"><i className="fa fa-eye" aria-hidden="true"></i> {pics.times_viewed}</span>
                        <span className="picRatings"><i className="fa fa-star" aria-hidden="true"></i> {pics.rating}</span></p>
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
                <Sticky className="navContainer" enter={'1'}>
                    <ul>
                        <li>Bill</li>
                        <li className="DDMenu"><DropMenu /></li>
                    </ul>
                </Sticky>
                <form className="searchForm" onSubmit={this.handleSubmit.bind(this)}>
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
