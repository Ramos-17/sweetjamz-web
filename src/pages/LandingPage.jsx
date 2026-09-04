import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <h1>Coffee &amp; Pastries</h1>
          <p>
            Anything you want, anything you need, made fresh and made your way. Order ahead or stop by for a treat.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">
              View the menu
            </Link>
            <Link to="/signup" className="btn-secondary">
              Join for rewards
            </Link>
          </div>
        </div>
      </section>

      <div className="landing-sections">
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Coffee, done right</h3>
            <p className="product-description">
              Espresso, lattes, and cold brew — pulled fresh and made to order, every time.
            </p>
          </div>
          <div className="feature-card">
            <h3>Fresh pastries</h3>
            <p className="product-description">
              Baked daily in-house. Pair anything on the menu with a fresh muffin or croissant.
            </p>
          </div>
          <div className="feature-card">
            <h3>Made your way</h3>
            <p className="product-description">
              Customize your drink with notes at checkout, extra shot(no tequila lol), oat milk, you name it.
            </p>
          </div>
        </div>

        <div className="rewards-callout">
          <div>
            <h2>Earn points on every order</h2>
            <p>
              Every dollar you spend earns points toward money off your next order or save up for
              a free item on us.
            </p>
          </div>
          <Link to="/signup" className="btn-primary">
            Create a free account
          </Link>
        </div>
      </div>
    </>
  );
}
