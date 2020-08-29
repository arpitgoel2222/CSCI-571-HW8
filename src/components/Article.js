import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import commentBox from "commentbox.io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";
import { EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import ReactTooltip from "react-tooltip";
import CB from "./CB";
import * as Scroll from 'react-scroll';

var scroll=Scroll.animateScroll


var text2=''
export class Article extends Component {
  constructor() {
    super();
    this.state = { showb: false, show: false,mdt:'' };
    this.show = this.show.bind(this);
    this.show2 = this.show2.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showmorebutton=this.showmorebutton.bind(this)
  }

  showmorebutton(){
    console.log("aa")
    if(text2.length!==0)
    {
      return ( 
        <MdExpandMore />
      )
    }
  }




  remove(data,tat) {
    this.setState({ show: false });
    var t = "Removing " + data.webTitle;
    toast(t, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose:2500
    });
    var arr = [];

    arr = JSON.parse(localStorage.getItem("bookmark"));
    for (var xx in arr) {
      if (arr[xx].id === data.id) {
        arr.splice(xx, 1);
      }
    }
    localStorage.setItem("bookmark", JSON.stringify(arr));
    if(tat==="a")
    {
      this.props.cbf(false)
    }
  }

  componentDidMount() {
    this.removeCommentBox = commentBox("5664562892242944-proj");
  }
  componentWillUnmount() {
    this.removeCommentBox();
  }

  show() {
    this.setState({ showb: true });
    console.log(document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    scroll.scrollToBottom({smooth:true})
  }
  show2() {
    this.setState({ showb: false });
    scroll.scrollToTop({smooth:true})
  }

  add(data) {

    this.setState({ show: true });
    toast("Saving " +data.webTitle, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose:2500
    });
    var arr = [];
    var flag = false;
    if (localStorage.getItem("bookmark") === null) {
      localStorage.setItem("bookmark", JSON.stringify([]));
    }
    arr = JSON.parse(localStorage.getItem("bookmark"));
    for (var xx in arr) {
      if (arr[xx].id === data.id) flag = true;
    }
    if (flag === false) {
      arr.push(data);
      localStorage.setItem("bookmark", JSON.stringify(arr));
    }
  }

  formatdate(datea) {
    var date3 = new Date(datea);
    var date = date3.getDate();
    var month = date3.getMonth() + 1;
    var year = date3.getFullYear();

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var current = year + "-" + month + "-" + date;
    return current;
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }



  render() {
    var article1 = this.props.article;

    var blocks1 = article1["blocks"];
    var main1 = "",
      main2 = "";
    var src1 = "";
    var text1 = ""
     
    var t,
      t1 = [],
      t2 = [];
    if (blocks1 != null) {
      main1 = blocks1["main"].elements[0].assets;
      main2 = blocks1.body[0].bodyTextSummary;
      console.log(main2)
      t = main2.split(".");

      for (var uu = 0; uu < 4; uu++) {
        t1.push(t[uu]);
      }
      text1 = t1.join(".")+"." 
      for (var uu1 = 4; uu1 < t.length; uu1++) {
        t2.push(t[uu1]);
      }
      text2 = t2.join(".");
      

      if (main1.length === 0) {
        src1 =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      } else {
        src1 = main1[main1.length - 1].file;
      }
    }
    if (this.state.showb === false && this.state.show === false) {
      if (this.props.status1 === false) {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {article1.webTitle}
              </Card.Title>
              <div>
                <Card.Text style={{ marginTop: "-3.4%",textAlign:'justify' }}>
                  <div style={{ display: "flex " }}>
                    <div
                      style={{
                        fontStyle: "italic",
                        fontSize: "large",
                        width: "90%",
                        marginLeft:'0.5%'
                      }}
                    >
                      {article1.webPublicationDate.split("T")[0]}

                    </div>
                    <div style={{ display: "flex" }}>
                     
                        <FacebookShareButton
                          data-tip="Facebook"
                          url={article1.webUrl}
                          hashtag="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={20} round />
                        </FacebookShareButton>
                        <ReactTooltip />
                        <TwitterShareButton
                          data-tip="Twitter"
                          url={article1.webUrl + "#CSCI_571_NewsApp"}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={20} round />
                        </TwitterShareButton>
                        <ReactTooltip />
                        <EmailShareButton
                          data-tip="Email"
                          url={article1.webUrl}
                          subject="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={20} round />
                        </EmailShareButton>
                        <ReactTooltip />
                      </div>

                      
                    
                    <div
                        style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                        onClick={this.add.bind(this, article1)}
                      >
                        <FaRegBookmark data-tip="Bookmark" />
                       
                        <ReactTooltip />
                      </div>
                  </div>
                  <Card.Img
                    src={src1}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                  <span>{text1}</span>
                  <br />
                  <div style={{ float: "right" }} onClick={this.show} >
                    {this.showmorebutton()}
                    
                  </div>
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>

          </div>
        );
      } else {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {article1.webTitle}
              </Card.Title>
              <div>
                <Card.Text style={{ marginTop: "-3.4%" ,textAlign:'justify' }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        fontStyle: "italic",
                        fontSize: "large",
                        width: "90%",
                        marginLeft:'0.5%'
                      }}
                    >
                      {article1.webPublicationDate.split("T")[0]}

                    </div>
                    <div style={{ display: "flex"}}>
                      
                        <FacebookShareButton
                          data-tip="Facebook"
                          url={article1.webUrl}
                          hashtag="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={20} round />
                        </FacebookShareButton>
                        <ReactTooltip />
                        <TwitterShareButton
                          data-tip="Twitter"
                          url={article1.webUrl + "#CSCI_571_NewsApp"}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={20} round />
                        </TwitterShareButton>
                        <ReactTooltip />
                        <EmailShareButton
                          data-tip="Email"
                          url={article1.webUrl}
                          subject="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={20} round />
                        </EmailShareButton>
                        <ReactTooltip />
                      


                    </div>
                    <div
                         style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                        onClick={this.remove.bind(this, article1,"a")}
                      >
                        <FaBookmark data-tip="Bookmark" />
                        
                        <ReactTooltip />
                      </div>
                  </div>
                  <Card.Img
                    src={src1}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                  <span>{text1}</span>
                  <br />
                  <div style={{ float: "right" }} onClick={this.show} >
                    {this.showmorebutton()}

                  </div>
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>

          </div>
        );
      }
    } else if (this.state.showb === true && this.state.show === false) {
      if (this.props.status1 === false) {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {article1.webTitle}
              </Card.Title>
              <div>
                <Card.Text style={{ marginTop: "-3.4%",textAlign:'justify'  }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        fontStyle: "italic",
                        fontSize: "large",
                        width: "90%",
                        marginLeft:'0.5%'
                      }}
                    >
                      {article1.webPublicationDate.split("T")[0]}

                    </div>
                    <div style={{ display: "flex"}}>
                      
                        <FacebookShareButton
                          data-tip="Facebook"
                          url={article1.webUrl}
                          hashtag="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={20} round />
                        </FacebookShareButton>
                        <ReactTooltip />
                        <TwitterShareButton
                          data-tip="Twitter"
                          url={article1.webUrl + "#CSCI_571_NewsApp"}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={20} round />
                        </TwitterShareButton>
                        <ReactTooltip />
                        <EmailShareButton
                          data-tip="Email"
                          url={article1.webUrl}
                          subject="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={20} round />
                        </EmailShareButton>
                        <ReactTooltip />
                      
                      
                    </div>
                    <div
                         style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                        onClick={this.add.bind(this, article1)}
                      >
                        <FaRegBookmark data-tip="Bookmark" />
                        
                        <ReactTooltip />
                      </div>
                  </div>
                  <Card.Img
                    src={src1}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                  <span>{text1}</span>
                  <br />
                  <br />
                  <span>{text2}</span>
                  <br />
                  <div style={{ float: "right" }}>
                    <MdExpandLess onClick={this.show2} />
                  </div>
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>
          </div>
        );
      } else {
        return (
          <div style={{ marginLeft: "1%" }}>
            <Card
              style={{
                boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
                marginTop: "25px",
                width: "98%",
                padding: "2%",
                cursor: "pointer"
              }}
            >
              <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
                {article1.webTitle}
              </Card.Title>
              <div>
                <Card.Text style={{ marginTop: "-3.4%",textAlign:'justify'  }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        fontStyle: "italic",
                        fontSize: "large",
                        width: "90%",
                        marginLeft:'0.5%'
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <FacebookShareButton
                          data-tip="Facebook"
                          url={article1.webUrl}
                          hashtag="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <FacebookIcon size={20} round />
                        </FacebookShareButton>
                        <ReactTooltip />
                        <TwitterShareButton
                          data-tip="Twitter"
                          url={article1.webUrl + "#CSCI_571_NewsApp"}
                          className="Demo__some-network__share-button"
                        >
                          <TwitterIcon size={20} round />
                        </TwitterShareButton>
                        <ReactTooltip />
                        <EmailShareButton
                          data-tip="Email"
                          url={article1.webUrl}
                          subject="#CSCI_571_NewsApp"
                          className="Demo__some-network__share-button"
                        >
                          <EmailIcon size={20} round />
                        </EmailShareButton>
                        <ReactTooltip />
                      </div>
                      
                    </div>
                    <div
                         style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                        
                        onClick={this.remove.bind(this, article1)}
                      >
                        <FaBookmark data-tip="Bookmark" />
                        
                        <ReactTooltip />
                      </div>
                  </div>
                  <Card.Img
                    src={src1}
                    width="98%"
                    height="98%"
                    style={{ marginTop: "1%" }}
                  />
                  <span>{text1}</span>
                  <br />
                  <br />
                  <span>{text2}</span>
                  <br />
                  <div style={{ float: "right" }}>
                    <MdExpandLess onClick={this.show2} />
                  </div>
                </Card.Text>
              </div>
            </Card>
            <div style={{marginLeft:'-2%'}}>
              <CB id={article1.id} />
            </div>
          </div>
        );
      }
    } else if (this.state.showb === true && this.state.show === true) {
      return (
        <div style={{ marginLeft: "1%" }}>
          <Card
            style={{
              boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
              marginTop: "25px",
              width: "98%",
              padding: "2%",
              cursor: "pointer"
            }}
          >
            <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
              {article1.webTitle}
            </Card.Title>
            <div>
              <Card.Text style={{ marginTop: "-3.4%",textAlign:'justify'  }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontStyle: "italic",
                      fontSize: "large",
                      width: "90%",
                      marginLeft:'0.5%'
                    }}
                  >
                    {article1.webPublicationDate.split("T")[0]}

                  </div>
                  <div style={{ display: "flex"}}>
                    
                      <FacebookShareButton
                        data-tip="Facebook"
                        url={article1.webUrl}
                        hashtag="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={20} round />
                      </FacebookShareButton>
                      <ReactTooltip />
                      <TwitterShareButton
                        data-tip="Twitter"
                        url={article1.webUrl + "#CSCI_571_NewsApp"}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon size={20} round />
                      </TwitterShareButton>
                      <ReactTooltip />
                      <EmailShareButton
                        data-tip="Email"
                        url={article1.webUrl}
                        subject="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <EmailIcon size={20} round />
                      </EmailShareButton>
                      <ReactTooltip />
                    
                    
                  </div>
                  <div
                       style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                      onClick={this.remove.bind(this, article1)}
                    >
                      <FaBookmark data-tip="Bookmark" />
                      
                      <ReactTooltip />
                    </div>
                </div>
                <Card.Img
                  src={src1}
                  width="98%"
                  height="98%"
                  style={{ marginTop: "1%" }}
                />
                <span>{text1}</span>
                <br />
                <br />
                <span>{text2}</span>
                <br />
                <div style={{ float: "right" }}>
                  <MdExpandLess onClick={this.show2} />
                </div>
              </Card.Text>
            </div>
          </Card>
          <div style={{marginLeft:'-2%'}}>
            <CB id={article1.id} />
          </div>
        </div>
      );
    } else {
      return (
        <div style={{ marginLeft: "1%" }}>
          <Card
            style={{
              boxShadow: "4px 4px 8px 4px rgba(192,192,192,0.6)",
              marginTop: "25px",
              width: "98%",
              padding: "2%",
              cursor: "pointer"
            }}
          >
            <Card.Title style={{ fontWeight: "bold", paddingBottom: "5%" }}>
              {article1.webTitle}
            </Card.Title>
            <div>
              <Card.Text style={{ marginTop: "-3.4%",textAlign:'justify'  }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      fontStyle: "italic",
                      fontSize: "large",
                      width: "90%",
                      marginLeft:'0.5%'
                    }}
                  >
                    {article1.webPublicationDate.split("T")[0]}

                  </div>
                  <div style={{ display: "flex"}}>
                    
                      <FacebookShareButton
                        data-tip="Facebook"
                        url={article1.webUrl}
                        hashtag="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon size={20} round />
                      </FacebookShareButton>
                      <ReactTooltip />
                      <TwitterShareButton
                        data-tip="Twitter"
                        url={article1.webUrl + "#CSCI_571_NewsApp"}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon size={20} round />
                      </TwitterShareButton>
                      <ReactTooltip />
                      <EmailShareButton
                        data-tip="Email"
                        url={article1.webUrl}
                        subject="#CSCI_571_NewsApp"
                        className="Demo__some-network__share-button"
                      >
                        <EmailIcon size={20} round />
                      </EmailShareButton>
                      <ReactTooltip />
                    </div>

                   
                  
                  <div
                      style={{ paddingLeft: "5%", color: "red" ,marginRight:'2%',marginTop:'0.1%'}}
                      onClick={this.remove.bind(this, article1)}
                    >
                      <FaBookmark data-tip="Bookmark" />
                      
                      <ReactTooltip />
                    </div>
                </div>
                <Card.Img
                  src={src1}
                  width="98%"
                  height="98%"
                  style={{ marginTop: "1%" }}
                />
                <span>{text1}</span>
                <br />
                <div style={{ float: "right" }} onClick={this.show} >
                    {this.showmorebutton()}

                  </div>
              </Card.Text>
            </div>
          </Card>
          <div style={{marginLeft:'-2%'}}>
            <CB id={article1.id} />
          </div>

        </div>
      );
    }
  }
}

export default Article;
