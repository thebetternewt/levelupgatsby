import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Link from 'gatsby-link';
import styled from 'styled-components';
import Img from 'gatsby-image';

import logo from '../images/gcp-logo-white.png';
import { createLocation } from 'history';

const HeaderWrapper = styled.div`
  background: #7f9c7e;
  height: ${({ isHome }) => (isHome ? '50vh' : '20vh')};
  margin-bottom: 1.45rem;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  h1 {
    img {
      height: 80px;
    }
  }
`;

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
`;

const MainNav = styled.nav`
  ul {
    display: flex;
    list-style: none;
  }
  li {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 500;
    margin-left: 1rem;
  }
  a {
    color: #fff;
    padding-bottom: 5px;
    text-decoration: none;
    &:hover,
    &.active {
      border-bottom: 3px solid #fff;
    }
  }
`;

class Header extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { location } = this.props;
    const shrinkHeader = [{ height: '50vh' }, { height: '20vh' }];
    const shrinkTiming = {
      duration: 300,
      fill: 'both',
      easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
      iterations: 1,
    };

    if (
      // Only animate if navigating to or away from the homepage
      (location.pathname === '/' || prevProps.location.pathname === '/') &&
      location.pathname !== prevProps.location.pathname
    ) {
      // Animate only on page change
      if (location.pathname === '/') {
        this.wrapper.animate(shrinkHeader, shrinkTiming).reverse();
      } else {
        this.wrapper.animate(shrinkHeader, shrinkTiming);
      }
    }
  };

  render() {
    const { data, location } = this.props;
    return (
      <HeaderWrapper
        isHome={location.pathname === '/'}
        ref={wrapper => (this.wrapper = ReactDOM.findDOMNode(wrapper))}
      >
        <HeaderContainer
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              <img src={logo} />
            </Link>
          </h1>
          <MainNav>
            <ul>
              <li>
                <Link to="/" exact>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" exact>
                  About
                </Link>
              </li>
            </ul>
          </MainNav>
        </HeaderContainer>
        <Img
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0.3,
          }}
          sizes={data.background.sizes}
          alt="GCP Logo"
        />
      </HeaderWrapper>
    );
  }
}

export default Header;
