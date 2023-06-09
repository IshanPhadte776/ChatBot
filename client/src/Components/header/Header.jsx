import React, { useState, useEffect } from "react";
import SignUpLoginPopup from "../signUpLoginPopup/SignUpLoginPopup";

function Header({
  isUserLoggedIn,
  teacherInfo,
  studentInfo,
  handleNavigation,
  setIsUserLoggedIn,
  setTeacherInfo,
  setStudentInfo,
  setUserType,
  setCurrentPage,
  language,
  handleLanguageToggle,
}) {
  const [isPopUpDisplayed, setDisplayPopup] = useState(false);
  const [isTransparent, setTransparent] = useState(false);
  const [isLogOutPopupDisplayed, setLogOutPopupDisplayed] = useState(false);


  const handleLoginClick = () => {
    setDisplayPopup(!isPopUpDisplayed);
  };

  const handleLogOutConfirm = () => {
    // Perform logout logic here
    setIsUserLoggedIn(false);
    setTeacherInfo({
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      Pronouns: "",
      NumOfStudents: "",
      ClassName: "",
    });
    setStudentInfo({
      FirstName: "",
      LastName: "",
      Password: "",
      ClassName: "",
    });
    setUserType("null");
    setCurrentPage("HomePage");
    setLogOutPopupDisplayed(false);
  };

  const handleLogOutCancel = () => {
    setLogOutPopupDisplayed(false);
  };

  const handleLogOutClick = () => {
    setLogOutPopupDisplayed(true);
  };

  const headerStyles = {
    backgroundColor: isTransparent ? "rgba(245, 158, 11, 0.6)" : "#F59E0B",
  };



  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      setTransparent(!isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="py-4 fixed top-0 left-0 h-16 w-full z-10" style={headerStyles}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center">
  <h1 className="text-xl font-bold mr-4">ScribbleSync</h1>
  <button
    className="text-lg cursor-pointer hover:text-blue-500"
    onClick={handleLanguageToggle}
  >
    {language}
  </button>
</div>


            {isUserLoggedIn ? (
              <>
                <h2
                  className="text-lg cursor-pointer hover:text-black mr-4"
                  onClick={() => handleNavigation("HomePage")}
                >
                  {language === "English" ? "Home" : "Accueil"}
                </h2>

                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={() => handleNavigation("MySchedulePage")}
                >
                  {language === "English" ? "My Schedule" : " Mon emploi du temps"}
                </h2>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={() => handleNavigation("MyImagesPage")}
                >
                  {language === "English" ? "My Images" : "  Mes images"}
                </h2>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={handleLogOutClick}
                >
                  {teacherInfo.FirstName || studentInfo.FirstName}
                </h2>
              </>
            ) : (
              <>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={() => handleNavigation("HomePage")}
                >
                {language === "English" ? "Home" : "Accueil"}

                </h2>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={() => handleNavigation("AboutUsPage")}
                >
                  {language === "English" ? "About Us" : "À propos de nous"}
                </h2>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={() => handleNavigation("RegisterPage")}
                >
                  {language === "English" ? "Register" : "S'inscrire"}
                </h2>

                
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={handleLoginClick}
                >
                  {language === "English" ? "Login" : "Se connecter"}
                </h2>
              </>
            )}
          </div>
        </div>
      </div>

      {isPopUpDisplayed && (
        <SignUpLoginPopup
          isPopUpDisplayed={true}
          setIsUserLoggedIn={setIsUserLoggedIn}
          teacherInfo={teacherInfo}
          studentInfo={studentInfo}
          setTeacherInfo={setTeacherInfo}
          setStudentInfo={setStudentInfo}
          setUserType={setUserType}
          setCurrentPage={setCurrentPage}
        />
      )}

      {isLogOutPopupDisplayed && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded text-center">
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-customRed text-white rounded mr-2"
                onClick={handleLogOutConfirm}
              >
                Log Out
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={handleLogOutCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
