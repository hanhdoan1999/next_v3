import { Link, navigate } from 'gatsby';
import React, { useContext, useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
import ReactModal from 'react-modal';
import CloseButton from '../../../common/CloseButton';
import { GlobalDispatchContext } from '../../contexts/AppContext';
import SearchIcon from '../../icons/SearchIcon';
import MegaMenu from '../MegaMenu';
import LIST_PAGES from './main-menu-data';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './styles.scss';
import { object } from 'prop-types';
/* eslint-disable */

function MainMenu({
  showMegaMenu,
  width,
  showSideBarMenu,
  onHandleModal,
  showMobileMegaMenu,
  menuData,
  logo,
}) {
  const listPage = menuData.map(({ node }) => {
    return {
      id: node.id,
      title: node.label,
      slug: node.path,
    };
  });

  const rangeData = menuData.find(({ node }) => node.label === 'Range');
  const [chosenCate, setChosenCate] = useState("Design")
  const listData = rangeData?.node?.childItems?.nodes.map((el) => {
    return {
      name: el.label,
      path: el.path,
      children: el.childItems?.nodes?.map((item) => {
        return {
          name: item.label,
          path: item.path,
          uri: item.uri,
        };
      }),
    };
  });
  const dispatch = useContext(GlobalDispatchContext);
  const location = typeof window !== "undefined" ? window.location.pathname : ""
  let CURRENT_PAGES_LIST = listPage.slice(0, listPage.length);
  const lastItem = listPage[listPage.length - 1];

  const [showRange, setShowRange] = useState(false);

  const handleClickItem = (value, slug) => {
    if (value === "Range") {
      navigate("/products");
      setShowRange(true);
    } else {
      setShowRange(false);
      navigate(slug);
    }
  }
  const handleHoverItem = (value, slug) => {
    if (value === "Range") {
      setShowRange(true);
    } else {
      setShowRange(false);
    }
  }
  const rootContent = (
    <div className='menu-col'>
      <ul className='d-flex menu-list'>
        {CURRENT_PAGES_LIST.map((item, index) => {
          return (
            <li key={item.id} className={`menu-item`} data-name={item.title}>
              {width < 681 && item.title === 'Product' ? (
                <div className='product-menu-mobile d-flex justify-content-between'>
                  <Link
                    to={`${item.slug}`}
                    activeClassName='active'
                    onClick={() => {
                      setChosenCate(item.title),
                        onHandleModal({
                          type: 'CLOSE_MODAL',
                        })
                      dispatch({type:"CHANGE_DEFAULT"})
                    }
                    }
                  >
                    {item.title}
                  </Link>
                  <div
                    className='col-6 text-right'
                    onClick={() => {
                      onHandleModal({
                        type: 'OPEN_MODAL',
                        payload: 'mobile-mega-menu',
                      })
                      dispatch({type:"CHANGE_DEFAULT"})
                    }
                    }
                  >
                    <MdKeyboardArrowRight className='arrow-right' />
                  </div>
                </div>
              ) : (
                <div className={`replace-a ${location === item.slug ? "activePage" : ""}`}
                  // to={`${item.slug}`}
                  // activeClassName='active'
                  onClick={() => {handleClickItem(item.title, item.slug); dispatch({type:"CHANGE_DEFAULT"})}}
                  onMouseEnter={() => handleHoverItem(item.title, item.slug)}
                >
                  {item.title}
                </div>
              )}
              {showRange &&
                <div
                  className={`header__bottom mega-menu ${showMegaMenu && 'active'
                    }`}
                  onMouseLeave={() => setShowRange(false)}
                >
                  <MegaMenu
                    showMegaMenu={showMegaMenu}
                    width={width}
                    onHandleModal={onHandleModal}
                    showMobileMegaMenu={showMobileMegaMenu}
                    menuData={menuData}
                    handleCloseMegaMenu={() => setShowRange(false)}
                  />
                </div>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
  let mainContent = rootContent;
  if (width < 681) {
    mainContent = (
      <ReactModal
        isOpen={showSideBarMenu}
        onRequestClose={() => onHandleModal({ type: 'CLOSE_MODAL' })}
        shouldCloseOnOverlayClick={true}
        className='main-menu-modal'
        overlayClassName='Overlay'
        ariaHideApp={false}
      >
        <CloseButton />
        {rootContent}
      </ReactModal>
    );
  }
  return (
    <>
      {width > 680 ? (
        <>
          <div className='main-menu'>{mainContent}</div>
          <div className='menu-right'>
            <div onClick={() =>
              dispatch({ type: 'OPEN_MODAL', payload: 'search-box' })
            } className='d-flex justify-content-between align-items-center menu-right_text'>
              <div className={`menu-item`} data-name={lastItem.title}>
              </div>
              <div
                className='text-search'
              >
                <span>Search </span>
                <span className='icon-search'>
                  {' '}
                  <SearchIcon />
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Navbar bg='light' expand='lg' className='w-100'>
          <Navbar.Brand href='/'>
            <img className='logo__ipad' src={logo} alt='logo' style={{ objectFit: "cover" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavDropdown title={listPage[0]?.title} id='basic-nav-dropdown'>
                {listData.map((el, index) => (
                  <>
                    {el.children.length > 0 ?
                      <NavDropdown id='basic-nav-dropdown-1' title={el.name} >
                        {el.children.map(item =>
                          <NavDropdown.Item key={index} href={item.path} onClick={() => dispatch({type:"CHANGE_DEFAULT"})}>{item.name}</NavDropdown.Item>
                        )}
                      </NavDropdown>
                      :
                      <NavDropdown.Item key={index} href={el.path} onClick={() => dispatch({type:"CHANGE_DEFAULT"})}>{el.name}</NavDropdown.Item>
                    }
                  </>
                ))}
              </NavDropdown>
              {listPage.slice(1, listPage.length).map((el, index) => (
                <Nav.Link className={el.slug === location ? "active" : ""} key={index} href={el.slug} onClick={() => dispatch({type:"CHANGE_DEFAULT"})}>{el.title} </Nav.Link>
              ))}
              <div className='search_mobile' onClick={() =>
                dispatch({ type: 'OPEN_MODAL', payload: 'search-box' })
              }>
                <span className='nav-link'>Search </span>
                <span className='icon-search'>
                  {' '}
                  <SearchIcon />
                </span>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
}

export default MainMenu;
