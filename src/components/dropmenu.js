import React, { Component } from "react";
import DropdownMenu from 'react-dd-menu';
import PropTypes from 'prop-types';

export default class DropMenu extends Component {
   constructor() {
     super();
     this.state = {
         isMenuOpen: false
     };
     this.click = this.click.bind(this);
     this.toggle = this.toggle.bind(this);
     this.close = this.close.bind(this);
   }

   toggle() {
     this.setState({ isMenuOpen: !this.state.isMenuOpen });
   }

   close() {
     this.setState({ isMenuOpen: false });
   }

   click() {
     console.log('You clicked an item');
   }

   render() {
     const menuOptions = {
       isOpen: this.state.isMenuOpen,
       close: this.close,
       toggle: <span onClick={this.toggle}>Menu</span>,
       align: 'right'
     };
     return (
       <DropdownMenu {...menuOptions}>
         <li>Edit Profile</li>
         <li>Account Settings</li>
         <hr />
         <li>Log Out</li>
       </DropdownMenu>
     );
   }
 }

 DropMenu.propTypes = {
   isOpen: PropTypes.bool,
   close: PropTypes.bool,
   toggle: PropTypes.func
 };
