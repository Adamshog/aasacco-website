import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA11TlNbJTv0Xz9UOTOmnRTULxmT_VKrDM",
  authDomain: "aa-sacco.firebaseapp.com",
  projectId: "aa-sacco",
  storageBucket: "aa-sacco.appspot.com",
  messagingSenderId: "728536830997",
  appId: "1:728536830997:web:c9c55b317f0e57745e6a1c",
  measurementId: "G-EFSCGYG5BX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ######################################################################################### */
// Initialize Elements
/* ######################################################################################### */

var loginPage = document.getElementById("login-page");
var loginEmail = document.getElementById("login-email");
var loginPassword = document.getElementById("login-password");
var loginButton = document.getElementById("login-button");
var loginError = document.getElementById("login-error");

var dashboardPage = document.getElementById("dashboard-page");

loginError.style.display = "none";
dashboardPage.style.display = "none";

loginButton.addEventListener("click", function () {
  if (validateLoginForm()) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        loginPage.style.display = "none";
        dashboardPage.style.display = "block";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        loginError.style.display = "block";
        loginError.innerHTML = errorMessage;
      });
  }
});

function validateLoginForm() {
  var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/; //Variable to validate Email ID

  if (loginEmail.value == "") {
    loginError.style.display = "block";
    loginError.innerHTML = "Please enter an email address";
    loginEmail.focus();
    return false;
  } else if (!loginEmail.value.match(emailExp)) {
    loginError.style.display = "block";
    loginError.innerHTML = "Please enter a valid email address";
    loginEmail.focus();
    return false;
  } else if (loginPassword.value == "") {
    loginError.style.display = "block";
    loginError.innerHTML = "Please enter a password";
    loginPassword.focus();
    return false;
  } else if (loginPassword.value.length < 6) {
    loginError.style.display = "block";
    loginError.innerHTML = "Password must be atleast 6 characters";
    loginPassword.focus();
    return false;
  } else {
    return true;
  }
}

[loginEmail, loginPassword].forEach((element) => {
  element.addEventListener("input", (e) => {
    loginError.style.display = "none";
  });
});

const tableWrapper = document.getElementById("table-wrapper");

