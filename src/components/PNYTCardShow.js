import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import TextTruncate from 'react-text-truncate'
import { IoMdShare } from 'react-icons/io';


export class NYTCardShow extends Component {

    formatdate(datea){

            var date3= new Date(datea);
            var date= date3.getDate();
            var month= date3.getMonth()+1;
            var year= date3.getFullYear();
            if(date<10 )
            {
                date="0"+date;
            }
            if(month<10 )
            {
                month="0"+month;
            }
            var current= year+"-"+month+"-"+date
            return current;

    }

    render() {
        var x = this.props.news;
        var news=[]
        for( var items in x)
        {
            if(x[items].multimedia)
            {
                news.push(x[items])
            }
            
        }
        for(var ite in  news)
        {
           var xx= (news[ite].multimedia);
           var length= xx.length
           for(var i=0;i<length;i++)
           {
               var xy
               if(xx[i].width>=2000)
               {
                   xy= xx[i].url
                   xx[0].url=xy
                
                   break;
               }
               else{
                   xx[0].url='https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
               }
           }
        } 
         return (

               <div className="card" style={{marginLeft:'1%'}}>
                    {news.map((item)=>
                    
                        {
                            if(item.section==='business')
                            {
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard bcard">
                                {
                                    item.section.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>
                                )
                            }
                            else if(item.subsection==='politics')
                            {
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard pcard">
                                {
                                    item.subsection.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>
                                )
                            }
                            else if(item.section==='world')
                            {   
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard wcard">
                                {
                                    item.section.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>)
                            }
                            else if(item.section==='technology')
                            {
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard tcard">
                                {
                                    item.section.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>)
                            }
                            else if(item.section==='sport')
                            {
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard scard">
                                {
                                    item.section.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>
                                )
                            }
                            else
                            {
                                return(
                                <Card style={{ boxShadow: '0px 0px 25px #333', marginTop:'25px',width:'95%',padding:'2%',cursor:'pointer'}}>
                                <Card.Body style={{display:'flex',}}>
                                <div style={{border:'solid 0.5px lightgray',width:'70%', height:'70%',textAlign:'center',paddingTop:'0.2%'}}>
                                <Card.Img src={item.multimedia[0].url} width="98%" height="98%" />
                                </div>
                                <Card.Body style={{padding:'0% 2%'}}>
                                <Card.Title style={{fontWeight:'bold',paddingBottom:'2%'}}>{item.title}<IoMdShare/></Card.Title>
                                <span  >
                                <TextTruncate line={3}
                                text= {item.abstract}
                                /> 
                                </span>
                                <Card.Text>
                                <span style={{fontStyle:'italic', fontWeight:'550'}}>
                                {
                                    this.formatdate(item.published_date)
                                }
                                </span>   
                                <span style={{float:'right'}} className="acard ocard">
                                {
                                    item.section.toUpperCase()
                                }
                                </span>
                                </Card.Text>
                                </Card.Body> 
                                </Card.Body>
                                </Card>
                                )
                            }
                        }
                    
                        )}
               </div>
                
                
            
        )
    }
}

export default NYTCardShow
