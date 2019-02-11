import React, { Component } from 'react';
import { Popover } from 'antd';
import TopbarDropdownWrapper from './topbarDropdown.style';
import UserLogo from '../../image/user1.png';
import { Link } from 'react-router-dom';

class TopbarUser extends Component {
  constructor (props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide () {
    this.setState({ visible: false });
  }
  handleVisibleChange () {
    this.setState({ visible: !this.state.visible });
  }

  render () {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <Link className="isoDropdownLink" to={'/settings'}>
          Settings
        </Link>
        <a className="isoDropdownLink" target={'_blank'} href="https://www.dashsdk.com/support.html">
          Support
        </a>
        <a onClick={() => this.props.navigateToRoute({ to: '/logout', replace: false }) } className="isoDropdownLink">
          Logout
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={UserLogo} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default TopbarUser;
