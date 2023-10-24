// function to save form data to database ///////////////////////////////////////

// unique identieir for each form
document.addEventListener("DOMContentLoaded", () => {
  const jobId = document.getElementById("jobId");

  // Project Details
  const todaysDate = document.getElementById("todaysDate").value;
  const customerName = document.getElementById("customerName").value;
  const projectName = document.getElementById("projectName").value;
  const projectProduct =
    document.getElementById("projectProduct").options[
      document.getElementById("projectProduct").selectedIndex
    ].text;
  const projectProductOther = document.getElementById(
    "projectProductOther"
  ).value;
  const newOrRepeat = document.querySelector(
    'input[name="newOrRepeat"]:checked'
  ).value;
  const productCode = document.getElementById("productCode").value;
  const samplesRequired =
    document.getElementById("samplesRequired").options[
      document.getElementById("samplesRequired").selectedIndex
    ].text;
  const sampleRequiredDate =
    document.getElementById("sampleRequiredDate").value;

  // Product Details

  // Cup Details
  const cupSize =
    document.getElementById("cupSize").options[
      document.getElementById("cupSize").selectedIndex
    ].text;

  const cupSizeOptions =
    document.getElementById("cupSizeOptions").options[
      document.getElementById("cupSizeOptions").selectedIndex
    ].text;

  const cupBaseColour = document.getElementById("cupBaseColour").value;
  const cupPantoneReference = document.getElementById(
    "cupPantoneReference"
  ).value;

  const cupCoatedOrUncoated = document.querySelector(
    'input[name="cupCoatedOrUncoated"]:checked'
  ).value;

  const cupDecorationOptions = document.getElementById("cupDecorationOptions")
    .options[document.getElementById("cupDecorationOptions").selectedIndex]
    .text;

  const cupDecoration = document.getElementById("cupDecoration").value;

  const cupArtworkCompletedBy = document.querySelector(
    'input[name="cupArtworkCompletedBy"]:checked'
  ).value;

  const cupMouldBaseOptions = document.getElementById("cupMouldBaseOptions")
    .options[document.getElementById("cupMouldBaseOptions").selectedIndex].text;

  const cupMouldBaseOther = document.getElementById("cupMouldBaseOther").value;

  // Sleeve Details

  const sleeveRequired = document.querySelector(
    'input[name="sleeveRequired"]:checked'
  ).value;

  const sleeveSize = document.querySelector('input[name="sleeveSize"]:checked');

  const sleeveSizeOptions =
    document.getElementById("sleeveSizeOptions").options[
      document.getElementById("sleeveSizeOptions").selectedIndex
    ].text;

  const sleeveBaseColour = document.getElementById("sleeveBaseColour").value;
  const sleevePantoneReference = document.getElementById(
    "sleevePantoneReference"
  ).value;
  const sleeveCoatedOrUncoated = document.querySelector(
    'input[name="sleeveCoatedOrUncoated"]:checked'
  ).value;
  const sleeveArtworkCompletedBy = document.querySelector(
    'input[name="sleeveArtworkCompletedBy"]:checked'
  ).value;
  const sleeveMouldOptions =
    document.getElementById("sleeveMouldOptions").options[
      document.getElementById("sleeveMouldOptions").selectedIndex
    ].text;

  const sleeveMouldOther = document.getElementById("sleeveMouldOther").value;
  const sleeveEmbossing = document.querySelector(
    'input[name="sleeveEmbossing"]:checked'
  ).value;

  const sleeveOverprint = document.querySelector(
    'input[name="sleeveOverprint"]:checked'
  ).value;
  const sleeveOverprintDetails = document.getElementById(
    "sleeveOverprintDetails"
  ).value;

  // Lid details

  const lidRequired = document.querySelector(
    'input[name="lidRequired"]:checked'
  ).value;

  const lidSize = document.querySelector('input[name="lidSize"]:checked').value;

  const lidSizeOptions =
    document.getElementById("lidSizeOptions").options[
      document.getElementById("lidSizeOptions").selectedIndex
    ].text;

  const lidBaseColour = document.getElementById("lidBaseColour").value;
  const lidPantoneReference = document.getElementById(
    "lidPantoneReference"
  ).value;
  const lidCoatedOrUncoated = document.querySelector(
    'input[name="lidCoatedOrUncoated"]:checked'
  ).value;
  const lidMouldOptions =
    document.getElementById("lidMouldOptions").options[
      document.getElementById("lidMouldOptions").selectedIndex
    ].text;

  const lidMouldOther = document.getElementById("lidMouldOther").value;

  // Packaging details

  const packagingTypeOptions = document.getElementById("packagingTypeOptions")
    .options[document.getElementById("packagingTypeOptions").selectedIndex]
    .text;

  const packagingTypeOther =
    document.getElementById("packagingTypeOther").value;

  const packagingCutterGuide = document.querySelector(
    'input[name="packagingCutterGuide"]:checked'
  ).value;

  const packagingCutterGuideOther = document.getElementById(
    "packagingCutterGuideOther"
  ).value;

  const packagingPrintType = document.querySelector(
    'input[name="packagingPrintType"]:checked'
  ).value;

  const packagingPrintTypeDetails = document.getElementById(
    "packagingPrintTypeDetails"
  ).value;
  const packaagingPrintTypeCoatedOrUncoated = document.querySelector(
    'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
  ).value;

  const packagingPaperStock = document.getElementById("packagingPaperStock")
    .options[document.getElementById("packagingPaperStock").selectedIndex].text;

  const packagingPaperStockOther = document.getElementById(
    "packagingPaperStockOther"
  ).value;
  const packagingArtworkCompletedBy = document.querySelector(
    'input[name="packagingArtworkCompletedBy"]:checked'
  ).value;

  const packagingOuterCartonMarkings = document.getElementById(
    "packagingOuterCartonMarkings"
  ).options[
    document.getElementById("packagingOuterCartonMarkings").selectedIndex
  ].text;

  const packagingOuterCartonMarkingsOther = document.getElementById(
    "packagingOuterCartonMarkingsOther"
  ).value;

  const packagingBarcodeRequired = document.querySelector(
    'input[name="packagingBarcodeRequired"]:checked'
  ).value;
  const packagingBarcodeDetails = document.getElementById(
    "packagingBarcodeDetails"
  ).value;

  // Extra Notes (optional)
  const extraNotes = document.getElementById("extraNotes").value;
});

