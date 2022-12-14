import { createMedia } from "@artsy/fresnel";
import React from "react";
import { Container, Icon, Image, Menu, Sidebar } from "semantic-ui-react";
//NO SE USA LA NAV BAR
export default function navBar() {
  const AppMedia = createMedia({
    breakpoints: {
      mobile: 320,
      tablet: 768,
      computer: 992,
      largeScreen: 1200,
      widescreen: 1920,
    },
  });
  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  const NavBarMobile = (props) => {
    const {
      children,
      leftItems,
      onPusherClick,
      onToggle,
      rightItems,
      visible,
    } = props;

    return (
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          items={leftItems}
          vertical
          visible={visible}
        />
        <Sidebar.Pusher
          dimmed={visible}
          onClick={onPusherClick}
          style={{ minHeight: "13vh" }}
        >
          <Menu fixed="top" inverted>
            <Menu.Item>
              {/* <Image size="mini" src="https://react.semantic-ui.com/logo.png" /> */}
            </Menu.Item>
            <Menu.Item onClick={onToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Menu position="right">
              {rightItems.map((item, key) => (
                <Menu.Item {...item} key={key} />
              ))}
            </Menu.Menu>
          </Menu>
          {/* {children} */}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  };

  const NavBarDesktop = (props) => {
    const { leftItems, rightItems } = props;

    return (
      <Menu fixed="top" inverted>
        <Menu.Item>
          {/* <Image size="mini" src="https://react.semantic-ui.com/logo.png" /> */}
        </Menu.Item>

        {leftItems.map((item, key) => (
          <Menu.Item {...item} key={key} />
        ))}

        <Menu.Menu position="right">
          {rightItems.map((item, key) => (
            <Menu.Item {...item} key={key} />
          ))}
        </Menu.Menu>
      </Menu>
    );
  };

  //   const NavBarChildren = (props) => (
  //     <Container style={{ marginTop: "5em" }}>{props.children}</Container>
  //   );

  class NavBar extends React.Component {
    state = {
      visible: false,
    };

    handlePusher = () => {
      const { visible } = this.state;

      if (visible) this.setState({ visible: false });
    };

    handleToggle = () => this.setState({ visible: !this.state.visible });

    render() {
      const { children, leftItems, rightItems } = this.props;
      const { visible } = this.state;

      return (
        <div>
          <Media at="mobile">
            <NavBarMobile
              leftItems={leftItems}
              onPusherClick={this.handlePusher}
              onToggle={this.handleToggle}
              rightItems={rightItems}
              visible={visible}
            >
              {/* <NavBarChildren>{children}</NavBarChildren> */}
            </NavBarMobile>
          </Media>

          <Media greaterThan="mobile">
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
            {/* <NavBarChildren>{children}</NavBarChildren> */}
          </Media>
        </div>
      );
    }
  }

  const leftItems = [
    { as: "a", content: "PlayStation", key: "Playstation" },
    { as: "a", content: "Xox", key: "users" },
    { as: "a", content: "Switch", key: "users" },
    { as: "a", content: "PC", key: "users" },
  ];
  const rightItems = [{ as: "a", content: "Mi Cuenta", key: "login" }];

  const App = () => (
    <>
      <style>{mediaStyles}</style>

      <MediaContextProvider>
        <NavBar leftItems={leftItems} rightItems={rightItems}></NavBar>
      </MediaContextProvider>
    </>
  );

  return <App />;
}
