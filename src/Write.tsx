import React from "react";
import { Component } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

interface IProps {
    isModifyMode: boolean;
    boardId: number;
    handleCancel: any;
}

/**
 * Write class
 * @param {SS} e
 */
class Write extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            title: "",
            content: "",
            isRendered: false,
        };
    }

    state = {
        title: "",
        content: "",
        isRendered: false,
    };

    write = () => {
        Axios.post("http://localhost:5555/insert", {
            title: this.state.title,
            content: this.state.content,
        })
            .then((res) => {
                this.setState({
                    title: "",
                    content: "",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    update = () => {
        Axios.post("http://localhost:5555/update", {
            title: this.state.title,
            content: this.state.content,
            id: this.props.boardId,
        })
            .then((res) => {
                this.setState({
                    title: "",
                    content: "",
                });
                this.props.handleCancel();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    detail = () => {
        Axios.post("http://localhost:5555/detail", {
            id: this.props.boardId,
        })
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        title: res.data[0].TITLE,
                        content: res.data[0].CONTENT,
                    });
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };

    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    /**
     *
     * @param {any} prevProps
     */
    componentDidUpdate = (prevProps: any) => {
        if (this.props.isModifyMode && this.props.boardId !== prevProps.boardId) {
            this.detail();
        }
    };

    /**
     * @return {Component} Component
     */
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <Form>
                    <Form.Group className="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            placeholder="제목을 입력하세요"
                        />
                    </Form.Group>
                    <Form.Group className="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeholder="내용을 입력하세요"
                        />
                    </Form.Group>
                </Form>
                <br />
                <Button variant="primary" onClick={this.props.isModifyMode ? this.update : this.write}>
                    확인
                </Button>{" "}
                <Button variant="dark" onClick={this.props.handleCancel}>
                    취소
                </Button>
            </div>
        );
    }
}

export default Write;
