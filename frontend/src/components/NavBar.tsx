import * as React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import '../scss/NavBar.scss';

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className="title">アニメちゃんねる(仮)</div>
      <Navbar bg="light" className="bg-light justify-content-between Navbar">
        <p className="subtitle">アニメの話題でおしゃべり★</p>
        <Form inline className="NavBarInline">
          <FormControl type="text" placeholder="トピックを検索" className=" mr-sm-2" />
          <Button>検索</Button>
        </Form>
      </Navbar>
    </div>
  );
};
export default NavBar;
