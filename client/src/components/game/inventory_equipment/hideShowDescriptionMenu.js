import React, { Component } from "react";

const hideShowDescriptionMenu = (WrappedComponent) => {
  class HideShowDescriptionMenu extends Component {
    constructor(props) {
      super(props);

      this.state = {
        hideDescription: true,
        hideMenu: true,
      };

      this.itemDiv = React.createRef();
    }

    componentDidMount() {
      document.addEventListener("mousedown", this.hideMenuOnOutsideClick);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.hideMenuOnOutsideClick);
    }

    showDescription = () => this.setState({ hideDescription: false });
    hideDescription = () => this.setState({ hideDescription: true });
    hideMenu = () => this.setState({ hideMenu: true }); // Need it for 'onMouseLeave' event in ItemMenu
    toggleMenu = (e) => this.setState({ hideMenu: !this.state.hideMenu });

    hideMenuOnOutsideClick = (e) =>
      this.itemDiv &&
      !this.itemDiv.current.contains(e.target) &&
      this.hideMenu();

    render() {
      return (
        <WrappedComponent
          hideMenuState={this.state.hideMenu}
          hideDescriptionState={this.state.hideDescription}
          showDescription={this.showDescription}
          hideDescription={this.hideDescription}
          hideMenu={this.hideMenu}
          toggleMenu={this.toggleMenu}
          itemDiv={this.itemDiv}
          {...this.props}
        />
      );
    }
  }
  return HideShowDescriptionMenu;
};

export default hideShowDescriptionMenu;
