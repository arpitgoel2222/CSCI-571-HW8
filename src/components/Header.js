import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import Switch from "react-switch";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      selectedOption: "",
      qr: "",
      ls: true,
      bm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.someFn = this.someFn.bind(this);
    this.showall = this.showall.bind(this);
    this.load = this.load.bind(this);

  }

  handleChange(checked) {
    this.setState({ checked: checked });
    this.someFn(checked);
  }

  mycall = value => {
    if (this.props.loas === true && value === false) {
      this.props.callbackFromParent4(value);
    } else if (value === true) {
      this.props.callbackFromParent4(true);
    }
  };
  componentDidMount() {
    this.setState({ checked: this.props.che });
    this.setState({ bm: this.props.b });
    if (localStorage.getItem("bm") === null) {
      localStorage.setItem("bm", JSON.stringify([]));
    }
    var value = JSON.parse(localStorage.getItem("bm"));
    if (value.length === 0) {
      this.setState({bm:false});
      localStorage.setItem("bm", JSON.stringify(false));
    } else {
      var ssv = JSON.parse(localStorage.getItem("checked"));
      //console.log(ssv)
      this.setState({bm:ssv});
      localStorage.setItem("bm", JSON.stringify(ssv));
    }
  }

  showall() {
    this.props.callbackFromParent4(this.state.ls);
    this.setState({ bm: true });
    this.props.history.push("/favorites");
  }

  load() {
    this.props.callbackFromParent4(this.state.ls);
  }

  someFn(checked) {
    var listInfo = checked;
    this.props.callbackFromParent(listInfo);
  }

  render() {
    if (this.props.switchshow === "true") {
      return (
        <div>
          <Navbar
            style={{
              display: "flex",
              backgroundColor: "purple",
              padding: "10px",
              backgroundImage:
                "linear-gradient(to right, #00002f,#8A2BE2)"
            }}
            expand="lg"
          >
            <div className="container" style={{ width: "220px" }}>
              <SearchBar ls={this.props.ls} callbackFromParent={this.mycall} />
            </div>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="navbar-dark"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link
                  as={NavLink}
                  exact
                  to="/"
                  href="/"
                  activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                  style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  onClick={this.load}
                >
                  Home{" "}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/world"
                  href="/world"
                  activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                  style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  onClick={this.load}
                >
                  World{" "}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/politics"
                  href="/politics"
                  activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                  style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  onClick={this.load}
                >
                  Politics{" "}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/business"
                  href="/business"
                  activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                  style={{ color: "lightgray", textDecoration: "none" ,opacity:'0.5'}}
                  onClick={this.load}
                >
                  Business{" "}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/technology"
                  href="/technology"
                  activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                  style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  onClick={this.load}
                >
                  Technology{" "}
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/sports"
                  href="/sports"
                  activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                  style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  onClick={this.load}
                >
                  Sports{" "}
                </Nav.Link>
              </Nav>
              <div style={{ display: "flex", marginRight: "3%" }} className="headers">
                <Nav style={{ display: "contents" }} class="col-1 col-s-1">
                  <div
                    style={{
                      
                      marginRight: "1%",
                      color: "white"
                    }}
                    onClick={this.showall}
                  >
                    <FaRegBookmark data-tip="Bookmark" data-for="global" />
                    <ReactTooltip place="bottom" id="global" />
                  </div>

                  <NavItem
                    style={{
                      marginTop: "1%",
                      marginRight: "4%",
                      color: "white",
                      marginLeft: "4%"
                    }}
                  >
                    NYTimes
                  </NavItem>
                  <Switch
                    className="react-switch"
                    checked={this.props.che}
                    onChange={this.handleChange}
                    uncheckedIcon={true}
                    checkedIcon={true}
                    offColor="#E8E8E8"
                    onColor="#7373ff"
                  />
                  <NavItem
                    style={{
                      marginTop: "1%",
                      marginLeft: "4%",
                      color: "white"
                    }}
                  >
                    Guardian
                  </NavItem>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    } else {
      if (
        this.state.bm === false ||
        this.props.history.location.pathname.includes("search") ||
        this.props.history.location.pathname.includes("article") ||
        this.props.history.location.pathname.includes("articles")
      ) {
        return (
          <div>
            <Navbar
              style={{
                display: "flex",
                backgroundColor: "purple",
                padding: "10px",
                backgroundImage:
                  "linear-gradient(to right, #00002f, #8A2BE2)"
              }}
              expand="lg"
            >
              <div className="container" style={{ width: "220px" }}>
                <SearchBar
                  ls={this.props.ls}
                  callbackFromParent={this.mycall}
                />
              </div>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="navbar-dark"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/"
                    href="/"
                    activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Home{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/world"
                    href="/world"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    World{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/politics"
                    href="/politics"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Politics{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/business"
                    href="/business"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Business{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/technology"
                    href="/technology"
                    activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Technology{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/sports"
                    href="/sports"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Sports{" "}
                  </Nav.Link>
                </Nav>

                <div
                  style={{
                    
                    marginRight: "1%",
                    marginLeft: "38%",
                    color: "white"
                  }}
                  className="qwer"
                  onClick={this.showall}
                >
                  <FaRegBookmark data-tip="Bookmark" data-for="navb" />
                  <ReactTooltip place="bottom" id="navb" />
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
      } else {
        return (
          <div>
            <Navbar
              style={{
                display: "flex",
                backgroundColor: "purple",
                padding: "10px",
                backgroundImage:
                  "linear-gradient(to right, #00002f,#8A2BE2)"
              }}
              expand="lg"
            >
              <div className="container" style={{ width: "220px" }}>
                <SearchBar
                  ls={this.props.ls}
                  callbackFromParent={this.mycall}
                />
              </div>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="navbar-dark"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link
                    as={NavLink}
                    exact
                    to="/"
                    href="/"
                    activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                    style={{ color: "lightgray", textDecoration: "none" ,opacity:'0.5'}}
                  >
                    Home{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/world"
                    href="/world"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    World{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/politics"
                    href="/politics"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Politics{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/business"
                    href="/business"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none" ,opacity:'0.5'}}
                  >
                    Business{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/technology"
                    href="/technology"
                    activeStyle={{ color: "white", textDecoration: "none",opacity:'1' }}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Technology{" "}
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/sports"
                    href="/sports"
                    activeStyle={{ color: "white", textDecoration: "none" ,opacity:'1'}}
                    style={{ color: "lightgray", textDecoration: "none",opacity:'0.5' }}
                  >
                    Sports{" "}
                  </Nav.Link>
                </Nav>

                <div
                  style={{
                    
                    marginRight: "1%",
                    marginLeft: "38%",
                    color: "white"
                  }}
                  className="qwer"
                  onClick={this.showall}
                >
                  <FaBookmark data-tip="Bookmark" data-for="navb" />
                  <ReactTooltip place="bottom" id="navb" />
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
      }
    }
  }
}

export default withRouter(Header);
