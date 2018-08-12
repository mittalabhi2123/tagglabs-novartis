import { initAWS, fetchUserDataByImage } from './helper.js';
import React, { Component, Fragment } from 'react';
import { Card, CardImg } from 'reactstrap';
import Webcam from '../Webcam';
import PropTypes from 'prop-types';
import frame from '../assets/frame.png';


const propTypes = {
  updateState: PropTypes.func.isRequired,
  dataLoaded: PropTypes.bool.isRequired,
};

export default class CapturePicture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      foundImageMatch: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.startTimer();
  }

  stopTimer = () => {
    console.log("Timer stopped....");
    clearInterval(this.timer);
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    if (screenshot === null) {
      return;
    }
    initAWS();
    fetchUserDataByImage(screenshot, this.props.updateState, this.stopTimer);
    this.setState({ screenshot });
  }

  startTimer = () => {
    console.log("Timer started....");
    clearInterval(this.timer)
    this.timer = setInterval(this.handleClick, 3000)
  }

  render() {
    const { dataLoaded } = this.props;
    return (
      <Fragment>
        <Webcam
          style={{objectFit:"fill", backgroundImage:"../assets/frame.png"}}
          audio={false}
          dataLoaded={dataLoaded}
          ref={node => this.webcam = node}
        >
          <img src={frame} />
        </Webcam>
      </Fragment>
    );
  }
}


CapturePicture.propTypes = propTypes;
