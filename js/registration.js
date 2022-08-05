/* ######################################################################################### */
// Firebase Configuration
/* ######################################################################################### */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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
// Personal Biodata
/* ######################################################################################### */

var profilePictureImageField = document.getElementById("output");
var personalPictureField = document.getElementById("personal-picture");
var personalNameField = document.getElementById("personal-name");
var personalDobField = document.getElementById("personal-dob");
var personalAgeField = document.getElementById("personal-age");
var personalSexField = document.getElementById("personal-sex");
var personalIdTypeField = document.getElementById("personal-id-type");
var personalOtherIdTypeField = document.getElementById(
  "personal-other-id-type"
);
var personalIdNumberField = document.getElementById("personal-id-number");
var personalOccupationField = document.getElementById("personal-occupation");
var personalHomeAddressVillageField = document.getElementById(
  "personal-home-address-village"
);
var personalHomeAddressParishField = document.getElementById(
  "personal-home-address-parish"
);
var personalHomeAddressSubCountyField = document.getElementById(
  "personal-home-address-sub-county"
);
var personalHomeAddressCountyField = document.getElementById(
  "personal-home-address-county"
);
var personalHomeAddressDistrictField = document.getElementById(
  "personal-home-address-district"
);
var personalHomeAddressCountryField = document.getElementById(
  "personal-home-address-country"
);
var personalWorkAddressVillageField = document.getElementById(
  "personal-work-address-village"
);
var personalWorkAddressParishField = document.getElementById(
  "personal-work-address-parish"
);
var personalWorkAddressSubCountyField = document.getElementById(
  "personal-work-address-sub-county"
);
var personalWorkAddressCountyField = document.getElementById(
  "personal-work-address-county"
);
var personalWorkAddressDistrictField = document.getElementById(
  "personal-work-address-district"
);
var personalWorkAddressCountryField = document.getElementById(
  "personal-work-address-country"
);

var personalMobileNumberField = document.getElementById(
  "personal-mobile-number"
);
var personalWorkNumberField = document.getElementById("personal-work-number");
var personalEmailAddressField = document.getElementById(
  "personal-email-address"
);

var profilePicture = null;

profilePictureImageField.style.display = "none";

if (personalIdTypeField.value === "other") {
  personalOtherIdTypeField.style.display = "block";
} else {
  personalOtherIdTypeField.style.display = "none";
}

