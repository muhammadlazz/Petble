import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiMail, FiSettings, FiHome } from "react-icons/fi";

const Premium: React.FC = () => {
  const navigate = useNavigate();
  const [isPremium, setIsPremium] = useState<boolean>(() => localStorage.getItem("isPremium") === "true");
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);

  const handleUpgrade = () => setShowPaymentModal(true);
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
      <header className="bg-teal-900 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Premium</h1>
        <div className="flex gap-4 text-white text-2xl">
          <button className="hover:text-orange-500"><FiSearch /></button>
          <button onClick={() => navigate("/notifications")} className="hover:text-orange-500"><FiBell /></button>
          <button onClick={() => navigate("/mail")} className="hover:text-orange-500"><FiMail /></button>
          <button onClick={() => navigate("/settings")} className="hover:text-orange-500"><FiSettings /></button>
          <button className="text-xl p-2 hover:text-gray-300" onClick={() => navigate("/discovery")} aria-label="Home"><FiHome /></button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center text-center py-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">{isPremium ? "Premium Membership" : "Go Premium"}</h1>
        <p className="text-lg max-w-2xl mb-6">{isPremium ? "You are now a Premium member! Enjoy exclusive features and priority support." : "Upgrade to Premium and enjoy exclusive features such as priority support, enhanced discovery options, and more!"}</p>
        <div className="bg-white p-6 shadow-md rounded-xl max-w-md">
          {isPremium ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h2>
              <p className="text-xl text-gray-600 mb-6">Your Premium subscription is active.</p>
              <button onClick={() => setShowCancelModal(true)} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">Cancel Premium</button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pricing</h2>
              <p className="text-xl text-gray-600 mb-6">$9.99 / month</p>
              <button onClick={handleUpgrade} className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Upgrade Now</button>
            </>
          )}
        </div>

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setShowPaymentModal(false)}>
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <p className="text-gray-600 mb-6">Please enter your payment details to proceed with Premium membership.</p>
              <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="flex flex-col gap-4">
                <input type="text" placeholder="Card Number" className="border border-gray-300 p-2 rounded-lg" required />
                <div className="flex gap-2">
                  <input type="text" placeholder="MM/YY" className="border border-gray-300 p-2 rounded-lg w-1/2" required />
                  <input type="text" placeholder="Security Code" className="border border-gray-300 p-2 rounded-lg w-1/2" required />
                </div>
                <button type="submit" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Pay $9.99</button>
              </form>
            </div>
          </div>
        )}

        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setShowCancelModal(false)}>
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold mb-4">Cancel Premium?</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel your Premium membership? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowCancelModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">No</button>
                <button onClick={handleCancelPremium} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Yes, Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Premium;
