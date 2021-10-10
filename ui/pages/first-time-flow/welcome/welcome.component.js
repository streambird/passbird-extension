import EventEmitter from 'events';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Mascot from '../../../components/ui/mascot';
import Button from '../../../components/ui/button';
import {
  INITIALIZE_CREATE_PASSWORD_ROUTE,
  INITIALIZE_SELECT_ACTION_ROUTE,
  INITIALIZE_METAMETRICS_OPT_IN_ROUTE,
  INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE
} from '../../../helpers/constants/routes';
import { isBeta } from '../../../helpers/utils/build-types';
import WelcomeFooter from './welcome-footer.component';
import BetaWelcomeFooter from './beta-welcome-footer.component';
import { loginOrCreate } from '../Streambird'

export default class Welcome extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    participateInMetaMetrics: PropTypes.bool,
    welcomeScreenSeen: PropTypes.bool,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  state = {
    email: '',
    loading: false
  }

  constructor(props) {
    super(props);

    this.animationEventEmitter = new EventEmitter();
  }

  componentDidMount() {
    const { history, participateInMetaMetrics, welcomeScreenSeen } = this.props;

    if (welcomeScreenSeen && participateInMetaMetrics !== null) {
      history.push(INITIALIZE_CREATE_PASSWORD_ROUTE);
    } else if (welcomeScreenSeen) {
      history.push(INITIALIZE_SELECT_ACTION_ROUTE);
    }
  }

  handleContinue = async () => {
    // this.props.history.push(INITIALIZE_SELECT_ACTION_ROUTE);
    // this.props.setFirstTimeFlowType('import');
    this.setState({ loading: true })
    const res = await loginOrCreate(this.state.email)
    this.props.history.push(INITIALIZE_IMPORT_WITH_SEED_PHRASE_ROUTE);
  };

  handleKeyPress = ({ key }) => {
    if (key === ' ' || key === 'Enter') {
      this.handleContinue();
    }
  }

  render() {
    const { t } = this.context;

    return (
      <div className="welcome-page__wrapper">
        <div className="welcome-page">
          {/*<Mascot
            animationEventEmitter={this.animationEventEmitter}
            width="125"
            height="125"
          />*/}
          <img
            src="./images/streambird_logo.png"
            alt=""
            className="logo"
            width="125"
            height="125"
          />
          {isBeta() ? <BetaWelcomeFooter /> : <WelcomeFooter />}
          <input
            type="text"
            className="add-to-address-book-modal__input"
            placeholder={'jeff@streambird.io'}
            onChange={(e) => this.setState({ email: e.target.value })}
            onKeyPress={this.handleKeyPress}
            // value={"this.state.alias"}
            autoFocus
          />
          <Button
            type="primary"
            className="first-time-flow__button"
            onClick={this.handleContinue}
            disabled={this.state.loading}
          >
            {t('getStarted')}
          </Button>
        </div>
      </div>
    );
  }
}
