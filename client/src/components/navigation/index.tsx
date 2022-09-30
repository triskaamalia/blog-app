import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {Button, Container,Nav, Navbar, NavbarBrand, NavbarText} from 'reactstrap'
import UserContext, { initialUserState } from '../../contexts/user';

export interface INavigationProps{}

const Navigation: React.FC <INavigationProps> = props =>{
  const userContext = useContext(UserContext);
  const {user} = userContext.userState;

  const Logout = () =>{
    userContext.userDispatch({type: 'logout', payload: initialUserState});
  }

  return(
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-info'>
      <Container>
        <NavbarBrand className='navbar-brandnavbar-brand' tag={Link} to='/'><h3>HOME</h3></NavbarBrand>
        <Nav className='mr-2' navbar/>
        {user._id === ''?
            <div>
              <NavbarText tag={Link} to="/login"  className='btn btn-secondary my-2 my-sm-0'>Login</NavbarText>
              <NavbarText className='mr-2 ml-2'>|</NavbarText>
              <NavbarText tag={Link} to="/register" className='btn btn-secondary my-2 my-sm-0'>Sign Up</NavbarText>
            </div>
          :
            <div>
              <Button outline tag={Link} to="/edit" className='btn btn-secondary my-2 my-sm-0'>Post a blog</Button>
              <NavbarText className='mr-2 ml-2'>|</NavbarText>
              <Button onClick={() => Logout()} className='btn btn-secondary my-2 my-sm-0'> Logout</Button>
            </div>

        }
      </Container>
    </nav>
  );
}

export default Navigation;