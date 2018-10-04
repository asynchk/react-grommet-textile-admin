import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Spinning from 'grommet/components/icons/Spinning';
import { dispatchNavigate } from '../../util/utilities';
import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from '../utils';

import i18n from '../messages';
// import * as AuthActions from './auth.actions';

class Login extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Login');
    this.props.dispatch(navEnable(false));
  }

  componentWillUnmount() {
    this.props.dispatch(navEnable(true));
  }

  _onSubmit(fields) {
    console.log(fields);
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(login(fields.username, fields.password, fields.rememberMe));
    // router.history.push('/otrequest')
  }

  render() {
    const { session: { errorMessage, isLoading }, isFetchListLoading } = this.props;
    console.log('i18n, ', i18n.t(errorMessage));
    return (
      <Article>
        <Section
          full={true}
          colorIndex='brand'
          texture='url(img/splash_web.png)'
          pad='large'
          justify='between'
          align='center'
        >
          <span />
          <Box
            colorIndex='light-1'
            pad='medium'
            style={{
              borderRadius: 5
            }}
          >
            <LoginForm
              align='center'
              // title='loggin in'
              logo={<Image src='img/Logo.png' style={{ width: 180, height: 225, marginBottom: 25 }} />}

              // title={<Header size='small'>The Mills</Header>}
              // secondaryText='AC OT Management System'
              secondaryText={isLoading ? <div><Spinning /> Logging In</div> :
                isFetchListLoading ? <div><Spinning /> Loading OT Requests data..</div> : 'AC OT Management System'}
              // onSubmit={this._onSubmit}
              onSubmit={this._onSubmit}
              errors={[i18n.t(errorMessage)]}
              // usernameType='email'
              rememberMe={true}
            />
          </Box>
          <Footer
            direction='row'
            size='small'
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <span className='secondary'>&copy; 2018 ATAL ICBT</span>
          </Footer>
        </Section>
      </Article>


    );
  }
}

Login.defaultProps = {
  session: {
    ErrorMessage: undefined
  }
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    ErrorMessage: PropTypes.string
  })
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return ({
    session: state.session,
    isFetchListLoading: state.otrequests.isFetchListLoading,
  });
};


// const mapDispatchToProps = {
//   // dispatch,
//   dispatchNavigate,
// };

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
  dispatchNavigate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