// connect to firebase ///////////////////////////////////////////////////////////////////////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDArL2GYZ0obc2K1wl_lJGsNcsgZPirmd0",
  authDomain: "ecoffeecup-form.firebaseapp.com",
  databaseURL:
    "https://ecoffeecup-form-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecoffeecup-form",
  storageBucket: "ecoffeecup-form.appspot.com",
  messagingSenderId: "1052602189339",
  appId: "1:1052602189339:web:f027a1f5d413143885dabe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const db = getDatabase();

// function to save form data to database ///////////////////////////////////////

function createForm() {
  console.log(jobId.value);

  set(ref(db, "Jobs/" + jobId.value), {
    // Job ID
    JobId: jobId.value,
    TodaysDate: todaysDate.value,

    // Project details

    CustomerName: customerName.value,
    // Email: email.value,
    ProjectName: projectName.value,
    // JobNumber: jobNumber.value,
    ProjectProduct: projectProduct.value,
    ProjectProductOther: projectProductOther.value,
    ProjectName: projectName.value,
    NewOrRepeat: document.querySelector('input[name="newOrRepeat"]:checked')
      .value,
    ProductCode: productCode.value,
    SamplesRequired: samplesRequired.value,
    SampleRequiredDate: sampleRequiredDate.value,

    // Product details

    // Cup details
    CupSize: cupSize.value,
    CupSizeOptions: cupSizeOptions.value,
    CupBaseColour: cupBaseColour.value,
    CupPantoneReference: cupPantoneReference.value,
    CupCoatedOrUncoated: document.querySelector(
      'input[name="cupCoatedOrUncoated"]:checked'
    ),
    CupDecorationOptions: cupDecorationOptions.value,
    CupDecoration: cupDecoration.value,
    CupArtworkCompletedBy: document.querySelector(
      'input[name="cupArtworkCompletedBy"]:checked'
    ),
    CupMouldBaseOptions: cupMouldBaseOptions.value,
    CupMouldBaseOther: cupMouldBaseOther.value,

    // Sleeve details
    SleeveRequired: document.querySelector(
      'input[name="sleeveRequired"]:checked'
    ).value,
    SleeveSize: document.querySelector('input[name="sleeveSize"]:checked')
      .value,
    SleeveSizeOptions: sleeveSizeOptions.value,
    SleeveBaseColour: sleeveBaseColour.value,
    SleevePantoneReference: sleevePantoneReference.value,
    SleeveCoatedOrUncoated: document.querySelector(
      'input[name="sleeveCoatedOrUncoated"]:checked'
    ),
    SleeveArtworkCompletedBy: document.querySelector(
      'input[name="sleeveArtworkCompletedBy"]:checked'
    ),
    SleeveMouldOptions: sleeveMouldOptions.value,
    SleeveMouldOther: sleeveMouldOther.value,
    SleeveEmbossing: document.querySelector(
      'input[name="sleeveEmbossing"]:checked'
    ).value,
    SleeveOverprint: document.querySelector(
      'input[name="sleeveOverprint"]:checked'
    ).value,
    SleeveOverprintDetails: sleeveOverprintDetails.value,

    // Lid details
    LidRequired: document.querySelector('input[name="lidRequired"]:checked')
      .value,
    LidSize: document.querySelector('input[name="lidSize"]:checked').value,
    LidSizeOptions: lidSizeOptions.value,
    LidBaseColour: lidBaseColour.value,
    LidPantoneReference: lidPantoneReference.value,
    LidCoatedOrUncoated: document.querySelector(
      'input[name="lidCoatedOrUncoated"]:checked'
    ).value,
    LidMouldOptions: lidMouldOptions.value,
    LidMouldOther: lidMouldOther.value,

    // Packaging details
    PackagingTypeOptions: packagingTypeOptions.value,
    PackagingTypeOther: packagingTypeOther.value,
    PackagingCutterGuide: document.querySelector(
      'input[name="packagingCutterGuide"]:checked'
    ).value,
    PackagingCutterGuideOther: packagingCutterGuideOther.value,
    PackagingPrintType: document.querySelector(
      'input[name="packagingPrintType"]:checked'
    ).value,
    PackagingPrintTypeDetails: packagingPrintTypeDetails.value,
    PackaagingPrintTypeCoatedOrUncoated: document.querySelector(
      'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
    ).value,
    PackagingPaperStock: packagingPaperStock.value,
    PackagingPaperStockOther: packagingPaperStockOther.value,
    PackagingArtworkCompletedBy: document.querySelector(
      'input[name="packagingArtworkCompletedBy"]:checked'
    ).value,
    PackagingOuterCartonMarkings: packagingOuterCartonMarkings.value,
    PackagingOuterCartonMarkingsOther: packagingOuterCartonMarkingsOther.value,
    PackagingBarcodeRequired: document.querySelector(
      'input[name="packagingBarcodeRequired"]:checked'
    ).value,
    PackagingBarcodeDetails: packagingBarcodeDetails.value,

    // Extra notes (optional)
    ExtraNotes: extraNotes.value,
  })
    .then(() => {
      alert("Form successfully saved to database");
    })
    .catch((error) => {
      alert(error);
    });
}

