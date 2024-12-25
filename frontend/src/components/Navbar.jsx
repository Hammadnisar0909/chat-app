import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import Modal from "react-modal"; // Import react-modal
import toast from "react-hot-toast";

// Make sure Modal root is attached to the document body
Modal.setAppElement("#root");

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  // State to manage modal visibility and loading state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Open the confirmation modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle logout process
  const handleLogout = async () => {
    setIsLoggingOut(true); // Show "Logging out..." state
    closeModal(); // Close the confirmation modal

    try {
      await logout(); // Perform the logout action
      // toast.success("Logged out successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("An error occurred while logging out.");
    } finally {
      setIsLoggingOut(false); // Reset loading state
    }
  };

  return (

    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >

              <div className="size-9 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-bold text-lg">WhatsChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex gap-2 items-center hover:opacity-80 transition-all"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center hover:opacity-80 transition-all"
                  onClick={openModal} // Open confirmation modal on click
                  disabled={isLoggingOut} // Disable button while logging out
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Logout Confirmation"
        className="modal modal-open"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2 className="text-xl font-bold">
            Are you sure you want to log out?
          </h2>
          <div className="mt-4 flex justify-around">
            <button
              className="btn btn-primary"
              onClick={closeModal}
              disabled={isLoggingOut} // Disable if logging out
            >
              No
            </button>
            <button
              className="btn btn-primary"
              onClick={handleLogout}
              disabled={isLoggingOut} // Disable if logging out
            >
              Yes, Log out
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;
