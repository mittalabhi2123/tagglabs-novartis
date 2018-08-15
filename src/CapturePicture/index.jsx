import { initAWS, fetchUserDataByImage } from './helper.js';
import React, { Component, Fragment } from 'react';
import { Card, CardImg } from 'reactstrap';
import Webcam from '../Webcam';
import PropTypes from 'prop-types';


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
      retry: 0,
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
    if (this.state.retry === 5) {
      this.stopTimer();
      this.props.updateState('   ', screenshot, 'testExternalId');
      return;
    } else {
      this.setState(prevState => ({
        retry: prevState.retry + 1,
      }));
    }
    initAWS();
    fetchUserDataByImage(screenshot, this.props.updateState, this.stopTimer);
    this.setState({ screenshot });
  }

  startTimer = () => {
    console.log("Timer started....");
    clearInterval(this.timer)
    this.timer = setInterval(this.handleClick, 2000)
  }

  render() {
    const { dataLoaded, updateState } = this.props;
    if (dataLoaded) {
      this.stopTimer();
      setTimeout(() => {
        updateState('', '', '');
        this.setState({
          retry: 0,
        });
        this.startTimer();
      }, 5000);
    }
    const camera = (<Webcam
      style={{objectFit:"fill", backgroundImage:"../assets/frame.png"}}
      audio={false}
      dataLoaded={dataLoaded}
      ref={node => this.webcam = node}
    />);
    const picture = (<img width="400px" height="450px" src={this.state.screenshot} alt=""/>)
    return (
      <Fragment>
        {dataLoaded ? picture : camera}
      </Fragment>
    );
  }
}


CapturePicture.propTypes = propTypes;