// Check if the form with the given formId exists in the database
function checkFormExistence(formId) {
  const dbRef = ref(db, "Projects/" + formId);

  return get(dbRef)
    .then((snapshot) => snapshot.exists())
    .catch((error) => false);
}

// // Function to enable/disable buttons based on form existence
// function toggleButtons(formExists) {
//   const saveToDatabaseBtn = document.getElementById("saveToDatabase");
//   const updateDatabaseBtn = document.getElementById("updateDatabase");

//   if (formExists) {
//     // Form exists, disable "Save" and enable "Update"
//     saveToDatabaseBtn.disabled = true;
//     updateDatabaseBtn.disabled = false;
//   } else {
//     // Form doesn't exist, enable "Save" and disable "Update"
//     saveToDatabaseBtn.disabled = false;
//     updateDatabaseBtn.disabled = true;
//   }
// }

// // When the page loads, check if the form exists and toggle buttons accordingly
function updateForm() {
  // Ask the user for confirmation
  const confirmed = window.confirm(
    "Are you sure you want to update this form? This will overwrite previously saved data."
  );

  if (confirmed) {
    // Proceed with updating the form
    set(ref(db, "Jobs/" + jobId.value), {
      // Update the form data here
      // ...
    })
      .then(() => {
        alert("Job successfully updated in the database");
      })
      .catch((error) => {
        alert(error);
      });
  }
}

// Function to toggle buttons based on form existence
function toggleButtons(jobExists) {
  // Implement your logic to enable or disable buttons here
  // For example:
  const updateButton = document.getElementById("updateDatabase");
  if (jobExists) {
    updateButton.disabled = false;
  } else {
    updateButton.disabled = true;
  }
}

// When the page loads, check if the form exists and toggle buttons accordingly
document.addEventListener("DOMContentLoaded", () => {
  checkJobExistence(jobId.value).then((jobExists) => {
    toggleButtons(jobExists);
  });
});

