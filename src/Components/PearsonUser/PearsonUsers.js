import React, { Component } from "react";
import ProfileUser from './subComponents/ProfileUser';
import urlConstants from '../../constants/urlConstants';
import './PearsonUsers.css';

class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
    this.deleteUser = this.deleteUser.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('in component did mount');
    // add scroll event in window to fetch data timely while scrolliing
    // window.addEventListener('scroll', this.handleScroll());
    document.getElementById('loadData').addEventListener('click', this.handleClick());
  }
//  function to add data on scrolling 

  // handleScroll(event) {
  //   let timer;
  //   let count = 0;
  //   let context = this;
  //   return function() {
  //     let root = document.getElementById('root');
  //     let contentHeight = root.offsetHeight;
  //     let yOffset = window.pageYOffset; 
  //     let y = yOffset + window.innerHeight;
  //     if(y >= contentHeight){
  //       clearTimeout(timer);
  //       timer = setTimeout(function(){
  //         return function(){
  //           let that = context;
  //           count++;
  //           that.fetchUsersData(url, count);
  //         }
  //        }(), 100);
  //     }
  //   }
  // }

  handleClick() {
    let count = 2;
    let context = this;
    return function() {
      count += 3;
      context.fetchUsersData(urlConstants.user, count);
    }
  }

  fetchUsersData(url, count) {
  fetch(url + count)
   .then(response => response.json())
   .then((json) => {
     const existingUsers = this.state.users;
     for (let i = 0; i < json.data.length; i++) {
       if (!this.isDuplicates(json.data[i])) {
           existingUsers.push(json.data[i]);
       }
     }
     this.setState({
       users: existingUsers
     });
   })
   .catch((error) => console.log('error caught ' + error));
  }
  
  isDuplicates(item) {
    const existingUsers = this.state.users;
    for (let i = 0; i < existingUsers.length; i++) {
      if (item.id === existingUsers[i].id) {
        return true;
      }
    }
    return false;
  }

  deleteUser(item) {
    const existingUsers = this.state.users;
    const newUsers = [];
    for (let i = 0; i < existingUsers.length; i++) {
        if(existingUsers[i].id === item.id) {
          continue;
        }
        newUsers.push(existingUsers[i]);
    }
    this.setState({
      users: newUsers
    });
  }

  render() {
    return (
      <div className="pearon-users">
        <div className="row">
           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 header">
              <h1>Pearson User Management</h1>
           </div>
        </div>
        <div className="row pearson">
           <div className="col-lg-11 col-md-8 col-sm-8 col-xs-8 col-10 mx-auto pearson-container">
             <div className="row users">
               {this.state.users.map((item, i) => {
                 return (
                   <ProfileUser user={item} key={i} deleteUser={this.deleteUser} />
                 );
               })}
             </div>
             <div className="button">
                <button className="btn btn-primary" id="loadData">Load More</button>
             </div>
           </div>
        </div>
      </div>
    );
  }
}

export default PearsonUsers;
