import Container from "../../../components/Container";

const Membership = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white py-32"
      style={{
        backgroundImage:
          "url('https://keenitsolutions.com/products/wordpress/educavo/wp-content/uploads/2021/04/subscribe_bg.jpg')",
      }}
    >
      <Container>
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold">Free 15 Day Membership</h2>
            <p>
              Become a member of Our Community. An Our Community membership
              gives products and services.
            </p>
          </div>
          <div>
            <button className="px-16 py-3 text-lg text-white font-semibold bg-orange-600 dark:bg-white dark:text-gray-900 rounded shadow-md hover:bg-orange-500">
              Get Started
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Membership;
