import React, { Component } from "react";
import axios from "axios";

export default class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            date: "",
            done : false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { title, description, date } = this.state;

        axios
            .post(
                "http://localhost:3001/todos",
                {
                    todo: {
                        title: title,
                        description : description,
                        date : date
                    }
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response.data.status === "created") {
                    this.props.handleSuccessfulAuth(response.data);
                }
            })
            .catch(error => {
                console.log("registration error", error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="date"
                        placeholder="Date"
                        value={this.state.date}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}
