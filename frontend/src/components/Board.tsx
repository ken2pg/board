import * as React from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import '../Board.scss';

const Board = () => {
  const [inputName, setInputName] = React.useState('');
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [boardList, setBoardList] = React.useState([
    {
      name: '匿名1',
      email: '',
      contents: '',
    },
  ]);

  const handleClose = () => setIsOpenDialog(false);
  const handleOpen = () => setIsOpenDialog(true);

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handlePost = () => {
    setBoardList([...boardList, { name: inputName, email: '', contents: inputText }]);
    setInputName('');
    setInputText('');
  };
  return (
    <div className="Board">
      <Card style={{ width: '90%' }} className="CardComponent">
        <Card.Body>
          <div className="cardTitle">好きなアニメのジャンルは？</div>
          <div className="cardDetail">コメント数：{boardList.length}</div>
          <Button
            className="PostButton"
            onClick={() => {
              handleOpen();
            }}
          >
            投稿
          </Button>
          <hr />
          <div>
            {boardList.map((item, index) => {
              return (
                <div className="boardContent">
                  <p>
                    {index + 1}. {}
                    {item.name}
                  </p>
                  <p>{item.contents}</p>
                  <hr />
                </div>
              );
            })}
          </div>
        </Card.Body>
      </Card>
      <Modal show={isOpenDialog} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>コメント投稿</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>ニックネーム</Form.Label>
              <Form.Control
                type="name"
                placeholder="ニックネームを入力してください"
                onChange={handleInputName}
              />
              {/* <Form.Text className="text-muted"></Form.Text> */}
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>投稿内容</Form.Label>
              <Form.Control as="textarea" rows={5} onChange={handleInputText} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handlePost();
            }}
          >
            投稿
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Board;
