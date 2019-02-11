import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import TopbarWrapper from '../styles/topbar.style';
import Ionicon from 'react-ionicons';
import TopbarUser from './topbarUser';
import Logic from '../../logic';

const { Header } = Layout;
const { toggleCollapsed } = Logic.app.actions;
const { navigateToRoute } = Logic.router.actions;

const getCurrentPage = (router) => {
  const { url } = router.parameters;
  if (!url) { return ''; }
  if (url.indexOf('/settings') > -1) {
    return 'Settings';
  }
  if (url.indexOf('/policy') > -1) {
    return 'Policy';
  }
  if (url.indexOf('/snapshots') > -1) {
    return 'Backup & Recovery';
  }
  if (url.indexOf('/dashboard') > -1) {
    return 'Dashboard';
  }
  if (url.indexOf('/audit') > -1) {
    return 'Compliance History';
  }
  if (url.indexOf('/scans') > -1) {
    return 'Scans';
  }
  return '';
};

class Topbar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      vpcModalVisible: false
    };
  }

  toggleModal (modalType) {
    this.setState({ [modalType]: !this.state[modalType] });
  }

  handleVpcChange (value) {
    const setting = this.props.settings.vpcSetting;
    if (setting) {
      this.props.updateSetting({ value, id: setting.id });
    }
  }

  getVpcText () {
    const { vpcSetting } = this.props.settings;
    if (vpcSetting.value.length > 1) { return 'Monitoring Multiple VPCs'; } else if (vpcSetting.value.length == 0) { return 'Monitoring All VPCs'; } else { return `Monitoring: ${vpcSetting.value.join(',')}`; }
  }

  render () {
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const { navigateToRoute } = this.props;

    const styling = {
      background: 'white',
      position: 'fixed',
      width: '100%',
      height: 70,
      padding: '0 31px 0 265px !important'
    };

    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <Ionicon icon={'md-menu'} fontSize="18px" onClick={this.props.toggleCollapsed} /> <span style={{ fontWeight: '800', marginLeft: '20px' }} > {this.props.activeItem}</span>
          </div>

          <ul className="isoRight">
            
            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser navigateToRoute={navigateToRoute}/>
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    activeItem: getCurrentPage(state.containers.router),
    collapsed: state.containers.app.collapsed,
  }),
  { toggleCollapsed, navigateToRoute }
)(Topbar);
