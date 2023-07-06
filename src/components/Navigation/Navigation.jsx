const Navigation = ({ onRouteChange, isSignedInStatus }) => {
    if (isSignedInStatus) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange('signin')}
                >
                    Sign Out
                </p>
            </nav>
        )
        
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange('register')}
                    >
                    Register
                </p>
                <p 
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange('signin')}
                    >
                    Sign In
                </p>
            </nav>
        )
    }
    
}

export default Navigation