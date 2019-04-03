import React, { Component } from "react";

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDelete(item) {
    console.dir(this);
    this.props.deleteUser(item);
    // event.stopPropagation();
  }
  render() {
    return (
        <div className="card">
                  <div className="image-container">
                        <img src={this.props.user.avatar} width={'100%'} height={'100%'} />
                  </div>
                  <div className="pearson-name">
                          {this.props.user.first_name + ' ' + this.props.user.last_name}
                  </div>
                  <div className="delete-pearson" role="button" onClick={() => {this.handleDelete(this.props.user); }} >
                          <span>Delete</span>
                  </div>
        </div>
    );
  }
}

export default ProfileUser;