// function to retrieve form data from database //////////////////////////////////
function readForm() {
  const searchJobId = document.getElementById("searchJobId");
  const dbRef = ref(db);

  get(child(dbRef, "Jobs/" + jobId.value)) // searchJobId is the form ID entered by the user
    .then((snapshot) => {
      if (snapshot.exists()) {
        jobId.value = snapshot.val().JobId;
        todaysDate.value = snapshot.val().TodaysDate;

        // Project details
        customerName.value = snapshot.val().CustomerName;
        // email.value = snapshot.val().Email;
        projectProduct.value = snapshot.val().ProjectProduct;
        projectName.value = snapshot.val().ProjectName;
        // jobNumber.value = snapshot.val().JobNumber;
        projectProductOther.value = snapshot.val().ProjectProductOther;
        projectName.value = snapshot.val().ProjectName;
        newOrRepeat.value = snapshot.val().NewOrRepeat;
        productCode.value = snapshot.val().ProductCode;
        samplesRequired.value = snapshot.val().SamplesRequired;
        sampleRequiredDate.value = snapshot.val().SampleRequiredDate;

        // Product details

        // Cup details
        cupSize.value = snapshot.val().CupSize;
        cupSizeOptions.value = snapshot.val().CupSizeOptions;
        cupBaseColour.value = snapshot.val().CupBaseColour;
        cupPantoneReference.value = snapshot.val().CupPantoneReference;
        cupCoatedOrUncoated.value = snapshot.val().CupCoatedOrUncoated;
        cupDecorationOptions.value = snapshot.val().CupDecorationOptions;
        cupDecoration.value = snapshot.val().CupDecoration;
        cupArtworkCompletedBy.value = snapshot.val().CupArtworkCompletedBy;
        cupMouldBaseOptions.value = snapshot.val().CupMouldBaseOptions;
        cupMouldBaseOther.value = snapshot.val().CupMouldBaseOther;

        // Sleeve details
        sleeveRequired.value = snapshot.val().SleeveRequired;
        sleeveSize.value = snapshot.val().SleeveSize;
        sleeveSizeOptions.value = snapshot.val().SleeveSizeOptions;
        sleeveBaseColour.value = snapshot.val().SleeveBaseColour;
        sleevePantoneReference.value = snapshot.val().SleevePantoneReference;
        sleeveCoatedOrUncoated.value = snapshot.val().SleeveCoatedOrUncoated;
        sleeveArtworkCompletedBy.value =
          snapshot.val().SleeveArtworkCompletedBy;
        sleeveMouldOptions.value = snapshot.val().SleeveMouldOptions;
        sleeveMouldOther.value = snapshot.val().SleeveMouldOther;
        sleeveEmbossing.value = snapshot.val().SleeveEmbossing;
        sleeveOverprint.value = snapshot.val().SleeveOverprint;
        sleeveOverprintDetails.value = snapshot.val().SleeveOverprintDetails;

        // Lid details
        lidRequired.value = snapshot.val().LidRequired;
        lidSize.value = snapshot.val().LidSize;
        lidSizeOptions.value = snapshot.val().LidSizeOptions;
        lidBaseColour.value = snapshot.val().LidBaseColour;
        lidPantoneReference.value = snapshot.val().LidPantoneReference;
        lidCoatedOrUncoated.value = snapshot.val().LidCoatedOrUncoated;
        lidMouldOptions.value = snapshot.val().LidMouldOptions;
        lidMouldOther.value = snapshot.val().LidMouldOther;

        // Packaging details

        packagingTypeOptions.value = snapshot.val().PackagingTypeOptions;
        packagingTypeOther.value = snapshot.val().PackagingTypeOther;
        packagingCutterGuide.value = snapshot.val().PackagingCutterGuide;
        packagingCutterGuideOther.value =
          snapshot.val().PackagingCutterGuideOther;
        packagingPrintType.value = snapshot.val().PackagingPrintType;
        packagingPrintTypeDetails.value =
          snapshot.val().PackagingPrintTypeDetails;
        packaagingPrintTypeCoatedOrUncoated.value =
          snapshot.val().PackaagingPrintTypeCoatedOrUncoated;
        packagingPaperStock.value = snapshot.val().PackagingPaperStock;
        packagingPaperStockOther.value =
          snapshot.val().PackagingPaperStockOther;
        packagingArtworkCompletedBy.value =
          snapshot.val().PackagingArtworkCompletedBy;
        packagingOuterCartonMarkings.value =
          snapshot.val().PackagingOuterCartonMarkings;
        packagingBarcodeRequired.value =
          snapshot.val().PackagingBarcodeRequired;
        packagingBarcodeDetails.value = snapshot.val().PackagingBarcodeDetails;

        // Extra notes (optional)
        extraNotes.value = snapshot.val().ExtraNotes;

        console.log("Job Id exists");
        // Call toggleButtons to enable/disable buttons based on form existence
        toggleButtons(true);
      } else {
        console.log("Job Id does not exist");
        // Call toggleButtons to enable/disable buttons based on form non-existence
        toggleButtons(false);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to get the next available form ID
// Check if the form with the given formId exists in the database
function checkJobExistence(jobId) {
  const dbRef = ref(db, "Jobs/" + jobId);

  return get(dbRef)
    .then((snapshot) => snapshot.exists())
    .catch((error) => false);
}

// Function to get the next available form ID
function getNextJobId() {
  return checkJobExistence().then((highestJobId) => {
    return highestJobId + 1; // Increment the highest Job ID by 1
  });
}

// When the page loads, populate the "Job ID" input field
document.addEventListener("DOMContentLoaded", () => {
  const jobIdInput = document.getElementById("jobId");

  // Call the function to get the next job ID
  getNextJobId()
    .then((nextJobId) => {
      jobIdInput.value = nextJobId;
    })
    .catch((error) => {
      console.error("Error populating Job ID:", error);
    });
});

// function to delete form data from database ////////////////////////////////////
function deleteForm() {
  // Ask the user for confirmation
  const confirmed = window.confirm(
    "Are you sure you want to delete this form? This action cannot be undone."
  );

  if (confirmed) {
    // User confirmed, proceed with the deletion
    remove(ref(db, "Jobs/" + jobId.value))
      .then(() => {
        alert("Job successfully deleted from database");
      })
      .catch((error) => {
        alert(error);
      });
  }
}

// button to save form data to database /////////////////////////////////////////
const saveToDatabaseBtn = document.getElementById("saveToDatabase");

// button to update form data in database ///////////////////////////////////////
const updateDatabaseBtn = document.getElementById("updateDatabase");

// button to delete form data from database /////////////////////////////////////
const deleteFromDatabaseBtn = document.getElementById("deleteFromDatabase");

// button to search database for form data //////////////////////////////////////
const searchDatabaseBtn = document.getElementById("searchDatabase");

// Form ID to search for ////////////////////////////////////////////////////////
const searchJobId = document.getElementById("searchJobId").value;

// function to save form data to database ///////////////////////////////////////

// functions used by buttons
saveToDatabaseBtn.addEventListener("click", createForm);
updateDatabaseBtn.addEventListener("click", updateForm);
deleteFromDatabaseBtn.addEventListener("click", deleteForm);
searchDatabaseBtn.addEventListener("click", readForm);

// script to save web form as PDF ///////////////////////////////////////////////

document.getElementById("saveAsPDF").addEventListener("click", function () {
  const jobId = document.getElementById("jobId").value;

  // Project Details
  const todaysDate = document.getElementById("todaysDate").value;
  const customerName = document.getElementById("customerName").value;
  // const email = document.getElementById("email").value;
  const projectName = document.getElementById("projectName").value;

  const projectProduct =
    document.getElementById("projectProduct").options[
      document.getElementById("projectProduct").selectedIndex
    ].text;

  const projectProductOther = document.getElementById(
    "projectProductOther"
  ).value;
  // const jobNumber = document.getElementById("jobNumber").value;
  const newOrRepeat = document.querySelector(
    'input[name="newOrRepeat"]:checked'
  ).value;
  const productCode = document.getElementById("productCode").value;

  const samplesRequired =
    document.getElementById("samplesRequired").options[
      document.getElementById("samplesRequired").selectedIndex
    ].text;

  const sampleRequiredDate =
    document.getElementById("sampleRequiredDate").value;

  // Product Details

  // Cup Details
  const cupSize =
    document.getElementById("cupSize").options[
      document.getElementById("cupSize").selectedIndex
    ].text;

  const cupSizeOptions =
    document.getElementById("cupSizeOptions").options[
      document.getElementById("cupSizeOptions").selectedIndex
    ].text;

  const cupBaseColour = document.getElementById("cupBaseColour").value;
  const cupPantoneReference = document.getElementById(
    "cupPantoneReference"
  ).value;

  const cupCoatedOrUncoated = document.querySelector(
    'input[name="cupCoatedOrUncoated"]:checked'
  ).value;

  const cupDecorationOptions = document.getElementById("cupDecorationOptions")
    .options[document.getElementById("cupDecorationOptions").selectedIndex]
    .text;

  const cupDecoration = document.getElementById("cupDecoration").value;

  const cupArtworkCompletedBy = document.querySelector(
    'input[name="cupArtworkCompletedBy"]:checked'
  ).value;

  const cupMouldBaseOptions = document.getElementById("cupMouldBaseOptions")
    .options[document.getElementById("cupMouldBaseOptions").selectedIndex].text;

  const cupMouldBaseOther = document.getElementById("cupMouldBaseOther").value;

  // Sleeve Details

  const sleeveRequired = document.querySelector(
    'input[name="sleeveRequired"]:checked'
  ).value;

  const sleeveSize = document.querySelector('input[name="sleeveSize"]:checked');

  const sleeveSizeOptions =
    document.getElementById("sleeveSizeOptions").options[
      document.getElementById("sleeveSizeOptions").selectedIndex
    ].text;

  const sleeveBaseColour = document.getElementById("sleeveBaseColour").value;
  const sleevePantoneReference = document.getElementById(
    "sleevePantoneReference"
  ).value;
  const sleeveCoatedOrUncoated = document.querySelector(
    'input[name="sleeveCoatedOrUncoated"]:checked'
  ).value;
  const sleeveArtworkCompletedBy = document.querySelector(
    'input[name="sleeveArtworkCompletedBy"]:checked'
  ).value;
  const sleeveMouldOptions =
    document.getElementById("sleeveMouldOptions").options[
      document.getElementById("sleeveMouldOptions").selectedIndex
    ].text;

  const sleeveMouldOther = document.getElementById("sleeveMouldOther").value;
  const sleeveEmbossing = document.querySelector(
    'input[name="sleeveEmbossing"]:checked'
  ).value;

  const sleeveOverprint = document.querySelector(
    'input[name="sleeveOverprint"]:checked'
  ).value;
  const sleeveOverprintDetails = document.getElementById(
    "sleeveOverprintDetails"
  ).value;

  // Lid details

  const lidRequired = document.querySelector(
    'input[name="lidRequired"]:checked'
  ).value;

  const lidSize = document.querySelector('input[name="lidSize"]:checked').value;

  const lidSizeOptions =
    document.getElementById("lidSizeOptions").options[
      document.getElementById("lidSizeOptions").selectedIndex
    ].text;

  const lidBaseColour = document.getElementById("lidBaseColour").value;
  const lidPantoneReference = document.getElementById(
    "lidPantoneReference"
  ).value;
  const lidCoatedOrUncoated = document.querySelector(
    'input[name="lidCoatedOrUncoated"]:checked'
  ).value;
  const lidMouldOptions =
    document.getElementById("lidMouldOptions").options[
      document.getElementById("lidMouldOptions").selectedIndex
    ].text;

  const lidMouldOther = document.getElementById("lidMouldOther").value;

  // Packaging details

  const packagingTypeOptions = document.getElementById("packagingTypeOptions")
    .options[document.getElementById("packagingTypeOptions").selectedIndex]
    .text;

  const packagingTypeOther =
    document.getElementById("packagingTypeOther").value;

  const packagingCutterGuide = document.querySelector(
    'input[name="packagingCutterGuide"]:checked'
  ).value;

  const packagingCutterGuideOther = document.getElementById(
    "packagingCutterGuideOther"
  ).value;

  const packagingPrintType = document.querySelector(
    'input[name="packagingPrintType"]:checked'
  ).value;

  const packagingPrintTypeDetails = document.getElementById(
    "packagingPrintTypeDetails"
  ).value;
  const packaagingPrintTypeCoatedOrUncoated = document.querySelector(
    'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
  ).value;

  const packagingPaperStock = document.getElementById("packagingPaperStock")
    .options[document.getElementById("packagingPaperStock").selectedIndex].text;

  const packagingPaperStockOther = document.getElementById(
    "packagingPaperStockOther"
  ).value;
  const packagingArtworkCompletedBy = document.querySelector(
    'input[name="packagingArtworkCompletedBy"]:checked'
  ).value;

  const packagingOuterCartonMarkings = document.getElementById(
    "packagingOuterCartonMarkings"
  ).options[
    document.getElementById("packagingOuterCartonMarkings").selectedIndex
  ].text;

  const packagingOuterCartonMarkingsOther = document.getElementById(
    "packagingOuterCartonMarkingsOther"
  ).value;

  const packagingBarcodeRequired = document.querySelector(
    'input[name="packagingBarcodeRequired"]:checked'
  ).value;
  const packagingBarcodeDetails = document.getElementById(
    "packagingBarcodeDetails"
  ).value;

  // Extra Notes (optional)
  const extraNotes = document.getElementById("extraNotes").value;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add content to the saved PDF

  // Set the font size
  doc.setFontSize(10);

  // Load the logo image
  const logoImage = document.getElementById("logo");

  // Add the logo image to the PDF
  const logoWidth = 30; // Adjust the width of the logo as needed
  const logoHeight = (logoWidth * logoImage.height) / logoImage.width; // Maintain the aspect ratio

  // Get the page width and height
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Add the logo to the top right corner of the PDF
  // Add the logo to the top right corner of the PDF
  doc.addImage(
    logoImage,
    "PNG",
    pageWidth - logoWidth - 10,
    10,
    logoWidth,
    logoHeight
  );

  // Define column widths and positions
  const column1X = 10; // Adjust this value as needed
  const column2X = 20; // Adjust this value as needed
  const column3X = 105; // Adjust this value as needed
  const column4X = 5;
  const startY = 10;
  const lineHeight = 6;

  doc.setFontSize(18);
  doc.setFontStyle("bold");

  // ID
  doc.text(`Job ID: ${jobId}`, column4X, startY + lineHeight * 1);

  doc.setFontSize(14);
  doc.setFontStyle("bold");

  doc.text("Project Details", column1X, startY + lineHeight * 3);

  doc.setFontSize(8);
  doc.setFontStyle("normal");

  // Project Details
  doc.text(`Date: ${todaysDate}`, column2X, startY + lineHeight * 5);
  doc.text(`Customer Name: ${customerName}`, column2X, startY + lineHeight * 6);
  doc.text(`Project Name: ${projectName}`, column2X, startY + lineHeight * 7);
  doc.text(
    `Project Product Option: ${projectProduct}`,
    column2X,
    startY + lineHeight * 8
  );

  doc.text(
    `If Other, please specify: ${projectProductOther}`,
    column2X,
    startY + lineHeight * 9
  );
  doc.text(`New or Repeat: ${newOrRepeat}`, column3X, startY + lineHeight * 5);
  doc.text(`Product Code: ${productCode}`, column3X, startY + lineHeight * 6);
  doc.text(
    `Samples Required: ${samplesRequired}`,
    column3X,
    startY + lineHeight * 7
  );
  doc.text(
    `Sample Required Date: ${sampleRequiredDate}`,
    column3X,
    startY + lineHeight * 8
  );

  // Product Details

  doc.setFontSize(14);
  doc.setFontStyle("bold");

  doc.text("Product Details", column1X, startY + lineHeight * 11);

  // Cup Details

  doc.setFontSize(12);
  doc.setFontStyle("bold");

  doc.text("Cup Details", column2X, startY + lineHeight * 13);

  doc.setFontSize(8);
  doc.setFontStyle("normal");

  doc.text(`Cup Size Option: ${cupSize}`, column2X, startY + lineHeight * 14);

  doc.text(
    `If other, please specify: ${cupSizeOptions}`,
    column2X,
    startY + lineHeight * 15
  );
  doc.text(
    `Cup Base Colour: ${cupBaseColour}`,
    column2X,
    startY + lineHeight * 16
  );
  doc.text(
    `Cup Pantone Reference: ${cupPantoneReference}`,
    column2X,
    startY + lineHeight * 17
  );
  doc.text(
    `Cup Coated or Uncoated: ${cupCoatedOrUncoated}`,
    column2X,
    startY + lineHeight * 18
  );

  doc.text(
    `Cup Decoration Option: ${cupDecorationOptions}`,
    column2X,
    startY + lineHeight * 19
  );

  doc.text(
    `If other, please specify: ${cupDecoration}`,
    column2X,
    startY + lineHeight * 20
  );
  doc.text(
    `Cup Artwork Completed By: ${cupArtworkCompletedBy}`,
    column2X,
    startY + lineHeight * 21
  );
  doc.text(
    `Cup Mould Base Option: ${cupMouldBaseOptions}`,
    column2X,
    startY + lineHeight * 22
  );
  doc.text(
    `If other, please specify: ${cupMouldBaseOther}`,
    column2X,
    startY + lineHeight * 23
  );

  // Sleeve Details

  doc.setFontSize(12);
  doc.setFontStyle("bold");

  doc.text("Sleeve Details", column2X, startY + lineHeight * 26);

  doc.setFontSize(8);
  doc.setFontStyle("normal");

  doc.text(
    `Sleeve Required: ${sleeveRequired}`,
    column2X,
    startY + lineHeight * 27
  );
  doc.text(`Sleeve Size: ${sleeveSize}`, column2X, startY + lineHeight * 28);
  doc.text(
    `Sleeve Size Options: ${sleeveSizeOptions}`,
    column2X,
    startY + lineHeight * 29
  );
  doc.text(
    `Sleeve Base Colour: ${sleeveBaseColour}`,
    column2X,
    startY + lineHeight * 30
  );
  doc.text(
    `Sleeve Pantone Reference: ${sleevePantoneReference}`,
    column2X,
    startY + lineHeight * 31
  );
  doc.text(
    `Sleeve Coated or Uncoated: ${sleeveCoatedOrUncoated}`,
    column2X,
    startY + lineHeight * 32
  );
  doc.text(
    `Sleeve Artwork Completed By: ${sleeveArtworkCompletedBy}`,
    column2X,
    startY + lineHeight * 33
  );
  doc.text(
    `Sleeve Mould Option: ${sleeveMouldOptions}`,
    column2X,
    startY + lineHeight * 34
  );
  doc.text(
    `If other, please specify: ${sleeveMouldOther}`,
    column2X,
    startY + lineHeight * 35
  );
  doc.text(
    `Sleeve Embossing: ${sleeveEmbossing}`,
    column2X,
    startY + lineHeight * 36
  );
  doc.text(
    `Sleeve Overprint: ${sleeveOverprint}`,
    column2X,
    startY + lineHeight * 37
  );
  doc.text(
    `Sleeve Overprint Details: ${sleeveOverprintDetails}`,
    column2X,
    startY + lineHeight * 38
  );

  // Lid Details

  doc.setFontSize(12);
  doc.setFontStyle("bold");

  doc.text("Lid Details", column3X, startY + lineHeight * 13);

  doc.setFontSize(8);
  doc.setFontStyle("Normal");

  doc.text(`Lid Required: ${lidRequired}`, column3X, startY + lineHeight * 14);
  doc.text(`Lid Size Option: ${lidSize}`, column3X, startY + lineHeight * 15);
  doc.text(
    `If other, please specify: ${lidSizeOptions}`,
    column3X,
    startY + lineHeight * 16
  );
  doc.text(
    `Lid Base Colour: ${lidBaseColour}`,
    column3X,
    startY + lineHeight * 17
  );
  doc.text(
    `Lid Pantone Reference: ${lidPantoneReference}`,
    column3X,
    startY + lineHeight * 18
  );
  doc.text(
    `Lid Coated or Uncoated: ${lidCoatedOrUncoated}`,
    column3X,
    startY + lineHeight * 19
  );
  doc.text(
    `Lid Mould Option: ${lidMouldOptions}`,
    column3X,
    startY + lineHeight * 20
  );
  doc.text(
    `If other, please specify: ${lidMouldOther}`,
    column3X,
    startY + lineHeight * 21
  );

  // Packaging Details

  doc.setFontSize(12);
  doc.setFontStyle("bold");

  doc.text("Packaging Details", column3X, startY + lineHeight * 26);

  doc.setFontSize(8);
  doc.setFontStyle("normal");

  doc.text(
    `Packaging Type Option: ${packagingTypeOptions}`,
    column3X,
    startY + lineHeight * 27
  );
  doc.text(
    `If other, please specify: ${packagingTypeOther}`,
    column3X,
    startY + lineHeight * 28
  );
  doc.text(
    `Packaging Cutter Guide: ${packagingCutterGuide}`,
    column3X,
    startY + lineHeight * 29
  );
  doc.text(
    `Packaging Cutter Guide Other: ${packagingCutterGuideOther}`,
    column3X,
    startY + lineHeight * 30
  );
  doc.text(
    `Packaging Print Type: ${packagingPrintType}`,
    column3X,
    startY + lineHeight * 31
  );
  doc.text(
    `Packaging Print Type Details: ${packagingPrintTypeDetails}`,
    column3X,
    startY + lineHeight * 32
  );
  doc.text(
    `Packaging Print Type Coated or Uncoated: ${packaagingPrintTypeCoatedOrUncoated}`,
    column3X,
    startY + lineHeight * 33
  );
  doc.text(
    `Packaging Paper Stock Option: ${packagingPaperStock}`,
    column3X,
    startY + lineHeight * 34
  );
  doc.text(
    `If other, please specify: ${packagingPaperStockOther}`,
    column3X,
    startY + lineHeight * 35
  );
  doc.text(
    `Packaging Artwork Completed By: ${packagingArtworkCompletedBy}`,
    column3X,
    startY + lineHeight * 36
  );
  doc.text(
    `Packaging Outer Carton Markings Option: ${packagingOuterCartonMarkings}`,
    column3X,
    startY + lineHeight * 37
  );
  doc.text(
    `If other, pleaase specify: ${packagingOuterCartonMarkingsOther}`,
    column3X,
    startY + lineHeight * 38
  );
  doc.text(
    `Packaging Barcode Required: ${packagingBarcodeRequired}`,
    column3X,
    startY + lineHeight * 39
  );
  doc.text(
    `Packaging Barcode Details: ${packagingBarcodeDetails}`,
    column3X,
    startY + lineHeight * 40
  );

  doc.setFontSize(14);
  doc.setFontStyle("bold");

  doc.text("Extra Notes", column2X, startY + lineHeight * 42);

  doc.setFontSize(8);
  doc.setFontStyle("normal");

  // Extra Notes (optional)
  doc.text(`Notes: ${extraNotes}`, column2X, startY + lineHeight * 43);

  // Save the PDF
  doc.save("productRequestForm.pdf");
});

////////////////////////////////////////////////////////////////////////////////

// script to make the date field auto-populate with today's date
const currentDate1 = new Date();
const year1 = currentDate1.getFullYear();
const month1 = String(currentDate1.getMonth() + 1).padStart(2, "0");
const day1 = String(currentDate1.getDate()).padStart(2, "0");
const formattedDate1 = `${year1}-${month1}-${day1}`;
document.getElementById("todaysDate").value = formattedDate1;

// script to make the "request date" field populate with the date in two weeks from today
const currentDate2 = new Date();
currentDate2.setDate(currentDate2.getDate() + 14);

// Format the date as "YYYY-MM-DD" for the input field
const year2 = currentDate2.getFullYear();
const month2 = String(currentDate2.getMonth() + 1).padStart(2, "0");
const day2 = String(currentDate2.getDate()).padStart(2, "0");
const formattedDate2 = `${year2}-${month2}-${day2}`;

// Set the default value of the date picker to 14 days from today
document.getElementById("sampleRequiredDate").value = formattedDate2;
