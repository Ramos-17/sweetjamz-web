import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <h4>SweetJamz</h4>
          <p>Coffee, pastries &amp; custom drinks, made fresh daily.</p>
        </div>

        <div>
          <h4>Visit</h4>
          <p>Somewhere in Palmdale, CA</p>
          <p>Open daily</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/account/rewards">Rewards</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/signup">Create an account</Link>
        </div>
      </div>

      <div className="site-footer-bottom">
        &copy; {new Date().getFullYear()} SweetJamz.
      </div>
    </footer>
  );
}