personalPictureField.addEventListener("change", function () {
  if (this.files[0].size > 2097152) {
    alert("Image is bigger than 2MB");
    this.value = "";
  } else {
    // Encode the file using the FileReader API
    const reader = new FileReader();
    reader.onloadend = () => {
      // Use a regex to remove data url part
      profilePicture = reader.result.replace("data:", "").replace(/^.+,/, "");

      // console.log(profilePicture);
      // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(this.files[0]);

    profilePictureImageField.src = URL.createObjectURL(this.files[0]);
    profilePictureImageField.style.display = "block";
    personalPictureField.style.border = "1px solid #313761";
  }
});

personalIdTypeField.addEventListener("change", function () {
  if (personalIdTypeField.value === "other") {
    personalOtherIdTypeField.style.display = "block";
  } else {
    personalOtherIdTypeField.style.display = "none";
  }
});

/* ######################################################################################### */
// Next of Kin
/* ######################################################################################### */

var nokNameField = document.getElementById("nok-name");
var nokRelationshipField = document.getElementById("nok-relationship");
var nokAddressVillageField = document.getElementById("nok-address-village");
var nokAddressParishField = document.getElementById("nok-address-parish");
var nokAddressSubCountyField = document.getElementById(
  "nok-address-sub-county"
);
var nokAddressCountyField = document.getElementById("nok-address-county");
var nokAddressDistrictField = document.getElementById("nok-address-district");
var nokAddressCountryField = document.getElementById("nok-address-country");
var nokMobileNumberField = document.getElementById("nok-mobile-number");
var nokWorkNumberField = document.getElementById("nok-work-number");
var nokEmailAddressField = document.getElementById("nok-email-address");

/* ######################################################################################### */
// Dependants
/* ######################################################################################### */

var dependantOneNameField = document.getElementById("dependant-one-name");
var dependantOneAgeField = document.getElementById("dependant-one-age");
var dependantOneRelationshipField = document.getElementById(
  "dependant-one-relationship"
);

var dependantTwoNameField = document.getElementById("dependant-two-name");
var dependantTwoAgeField = document.getElementById("dependant-two-age");
var dependantTwoRelationshipField = document.getElementById(
  "dependant-two-relationship"
);

var dependantThreeNameField = document.getElementById("dependant-three-name");
var dependantThreeAgeField = document.getElementById("dependant-three-age");
var dependantThreeRelationshipField = document.getElementById(
  "dependant-three-relationship"
);

/* ######################################################################################### */
// Purpose
/* ######################################################################################### */

var purposeCheckboxOne = document.getElementById("purpose-checkbox-one");
var purposeCheckboxTwo = document.getElementById("purpose-checkbox-two");
var purposeCheckboxThree = document.getElementById("purpose-checkbox-three");
var purposeCheckboxFour = document.getElementById("purpose-checkbox-four");
var purposeOthers = document.getElementById("purpose-others");

/* ######################################################################################### */
// Consent
/* ######################################################################################### */

var consentCheckbox = document.getElementById("consent-checkbox");

/* ######################################################################################### */
// Submit
/* ######################################################################################### */

var submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function () {
  if (consentCheckbox.checked) {
    if (profilePicture == null) {
      personalPictureField.style.border = "1px solid red";
      personalPictureField.focus();
    } else if (personalNameField.value.length == 0) {
      personalNameField.style.border = "1px solid red";
      personalNameField.focus();
    } else if (personalDobField.value.length == 0) {
      personalDobField.style.border = "1px solid red";
      personalDobField.focus();
    } else if (personalAgeField.value.length == 0) {
      personalAgeField.style.border = "1px solid red";
      personalAgeField.focus();
    } else if (personalSexField.value.length == 0) {
      personalSexField.style.border = "1px solid red";
      personalSexField.focus();
    } else if (
      personalIdTypeField.value === "other" &&
      personalOtherIdTypeField.value.length == 0
    ) {
      personalOtherIdTypeField.style.border = "1px solid red";
      personalOtherIdTypeField.focus();
    } else if (personalIdNumberField.value.length == 0) {
      personalIdNumberField.style.border = "1px solid red";
      personalIdNumberField.focus();
    } else if (personalOccupationField.value.length == 0) {
      personalOccupationField.style.border = "1px solid red";
      personalOccupationField.focus();
    } else if (personalHomeAddressVillageField.value.length == 0) {
      personalHomeAddressVillageField.style.border = "1px solid red";
      personalHomeAddressVillageField.focus();
    } else if (personalHomeAddressParishField.value.length == 0) {
      personalHomeAddressParishField.style.border = "1px solid red";
      personalHomeAddressParishField.focus();
    } else if (personalHomeAddressSubCountyField.value.length == 0) {
      personalHomeAddressSubCountyField.style.border = "1px solid red";
      personalHomeAddressSubCountyField.focus();
    } else if (personalHomeAddressCountyField.value.length == 0) {
      personalHomeAddressCountyField.style.border = "1px solid red";
      personalHomeAddressCountyField.focus();
    } else if (personalHomeAddressDistrictField.value.length == 0) {
      personalHomeAddressDistrictField.style.border = "1px solid red";
      personalHomeAddressDistrictField.focus();
    } else if (personalHomeAddressCountryField.value.length == 0) {
      personalHomeAddressCountryField.style.border = "1px solid red";
      personalHomeAddressCountryField.focus();
    } else if (personalWorkAddressVillageField.value.length == 0) {
      personalWorkAddressVillageField.style.border = "1px solid red";
      personalWorkAddressVillageField.focus();
    } else if (personalWorkAddressParishField.value.length == 0) {
      personalWorkAddressParishField.style.border = "1px solid red";
      personalWorkAddressParishField.focus();
    } else if (personalWorkAddressSubCountyField.value.length == 0) {
      personalWorkAddressSubCountyField.style.border = "1px solid red";
      personalWorkAddressSubCountyField.focus();
    } else if (personalWorkAddressCountyField.value.length == 0) {
      personalWorkAddressCountyField.style.border = "1px solid red";
      personalWorkAddressCountyField.focus();
    } else if (personalWorkAddressDistrictField.value.length == 0) {
      personalWorkAddressDistrictField.style.border = "1px solid red";
      personalWorkAddressDistrictField.focus();
    } else if (personalWorkAddressCountryField.value.length == 0) {
      personalWorkAddressCountryField.style.border = "1px solid red";
      personalWorkAddressCountryField.focus();
    } else if (personalMobileNumberField.value.length == 0) {
      personalMobileNumberField.style.border = "1px solid red";
      personalMobileNumberField.focus();
    } else if (nokNameField.value.length == 0) {
      nokNameField.style.border = "1px solid red";
      nokNameField.focus();
    } else if (nokRelationshipField.value.length == 0) {
      nokRelationshipField.style.border = "1px solid red";
      nokRelationshipField.focus();
    } else if (nokAddressVillageField.value.length == 0) {
      nokAddressVillageField.style.border = "1px solid red";
      nokAddressVillageField.focus();
    } else if (nokAddressParishField.value.length == 0) {
      nokAddressParishField.style.border = "1px solid red";
      nokAddressParishField.focus();
    } else if (nokAddressSubCountyField.value.length == 0) {
      nokAddressSubCountyField.style.border = "1px solid red";
      nokAddressSubCountyField.focus();
    } else if (nokAddressCountyField.value.length == 0) {
      nokAddressCountyField.style.border = "1px solid red";
      nokAddressCountyField.focus();
    } else if (nokAddressDistrictField.value.length == 0) {
      nokAddressDistrictField.style.border = "1px solid red";
      nokAddressDistrictField.focus();
    } else if (nokAddressCountryField.value.length == 0) {
      nokAddressCountryField.style.border = "1px solid red";
      nokAddressCountryField.focus();
    } else if (dependantOneNameField.value.length == 0) {
      dependantOneNameField.style.border = "1px solid red";
      dependantOneNameField.focus();
    } else if (dependantOneAgeField.value.length == 0) {
      dependantOneAgeField.style.border = "1px solid red";
      dependantOneAgeField.focus();
    } else if (dependantOneRelationshipField.value.length == 0) {
      dependantOneRelationshipField.style.border = "1px solid red";
      dependantOneRelationshipField.focus();
    } else if (purposeCheckboxFour.checked && purposeOthers.value.length == 0) {
      purposeOthers.style.border = "1px solid red";
      purposeOthers.focus();
    } else {
      if (
        confirm("Are you sure the information you entered is correct?") == true
      ) {
        try {
          const docRef = addDoc(collection(db, "members"), {
            membershipStatus: "pending",
            personalProfilePicture: profilePicture,
            personalName: personalNameField.value,
            personalDob: personalDobField.value,
            personalAge: personalAgeField.value,
            personalSex: personalSexField.value,
            personalIdType: personalIdTypeField.value,
            personalOtherIdType: personalOtherIdTypeField.value,
            personalIdNumber: personalIdNumberField.value,
            personalOccupation: personalOccupationField.value,
            personalHomeAddressVillage: personalHomeAddressVillageField.value,
            personalHomeAddressParish: personalHomeAddressParishField.value,
            personalHomeAddressSubCounty:
              personalHomeAddressSubCountyField.value,
            personalHomeAddressCounty: personalHomeAddressCountyField.value,
            personalHomeAddressDistrict: personalHomeAddressDistrictField.value,
            personalHomeAddressCountry: personalHomeAddressCountryField.value,
            personalWorkAddressVillage: personalWorkAddressVillageField.value,
            personalWorkAddressParish: personalWorkAddressParishField.value,
            personalWorkAddressSubCounty:
              personalWorkAddressSubCountyField.value,
            personalWorkAddressCounty: personalWorkAddressCountyField.value,
            personalWorkAddressDistrict: personalWorkAddressDistrictField.value,
            personalWorkAddressCountry: personalWorkAddressCountryField.value,
            personalMobileNumber: personalMobileNumberField.value,
            personalWorkNumber: personalWorkNumberField.value,
            personalEmailAddress: personalEmailAddressField.value,
            nokName: nokNameField.value,
            nokRelationship: nokRelationshipField.value,
            nokAddressVillage: nokAddressVillageField.value,
            nokAddressParish: nokAddressParishField.value,
            nokAddressSubCounty: nokAddressSubCountyField.value,
            nokAddressCounty: nokAddressCountyField.value,
            nokAddressDistrict: nokAddressDistrictField.value,
            nokAddressCountry: nokAddressCountryField.value,
            nokMobileNumber: nokMobileNumberField.value,
            nokWorkNumber: nokWorkNumberField.value,
            nokEmailAddress: nokEmailAddressField.value,
            dependantOneName: dependantOneNameField.value,
            dependantOneAge: dependantOneAgeField.value,
            dependantOneRelationship: dependantOneRelationshipField.value,
            dependantTwoName: dependantTwoNameField.value,
            dependantTwoAge: dependantTwoAgeField.value,
            dependantTwoRelationship: dependantTwoRelationshipField.value,
            dependantThreeName: dependantThreeNameField.value,
            dependantThreeAge: dependantThreeAgeField.value,
            dependantThreeRelationship: dependantThreeRelationshipField.value,
            purposeOne: purposeCheckboxOne.checked ? "Savings" : "",
            purposeOTwo: purposeCheckboxTwo.checked
              ? "Buy shares for investment"
              : "",
            purposeThree: purposeCheckboxThree.checked
              ? "Benefit from credit services"
              : "",
            purposeOthers: purposeCheckboxThree.checked
              ? purposeOthers.value
              : "",
          }).then(function () {
            console.log("Document written with ID: ", docRef.id);

            alert(
              "Registration successfull, kindly wait for approval from the administrator."
            );

            location.reload();
            history.back();
          });
        } catch (e) {
          console.error("Error adding document: ", e);
          alert("Registration Failed, Please try again.");
        }
      }
    }
  } else {
    alert(
      "Please confirm that you have read and understood the constitution of this SACCO and will abide by them, you can do this by checking the checkbox above."
    );
  }
});

[
  personalPictureField,
  personalNameField,
  personalDobField,
  personalAgeField,
  personalOtherIdTypeField,
  personalIdNumberField,
  personalOccupationField,
  personalHomeAddressVillageField,
  personalHomeAddressParishField,
  personalHomeAddressSubCountyField,
  personalHomeAddressCountyField,
  personalHomeAddressDistrictField,
  personalHomeAddressCountryField,
  personalWorkAddressVillageField,
  personalWorkAddressParishField,
  personalWorkAddressSubCountyField,
  personalWorkAddressCountyField,
  personalWorkAddressDistrictField,
  personalWorkAddressCountryField,
  personalMobileNumberField,
  nokNameField,
  nokRelationshipField,
  nokAddressVillageField,
  nokAddressParishField,
  nokAddressSubCountyField,
  nokAddressCountyField,
  nokAddressDistrictField,
  nokAddressCountryField,
  dependantOneNameField,
  dependantOneAgeField,
  dependantOneRelationshipField,
  purposeOthers,
].forEach((element) => {
  element.addEventListener("input", (e) => {
    console.log(element.value);
    element.style.border = "1px solid #2d3250";
  });
});
