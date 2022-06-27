import { createContext, useContext, Component, useEffect } from "react";
import { withRouter } from "react-router-dom";

const defaultContextData = {
  dark: false,
  toggle: () => {},
};

const TemplateContext = createContext(defaultContextData);

export function useTemplate() {
  const { darkMode, toggleTheme, setInitialTheme, openSidebar, toggleSidebar } =
    useContext(TemplateContext);

  useEffect(() => {
    let lsDark = false;
    if (localStorage.getItem("dark")) {
      lsDark = localStorage.getItem("dark");
    } else {
      lsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // setThemeState({ ...themeState, dark: lsDark, hasThemeLoaded: true });
    setInitialTheme({ dark: lsDark });
  }, []);

  return [darkMode, toggleTheme, openSidebar, toggleSidebar];
}

class TemplateProvider extends Component {
  state = {
    dark: false,
    openSidebar: true,
  };

  constructor(props) {
    super(props);
  }

  setInitialTheme = (theme = {}) => {
    this.setState(theme);
  };

  toggleTheme = () => {
    this.setState({ dark: !this.state.dark });
    localStorage.setItem("dark", !this.state.dark);
  };

  toggleSidebar = () => {
    this.setState({ openSidebar: !this.state.openSidebar });
  };

  render() {
    return (
      <TemplateContext.Provider
        value={{
          darkMode: this.state.dark,
          openSidebar: this.state.openSidebar,
          toggleTheme: this.toggleTheme,
          toggleSidebar: this.toggleSidebar,
          setInitialTheme: this.setInitialTheme,
        }}
      >
        {this.props.children}
      </TemplateContext.Provider>
    );
  }
}

export default TemplateProvider;

//   const [themeState, setThemeState] = useState({
//     dark: false,
//     hasThemeLoaded: false,
//   });
