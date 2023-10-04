import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
    id,
    title,
    registerId,
    registerDate,
    props,
}: {
    id: number;
    title: string;
    registerId: string;
    registerDate: string;
    props: any;
}) => {
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

interface IProps {
    isComplete: boolean;
    handleModify: any;
    renderComplete: any;
}

/**
 * BoardList class
 * @param {SS} e
 */
class BoardList extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
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

    /**
     * @param {boolean} checked
     * @param {any} id
     */
    onCheckboxChange = (checked: boolean, id: any) => {
        const list: Array<string> = this.state.checkList.filter((v) => {
            return v !== id;
        });

        if (checked) {
            list.push(id);
        }

        this.setState({
            checkList: list,
        });
    };

    /**
     */
    componentDidMount() {
        this.getList();
    }

    /**
     */
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

        this.state.checkList.forEach((v: any) => {
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

    /**
     * @return {Component} Component
     */
    render() {
        const { boardList }: { boardList: any } = this.state;

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
                        {boardList.map((v: any) => {
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
                <Button variant="primary">글쓰기</Button>{" "}
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
