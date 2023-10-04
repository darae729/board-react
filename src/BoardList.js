import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Board = ({ id, title, registerId, registerDate, props }) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    value={id}
                    onChange={(e) => {
                        props.onCheckboxChange(e.currentTarget.checked, e.currentTarget.value);
                    }}
                ></input>
            </td>
            <td>{id}</td>
            <td>{title}</td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    );
};

class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardList: [],
            checkList: [],
        };
    }

    state = {
        boardList: [],
        checkList: [],
    };

    getList = () => {
        Axios.get("http://localhost:5555/list", {})
            .then((res) => {
                const { data } = res;
                this.setState({
                    boardList: data,
                });
                this.props.renderComplete();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    onCheckboxChange = (checked, id) => {
        const list = this.state.checkList.filter((v) => {
            return v !== id;
        });

        if (checked) {
            list.push(id);
        }

        this.setState({
            checkList: list,
        });
    };

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate() {
        if (!this.props.isComplete) {
            this.getList();
        }
    }

    handleDelete = () => {
        if (this.state.checkList.length === 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }

        let boardIdList = "";

        this.state.checkList.forEach((v) => {
            boardIdList += `'${v}',`;
        });

        Axios.post("http://localhost:5555/delete", {
            boardIdList: boardIdList.substring(0, boardIdList.length - 1),
        })
            .then(() => {
                this.getList();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    render() {
        const { boardList } = this.state;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>CHECK</th>
                            <th>NO.</th>
                            <th>CONTENT</th>
                            <th>WRITER</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boardList.map((v) => {
                            return (
                                <Board
                                    id={v.ID}
                                    title={v.TITLE}
                                    registerId={v.REGISTER_ID}
                                    registerDate={v.REGISTER_DATE}
                                    key={v.ID}
                                    props={this}
                                />
                            );
                        })}
                    </tbody>
                </Table>
                <br />
                <Link to="./write">
                    {" "}
                    {/* 글쓰기 버튼을 Link 컴포넌트로 감싸서 Write 페이지로 이동 */}
                    <Button variant="info">글쓰기</Button>{" "}
                </Link>
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.props.handleModify(this.state.checkList);
                    }}
                >
                    수정
                </Button>{" "}
                <Button variant="danger" onClick={this.handleDelete}>
                    삭제
                </Button>{" "}
            </div>
        );
    }
}

export default BoardList;
