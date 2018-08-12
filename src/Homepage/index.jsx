import React from 'react';
import { getImageUrl, fetchDistinctClients } from '../CapturePicture/helper.js';
import { Row, Col, Label } from 'reactstrap';
import { Card } from 'reactstrap';
import CapturePicture from '../CapturePicture';
import styles from './styles.scss';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      name: '',
      email: '',
      phone: '',
      company: '',
      url: '',
      id: '',
      screenshot: '',
    };
  }

  updateState = (element, image, externalId) => {
    console.log(element.Name.S + " " + element.Email.S + " " + element.ContactNumber.S + " " + element.Company.S);
    if (this.state.email === element.Email.S) {
      console.log("Same User found. Not updating the details:" + this.state.email);
      return;
    }
    this.setState({
      name: element.Name.S,
      email: element.Email.S,
      phone: element.ContactNumber.S,
      company: element.Company.S,
      screenshot: image,
      client: element.Client.S,
      imageFile: element.ImageFile.S,
      url: getImageUrl(element.Client.S, element.ImageFile.S),
      id: externalId,
    });
  }

  stats = () => {
    fetchDistinctClients((clientIdSet) => this.setState({
      clientIds: clientIdSet
    }));
  }

  render() {

    const smile = (
      <div>
        <Label style={{color:"#ec9a1e", fontSize:"-webkit-xxx-large", marginTop:"25%"}}>Smile </Label>
        <Label style={{fontSize:"-webkit-xxx-large", marginTop:"25%", marginLeft:"1%"}}>for the camera</Label>
      </div>
    );
    const info = (
      <div>
        <Row>
          <Label style={{color:"#ec9a1e", fontSize:"-webkit-xxx-large", marginTop:"10%", marginBottom:"-3%"}}>
            {this.state.name}
          </Label>
        </Row>
        <Row>
          <div><hr  style={{border:"solid .5px white", width:"400px", marginBottom:"1%"}} /></div>
        </Row>
        <Row>
          <Label style={{color:"white", fontSize:"xx-large", marginBottom:"-2%"}}>Welcome to your</Label>
        </Row>
        <Row>
          <Label style={{color:"white", fontSize:"xx-large", marginBottom:"-2%"}}>new workplace.</Label>
        </Row>
        <Row>
          <div><hr  style={{border:"solid .5px white", width:"400px", marginBottom:"1%"}} /></div>
        </Row>
        <Row>
          <Label style={{color:"#ec9a1e", fontSize:"x-large"}}>Get ready to experience more.</Label>
        </Row>
      </div>
    );
    return (
      <div>
        <Row>
          <Col xs="1"/>
          <Col xs="4">
            <Card style={{marginTop:"5%", marginLeft:"6%", width:"402px", borderRadius:"0px"}}>
                <CapturePicture className={styles.imageCard} updateState={this.updateState} dataLoaded={this.state.name} />
            </Card>
          </Col>
          <Col xs="1"/>
          <Col xs="6" style={{paddingLeft:"5%"}}>
            {this.state.name ? info : smile}
          </Col>
      </Row>
    </div>
    );
  }
}
