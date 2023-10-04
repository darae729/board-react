import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardList from "./BoardList"; // Corrected import path
import Write from "./Write"; // Corrected import path
import Navi from "./Nav";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModifyMode: false,
            isComplete: true,
            boardId: 0,
        };
    }

    handleModify = (checkList) => {
        if (checkList.length === 0) {
            alert("수정할 게시글을 선택하세요.");
        } else if (checkList.length > 1) {
            alert("하나의 게시글만 선택하세요.");
        }

        this.setState({
            isModifyMode: checkList.length === 1,
            boardId: checkList[0] || 0,
        });
    };

    handleCancel = () => {
        this.setState({
            isModifyMode: false,
            isComplete: false,
            boardId: 0,
        });
    };

    renderComplete = () => {
        this.setState({
            isComplete: true,
        });
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Router>
                        <Navi />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <BoardList isModifyMode={this.state.isModifyMode} boardId={this.state.boardId} />
                                }
                            />
                            <Route
                                path="/write"
                                element={
                                    <Write
                                        isModifyMode={this.state.isModifyMode}
                                        boardId={this.state.boardId}
                                        handleCancel={this.handleCancel}
                                    />
                                }
                            />
                        </Routes>
                    </Router>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
