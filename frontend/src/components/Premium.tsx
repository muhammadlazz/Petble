import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiMail, FiSettings, FiHome } from "react-icons/fi";

const Premium: React.FC = () => {
  const navigate = useNavigate();

  const [isPremium, setIsPremium] = useState<boolean>(() => {
    return localStorage.getItem("isPremium") === "true";
  });
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setTimeout(() => {
      setShowPaymentModal(false);
      setIsPremium(true);
      localStorage.setItem("isPremium", "true");
      alert("Thank you for upgrading to Premium!");
    }, 1500);
  };

  const handleCancelPremium = () => {
    localStorage.removeItem("isPremium");
    setIsPremium(false);
    alert("Your Premium subscription has been canceled.");
    setShowCancelModal(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <header className="bg-teal-900 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Premium</h1>
        <div className="flex gap-4 text-white text-2xl">
          <button className="hover:text-orange-500">
            <FiSearch />
          </button>
          <button onClick={() => navigate("/notifications")} className="hover:text-orange-500">
            <FiBell />
          </button>
          <button onClick={() => navigate("/mail")} className="hover:text-orange-500">
            <FiMail />
          </button>
          <button onClick={() => navigate("/settings")} className="hover:text-orange-500">
            <FiSettings />
          </button>
          <button
            className="text-xl p-2 hover:text-gray-300"
            onClick={() => navigate("/discovery")}
            aria-label="Home"
          >
            <FiHome />
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          {isPremium ? "Premium Membership" : "Go Premium"}
        </h1>
        <p className="text-lg max-w-2xl mb-6">
          {isPremium
            ? "You are now a Premium member! Enjoy exclusive features and priority support."
            : "Upgrade to Premium and enjoy exclusive features such as priority support, enhanced discovery options, and more!"}
        </p>
        <div className="bg-white p-6 shadow-md rounded-xl max-w-md">
          {isPremium ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 mb-6">Your Premium subscription is active.</p>
              <button
                onClick={() => setShowCancelModal(true)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancel Premium
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing</h2>
              <p className="text-xl text-gray-600 mb-6">$9.99 / month</p>
              <button
                onClick={handleUpgrade}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Upgrade Now
              </button>
            </>
          )}
        </div>
      </div>


      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to upgrade to Premium?</p>
            <button
              onClick={handlePayment}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition mr-2"
            >
              Yes, Upgrade
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Cancel Premium</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel your Premium subscription?</p>
            <button
              onClick={handleCancelPremium}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition mr-2"
            >
              Yes, Cancel
            </button>
            <button
              onClick={() => setShowCancelModal(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Keep Premium
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
