import * as React from 'react';
import BoardContents from './BoardContents';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import '../scss/Board.scss';

const Board = () => {
  const [inputName, setInputName] = React.useState('');
  const [inputEmail, setInputEmail] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [isOpenReplyDialog, setIsOpenReplyDialog] = React.useState(false);
  const [replyId, setReplyId] = React.useState(-1);
  const [boardList, setBoardList] = React.useState([
    {
      name: '匿名',
      email: '',
      contents:
        'こんばんわ。\n\n最近dアニメに加入したのですが、皆さんどのようなアニメジャンルを見ていますか？\n\nジャンルとおすすめのアニメ教えてください！',
      replyId: -1,
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
    setBoardList([...boardList, { name: inputName, email: '', contents: inputText, replyId: -1 }]);
    setInputName('');
    setInputText('');
  };

  //返信機能に使う関数
  const handleReplyDialogOpen = (replyId: number) => {
    setReplyId(replyId);
    setIsOpenReplyDialog(true);
  };
  const handleReplyDialogClose = () => {
    setIsOpenReplyDialog(false);
  };

  const handleReplyPost = () => {
    setBoardList([
      ...boardList,
      { name: inputName, email: '', contents: inputText, replyId: replyId },
    ]);
    setInputName('');
    setInputText('');
  };

  return (
    <div className="Board">
      <Card style={{ width: '90%' }} className="CardComponent">
        <Card.Body>
          <div className="cardTitle">好きなアニメのジャンルは？</div>
          <div className="cardDetail">
            コメント数：{boardList.length}　最終更新日：2020/11/12 18:40
          </div>
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
                <BoardContents
                  item={item}
                  index={index}
                  handleReplyDialogOpen={handleReplyDialogOpen}
                />
              );
            })}
          </div>
          <Button
            className="PostButton"
            onClick={() => {
              handleOpen();
            }}
          >
            投稿
          </Button>
        </Card.Body>
      </Card>

      {/* コメント投稿フォーム */}
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

      {/* 返信投稿フォーム */}
      <Modal show={isOpenReplyDialog} onHide={handleReplyDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>返信コメント投稿 &gt;&gt;{replyId + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ニックネーム</Form.Label>
              <Form.Control
                type="name"
                placeholder="ニックネームを入力してください"
                onChange={handleInputName}
              />
              {/* <Form.Text className="text-muted"></Form.Text> */}
            </Form.Group>
            <Form.Group>
              <Form.Label>投稿内容</Form.Label>
              <Form.Control as="textarea" rows={5} onChange={handleInputText} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReplyDialogClose}>
            キャンセル
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleReplyDialogClose();
              handleReplyPost();
            }}
          >
            返信
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Board;