// Create element and render users
const renderUser = (docc) => {
  const memberItem = `
<div class="member-item">
              <div
                id="personal-biodata-picture"
                class="personal-biodata-picture"
              >
                <h4>Profile Picture</h4>
                <img
                  id="profile_picture"
                  class="profile_picture"
                  src="https://firebasestorage.googleapis.com/v0/b/aa-sacco.appspot.com/o/24-248253_user-profile-default-image-png-clipart-png-download.png?alt=media&token=068aa523-cd2e-45ae-ab8b-2fd15cb0adc0"
                  alt="Profile Picture"
                />
              </div>

              <div id="personal-biodata" class="personal-biodata">
                <h4>Personal Biodata</h4>

                <p><span>Name : </span>${docc.data().personalName}</p>
                <p><span>Date of Birth : </span>${docc.data().personalDob}</p>
                <p><span>Age : </span>${docc.data().personalAge}</p>
                <p><span>Sex : </span>${docc.data().personalSex}</p>
                <p><span>ID Type : </span>${docc.data().personalIdType}</p>
                <p><span>Other ID Type : </span>${
                  docc.data().personalOtherIdType
                }</p>
                <p><span>ID Number : </span>${docc.data().personalIdNumber}</p>
                <p><span>Occupation : </span>${
                  docc.data().personalOccupation
                }</p>

                <h5>Home Address</h5>

                <p><span>Village : </span>${
                  docc.data().personalHomeAddressVillage
                }</p>
                <p><span>Parish : </span>${
                  docc.data().personalHomeAddressParish
                }</p>
                <p><span>Sub-County : </span>${
                  docc.data().personalHomeAddressSubCounty
                }</p>
                <p><span>County : </span>${
                  docc.data().personalHomeAddressCounty
                }</p>
                <p><span>District : </span>${
                  docc.data().personalHomeAddressDistrict
                }</p>
                <p><span>Country : </span>${
                  docc.data().personalHomeAddressCountry
                }</p>

                <h5>Work Address</h5>

                <p><span>Village : </span>${
                  docc.data().personalWorkAddressVillage
                }</p>
                <p><span>Parish : </span>${
                  docc.data().personalWorkAddressParish
                }</p>
                <p><span>Sub-County : </span>${
                  docc.data().personalWorkAddressSubCounty
                }</p>
                <p><span>County : </span>${
                  docc.data().personalWorkAddressCounty
                }</p>
                <p><span>District : </span>${
                  docc.data().personalWorkAddressDistrict
                }</p>
                <p><span>Country : </span>${
                  docc.data().personalWorkAddressCountry
                }</p>

                <h5>Contacts</h5>

                <p><span>Mobile Number : </span>${
                  docc.data().personalMobileNumber
                }</p>
                <p><span>Work Number : </span>${
                  docc.data().personalWorkNumber
                }</p>
                <p><span>Email : </span>${docc.data().personalEmailAddress}</p>
              </div>

              <div id="next-of-kin" class="next-of-kin">
                <h4>Next of kin</h4>

                <p><span>Name : </span>${docc.data().nokName}</p>
                <p><span>Relationship : </span>${
                  docc.data().nokRelationship
                }</p>

                <h5>Address</h5>

                <p><span>Village : </span>${docc.data().nokAddressVillage}</p>
                <p><span>Parish : </span>${docc.data().nokAddressParish}</p>
                <p><span>Sub-County : </span>${
                  docc.data().nokAddressSubCounty
                }</p>
                <p><span>County : </span>${docc.data().nokAddressCounty}</p>
                <p><span>District : </span>${docc.data().nokAddressDistrict}</p>
                <p><span>Country : </span>${docc.data().nokAddressCountry}</p>

                <h5>Contacts</h5>

                <p><span>Mobile Number : </span>${
                  docc.data().nokMobileNumber
                }</p>
                <p><span>Work Number : </span>${docc.data().nokWorkNumber}</p>
                <p><span>Email : </span>${docc.data().nokEmailAddress}</p>
              </div>

              <div id="dependants" class="dependants">
                <h4>Dependants</h4>

                <h5>Dependant One</h5>

                <p><span>Name : </span>${docc.data().dependantOneName}</p>
                <p><span>Age : </span>${docc.data().dependantOneAge}</p>
                <p><span>Relationship : </span>${
                  docc.data().dependantOneRelationship
                }</p>

                <h5>Dependant Two</h5>

                <p><span>Name : </span>${docc.data().dependantTwoName}</p>
                <p><span>Age : </span>${docc.data().dependantTwoAge}</p>
                <p><span>Relationship : </span>${
                  docc.data().dependantTwoRelationship
                }</p>

                <h5>Dependant Three</h5>

                <p><span>Name : </span>${docc.data().dependantThreeName}</p>
                <p><span>Age : </span>${docc.data().dependantThreeAge}</p>
                <p><span>Relationship : </span>${
                  docc.data().dependantThreeRelationship
                }</p>
              </div>

              <div id="purpose" class="purpose">
                <h4>Purpose</h4>
                <p><span>First : </span>${docc.data().purposeOne}</p>
                <p><span>Second : </span>${docc.data().purposeOTwo}</p>
                <p><span>Third : </span>${docc.data().purposeThree}</p>
                <p><span>Fourth : </span>${docc.data().purposeOthers}</p>
              </div>
              
              <div id="action-buttons" class="action-buttons">
                <button
                  id="action-button-approve-${docc.id}"
                  class="action-button-approve"
                >
                  Approve
                </button>
                <button id="${docc.id}" class="action-button-reject">
                  Reject
                </button>
              </div>
            </div>
`;

  tableWrapper.insertAdjacentHTML("beforeend", memberItem);

  // Click update member
  const approveMember = document.getElementById(
    `action-button-approve-${docc.id}`
  );

  approveMember.addEventListener("click", () => {
    if (confirm("Are you sure you want to approve this member?") == true) {
      const updateRef = doc(db, "members", docc.id);

      updateDoc(updateRef, {
        membershipStatus: "approved",
      }).then(() => {
        console.log("Approved!!");
        location.reload();
      });
    }
  });

  // Click delete member
  const deleteMember = document.getElementById(docc.id);

  deleteMember.addEventListener("click", () => {
    if (confirm("Are you sure you want to reject this member?") == true) {
      deleteDoc(doc(db, "members", docc.id)).then(() => {
        console.log("Deleted!!");
        location.reload();
      });
    }
  });

  if (docc.data().membershipStatus === "approved") {
    approveMember.style.display = "none";
    deleteMember.style.display = "none";
  }
};

//Get all members
const querySnapshot = await getDocs(collection(db, "members"));
querySnapshot.forEach((doccc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doccc.id, " => ", doccc.data());

  renderUser(doccc);
});
