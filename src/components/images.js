import React, {Component} from "react";

const API =
    "https://api.500px.com/v1/photos?feature=fresh_today&sort=created_at&image_size=3&include_store=store_download&include_states=voted&consumer_key=vpwYm5gVpNd9PIcVRsNm8OdbcrTA0RUmqwnRj3af";

class ShowImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '',
            total_pages: '',
            photos: []
        };
    }
    componentWillMount() {
        let url = API;
        fetch(url).then(results => {
                return results.json();
            }).then(data => {
                let photos = data.photos.map((pics) => {
                    return(
                        <div key={pics.id} className="images">
                            <img src={pics.image_url} alt={pics.name}/>
                        </div>
                    );
                });
                this.setState({
                    page: data.current_page,
                    total_pages: data.total_pages,
                    photos: photos
                });
            })
            .catch((error) => {
                console.log("Oops! . There Is A Problem");
            });
    }
    render() {
        return (
            <div>
                <p>{this.state.query}</p>
                {this.state.photos}
            </div>
        );
    }
}

export default ShowImages;
