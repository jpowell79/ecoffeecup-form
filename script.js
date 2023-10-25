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
  console.log("Initial jobId value: " + jobId.value);
  set(ref(db, "Jobs/" + jobId.value), {
    // Job ID
    JobId: jobId.value,
    TodaysDate: todaysDate.value,

    // Project details

    CustomerName: customerName.value,
    ProjectName: projectName.value,
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
    ).value,
    CupDecorationOptions: cupDecorationOptions.value,
    CupDecoration: cupDecoration.value,
    CupArtworkCompletedBy: document.querySelector(
      'input[name="cupArtworkCompletedBy"]:checked'
    ).value,
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
    ).value,
    SleeveArtworkCompletedBy: document.querySelector(
      'input[name="sleeveArtworkCompletedBy"]:checked'
    ).value,
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

    PackagingPrintTypeCoatedOrUncoated: document.querySelector(
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
      alert("Form successfully saved to the database");

      // Increment the jobId

      jobId.value = Number(jobId.value) + 1;
      console.log("Job ID incremented to " + jobId.value);
      let latestValue = jobId.value;

      // Reset the form fields to their default/blank values
      document.getElementById("productRequestForm").reset();
      console.log("Form reset");

      // Populate the jobId input field with the incremented value
      document.getElementById("jobId").value = Number(latestValue);
      console.log("New value on form is " + Number(latestValue));

      // Disable the delete button
      document.getElementById("deleteFromDatabase").disabled = true;

      // update the dates
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

      // Move focus back to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((error) => {
      alert(error);
    });
}

// // When the page loads, check if the form exists and toggle buttons accordingly
function updateForm() {
  // Ask the user for confirmation
  const confirmed = window.confirm(
    "Are you sure you want to update this form? This will overwrite previously saved data."
  );

  if (confirmed) {
    // Proceed with updating the form
    update(ref(db, "Jobs/" + jobId.value), {
      // Job ID
      JobId: jobId.value,
      TodaysDate: todaysDate.value,

      // Project details

      CustomerName: customerName.value,
      ProjectName: projectName.value,
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
      ).value,
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
      PackagingPrintTypeCoatedOrUncoated: document.querySelector(
        'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
      ).value,
      PackagingPaperStock: packagingPaperStock.value,
      PackagingPaperStockOther: packagingPaperStockOther.value,
      PackagingArtworkCompletedBy: document.querySelector(
        'input[name="packagingArtworkCompletedBy"]:checked'
      ).value,
      PackagingOuterCartonMarkings: packagingOuterCartonMarkings.value,
      PackagingOuterCartonMarkingsOther:
        packagingOuterCartonMarkingsOther.value,
      PackagingBarcodeRequired: document.querySelector(
        'input[name="packagingBarcodeRequired"]:checked'
      ).value,
      PackagingBarcodeDetails: packagingBarcodeDetails.value,

      // Extra notes (optional)
      ExtraNotes: extraNotes.value,
    })
      .then(() => {
        alert("Job successfully updated in the database");
      })
      .catch((error) => {
        alert(error);
      });
  }
}

// Function to fetch the latest jobId from your Firebase database
function fetchLatestJobId() {
  const dbRef = ref(db);

  return get(child(dbRef, "Jobs")) // Assuming "Jobs" is the key where jobId is stored
    .then((snapshot) => {
      // Initialize jobIdPlusOne to 1 if no data exists in the "Jobs" node
      if (!snapshot.exists()) {
        return 1;
      }

      // Find the maximum jobId in the database and increment it by 1
      let maxJobId = 0;
      snapshot.forEach((childSnapshot) => {
        const jobId = parseInt(childSnapshot.val().JobId);
        if (jobId > maxJobId) {
          maxJobId = jobId;
        }
      });

      console.log("Max Job ID in the database: " + maxJobId); // Debug statement

      return Number(maxJobId) + 1;
    });
}

// Function to populate the jobId input field with the latest jobId
function populateJobIdField() {
  fetchLatestJobId()
    .then((latestJobId) => {
      console.log("Latest New (Blank) Job ID on screen: " + latestJobId); // Debug statement

      // Populate the jobId input field with the latest jobId
      document.getElementById("jobId").value = latestJobId;

      // Disable the "Update" and "Delete" buttons
      document.getElementById("updateDatabase").disabled = true;
      document.getElementById("deleteFromDatabase").disabled = true;

      // disable the next button
      document.getElementById("nextForm").disabled = true;
    })
    .catch((error) => {
      console.error("Error fetching latest Job Id: " + error);
    });
}

// Add an event listener to call populateJobIdField when the page loads
window.addEventListener("load", populateJobIdField);

