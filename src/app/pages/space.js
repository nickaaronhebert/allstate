import React from 'react';
import { LayoutProvider } from '../layouts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Logic from '../../logic';
import { Button, Row, Col, Upload, Icon, Modal, message } from 'antd';

const messages = {
  'kitchen':'Lets Take A Look At The Kitchen',
  'living':'Lets Look At The Living Room',
  'bathroom':'Lets See The Bathroom',
  'bedroom':'How About The Bedroom'
};

class Home extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
    };
  }

  

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  render () {
    const { previewVisible, previewImage } = this.state;
    const { user, files, spaceName } = this.props;
    
    const fileProps = {
      name: 'spaceFile',
      data: { model: 'User', entity: user.id, space: spaceName },
      multiple: true,
      action: `${process.env.ABODELY_REST_URL}/files?access_token=${this.props.user.token}`,
      onChange (info) {
        const status = info.file.status;
        if (status !== 'uploading') {
    // eslint-disable-next-line no-console
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      defaultFileList: files.filter(x => x.space == spaceName).map((x) => {
        return {
          uid: x.id,
          name: x.name,
          status: 'done',
          url: x.location
        };
      })
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    return (
      <div style={{height: '100%'}}>
        <LayoutProvider 
          type='external'
          header={{
            left: () => {
              return (<div style={{textAlign: 'right'}}><p>Recent Boxes</p></div>);
            },
            right: () => {
              return (
                <div >
                  <Button style={{marginRight: '20px'}} onClick={() => { this.props.navigateToRoute({ to: '/logout', replace: false}); } }>Logout</Button>
                </div>
              );
            },
          }}
          >
          <div>
            <div style={{width: '100%', backgroundImage: `url('https://s3-eu-west-1.amazonaws.com/ch-production-uploads/wp-content/uploads/2018/03/Home_decor_banner_modern_vintage.jpg')`, backgroundRepeat: 'no-repeat', 'backgroundSize': 'fill', height: '300px', backgroundPosition: 'right'}}>
              
            
            </div>
            <Row type='flex' justify='center' style={{padding: '30px 0px'}}>
              <Col span={17}>
                <div>
                  <span style={{fontSize: '48px', fontWeight: '200'}}>{messages[this.props.spaceName]}, Madison</span>
                  </div>
                  <div>
                  <span style={{fontSize: '24px', fontWeight: '200'}}>Here is what we know so far</span>
                  <div style={{marginTop: '20px'}}>
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                      {...fileProps}
                    >
                      {files.length >= 100 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>
                  <div style={{marginTop: '40px'}}>
                    <span style={{fontSize: '20px', fontWeight: '200'}}>Uploading images of your space helps us gather a good idea of the unique space you call home. Whether perfectly clean or full of toys and legos, it is important that we see your space as is. Trust us, we have legos all over our floor. </span>
                  </div>
                </div>
              </Col>

            </Row>

          </div>
        </LayoutProvider>
      </div>
    );
  }
}

const { navigateToRoute } = Logic.router.actions;
const { sessionLogin } = Logic.session.actions;

function mapStateTpProps (state) {
  const isAuthenticated = state.session.authenticated;
  return {
    isAuthenticated,
    spaceName: state.containers.router.parameters.params.spaceName,
    user: state.session.user,
    files: state.containers.files.resources
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    navigateToRoute,
    sessionLogin
  }, dispatch);
}

export default withRouter(connect(mapStateTpProps, mapDispatchToProps)(Home));
