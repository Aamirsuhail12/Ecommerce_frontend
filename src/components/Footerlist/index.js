
import "./index.css"; // Import your CSS file for styling

const Footerlist = () => {

  console.log('FooterList');
  return (
    <footer className="footer1">
      <div className="footer-container">
        {/* Fruits & Vegetables Section */}
        <div className="footer-section">
          <h3>Fruits & Vegetables</h3>
          <ul>
            <li>Apples</li>
            <li>Bananas</li>
            <li>Tomatoes</li>
            <li>Carrots</li>
            <li>Spinach</li>
          </ul>
        </div>

        {/* Breakfast & Dairy Section */}
        <div className="footer-section">
          <h3>Breakfast & Dairy</h3>
          <ul>
            <li>Milk</li>
            <li>Eggs</li>
            <li>Cheese</li>
            <li>Butter</li>
            <li>Yogurt</li>
          </ul>
        </div>

        {/* Meat & Seafood Section */}
        <div className="footer-section">
          <h3>Meat & Seafood</h3>
          <ul>
            <li>Chicken</li>
            <li>Beef</li>
            <li>Fish</li>
            <li>Prawns</li>
            <li>Lamb</li>
          </ul>
        </div>

        {/* Beverages Section */}
        <div className="footer-section">
          <h3>Beverages</h3>
          <ul>
            <li>Tea</li>
            <li>Coffee</li>
            <li>Juices</li>
            <li>Soft Drinks</li>
            <li>Energy Drinks</li>
          </ul>
        </div>

        {/* Breads & Bakery Section */}
        <div className="footer-section">
          <h3>Breads & Bakery</h3>
          <ul>
            <li>White Bread</li>
            <li>Brown Bread</li>
            <li>Bagels</li>
            <li>Croissants</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footerlist;
