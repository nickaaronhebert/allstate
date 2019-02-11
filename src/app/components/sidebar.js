import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import Scrollbars from './scrollbar.js';
import SidebarWrapper from '../styles/sidebar.style';
import Logo from './logo';
import customizedThemes from '../styles/themes';
import options from './options';
import Ionicon from 'react-ionicons';
import Logic from '../../logic';

const { navigateToRoute } = Logic.router.actions;

const SubMenu = Menu.SubMenu;

const { Sider } = Layout;

const getActiveItem = (router) => {
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
    return 'Audit';
  }
  if (url.indexOf('/scans') > -1) {
    return 'Scans';
  }
  return '';
};

class Sidebar extends Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);

    this.state = {
      openKeys: []
    };
  }

  handleClick (e) {
    this.props.navigateToRoute({ to: `/${e.key}`, replace: true });
  }

  onOpenChange (e) {
    if (this.state.openKeys.indexOf(e) > -1) {
      this.setState({ openKeys: '' });
    } else {
      this.setState({ openKeys: e });
    }
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };
  getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const { key, label, leftIcon, children } = singleOption;
    const activated = this.props.activeItem == key && true;
    if (activated) {
      submenuStyle;
    }

    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder" style={submenuColor}>
              <Ionicon icon={leftIcon} fontSize="18px" color={submenuColor.color}/>
              <span className="nav-text" style={{ marginLeft: '10px' }}>
                {label}
              </span>
            </span>
          }
        >
          {children.map(child => {
            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <span className="isoMenuHolder" style={submenuColor}>
                  <Ionicon icon={child.leftIcon} fontSize="18px" color={submenuColor.color}/>
                  <span className="nav-text" style={{ marginLeft: '10px' }}>
                    {child.label}
                  </span>
                </span>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key} style={activated ? { opacity: 0.3 } : {}} >
        <span className="isoMenuHolder" style={submenuColor}>
          <Ionicon icon={leftIcon} fontSize="18px" color={submenuColor.color}/>
          <span className="nav-text" style={{ marginLeft: '10px' }}>
            {label}
          </span>
        </span>
      </Menu.Item>
    );
  };
  render () {
    const { toggleOpenDrawer, height, customizedTheme, collapsed } = this.props;
    const { openDrawer } = false;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = () => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
    };
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor
    };
    const submenuColor = {
      color: customizedTheme.textColor
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width={240}
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars style={{ height: height - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={this.state.openKeys}
              selectedKeys={[]}
              onOpenChange={this.onOpenChange}
            >
              {options.map(singleOption =>
                this.getMenuItem({ submenuStyle, submenuColor, singleOption })
              )}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App,
    customizedTheme: customizedThemes.sidebarTheme.options[5],
    height: window.innerHeight,
    activeItem: getActiveItem(state.containers.router),
    collapsed: state.containers.app.collapsed,
    navigateToRoute
  }),
  { navigateToRoute }
)(Sidebar);
