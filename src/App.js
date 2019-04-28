import React, {Component, useState, useEffect} from 'react';

const darkTheme = {backgroundColor: 'black', color: 'palevioletred', padding: '.5em'};
const lightTheme = {backgroundColor: 'lightyellow', color: 'darkred', padding: '.5em'};

const ThemeContext = React.createContext(darkTheme);

const UserContext = React.createContext('userA');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {theme: darkTheme, user: 'userB'}
    }

    handleThemeChange = () => {
        this.setState({theme: this.state.theme === darkTheme ? lightTheme : darkTheme})
    };

    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <UserContext.Provider value={this.state.user}>
                    <h1>App</h1>
                    <button onClick={this.handleThemeChange} style={{fontSize: '3em'}}>
                        {`Change Theme to ${this.state.theme === darkTheme ? 'light' : 'dark'}`}
                    </button>
                    <ComponentA/>
                    <ComponentX/>
                </UserContext.Provider>
            </ThemeContext.Provider>
        )
    }
}

const ComponentA = () => {
    return (
        <>
            <h1>Component A</h1>
            <ComponentB/>
        </>
    )
};

const ComponentB = () => {
    return (
        <>
            <h1>&emsp;Component B</h1>
            <ComponentC/>
        </>
    )
};

const ComponentC = () => {
    return (
        <ThemeContext.Consumer>
            {
                context => (
                    <>
                        <h1 style={context}>&emsp;&emsp;Component C</h1>
                        <ComponentD/>
                    </>
                )
            }
        </ThemeContext.Consumer>
    )
};

function ComponentD() {

    const [width, setWidth] = useState(window.innerWidth);

    let listener = () => setWidth(window.innerWidth);
    useEffect(() => {
            window.addEventListener('resize', listener)
            return () => window.removeEventListener('resize', listener)
        },
        [width]
    );

    let wrappedComponent = ({user, style}) =>
        <h1 style={style}>&emsp;&emsp;&emsp;Component D - {user} - {width}</h1>;
    return (
        withContext(wrappedComponent)
    );
}

const withContext = (WrappedComponent) => {
    return <ThemeContext.Consumer>
        {theme => (
            <UserContext.Consumer>
                {user => <WrappedComponent style={theme} user={user}/>}
            </UserContext.Consumer>
        )
        }
    </ThemeContext.Consumer>
};

const ComponentX = () => {
    return (
        <>
            <h1>Component X</h1>
            <ComponentY/>
        </>
    )
};

const ComponentY = () => {
    return (
        <>
            <h1>&emsp;Component Y</h1>
            <ComponentZ/>
        </>
    )
};

const ComponentZ = () => {
    return (
        <ThemeContext.Consumer>
            {
                themeContext => (
                    <UserContext.Consumer>
                        {
                            userContext => (
                                <h1 style={themeContext}>
                                    &emsp;&emsp;Component Z - {userContext}
                                </h1>
                            )
                        }
                    </UserContext.Consumer>
                )
            }
        </ThemeContext.Consumer>
    )
};

export default App;
