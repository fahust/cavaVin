import React from 'react'
import {Button, InputGroup, FormControl, Form} from 'react-bootstrap';
const axios = require("axios");


class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            img: '',
            vin: this.props.vin,
            user: this.props.user,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        var file = this.state.file;
        var vinName = this.state.vin.name
        var owner = this.state.user
        //file.owner = 'test';
        formData.append('myImage',file);
        formData.append('vinname',vinName);
        formData.append('owner',owner);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3000/upload",formData,config)
            .then((response) => {
                this.props.loadImage(response.data.imageBuffer);
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <InputGroup className="mb-3">
                    <Form.File 
                        id="custom-file-translate-scss"
                        label="ajouter/modifier l'image"
                        lang="FR"
                        onChange={this.onChange}
                        name="myImage"
                        custom
                    />
                    <InputGroup.Append>
                        <Button variant="dark" type="submit">Envoyer</Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>
        )
    }
}

export default ReactUploadImage