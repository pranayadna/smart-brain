import { Component } from "react"
import Clarifai from 'clarifai'
import ParticlesBg from "particles-bg"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import SignIn from "./components/SignIn/SignIn"
import "./App.css"
import Register from "./components/Register/Register"

const app = new Clarifai.App({
    apiKey: '96c7726ec4d74405970079f308aeacad'
})

class App extends Component {
    constructor(){
        super()
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
        const image = document.getElementById('imageInput')
        const width = image.width
        const height = image.height
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (e) => {
        this.setState({ input: e.target.value })
    }

    onPictureSubmit = () => {
        this.setState({ imageUrl: this.state.input })
        app.models.predict('face-detection', this.state.input)
            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}))
                    })
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            }
        )
        .catch(err => console.log(err))
    }
    
    onRouteChange = (route) => {
        if (route === 'home') {
            this.setState({ isSignedIn: true })
        } else {
            this.setState({ isSignedIn: false })

        }
        this.setState({ route: route })
    }

    loadUser = (data) => {
        this.setState({ user: 
            {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            } 
        })
    }

    render(){
        const { isSignedIn, route, box, imageUrl, user } = this.state
        return(
            <div className="App">
                <ParticlesBg type="fountain" bg={true} />
                <Navigation isSignedInStatus={isSignedIn} onRouteChange={this.onRouteChange}/>
                {
                    route === 'signin' 
                        ?   <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        :   route === 'register'   
                        ?   <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        :   <div>
                                <Logo />
                                <Rank name={user.name} entries={user.entries}/>
                                <ImageLinkForm 
                                    onInputChange={this.onInputChange}
                                    onPictureSubmit={this.onPictureSubmit}
                                />
                                <FaceRecognition box={box} imageUrl={imageUrl}/>
                            </div>

                }
            </div>
        )
    }
}

export default App