// function to retrieve form data from database //////////////////////////////////
async function readForm() {
  // const searchJobId = document.getElementById("searchJobId");
  const dbRef = ref(db);
  let idToSearch = document.getElementById("searchJobId").value;

  // Function to fetch the latest jobId from your Firebase database
  async function latestJobId() {
    const dbRef = ref(db);

    return await get(child(dbRef, "Jobs")) // Use await here
      .then((snapshot) => {
        // Initialize jobIdPlusOne to 1 if no data exists in the "Jobs" node
        if (!snapshot.exists()) {
          return 1;
        }

        // Find the maximum jobId in the database and increment it by 1
        let maxJobId = 0;
        snapshot.forEach((childSnapshot) => {
          const jobId = parseInt(childSnapshot.val().JobId);
          if (jobId > maxJobId) {
            maxJobId = jobId;
          }
        });

        console.log("Max Job ID in the database: " + maxJobId); // Debug statement

        return Number(maxJobId);
      });
  }

  // Use await when calling latestJobId to get the resolved value
  let highestDbId = String(await latestJobId());

  // if the user searched for job id 1, then the previous button should be disabled
  // and the next button should be enabled
  if (idToSearch == 1) {
    document.getElementById("prevForm").disabled = true;
    document.getElementById("nextForm").disabled = false;
  }

  // if the user searched for the highest DB entry, then the next button should be disabled
  // and the previous button should be enabled
  else if (idToSearch == highestDbId) {
    console.log("next will be new form as it matched!");

    // enable the previous and next buttons
    document.getElementById("prevForm").disabled = false;
    document.getElementById("nextForm").disabled = false;
  }

  // if the user searched for a job id that is not the latest or the first, then both
  // the next and previous buttons should be enabled
  else {
    document.getElementById("nextForm").disabled = false;
    document.getElementById("prevForm").disabled = false;
  }

  get(child(dbRef, "Jobs/" + idToSearch)) // searchJobId is the form ID entered by the user
    .then((snapshot) => {
      if (snapshot.exists()) {
        // Enable the "Update" and "Delete" buttons
        document.getElementById("updateDatabase").disabled = false;
        document.getElementById("deleteFromDatabase").disabled = false;

        // Disable the "Save" button
        document.getElementById("saveToDatabase").disabled = true;

        jobId.value = snapshot.val().JobId;
        todaysDate.value = snapshot.val().TodaysDate;

        // Project details
        customerName.value = snapshot.val().CustomerName;
        projectProduct.value = snapshot.val().ProjectProduct;
        projectName.value = snapshot.val().ProjectName;
        projectProductOther.value = snapshot.val().ProjectProductOther;
        projectName.value = snapshot.val().ProjectName;

        // Get all radio buttons with the name "newOrRepeat"
        const newOrRepeatValue = snapshot.val().NewOrRepeat;

        // Get all radio buttons with the name "newOrRepeat"
        const radioButtons = document.querySelectorAll(
          'input[name="newOrRepeat"]'
        );

        // Iterate through the radio buttons
        radioButtons.forEach((radioButton) => {
          if (radioButton.value === newOrRepeatValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        productCode.value = snapshot.val().ProductCode;
        samplesRequired.value = snapshot.val().SamplesRequired;
        sampleRequiredDate.value = snapshot.val().SampleRequiredDate;

        // Product details

        // Cup details
        cupSize.value = snapshot.val().CupSize;
        cupSizeOptions.value = snapshot.val().CupSizeOptions;
        cupBaseColour.value = snapshot.val().CupBaseColour;
        cupPantoneReference.value = snapshot.val().CupPantoneReference;

        // Get all radio buttons with the name "cupCoatedOrUncoated"
        const cupCoatedOrUncoatedValue = snapshot.val().CupCoatedOrUncoated;

        // Get all radio buttons with the name "cupCoatedOrUncoated"
        const cupCoatedOrUncoatedRadioButtons = document.querySelectorAll(
          'input[name="cupCoatedOrUncoated"]'
        );

        // Iterate through the radio buttons
        cupCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
          if (radioButton.value === cupCoatedOrUncoatedValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        cupDecorationOptions.value = snapshot.val().CupDecorationOptions;
        cupDecoration.value = snapshot.val().CupDecoration;

        // Get all radio buttons with the name "cupArtworkCompletedBy"
        const cupArtworkCompletedByValue = snapshot.val().CupArtworkCompletedBy;

        // Get all radio buttons with the name "cupArtworkCompletedBy"
        const cupArtworkCompletedByRadioButtons = document.querySelectorAll(
          'input[name="cupArtworkCompletedBy"]'
        );

        // Iterate through the radio buttons
        cupArtworkCompletedByRadioButtons.forEach((radioButton) => {
          if (radioButton.value === cupArtworkCompletedByValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        cupMouldBaseOptions.value = snapshot.val().CupMouldBaseOptions;
        cupMouldBaseOther.value = snapshot.val().CupMouldBaseOther;

        // Sleeve details

        // Get all radio buttons with the name "sleeveRequired"
        const sleeveRequiredValue = snapshot.val().SleeveRequired;

        // Get all radio buttons with the name "sleeveRequired"
        const sleeveRequiredRadioButtons = document.querySelectorAll(
          'input[name="sleeveRequired"]'
        );

        // Iterate through the radio buttons
        sleeveRequiredRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveRequiredValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        // Get the Sleeve section
        const sleeveSection = document.getElementById("sleeve-section");

        // If sleeveRequired is "No", disable the Sleeve section
        if (sleeveRequiredValue === "No") {
          sleeveSection.disabled = true;
        } else {
          sleeveSection.disabled = false;
        }

        // Get all radio buttons with the name "sleeveSize"
        const sleeveSizeValue = snapshot.val().SleeveSize;

        // Get all radio buttons with the name "sleeveSize"
        const sleeveSizeRadioButtons = document.querySelectorAll(
          'input[name="sleeveSize"]'
        );

        // Iterate through the radio buttons
        sleeveSizeRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveSizeValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        sleeveSizeOptions.value = snapshot.val().SleeveSizeOptions;
        sleeveBaseColour.value = snapshot.val().SleeveBaseColour;
        sleevePantoneReference.value = snapshot.val().SleevePantoneReference;

        // Get all radio buttons with the name "sleeveCoatedOrUncoated"
        const sleeveCoatedOrUncoatedValue =
          snapshot.val().SleeveCoatedOrUncoated;

        // Get all radio buttons with the name "sleeveCoatedOrUncoated"
        const sleeveCoatedOrUncoatedRadioButtons = document.querySelectorAll(
          'input[name="sleeveCoatedOrUncoated"]'
        );

        // Iterate through the radio buttons
        sleeveCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveCoatedOrUncoatedValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        // Get all radio buttons with the name "sleeveArtworkCompletedBy"
        const sleeveArtworkCompletedByValue =
          snapshot.val().SleeveArtworkCompletedBy;

        // Get all radio buttons with the name "sleeveArtworkCompletedBy"
        const sleeveArtworkCompletedByRadioButtons = document.querySelectorAll(
          'input[name="sleeveArtworkCompletedBy"]'
        );

        // Iterate through the radio buttons
        sleeveArtworkCompletedByRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveArtworkCompletedByValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        sleeveMouldOptions.value = snapshot.val().SleeveMouldOptions;
        sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

        // Get all radio buttons with the name "sleeveEmbossing"
        const sleeveEmbossingValue = snapshot.val().SleeveEmbossing;

        // Get all radio buttons with the name "sleeveEmbossing"
        const sleeveEmbossingRadioButtons = document.querySelectorAll(
          'input[name="sleeveEmbossing"]'
        );

        // Iterate through the radio buttons
        sleeveEmbossingRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveEmbossingValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        // Get all radio buttons with the name "sleeveOverprint"
        const sleeveOverprintValue = snapshot.val().SleeveOverprint;

        // Get all radio buttons with the name "sleeveOverprint"
        const sleeveOverprintRadioButtons = document.querySelectorAll(
          'input[name="sleeveOverprint"]'
        );

        // Iterate through the radio buttons
        sleeveOverprintRadioButtons.forEach((radioButton) => {
          if (radioButton.value === sleeveOverprintValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        sleeveOverprintDetails.value = snapshot.val().SleeveOverprintDetails;

        // Lid details

        // Get all radio buttons with the name "lidRequired"
        const lidRequiredValue = snapshot.val().LidRequired;

        // Get all radio buttons with the name "lidRequired"
        const lidRequiredRadioButtons = document.querySelectorAll(
          'input[name="lidRequired"]'
        );

        // Iterate through the radio buttons
        lidRequiredRadioButtons.forEach((radioButton) => {
          if (radioButton.value === lidRequiredValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        // If lidRequired is "No", disable the Sleeve section
        if (lidRequiredValue === "No") {
          lidSection.disabled = true;
        } else {
          lidSection.disabled = false;
        }

        // Get all radio buttons with the name "lidSize"
        const lidSizeValue = snapshot.val().LidSize;

        // Get all radio buttons with the name "lidSize"
        const lidSizeRadioButtons = document.querySelectorAll(
          'input[name="lidSize"]'
        );

        // Iterate through the radio buttons
        lidSizeRadioButtons.forEach((radioButton) => {
          if (radioButton.value === lidSizeValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        lidSizeOptions.value = snapshot.val().LidSizeOptions;
        lidBaseColour.value = snapshot.val().LidBaseColour;
        lidPantoneReference.value = snapshot.val().LidPantoneReference;

        // Get all radio buttons with the name "lidCoatedOrUncoated"
        const lidCoatedOrUncoatedValue = snapshot.val().LidCoatedOrUncoated;

        // Get all radio buttons with the name "lidCoatedOrUncoated"
        const lidCoatedOrUncoatedRadioButtons = document.querySelectorAll(
          'input[name="lidCoatedOrUncoated"]'
        );

        // Iterate through the radio buttons
        lidCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
          if (radioButton.value === lidCoatedOrUncoatedValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        lidMouldOptions.value = snapshot.val().LidMouldOptions;
        lidMouldOther.value = snapshot.val().LidMouldOther;

        // Packaging details

        packagingTypeOptions.value = snapshot.val().PackagingTypeOptions;
        packagingTypeOther.value = snapshot.val().PackagingTypeOther;

        // Get all radio buttons with the name "packagingCutterGuide"
        const packagingCutterGuideValue = snapshot.val().PackagingCutterGuide;

        // Get all radio buttons with the name "packagingCutterGuide"
        const packagingCutterGuideRadioButtons = document.querySelectorAll(
          'input[name="packagingCutterGuide"]'
        );

        // Iterate through the radio buttons
        packagingCutterGuideRadioButtons.forEach((radioButton) => {
          if (radioButton.value === packagingCutterGuideValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        packagingCutterGuideOther.value =
          snapshot.val().PackagingCutterGuideOther;

        // Get all radio buttons with the name "packagingPrintType"
        const packagingPrintTypeValue = snapshot.val().PackagingPrintType;

        // Get all radio buttons with the name "packagingPrintType"
        const packagingPrintTypeRadioButtons = document.querySelectorAll(
          'input[name="packagingPrintType"]'
        );

        // Iterate through the radio buttons
        packagingPrintTypeRadioButtons.forEach((radioButton) => {
          if (radioButton.value === packagingPrintTypeValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        packagingPrintTypeDetails.value =
          snapshot.val().PackagingPrintTypeDetails;

        // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
        const packagingPrintTypeCoatedOrUncoatedValue =
          snapshot.val().PackagingPrintTypeCoatedOrUncoated;

        // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
        const packagingPrintTypeCoatedOrUncoatedRadioButtons =
          document.querySelectorAll(
            'input[name="packagingPrintTypeCoatedOrUncoated"]'
          );

        // Iterate through the radio buttons
        packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach(
          (radioButton) => {
            if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
              radioButton.checked = true; // Set the radio button as checked
            } else {
              radioButton.checked = false; // Uncheck other radio buttons with the same name
            }
          }
        );

        packagingPaperStock.value = snapshot.val().PackagingPaperStock;
        packagingPaperStockOther.value =
          snapshot.val().PackagingPaperStockOther;

        // Get all radio buttons with the name "packagingArtworkCompletedBy"
        const packagingArtworkCompletedByValue =
          snapshot.val().PackagingArtworkCompletedBy;

        // Get all radio buttons with the name "packagingArtworkCompletedBy"
        const packagingArtworkCompletedByRadioButtons =
          document.querySelectorAll(
            'input[name="packagingArtworkCompletedBy"]'
          );

        // Iterate through the radio buttons
        packagingArtworkCompletedByRadioButtons.forEach((radioButton) => {
          if (radioButton.value === packagingArtworkCompletedByValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        packagingOuterCartonMarkings.value =
          snapshot.val().PackagingOuterCartonMarkings;

        // Get all radio buttons with the name "packagingBarcodeRequired"
        const packagingBarcodeRequiredValue =
          snapshot.val().PackagingBarcodeRequired;

        // Get all radio buttons with the name "packagingBarcodeRequired"
        const packagingBarcodeRequiredRadioButtons = document.querySelectorAll(
          'input[name="packagingBarcodeRequired"]'
        );

        // Iterate through the radio buttons
        packagingBarcodeRequiredRadioButtons.forEach((radioButton) => {
          if (radioButton.value === packagingBarcodeRequiredValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        snapshot.val().PackagingBarcodeRequired;
        packagingBarcodeDetails.value = snapshot.val().PackagingBarcodeDetails;

        // Extra notes (optional)
        extraNotes.value = snapshot.val().ExtraNotes;

        console.log("Job Id exists");
        // Call toggleButtons to enable/disable buttons based on form existence
        // toggleButtons(true);
      } else {
        alert(`Job Id ${idToSearch} does not exist`);
        console.log("Job Id does not exist");
        document.getElementById("saveToDatabase").disabled = false;
        document.getElementById("updateDatabase").disabled = false;
        document.getElementById("deleteFromDatabase").disabled = true;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

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
        alert("Job successfully deleted from the database");

        // Reset the form fields to their default/blank values
        document.getElementById("productRequestForm").reset();

        // Disable the "Update" and "Delete" buttons
        document.getElementById("updateDatabase").disabled = true;
        document.getElementById("deleteFromDatabase").disabled = true;

        // Enable the "Save" button
        document.getElementById("saveToDatabase").disabled = false;

        // change the job id to the next available job id
        populateJobIdField();

        // Reload the page after successful deletion
        location.reload();
      })
      .catch((error) => {
        alert("Error deleting job: " + error);
      });
  }
}

// previousForm function
// function to retrieve form data from database //////////////////////////////////
async function prevForm() {
  const dbRef = ref(db);
  let idToSearch = Number(jobId.value) - 1;

  let currentJobId = Number(jobId.value);

  // if idToSearch is less than 2,
  // then disable the "Previous" button
  if (idToSearch === 1) {
    document.getElementById("prevForm").disabled = true;
    searchJobId.value = jobId.value;
  }

  // If the previous jobId doesn't exist in the database, find the next available jobId
  let snapshot = await get(child(ref(db), `Jobs/${idToSearch}`));

  // If the previous jobId doesn't exist in the database, find the next available jobId
  while (!snapshot.exists() && idToSearch > 1) {
    idToSearch--;
    snapshot = await get(child(ref(db), `Jobs/${idToSearch}`));
  }

  // get(child(dbRef, "Jobs/" + idToSearch)) // searchJobId is the form ID entered by the user
  //   .then((snapshot) => {
  if (snapshot.exists()) {
    // Enable the "Update" and "Delete" buttons
    document.getElementById("updateDatabase").disabled = false;
    document.getElementById("deleteFromDatabase").disabled = false;

    // Disable the "Save" button
    document.getElementById("saveToDatabase").disabled = true;

    // Enable the "Next" button
    document.getElementById("nextForm").disabled = false;

    // if job id is 1, then disable the "Previous" button
    if (idToSearch == 1) {
      document.getElementById("prevForm").disabled = true;
    }

    jobId.value = snapshot.val().JobId;
    todaysDate.value = snapshot.val().TodaysDate;

    // Project details
    customerName.value = snapshot.val().CustomerName;
    projectProduct.value = snapshot.val().ProjectProduct;
    projectName.value = snapshot.val().ProjectName;
    projectProductOther.value = snapshot.val().ProjectProductOther;
    projectName.value = snapshot.val().ProjectName;

    // Get all radio buttons with the name "newOrRepeat"
    const newOrRepeatValue = snapshot.val().NewOrRepeat;

    // Get all radio buttons with the name "newOrRepeat"
    const radioButtons = document.querySelectorAll('input[name="newOrRepeat"]');

    // Iterate through the radio buttons
    radioButtons.forEach((radioButton) => {
      if (radioButton.value === newOrRepeatValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    productCode.value = snapshot.val().ProductCode;
    samplesRequired.value = snapshot.val().SamplesRequired;
    sampleRequiredDate.value = snapshot.val().SampleRequiredDate;

    // Product details

    // Cup details
    cupSize.value = snapshot.val().CupSize;
    cupSizeOptions.value = snapshot.val().CupSizeOptions;
    cupBaseColour.value = snapshot.val().CupBaseColour;
    cupPantoneReference.value = snapshot.val().CupPantoneReference;

    // Get all radio buttons with the name "cupCoatedOrUncoated"
    const cupCoatedOrUncoatedValue = snapshot.val().CupCoatedOrUncoated;

    // Get all radio buttons with the name "cupCoatedOrUncoated"
    const cupCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="cupCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    cupCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === cupCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    cupDecorationOptions.value = snapshot.val().CupDecorationOptions;
    cupDecoration.value = snapshot.val().CupDecoration;

    // Get all radio buttons with the name "cupArtworkCompletedBy"
    const cupArtworkCompletedByValue = snapshot.val().CupArtworkCompletedBy;

    // Get all radio buttons with the name "cupArtworkCompletedBy"
    const cupArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="cupArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    cupArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === cupArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    cupMouldBaseOptions.value = snapshot.val().CupMouldBaseOptions;
    cupMouldBaseOther.value = snapshot.val().CupMouldBaseOther;

    // Sleeve details

    // Get all radio buttons with the name "sleeveRequired"
    const sleeveRequiredValue = snapshot.val().SleeveRequired;

    // Get all radio buttons with the name "sleeveRequired"
    const sleeveRequiredRadioButtons = document.querySelectorAll(
      'input[name="sleeveRequired"]'
    );

    // Iterate through the radio buttons
    sleeveRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get the Sleeve section
    const sleeveSection = document.getElementById("sleeve-section");

    // If sleeveRequired is "No", disable the Sleeve section
    if (sleeveRequiredValue === "No") {
      sleeveSection.disabled = true;
    } else {
      sleeveSection.disabled = false;
    }

    // Get all radio buttons with the name "sleeveSize"
    const sleeveSizeValue = snapshot.val().SleeveSize;

    // Get all radio buttons with the name "sleeveSize"
    const sleeveSizeRadioButtons = document.querySelectorAll(
      'input[name="sleeveSize"]'
    );

    // Iterate through the radio buttons
    sleeveSizeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveSizeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveSizeOptions.value = snapshot.val().SleeveSizeOptions;
    sleeveBaseColour.value = snapshot.val().SleeveBaseColour;
    sleevePantoneReference.value = snapshot.val().SleevePantoneReference;

    // Get all radio buttons with the name "sleeveCoatedOrUncoated"
    const sleeveCoatedOrUncoatedValue = snapshot.val().SleeveCoatedOrUncoated;

    // Get all radio buttons with the name "sleeveCoatedOrUncoated"
    const sleeveCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="sleeveCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    sleeveCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get all radio buttons with the name "sleeveArtworkCompletedBy"
    const sleeveArtworkCompletedByValue =
      snapshot.val().SleeveArtworkCompletedBy;

    // Get all radio buttons with the name "sleeveArtworkCompletedBy"
    const sleeveArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="sleeveArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    sleeveArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveMouldOptions.value = snapshot.val().SleeveMouldOptions;
    sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

    // Get all radio buttons with the name "sleeveEmbossing"
    const sleeveEmbossingValue = snapshot.val().SleeveEmbossing;

    // Get all radio buttons with the name "sleeveEmbossing"
    const sleeveEmbossingRadioButtons = document.querySelectorAll(
      'input[name="sleeveEmbossing"]'
    );

    // Iterate through the radio buttons
    sleeveEmbossingRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveEmbossingValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get all radio buttons with the name "sleeveOverprint"
    const sleeveOverprintValue = snapshot.val().SleeveOverprint;

    // Get all radio buttons with the name "sleeveOverprint"
    const sleeveOverprintRadioButtons = document.querySelectorAll(
      'input[name="sleeveOverprint"]'
    );

    // Iterate through the radio buttons
    sleeveOverprintRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveOverprintValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveOverprintDetails.value = snapshot.val().SleeveOverprintDetails;

    // Lid details

    // Get all radio buttons with the name "lidRequired"
    const lidRequiredValue = snapshot.val().LidRequired;

    // Get all radio buttons with the name "lidRequired"
    const lidRequiredRadioButtons = document.querySelectorAll(
      'input[name="lidRequired"]'
    );

    // Iterate through the radio buttons
    lidRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // If lidRequired is "No", disable the Sleeve section
    if (lidRequiredValue === "No") {
      lidSection.disabled = true;
    } else {
      lidSection.disabled = false;
    }

    // Get all radio buttons with the name "lidSize"
    const lidSizeValue = snapshot.val().LidSize;

    // Get all radio buttons with the name "lidSize"
    const lidSizeRadioButtons = document.querySelectorAll(
      'input[name="lidSize"]'
    );

    // Iterate through the radio buttons
    lidSizeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidSizeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    lidSizeOptions.value = snapshot.val().LidSizeOptions;
    lidBaseColour.value = snapshot.val().LidBaseColour;
    lidPantoneReference.value = snapshot.val().LidPantoneReference;

    // Get all radio buttons with the name "lidCoatedOrUncoated"
    const lidCoatedOrUncoatedValue = snapshot.val().LidCoatedOrUncoated;

    // Get all radio buttons with the name "lidCoatedOrUncoated"
    const lidCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="lidCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    lidCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    lidMouldOptions.value = snapshot.val().LidMouldOptions;
    lidMouldOther.value = snapshot.val().LidMouldOther;

    // Packaging details

    packagingTypeOptions.value = snapshot.val().PackagingTypeOptions;
    packagingTypeOther.value = snapshot.val().PackagingTypeOther;

    // Get all radio buttons with the name "packagingCutterGuide"
    const packagingCutterGuideValue = snapshot.val().PackagingCutterGuide;

    // Get all radio buttons with the name "packagingCutterGuide"
    const packagingCutterGuideRadioButtons = document.querySelectorAll(
      'input[name="packagingCutterGuide"]'
    );

    // Iterate through the radio buttons
    packagingCutterGuideRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingCutterGuideValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingCutterGuideOther.value = snapshot.val().PackagingCutterGuideOther;

    // Get all radio buttons with the name "packagingPrintType"
    const packagingPrintTypeValue = snapshot.val().PackagingPrintType;

    // Get all radio buttons with the name "packagingPrintType"
    const packagingPrintTypeRadioButtons = document.querySelectorAll(
      'input[name="packagingPrintType"]'
    );

    // Iterate through the radio buttons
    packagingPrintTypeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingPrintTypeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingPrintTypeDetails.value = snapshot.val().PackagingPrintTypeDetails;

    // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    const packagingPrintTypeCoatedOrUncoatedValue =
      snapshot.val().PackagingPrintTypeCoatedOrUncoated;

    // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    const packagingPrintTypeCoatedOrUncoatedRadioButtons =
      document.querySelectorAll(
        'input[name="packagingPrintTypeCoatedOrUncoated"]'
      );

    // Iterate through the radio buttons
    packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingPaperStock.value = snapshot.val().PackagingPaperStock;
    packagingPaperStockOther.value = snapshot.val().PackagingPaperStockOther;

    // Get all radio buttons with the name "packagingArtworkCompletedBy"
    const packagingArtworkCompletedByValue =
      snapshot.val().PackagingArtworkCompletedBy;

    // Get all radio buttons with the name "packagingArtworkCompletedBy"
    const packagingArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="packagingArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    packagingArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingOuterCartonMarkings.value =
      snapshot.val().PackagingOuterCartonMarkings;

    // Get all radio buttons with the name "packagingBarcodeRequired"
    const packagingBarcodeRequiredValue =
      snapshot.val().PackagingBarcodeRequired;

    // Get all radio buttons with the name "packagingBarcodeRequired"
    const packagingBarcodeRequiredRadioButtons = document.querySelectorAll(
      'input[name="packagingBarcodeRequired"]'
    );

    // Iterate through the radio buttons
    packagingBarcodeRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingBarcodeRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    snapshot.val().PackagingBarcodeRequired;
    packagingBarcodeDetails.value = snapshot.val().PackagingBarcodeDetails;

    // Extra notes (optional)
    extraNotes.value = snapshot.val().ExtraNotes;

    console.log("Job Id exists");
    // Call toggleButtons to enable/disable buttons based on form existence
    // toggleButtons(true);

    // update the seaarchJobId field
    searchJobId.value = Number(jobId.value);
  } else {
    alert(`Job Id ${idToSearch} does not exist`);
    console.log("Job Id does not exist");
    document.getElementById("saveToDatabase").disabled = false;
    document.getElementById("updateDatabase").disabled = false;
    document.getElementById("deleteFromDatabase").disabled = true;
  }
  // })
  // .catch((error) => {
  // .catch((error) => {
  //   console.error(error);
  // });
}

async function nextForm() {
  // const searchJobId = document.getElementById("searchJobId");
  let previousJobId = jobId.value;
  console.log("previous job ID was: " + previousJobId); // Debug statement
  let currentJobId = Number(jobId.value) + 1;
  let idToSearch = Number(jobId.value) + 1;
  console.log("current job ID is: " + currentJobId); // Debug statement

  // Function to fetch the latest jobId from your Firebase database
  async function latestJobId() {
    const dbRef = ref(db);

    return await get(child(dbRef, "Jobs")) // Use await here
      .then((snapshot) => {
        // Initialize jobIdPlusOne to 1 if no data exists in the "Jobs" node
        if (!snapshot.exists()) {
          return 1;
        }

        // Find the maximum jobId in the database and increment it by 1
        let maxJobId = 0;
        snapshot.forEach((childSnapshot) => {
          const jobId = parseInt(childSnapshot.val().JobId);
          if (jobId > maxJobId) {
            maxJobId = jobId;
          }
        });

        console.log("Max Job ID in the database: " + maxJobId); // Debug statement

        return Number(maxJobId);
      });
  }

  // Use await when calling latestJobId to get the resolved value
  let highestDbId = String(await latestJobId());

  if (Number(previousJobId) === Number(highestDbId)) {
    console.log("next will be new form!");

    // Reset the form fields to their default/blank values
    document.getElementById("productRequestForm").reset();

    // Disable the "Update" and "Delete" buttons
    document.getElementById("updateDatabase").disabled = true;
    document.getElementById("deleteFromDatabase").disabled = true;

    // Enable the "Save" button
    document.getElementById("saveToDatabase").disabled = false;

    // Disable the "Next" button
    document.getElementById("nextForm").disabled = true;

    // change the job id to the next available job id
    populateJobIdField();

    // // set searchJobId to the next available job id minus 1
    // searchJobId.value = Number(jobId.value) - 1;

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
  }

  let snapshot = await get(child(ref(db), `Jobs/${idToSearch}`));

  // If the next jobId doesn't exist in the database, find the next available jobId
  while (!snapshot.exists()) {
    idToSearch++;
    snapshot = await get(child(ref(db), `Jobs/${idToSearch}`));
  }

  // console.log("Highest DB ID: " + highestDbId); // Debug statement
  // console.log("previous ID: " + previousJobId); // Debug statement
  // console.log(typeof highestDbId); // Debug statement
  // console.log(typeof jobId.value); // Debug statement
  // console.log(typeof previousJobId); // Debug statement

  // get(child(ref(db), "Jobs/" + idToSearch)) // searchJobId is the form ID entered by the user
  //   .then((snapshot) => {

  console.log("highest DB entry is " + highestDbId); // Debug statement

  if (snapshot.exists()) {
    if (jobId.value === "1") {
      document.getElementById("prevForm").disabled = true;
      console.log("prevForm button enabled");
      jobId.value = idToSearch;
      document.getElementById("prevForm").disabled = false;

      // update the searchJobId field
      searchJobId.value = Number(jobId.value);
    } else if (
      Number(jobId.value) >= 2 ||
      Number(jobId.value) < Number(highestDbId)
    ) {
      // Enable the "previous" and "next" buttons
      document.getElementById("prevForm").disabled = false;
      document.getElementById("nextForm").disabled = false;
      console.log("previous and next button enabled");
      jobId.value = idToSearch;
      // update the seaarchJobId field
      searchJobId.value = Number(jobId.value);
    }

    // console.log(currentJobId === highestDbId); // Debug statement
    // console.log(previousJobId.trim()); // Debug statement
    // console.log(highestDbId.trim()); // Debug statement
    // console.log(currentJobId); // Debug statement

    // Project details
    customerName.value = snapshot.val().CustomerName;
    projectProduct.value = snapshot.val().ProjectProduct;
    projectName.value = snapshot.val().ProjectName;
    projectProductOther.value = snapshot.val().ProjectProductOther;
    projectName.value = snapshot.val().ProjectName;

    // Get all radio buttons with the name "newOrRepeat"
    const newOrRepeatValue = snapshot.val().NewOrRepeat;

    // Get all radio buttons with the name "newOrRepeat"
    const radioButtons = document.querySelectorAll('input[name="newOrRepeat"]');

    // Iterate through the radio buttons
    radioButtons.forEach((radioButton) => {
      if (radioButton.value === newOrRepeatValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    productCode.value = snapshot.val().ProductCode;
    samplesRequired.value = snapshot.val().SamplesRequired;
    sampleRequiredDate.value = snapshot.val().SampleRequiredDate;

    // Product details

    // Cup details
    cupSize.value = snapshot.val().CupSize;
    cupSizeOptions.value = snapshot.val().CupSizeOptions;
    cupBaseColour.value = snapshot.val().CupBaseColour;
    cupPantoneReference.value = snapshot.val().CupPantoneReference;

    // Get all radio buttons with the name "cupCoatedOrUncoated"
    const cupCoatedOrUncoatedValue = snapshot.val().CupCoatedOrUncoated;

    // Get all radio buttons with the name "cupCoatedOrUncoated"
    const cupCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="cupCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    cupCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === cupCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    cupDecorationOptions.value = snapshot.val().CupDecorationOptions;
    cupDecoration.value = snapshot.val().CupDecoration;

    // Get all radio buttons with the name "cupArtworkCompletedBy"
    const cupArtworkCompletedByValue = snapshot.val().CupArtworkCompletedBy;

    // Get all radio buttons with the name "cupArtworkCompletedBy"
    const cupArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="cupArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    cupArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === cupArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    cupMouldBaseOptions.value = snapshot.val().CupMouldBaseOptions;
    cupMouldBaseOther.value = snapshot.val().CupMouldBaseOther;

    // Sleeve details

    // Get all radio buttons with the name "sleeveRequired"
    const sleeveRequiredValue = snapshot.val().SleeveRequired;

    // Get all radio buttons with the name "sleeveRequired"
    const sleeveRequiredRadioButtons = document.querySelectorAll(
      'input[name="sleeveRequired"]'
    );

    // Iterate through the radio buttons
    sleeveRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get the Sleeve section
    const sleeveSection = document.getElementById("sleeve-section");

    // If sleeveRequired is "No", disable the Sleeve section
    if (sleeveRequiredValue === "No") {
      sleeveSection.disabled = true;
    } else {
      sleeveSection.disabled = false;
    }

    // Get all radio buttons with the name "sleeveSize"
    const sleeveSizeValue = snapshot.val().SleeveSize;

    // Get all radio buttons with the name "sleeveSize"
    const sleeveSizeRadioButtons = document.querySelectorAll(
      'input[name="sleeveSize"]'
    );

    // Iterate through the radio buttons
    sleeveSizeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveSizeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveSizeOptions.value = snapshot.val().SleeveSizeOptions;
    sleeveBaseColour.value = snapshot.val().SleeveBaseColour;
    sleevePantoneReference.value = snapshot.val().SleevePantoneReference;

    // Get all radio buttons with the name "sleeveCoatedOrUncoated"
    const sleeveCoatedOrUncoatedValue = snapshot.val().SleeveCoatedOrUncoated;

    // Get all radio buttons with the name "sleeveCoatedOrUncoated"
    const sleeveCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="sleeveCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    sleeveCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get all radio buttons with the name "sleeveArtworkCompletedBy"
    const sleeveArtworkCompletedByValue =
      snapshot.val().SleeveArtworkCompletedBy;

    // Get all radio buttons with the name "sleeveArtworkCompletedBy"
    const sleeveArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="sleeveArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    sleeveArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveMouldOptions.value = snapshot.val().SleeveMouldOptions;
    sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

    // Get all radio buttons with the name "sleeveEmbossing"
    const sleeveEmbossingValue = snapshot.val().SleeveEmbossing;

    // Get all radio buttons with the name "sleeveEmbossing"
    const sleeveEmbossingRadioButtons = document.querySelectorAll(
      'input[name="sleeveEmbossing"]'
    );

    // Iterate through the radio buttons
    sleeveEmbossingRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveEmbossingValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // Get all radio buttons with the name "sleeveOverprint"
    const sleeveOverprintValue = snapshot.val().SleeveOverprint;

    // Get all radio buttons with the name "sleeveOverprint"
    const sleeveOverprintRadioButtons = document.querySelectorAll(
      'input[name="sleeveOverprint"]'
    );

    // Iterate through the radio buttons
    sleeveOverprintRadioButtons.forEach((radioButton) => {
      if (radioButton.value === sleeveOverprintValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    sleeveOverprintDetails.value = snapshot.val().SleeveOverprintDetails;

    // Lid details

    // Get all radio buttons with the name "lidRequired"
    const lidRequiredValue = snapshot.val().LidRequired;

    // Get all radio buttons with the name "lidRequired"
    const lidRequiredRadioButtons = document.querySelectorAll(
      'input[name="lidRequired"]'
    );

    // Iterate through the radio buttons
    lidRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // If lidRequired is "No", disable the Sleeve section
    if (lidRequiredValue === "No") {
      lidSection.disabled = true;
    } else {
      lidSection.disabled = false;
    }

    // Get all radio buttons with the name "lidSize"
    const lidSizeValue = snapshot.val().LidSize;

    // Get all radio buttons with the name "lidSize"
    const lidSizeRadioButtons = document.querySelectorAll(
      'input[name="lidSize"]'
    );

    // Iterate through the radio buttons
    lidSizeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidSizeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    lidSizeOptions.value = snapshot.val().LidSizeOptions;
    lidBaseColour.value = snapshot.val().LidBaseColour;
    lidPantoneReference.value = snapshot.val().LidPantoneReference;

    // Get all radio buttons with the name "lidCoatedOrUncoated"
    const lidCoatedOrUncoatedValue = snapshot.val().LidCoatedOrUncoated;

    // Get all radio buttons with the name "lidCoatedOrUncoated"
    const lidCoatedOrUncoatedRadioButtons = document.querySelectorAll(
      'input[name="lidCoatedOrUncoated"]'
    );

    // Iterate through the radio buttons
    lidCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === lidCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    lidMouldOptions.value = snapshot.val().LidMouldOptions;
    lidMouldOther.value = snapshot.val().LidMouldOther;

    // Packaging details

    packagingTypeOptions.value = snapshot.val().PackagingTypeOptions;
    packagingTypeOther.value = snapshot.val().PackagingTypeOther;

    // Get all radio buttons with the name "packagingCutterGuide"
    const packagingCutterGuideValue = snapshot.val().PackagingCutterGuide;

    // Get all radio buttons with the name "packagingCutterGuide"
    const packagingCutterGuideRadioButtons = document.querySelectorAll(
      'input[name="packagingCutterGuide"]'
    );

    // Iterate through the radio buttons
    packagingCutterGuideRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingCutterGuideValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingCutterGuideOther.value = snapshot.val().PackagingCutterGuideOther;

    // Get all radio buttons with the name "packagingPrintType"
    const packagingPrintTypeValue = snapshot.val().PackagingPrintType;

    // Get all radio buttons with the name "packagingPrintType"
    const packagingPrintTypeRadioButtons = document.querySelectorAll(
      'input[name="packagingPrintType"]'
    );

    // Iterate through the radio buttons
    packagingPrintTypeRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingPrintTypeValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingPrintTypeDetails.value = snapshot.val().PackagingPrintTypeDetails;

    // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    const packagingPrintTypeCoatedOrUncoatedValue =
      snapshot.val().PackagingPrintTypeCoatedOrUncoated;

    // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    const packagingPrintTypeCoatedOrUncoatedRadioButtons =
      document.querySelectorAll(
        'input[name="packagingPrintTypeCoatedOrUncoated"]'
      );

    // Iterate through the radio buttons
    packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingPaperStock.value = snapshot.val().PackagingPaperStock;
    packagingPaperStockOther.value = snapshot.val().PackagingPaperStockOther;

    // Get all radio buttons with the name "packagingArtworkCompletedBy"
    const packagingArtworkCompletedByValue =
      snapshot.val().PackagingArtworkCompletedBy;

    // Get all radio buttons with the name "packagingArtworkCompletedBy"
    const packagingArtworkCompletedByRadioButtons = document.querySelectorAll(
      'input[name="packagingArtworkCompletedBy"]'
    );

    // Iterate through the radio buttons
    packagingArtworkCompletedByRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingArtworkCompletedByValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    packagingOuterCartonMarkings.value =
      snapshot.val().PackagingOuterCartonMarkings;

    // Get all radio buttons with the name "packagingBarcodeRequired"
    const packagingBarcodeRequiredValue =
      snapshot.val().PackagingBarcodeRequired;

    // Get all radio buttons with the name "packagingBarcodeRequired"
    const packagingBarcodeRequiredRadioButtons = document.querySelectorAll(
      'input[name="packagingBarcodeRequired"]'
    );

    // Iterate through the radio buttons
    packagingBarcodeRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingBarcodeRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    snapshot.val().PackagingBarcodeRequired;
    packagingBarcodeDetails.value = snapshot.val().PackagingBarcodeDetails;

    // Extra notes (optional)
    extraNotes.value = snapshot.val().ExtraNotes;

    console.log("Job Id exists");
    // Call toggleButtons to enable/disable buttons based on form existence
    // toggleButtons(true);
  } else {
    // alert(`Job Id ${idToSearch} does not exist`);
    console.log("Job Id does not exist");
    document.getElementById("nextForm").disabled = false;
    document.getElementById("saveToDatabase").disabled = false;
    document.getElementById("updateDatabase").disabled = false;
    document.getElementById("deleteFromDatabase").disabled = true;
  }

  // })
  // .catch((error) => {
  //   console.error(error);
  // });
}

// button to save form data to database /////////////////////////////////////////
const saveToDatabaseBtn = document.getElementById("saveToDatabase");
// button to update form data in database ///////////////////////////////////////
const updateDatabaseBtn = document.getElementById("updateDatabase");
// button to delete form data from database /////////////////////////////////////
const deleteFromDatabaseBtn = document.getElementById("deleteFromDatabase");
// button to search database for form data //////////////////////////////////////
const searchDatabaseBtn = document.getElementById("searchDatabase");
// button to go to previous form ////////////////////////////////////////////////
const prevFormBtn = document.getElementById("prevForm");
// button to go to next form ////////////////////////////////////////////////////
const nextFormBtn = document.getElementById("nextForm");

// function to save form data to database ///////////////////////////////////////

// functions used by buttons
saveToDatabaseBtn.addEventListener("click", createForm);
updateDatabaseBtn.addEventListener("click", updateForm);
deleteFromDatabaseBtn.addEventListener("click", deleteForm);
searchDatabaseBtn.addEventListener("click", readForm);

prevFormBtn.addEventListener("click", prevForm);
nextFormBtn.addEventListener("click", nextForm);

// script to save web form as PDF ///////////////////////////////////////////////

document.getElementById("saveAsPDF").addEventListener("click", function () {
  console.log("save as PDF button clicked");
  console.log(document.getElementById("jobId"));
  console.log(document.getElementById("customerName").value);
  const jobIdElement = document.getElementById("jobId");
  if (jobIdElement) {
    const jobId = jobIdElement.value;

    // // Function to retrieve form data from the database
    // async function retrieveFormDataFromDatabase(jobId) {
    //   try {
    //     const snapshot = await get(child(ref(db), `Jobs/${jobId}`));
    //     if (snapshot.exists()) {
    //       return snapshot.val(); // Return the retrieved form data
    //     } else {
    //       throw new Error("Form data not found in the database.");
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving form data: " + error);
    //     return null;
    //   }
    // }

    // // Retrieve form data from the database
    // const formData = await retrieveFormDataFromDatabase(jobId);

    // if (formData) {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    console.log("doc created");

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
      .options[document.getElementById("cupMouldBaseOptions").selectedIndex]
      .text;

    const cupMouldBaseOther =
      document.getElementById("cupMouldBaseOther").value;

    // Sleeve Details

    const sleeveRequired = document.querySelector(
      'input[name="sleeveRequired"]:checked'
    ).value;

    const sleeveSize = document.querySelector(
      'input[name="sleeveSize"]:checked'
    ).value;

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

    const lidSize = document.querySelector(
      'input[name="lidSize"]:checked'
    ).value;

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
    const packagingPrintTypeCoatedOrUncoated = document.querySelector(
      'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
    ).value;

    const packagingPaperStock = document.getElementById("packagingPaperStock")
      .options[document.getElementById("packagingPaperStock").selectedIndex]
      .text;

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

    console.log("all variables declared");

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
    // const pageHeight = doc.internal.pageSize.getHeight();

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
    doc.text(
      `Customer Name: ${customerName}`,
      column2X,
      startY + lineHeight * 6
    );
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
    doc.text(
      `New or Repeat: ${newOrRepeat}`,
      column3X,
      startY + lineHeight * 5
    );
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

    doc.text(
      `Lid Required: ${lidRequired}`,
      column3X,
      startY + lineHeight * 14
    );
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
      `Packaging Print Type Coated or Uncoated: ${packagingPrintTypeCoatedOrUncoated}`,
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
    console.log("PDF saved");
  }
  // } else {
  //   console.error("Element with ID 'jobId' not found.");
  // }
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

// script to disable the sleeve and lid sections if they are not required

// Sleeve Required radio button
var sleeveRequiredYes = document.getElementById("sleeveRequiredYes");
var sleeveRequiredNo = document.getElementById("sleeveRequiredNo");
var sleeveSection = document.getElementById("sleeve-section");

sleeveRequiredYes.addEventListener("change", function () {
  if (sleeveRequiredYes.checked) {
    // Enable the Sleeve section
    sleeveSection.disabled = false;
  }
});

sleeveRequiredNo.addEventListener("change", function () {
  if (sleeveRequiredNo.checked) {
    // Disable the Sleeve section
    sleeveSection.disabled = true;
  }
});

// Lid Required radio button
var lidRequiredYes = document.getElementById("lidRequiredYes");
var lidRequiredNo = document.getElementById("lidRequiredNo");
var lidSection = document.getElementById("lid-section");

lidRequiredYes.addEventListener("change", function () {
  if (lidRequiredYes.checked) {
    // Enable the Lid section
    lidSection.disabled = false;
  }
});

lidRequiredNo.addEventListener("change", function () {
  if (lidRequiredNo.checked) {
    // Disable the Lid section
    lidSection.disabled = true;
  }
});
