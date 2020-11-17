import * as React from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';
import '../scss/Board.scss';
import { Link, animateScroll as scroll } from 'react-scroll';
import { RiReplyFill } from 'react-icons/all';

interface Props {
  item: {
    name: string;
    email: string;
    contents: string;
    replyId: number;
  };
  index: number;
  handleReplyDialogOpen: (handleReplyDialogOpen: number) => void;
}
const BoardContents: React.FC<Props> = ({ item, index, handleReplyDialogOpen }) => {
  const reply = null;
  return (
    <div id={index.toString()}>
      <div className="boardContent">
        <p className="topText">
          {index + 1}. {}
          {item.name}さん
          <Button
            className="replyButton"
            variant="outline-secondary"
            onClick={() => {
              handleReplyDialogOpen(index);
            }}
          >
            <RiReplyFill className="RiReplyFill" />
            返信
          </Button>
        </p>

        {/* 返信メッセージの場合(replyIdが-1以外の場合)返信元の番号を表示する */}
        {item.replyId != -1 && (
          <p>
            <Link
              activeClass="active"
              to={item.replyId.toString()}
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
              className="replyId"
            >
              &gt;&gt;{item.replyId + 1} 返信元を見る
            </Link>
          </p>
        )}
        <p>{item.contents}</p>
        <hr />
      </div>
    </div>
  );
};
export default BoardContents;
