// connecting to firebase DB
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Firebase configuration
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
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Listen for the DOM to be loaded, then add a click event listener to the login button
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Sign in with email and password function
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        // Show the form page and hide the login page
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("formPage").style.display = "block";
      })
      .catch((error) => {
        // Handle login error here
        console.error(error);
        // Handle login error here
        console.error("Firebase Authentication Error:", error);
        alert("Login failed. Please check your email and password.");
      });
  });
});

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, display authenticated content
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("formPage").style.display = "block";
  } else {
    // User is signed out, display login page or other content
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("formPage").style.display = "none";
  }
});

console.log("Script loaded.");

// Import functions required from the SDKs
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

// Listen for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
  // Your existing code

  // Add a click event listener to the "Sign Out" button
  const signOutButton = document.getElementById("signOut");

  signOutButton.addEventListener("click", () => {
    // Sign out the user
    signOut(auth)
      .then(() => {
        // User signed out successfully
        // You can redirect to a sign-in page or update your UI as needed
        console.log("User signed out");
      })
      .catch((error) => {
        // Handle sign-out error here
        console.error("Sign Out Error:", error);
      });
  });

  // ...
});

//////////////////////////////////////////////////////////////////////////////////////////

// function to save form data to database ///////////////////////////////////////

function createForm() {
  if (validateForm()) {
    let highestDbId;

    // call async function anbd assign result to highestDbId
    fetchLatestJobId().then((result) => {
      highestDbId = result;
      console.log("highestDbId in fetchLatestJobId: " + highestDbId);

      console.log("save to database button clicked");

      set(ref(db, "Jobs/" + highestDbId), {
        // Job ID
        JobId: highestDbId,
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
        // SleeveSize: document.querySelector('input[name="sleeveSize"]:checked')
        //   .value,
        SleeveSize: sleeveSize.value,
        SleeveBaseColour: sleeveBaseColour.value,
        SleevePantoneReference: sleevePantoneReference.value,
        SleeveCoatedOrUncoated: document.querySelector(
          'input[name="sleeveCoatedOrUncoated"]:checked'
        ).value,
        SleeveArtworkCompletedBy: document.querySelector(
          'input[name="sleeveArtworkCompletedBy"]:checked'
        ).value,
        SleeveMouldOptions: sleeveMouldOptions.value,
        // SleeveMouldOther: sleeveMouldOther.value,
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
        // LidSize: document.querySelector('input[name="lidSize"]:checked').value,
        LidSizeOptions: lidSizeOptions.value,
        LidBaseColour: lidBaseColour.value,
        LidPantoneReference: lidPantoneReference.value,
        LidCoatedOrUncoated: document.querySelector(
          'input[name="lidCoatedOrUncoated"]:checked'
        ).value,
        LidMouldOptions: lidMouldOptions.value,
        LidMouldOther: lidMouldOther.value,

        // Packaging details
        PackagingRequired: document.querySelector(
          'input[name="packagingRequired"]:checked'
        ).value,
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

        // PackagingPrintTypeCoatedOrUncoated: document.querySelector(
        //   'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
        // ).value,

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
          // Declare highestDbId outside of the fetchLatestJobId promise scope

          // Now that you have the value of highestDbId, you can use it
          alert(
            `Form successfully saved to the database with Job number PR${highestDbId}`
          );

          // Increment the jobId

          // save the form as a PDF
          // saveAsPDF();

          // Reference to the root of your Firebase database
          // const rootRef = ref(db);

          // // Fetch the data from your Firebase database
          // get(rootRef)
          //   .then((snapshot) => {
          //     const data = snapshot.val();
          //     if (data) {
          //       // Convert the data to JSON
          //       const jsonData = JSON.stringify(data, null, 2);

          //       // Create a Blob containing the JSON data
          //       const blob = new Blob([jsonData], { type: "application/json" });

          //       // Create a download link and trigger the download
          //       const downloadLink = document.createElement("a");
          //       downloadLink.href = URL.createObjectURL(blob);
          //       downloadLink.download = "db.json"; // Set the filename to "db.json"

          //       // Force the download by revoking any existing object URLs
          //       URL.revokeObjectURL(downloadLink.href);

          //       // Trigger the download
          //       downloadLink.click();
          //     } else {
          //       console.error("No data found in the database.");
          //     }
          //   })
          //   .catch((error) => {
          //     console.error("Error fetching data from Firebase:", error);
          //   });

          jobId.value = Number(highestDbId) + 1;
          console.log("Job ID incremented to " + highestDbId);
          let latestValue = highestDbId;

          // Reset the form fields to their default/blank values
          document.getElementById("productRequestForm").reset();
          console.log("Form reset");
          resetFieldBorders();
          setInitialFieldState();

          // project details
          handleProjectProductOnSave();

          // cup details
          handleCupSizeOnSave();
          handleCupBaseColourOnSave();
          handleCupDecorationOnSave();
          updateCupMouldBaseElementsOnSave();

          // sleeve details
          handleSleeveBaseColourOnSave();
          handleSleeveOverprintOnSave();

          // lid details
          updateLidMouldInputOnSave();
          handleLidBaseColourOnSave();

          // packaging details
          handlePackagingTypeOnSave();
          handlePackagingCutterGuideOnSave();
          handlePackagingPaperStockOnSave();
          handlePackagingPrintTypeOnSave();

          handleBarcodeOnSave();
          handlePackagingOuterCartonMarkingsOnSave();

          // Populate the jobId input field with the incremented value
          // document.getElementById("jobId").value = Number(latestValue);
          document.getElementById("jobId").value = "NEW";
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

          console.log("before scroll");

          //reset field borders
          resetFieldBorders();

          const lidMouldInput = document.getElementById("lidMouldOther");
          const lidMouldLabel = document.querySelector(
            'label[for="lidMouldOther"]'
          );

          lidMouldInput.style.color = "black";
          lidMouldLabel.style.color = "black";

          // // save form as PDF and download
          // saveAsPDF();

          // Move focus back to the top of the page
          window.scrollTo({ top: 0, behavior: "smooth" });

          console.log("after scroll");
        })
        .catch((error) => {
          alert(error);
        });
    });
  }
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
      // SleeveSize: document.querySelector('input[name="sleeveSize"]:checked')
      //   .value,
      SleeveSize: sleeveSize.value,
      SleeveBaseColour: sleeveBaseColour.value,
      SleevePantoneReference: sleevePantoneReference.value,
      SleeveCoatedOrUncoated: document.querySelector(
        'input[name="sleeveCoatedOrUncoated"]:checked'
      ),
      SleeveArtworkCompletedBy: document.querySelector(
        'input[name="sleeveArtworkCompletedBy"]:checked'
      ),
      SleeveMouldOptions: sleeveMouldOptions.value,
      // SleeveMouldOther: sleeveMouldOther.value,
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
      // LidSize: document.querySelector('input[name="lidSize"]:checked').value,
      LidSizeOptions: lidSizeOptions.value,
      LidBaseColour: lidBaseColour.value,
      LidPantoneReference: lidPantoneReference.value,
      LidCoatedOrUncoated: document.querySelector(
        'input[name="lidCoatedOrUncoated"]:checked'
      ).value,
      LidMouldOptions: lidMouldOptions.value,
      LidMouldOther: lidMouldOther.value,

      // Packaging details
      PackagingRequired: document.querySelector(
        'input[name="packagingRequired"]:checked'
      ).value,
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
      // PackagingPrintTypeCoatedOrUncoated: document.querySelector(
      //   'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
      // ).value,
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
      // document.getElementById("jobId").value = latestJobId;
      document.getElementById("jobId").value = "NEW";

      // Disable the "Update" and "Delete" buttons
      document.getElementById("updateDatabase").disabled = true;
      document.getElementById("deleteFromDatabase").disabled = true;

      // disable the next button
      document.getElementById("nextForm").disabled = true;

      // set lid, sleeve and packaging sections to enabled
      // handleDropdownSelection();
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

        // enable the saveAsPDF button
        document.getElementById("saveAsPDF").disabled = false;
        // change the background color of the button to green
        document.getElementById("saveAsPDF").style.backgroundColor = "green";

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

        // Get from DB
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

        // // Get all radio buttons with the name "sleeveSize"
        // const sleeveSizeValue = snapshot.val().SleeveSize;

        // // Get all radio buttons with the name "sleeveSize"
        // const sleeveSizeRadioButtons = document.querySelectorAll(
        //   'input[name="sleeveSize"]'
        // );

        // // Iterate through the radio buttons
        // sleeveSizeRadioButtons.forEach((radioButton) => {
        //   if (radioButton.value === sleeveSizeValue) {
        //     radioButton.checked = true; // Set the radio button as checked
        //   } else {
        //     radioButton.checked = false; // Uncheck other radio buttons with the same name
        //   }
        // });

        sleeveSize.value = snapshot.val().SleeveSize;
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
        // sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

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

        // // Get all radio buttons with the name "lidSize"
        // const lidSizeValue = snapshot.val().LidSize;

        // // Get all radio buttons with the name "lidSize"
        // const lidSizeRadioButtons = document.querySelectorAll(
        //   'input[name="lidSize"]'
        // );

        // // Iterate through the radio buttons
        // lidSizeRadioButtons.forEach((radioButton) => {
        //   if (radioButton.value === lidSizeValue) {
        //     radioButton.checked = true; // Set the radio button as checked
        //   } else {
        //     radioButton.checked = false; // Uncheck other radio buttons with the same name
        //   }
        // });

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

        // Get all radio buttons with the name "packagingRequired"
        const packagingRequiredValue = snapshot.val().PackagingRequired;

        // Get all radio buttons with the name "packagingRequired"
        const packagingRequiredRadioButtons = document.querySelectorAll(
          'input[name="packagingRequired"]'
        );

        // Iterate through the radio buttons
        packagingRequiredRadioButtons.forEach((radioButton) => {
          if (radioButton.value === packagingRequiredValue) {
            radioButton.checked = true; // Set the radio button as checked
          } else {
            radioButton.checked = false; // Uncheck other radio buttons with the same name
          }
        });

        // If packagingRequired is "No", disable the Packaging section
        if (packagingRequiredValue === "No") {
          packagingSection.disabled = true;
        } else {
          packagingSection.disabled = false;
        }

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

        // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
        // const packagingPrintTypeCoatedOrUncoatedValue =
        //   snapshot.val().PackagingPrintTypeCoatedOrUncoated;

        // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
        // const packagingPrintTypeCoatedOrUncoatedRadioButtons =
        //   document.querySelectorAll(
        //     'input[name="packagingPrintTypeCoatedOrUncoated"]'
        //   );

        // // Iterate through the radio buttons
        // packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach(
        //   (radioButton) => {
        //     if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
        //       radioButton.checked = true; // Set the radio button as checked
        //     } else {
        //       radioButton.checked = false; // Uncheck other radio buttons with the same name
        //     }
        //   }
        // );

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

        resetFieldBorders();
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

  let idToSearch;

  if (jobId.value === "NEW") {
    // idToSearch will be one less than the highest DB entry
    idToSearch = highestDbId;
  } else {
    // idToSearch will be one less than the current job id
    idToSearch = Number(jobId.value) - 1;
  }

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

    // enable the saveAsPDF button
    document.getElementById("saveAsPDF").disabled = false;
    // change the background color of the button to green
    document.getElementById("saveAsPDF").style.backgroundColor = "green";

    // Enable the "Next" button
    document.getElementById("nextForm").disabled = false;

    resetFieldBorders();

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

    // // Get all radio buttons with the name "sleeveSize"
    // const sleeveSizeValue = snapshot.val().SleeveSize;

    // // Get all radio buttons with the name "sleeveSize"
    // const sleeveSizeRadioButtons = document.querySelectorAll(
    //   'input[name="sleeveSize"]'
    // );

    // // Iterate through the radio buttons
    // sleeveSizeRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === sleeveSizeValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

    sleeveSize.value = snapshot.val().SleeveSize;
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
    // sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

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

    // // Get all radio buttons with the name "lidSize"
    // const lidSizeValue = snapshot.val().LidSize;

    // // Get all radio buttons with the name "lidSize"
    // const lidSizeRadioButtons = document.querySelectorAll(
    //   'input[name="lidSize"]'
    // );

    // // Iterate through the radio buttons
    // lidSizeRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === lidSizeValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

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

    // Get all radio buttons with the name "packagingRequired"
    const packagingRequiredValue = snapshot.val().PackagingRequired;

    // Get all radio buttons with the name "packagingRequired"
    const packagingRequiredRadioButtons = document.querySelectorAll(
      'input[name="packagingRequired"]'
    );

    // Iterate through the radio buttons
    packagingRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // If packagingRequired is "No", disable the Packaging section
    if (packagingRequiredValue === "No") {
      packagingSection.disabled = true;
    } else {
      packagingSection.disabled = false;
    }

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

    // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    // const packagingPrintTypeCoatedOrUncoatedValue =
    //   snapshot.val().PackagingPrintTypeCoatedOrUncoated;

    // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    // const packagingPrintTypeCoatedOrUncoatedRadioButtons =
    //   document.querySelectorAll(
    //     'input[name="packagingPrintTypeCoatedOrUncoated"]'
    //   );

    // // Iterate through the radio buttons
    // packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

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
    if (jobId.value === "1") {
      document.getElementById("prevForm").disabled = false;
      console.log("prevForm button enabled");
      jobId.value = idToSearch;
      document.getElementById("prevForm").disabled = false;

      // update the searchJobId field
      searchJobId.value = Number(jobId.value);
    }

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

    // disable the saveAsPDF button
    document.getElementById("saveAsPDF").disabled = true;
    // change the background color of the button to grey
    document.getElementById("saveAsPDF").style.backgroundColor = "#d9d9d9";

    // change the job id to the next available job id
    populateJobIdField();

    // reset lid, sleeve and packaging sections
    // handleDropdownSelection();

    setInitialFieldState();

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

  console.log("highest DB entry is " + highestDbId); // Debug statement

  // if the job does exist

  if (snapshot.exists()) {
    // enable the saveAsPDF button
    document.getElementById("saveAsPDF").disabled = false;
    // change the background color of the button to green
    document.getElementById("saveAsPDF").style.backgroundColor = "green";

    if (jobId.value === "1") {
      document.getElementById("prevForm").disabled = false;
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
      console.log("number is between first and NEW!");
      document.getElementById("prevForm").disabled = false;
      document.getElementById("nextForm").disabled = false;
      console.log("previous and next button enabled");
      jobId.value = idToSearch;
      // update the seaarchJobId field
      searchJobId.value = Number(jobId.value);
    }

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

    // // Get all radio buttons with the name "sleeveSize"
    // const sleeveSizeValue = snapshot.val().SleeveSize;

    // // Get all radio buttons with the name "sleeveSize"
    // const sleeveSizeRadioButtons = document.querySelectorAll(
    //   'input[name="sleeveSize"]'
    // );

    // // Iterate through the radio buttons
    // sleeveSizeRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === sleeveSizeValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

    sleeveSize.value = snapshot.val().SleeveSize;
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
    // sleeveMouldOther.value = snapshot.val().SleeveMouldOther;

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

    // // Get all radio buttons with the name "lidSize"
    // const lidSizeValue = snapshot.val().LidSize;

    // // Get all radio buttons with the name "lidSize"
    // const lidSizeRadioButtons = document.querySelectorAll(
    //   'input[name="lidSize"]'
    // );

    // // Iterate through the radio buttons
    // lidSizeRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === lidSizeValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

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

    // Get all radio buttons with the name "packagingRequired"
    const packagingRequiredValue = snapshot.val().PackagingRequired;

    // Get all radio buttons with the name "packagingRequired"
    const packagingRequiredRadioButtons = document.querySelectorAll(
      'input[name="packagingRequired"]'
    );

    // Iterate through the radio buttons
    packagingRequiredRadioButtons.forEach((radioButton) => {
      if (radioButton.value === packagingRequiredValue) {
        radioButton.checked = true; // Set the radio button as checked
      } else {
        radioButton.checked = false; // Uncheck other radio buttons with the same name
      }
    });

    // If packagingRequired is "No", disable the Packaging section
    if (packagingRequiredValue === "No") {
      packagingSection.disabled = true;
    } else {
      packagingSection.disabled = false;
    }

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

    // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    // const packagingPrintTypeCoatedOrUncoatedValue =
    //   snapshot.val().PackagingPrintTypeCoatedOrUncoated;

    // // Get all radio buttons with the name "packagingPrintTypeCoatedOrUncoated"
    // const packagingPrintTypeCoatedOrUncoatedRadioButtons =
    //   document.querySelectorAll(
    //     'input[name="packagingPrintTypeCoatedOrUncoated"]'
    //   );

    // // Iterate through the radio buttons
    // packagingPrintTypeCoatedOrUncoatedRadioButtons.forEach((radioButton) => {
    //   if (radioButton.value === packagingPrintTypeCoatedOrUncoatedValue) {
    //     radioButton.checked = true; // Set the radio button as checked
    //   } else {
    //     radioButton.checked = false; // Uncheck other radio buttons with the same name
    //   }
    // });

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

    resetFieldBorders();
  } else {
    // alert(`Job Id ${idToSearch} does not exist`);
    console.log("Job Id does not exist");
    document.getElementById("nextForm").disabled = false;
    document.getElementById("saveToDatabase").disabled = false;
    document.getElementById("updateDatabase").disabled = false;
    document.getElementById("deleteFromDatabase").disabled = true;
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
// button to go to previous form ////////////////////////////////////////////////
const prevFormBtn = document.getElementById("prevForm");
// button to go to next form ////////////////////////////////////////////////////
const nextFormBtn = document.getElementById("nextForm");
// button to save form as PDF ///////////////////////////////////////////////////
const saveAsPDFBtn = document.getElementById("saveAsPDF");

// function to save form data to database ///////////////////////////////////////

// functions used by buttons
saveToDatabaseBtn.addEventListener("click", createForm);
updateDatabaseBtn.addEventListener("click", updateForm);
deleteFromDatabaseBtn.addEventListener("click", deleteForm);
searchDatabaseBtn.addEventListener("click", readForm);
saveAsPDFBtn.addEventListener("click", saveAsPDF);

prevFormBtn.addEventListener("click", prevForm);
nextFormBtn.addEventListener("click", nextForm);

// script to save web form as PDF ///////////////////////////////////////////////

// function to save form as PDF

async function saveAsPDF() {
  if (validateForm()) {
    console.log("save as PDF button clicked");
    console.log(document.getElementById("jobId"));
    console.log(document.getElementById("customerName").value);

    // Function to fetch the latest jobId from your Firebase database
    async function latestJobId() {
      const dbRef = ref(db);

      return await get(child(dbRef, "Jobs")).then((snapshot) => {
        if (!snapshot.exists()) {
          return 1;
        }

        let maxJobId = 0;
        snapshot.forEach((childSnapshot) => {
          const jobId = parseInt(childSnapshot.val().JobId);
          if (jobId > maxJobId) {
            maxJobId = jobId;
          }
        });

        console.log("Max Job ID in the database: " + maxJobId);

        return Number(maxJobId);
      });
    }

    // // Use await when calling latestJobId to get the resolved value
    let maxJobId = await latestJobId();

    const jobIdElement = document.getElementById("jobId");

    if (jobIdElement) {
      const jobId =
        jobIdElement.value === "NEW" ? maxJobId : jobIdElement.value;

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
      const newOrRepeat = document.querySelector(
        'input[name="newOrRepeat"]:checked'
      ).value;

      const productCode = document.getElementById("productCode").value;

      const samplesRequired = document.getElementById("samplesRequired").value;

      const sampleRequiredDate =
        document.getElementById("sampleRequiredDate").value;

      // Product Details

      // Cup Details
      const cupSize =
        document.getElementById("cupSize").options[
          document.getElementById("cupSize").selectedIndex
        ].text;

      const cupSizeOptions = document.getElementById("cupSizeOptions").value;

      const cupBaseColour =
        document.getElementById("cupBaseColour").options[
          document.getElementById("cupBaseColour").selectedIndex
        ].text;

      const cupPantoneReference = document.getElementById(
        "cupPantoneReference"
      ).value;

      const cupCoatedOrUncoated = document.querySelector(
        'input[name="cupCoatedOrUncoated"]:checked'
      ).value;

      const cupDecorationOptions = document.getElementById(
        "cupDecorationOptions"
      ).options[document.getElementById("cupDecorationOptions").selectedIndex]
        .text;

      const cupDecoration = document.getElementById("cupDecoration").value;

      const cupArtworkCompletedBy = document.querySelector(
        'input[name="cupArtworkCompletedBy"]:checked'
      ).value;

      const cupMouldBaseOptions = document.getElementById("cupMouldBaseOptions")
        .options[document.getElementById("cupMouldBaseOptions").selectedIndex]
        .text;

      const silkScreenProvidedBy = document.querySelector(
        'input[name="silkScreenProvidedBy"]:checked'
      ).value;

      const cupMouldBaseOther =
        document.getElementById("cupMouldBaseOther").value;

      // Sleeve Details

      const sleeveRequired = document.querySelector(
        'input[name="sleeveRequired"]:checked'
      ).value;

      const sleeveSize =
        document.getElementById("sleeveSize").options[
          document.getElementById("sleeveSize").selectedIndex
        ].text;

      const sleeveBaseColour =
        document.getElementById("sleeveBaseColour").value;
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

      const packagingRequired = document.querySelector(
        'input[name="packagingRequired"]:checked'
      ).value;

      const packagingTypeOptions = document.getElementById(
        "packagingTypeOptions"
      ).options[document.getElementById("packagingTypeOptions").selectedIndex]
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
      // const packagingPrintTypeCoatedOrUncoated = document.querySelector(
      //   'input[name="packagingPrintTypeCoatedOrUncoated"]:checked'
      // ).value;

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
      const logoWidth = 25; // Adjust the width of the logo as needed
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
      const column3X = 100; // Adjust this value as needed
      const column4X = 5;
      const startY = 10;
      const lineHeight = 5.5;

      doc.setFontSize(18);
      doc.setFontStyle("bold");

      // Job Number
      doc.text(
        `Job Number:     PR ${jobId}`,
        column4X,
        startY + lineHeight * 1
      );

      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(8, startY + lineHeight * 2, 150, 7.5, "F"); // 'F' stands for fill

      doc.text("Project Details", column1X, startY + lineHeight * 3);

      doc.setTextColor(0, 0, 0); // Black color
      doc.setFontSize(8);
      doc.setFontStyle("normal");

      // Assuming todaysDate is in the "YYYY-MM-DD" format
      const dateParts = todaysDate.split("-"); // Split the date into parts
      if (dateParts.length === 3) {
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        doc.text(`Date: ${formattedDate}`, column2X, startY + lineHeight * 5);
      }

      // Project Details
      doc.text(
        `Customer Name: ${customerName}`,
        column2X,
        startY + lineHeight * 6
      );

      doc.text(`Product: ${projectProduct}`, column2X, startY + lineHeight * 7);

      doc.text(
        `If Other, please specify: ${projectProductOther}`,
        column2X,
        startY + lineHeight * 8
      );

      doc.text(
        `Project Name (PF Number to be included): ${projectName}`,
        column2X,
        startY + lineHeight * 9
      );

      doc.text(
        `New or Repeat: ${newOrRepeat}`,
        column3X,
        startY + lineHeight * 5
      );
      doc.text(
        `Product Code: ${productCode}`,
        column3X,
        startY + lineHeight * 6
      );
      doc.text(
        `Samples Required: ${samplesRequired}`,
        column3X,
        startY + lineHeight * 7
      );

      // Assuming todaysDate is in the "YYYY-MM-DD" format
      const sampleDateParts = sampleRequiredDate.split("-"); // Split the date into parts
      if (sampleDateParts.length === 3) {
        const formattedDate = `${sampleDateParts[2]}-${sampleDateParts[1]}-${sampleDateParts[0]}`;
        doc.text(`Date: ${formattedDate}`, column3X, startY + lineHeight * 8);
      }

      // Product Details

      doc.setFontSize(14);
      doc.setFontStyle("bold");
      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(8, startY + lineHeight * 10, 150, 7.5, "F"); // 'F' stands for fill

      doc.text("Product Details", column1X, startY + lineHeight * 11);

      // Cup Details

      doc.setFontSize(12);
      doc.setFontStyle("bold");
      doc.setTextColor(0, 0, 0); // Black color

      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(18, startY + lineHeight * 12, 55, 7.5, "F"); // 'F' stands for fill

      doc.text("Cup Details", column2X, startY + lineHeight * 13);

      doc.setFontSize(8);
      doc.setFontStyle("normal");
      doc.setTextColor(0, 0, 0); // Black color

      doc.text(
        `Cup Size Option: ${cupSize}`,
        column2X,
        startY + lineHeight * 15
      );

      doc.text(
        `If other, please specify: ${cupSizeOptions}`,
        column2X,
        startY + lineHeight * 16
      );
      doc.text(
        `Cup Base Colour: ${cupBaseColour}`,
        column2X,
        startY + lineHeight * 17
      );
      doc.text(
        `Cup Pantone Reference: ${cupPantoneReference}`,
        column2X,
        startY + lineHeight * 18
      );
      doc.text(
        `Cup Coated or Uncoated: ${cupCoatedOrUncoated}`,
        column2X,
        startY + lineHeight * 19
      );

      doc.text(
        `Cup Decoration Option: ${cupDecorationOptions}`,
        column2X,
        startY + lineHeight * 20
      );

      doc.text(
        `If other, please specify: ${cupDecoration}`,
        column2X,
        startY + lineHeight * 21
      );
      doc.text(
        `Cup Artwork Completed By: ${cupArtworkCompletedBy}`,
        column2X,
        startY + lineHeight * 22
      );
      doc.text(
        `Cup Mould Base Option: ${cupMouldBaseOptions}`,
        column2X,
        startY + lineHeight * 23
      );

      doc.text(
        `Print artwork provided by: ${silkScreenProvidedBy}`,
        column2X,
        startY + lineHeight * 24
      );

      doc.text(
        `If other, please specify: ${cupMouldBaseOther}`,
        column2X,
        startY + lineHeight * 25
      );

      // Sleeve Details

      doc.setFontSize(12);
      doc.setFontStyle("bold");

      doc.setTextColor(0, 0, 0); // Black color

      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(18, startY + lineHeight * 27, 55, 7.5, "F"); // 'F' stands for fill

      doc.text("Sleeve Details", column2X, startY + lineHeight * 28);

      doc.setFontSize(8);
      doc.setFontStyle("normal");
      doc.setTextColor(0, 0, 0); // Black color

      doc.text(
        `Sleeve Required: ${sleeveRequired}`,
        column2X,
        startY + lineHeight * 30
      );

      doc.text(
        `Sleeve Size: ${sleeveSize}`,
        column2X,
        startY + lineHeight * 31
      );
      doc.text(
        `Sleeve Base Colour: ${sleeveBaseColour}`,
        column2X,
        startY + lineHeight * 32
      );
      doc.text(
        `Sleeve Pantone Reference: ${sleevePantoneReference}`,
        column2X,
        startY + lineHeight * 33
      );
      doc.text(
        `Sleeve Coated or Uncoated: ${sleeveCoatedOrUncoated}`,
        column2X,
        startY + lineHeight * 34
      );
      doc.text(
        `Sleeve Artwork Completed By: ${sleeveArtworkCompletedBy}`,
        column2X,
        startY + lineHeight * 35
      );
      doc.text(
        `Sleeve Mould Option: ${sleeveMouldOptions}`,
        column2X,
        startY + lineHeight * 36
      );

      doc.text(
        `Sleeve Embossing: ${sleeveEmbossing}`,
        column2X,
        startY + lineHeight * 37
      );
      doc.text(
        `Sleeve Overprint: ${sleeveOverprint}`,
        column2X,
        startY + lineHeight * 38
      );
      doc.text(
        `Print Position: ${sleeveOverprintDetails}`,
        column2X,
        startY + lineHeight * 39
      );

      // Lid Details

      doc.setFontSize(12);
      doc.setFontStyle("bold");

      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(98, startY + lineHeight * 12, 55, 7.5, "F"); // 'F' stands for fill

      doc.text("Lid Details", column3X, startY + lineHeight * 13);

      doc.setFontSize(8);
      doc.setFontStyle("normal");
      doc.setTextColor(0, 0, 0); // Black color

      doc.text(
        `Lid Required: ${lidRequired}`,
        column3X,
        startY + lineHeight * 15
      );
      // doc.text(`Lid Size Option: ${lidSize}`, column3X, startY + lineHeight * 15);
      doc.text(
        `Lid Size: ${lidSizeOptions}`,
        column3X,
        startY + lineHeight * 16
      );
      doc.text(
        `Lid Mould Option: ${lidMouldOptions}`,
        column3X,
        startY + lineHeight * 17
      );
      doc.text(
        `If other, please specify: ${lidMouldOther}`,
        column3X,
        startY + lineHeight * 18
      );
      doc.text(
        `Lid Base Colour: ${lidBaseColour}`,
        column3X,
        startY + lineHeight * 19
      );
      doc.text(
        `Lid Pantone Reference: ${lidPantoneReference}`,
        column3X,
        startY + lineHeight * 20
      );
      doc.text(
        `Lid Coated or Uncoated: ${lidCoatedOrUncoated}`,
        column3X,
        startY + lineHeight * 21
      );

      // Packaging Details

      doc.setFontSize(12);
      doc.setFontStyle("bold");

      doc.setTextColor(255, 255, 255); // White color

      doc.setFillColor(31, 21, 58); // Light blue color
      // 2px behind, then 1 less than text line height, 150px wide, 7.5px high
      doc.rect(98, startY + lineHeight * 27, 55, 7.5, "F"); // 'F' stands for fill

      doc.text("Packaging Details", column3X, startY + lineHeight * 28);

      doc.setFontSize(8);
      doc.setFontStyle("normal");
      doc.setTextColor(0, 0, 0); // Black color

      doc.text(
        `Packaging Required: ${packagingRequired}`,
        column3X,
        startY + lineHeight * 30
      );

      doc.text(
        `Packaging Type Option: ${packagingTypeOptions}`,
        column3X,
        startY + lineHeight * 31
      );
      doc.text(
        `If other, please specify: ${packagingTypeOther}`,
        column3X,
        startY + lineHeight * 32
      );
      doc.text(
        `Packaging Cutter Guide: ${packagingCutterGuide}`,
        column3X,
        startY + lineHeight * 33
      );
      doc.text(
        `Packaging Cutter Guide Other: ${packagingCutterGuideOther}`,
        column3X,
        startY + lineHeight * 34
      );
      doc.text(
        `Packaging Paper Stock Option: ${packagingPaperStock}`,
        column3X,
        startY + lineHeight * 35
      );
      doc.text(
        `If other, please specify: ${packagingPaperStockOther}`,
        column3X,
        startY + lineHeight * 36
      );
      doc.text(
        `Packaging Print Type: ${packagingPrintType}`,
        column3X,
        startY + lineHeight * 37
      );
      doc.text(
        `Packaging Print Type Details: ${packagingPrintTypeDetails}`,
        column3X,
        startY + lineHeight * 38
      );
      // doc.text(
      //   `Packaging Print Type Coated or Uncoated: ${packagingPrintTypeCoatedOrUncoated}`,
      //   column3X,
      //   startY + lineHeight * 39
      // );

      doc.text(
        `Packaging Artwork Completed By: ${packagingArtworkCompletedBy}`,
        column3X,
        startY + lineHeight * 40
      );
      doc.text(
        `Packaging Outer Carton Markings Option: ${packagingOuterCartonMarkings}`,
        column3X,
        startY + lineHeight * 41
      );
      doc.text(
        `If other, pleaase specify: ${packagingOuterCartonMarkingsOther}`,
        column3X,
        startY + lineHeight * 42
      );
      doc.text(
        `Packaging Barcode Required: ${packagingBarcodeRequired}`,
        column3X,
        startY + lineHeight * 43
      );
      doc.text(
        `Packaging Barcode Details: ${packagingBarcodeDetails}`,
        column3X,
        startY + lineHeight * 44
      );

      doc.setFontSize(14);
      doc.setFontStyle("bold");

      doc.text("Extra Notes", column2X, startY + lineHeight * 46);

      doc.setFontSize(8);
      doc.setFontStyle("normal");

      // Extra Notes (optional)
      doc.text(`Notes: ${extraNotes}`, column2X, startY + lineHeight * 47);

      let fileName;

      // Assuming todaysDate is in the "YYYY-MM-DD" format
      const dateSections = todaysDate.split("-"); // Split the date into parts
      if (dateSections.length === 3) {
        const formattedDate = `${dateSections[2]}-${dateSections[1]}-${dateSections[0]}`;

        // Create the file name with the date component
        fileName = `PR${jobId}___${formattedDate}.pdf`;
      }

      // Save the PDF
      doc.save(fileName);
      console.log("PDF saved");
    }
  }
}

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

////////////////////////////////////////////////////////////////////////////////////////

// script to disable the sleeve/lid/packaging sections if they are not required
// Sleeve Required radio button
var sleeveRequiredYes = document.getElementById("sleeveRequiredYes");
var sleeveRequiredNo = document.getElementById("sleeveRequiredNo");
var sleeveSection = document.getElementById("sleeve-section");

sleeveRequiredYes.addEventListener("change", function () {
  if (sleeveRequiredYes.checked) {
    // Check the selected product
    var selectedProduct = document.getElementById("projectProduct").value;

    // Check if the selected product requires Sleeve to be "No"
    if (
      selectedProduct === "2. Kora" ||
      selectedProduct === "4. HCV" // Add more conditions as needed
    ) {
      // Show a confirm dialog
      var confirmation = confirm(
        "A sleeve is NOT required for this option. Are you sure you wish to override this?"
      );

      // If the user confirms, enable the Sleeve section
      if (confirmation) {
        sleeveSection.disabled = false;
      } else {
        // If the user cancels, revert the radio button to "No"
        sleeveRequiredNo.checked = true;
      }
    } else {
      // If the selected product does not require Sleeve to be "No", enable the Sleeve section
      sleeveSection.disabled = false;
    }
  }
});

sleeveRequiredNo.addEventListener("change", function () {
  if (sleeveRequiredNo.checked) {
    // Disable the Sleeve section
    sleeveSection.disabled = true;

    // reset the form field border color
    resetFieldBorders();
  }
});

// Lid Required radio button
var lidRequiredYes = document.getElementById("lidRequiredYes");
var lidRequiredNo = document.getElementById("lidRequiredNo");
var lidSection = document.getElementById("lid-section");

lidRequiredYes.addEventListener("change", function () {
  if (lidRequiredYes.checked) {
    // Check the selected product
    var selectedProduct = document.getElementById("projectProduct").value;

    // Check if the selected product requires Lid to be "No"
    if (
      selectedProduct === "4. HCV" // Add more conditions as needed
    ) {
      // Show a confirm dialog
      var confirmation = confirm(
        "A lid is NOT required for this option. Are you sure you wish to override this?"
      );

      // If the user confirms, enable the Lid section
      if (confirmation) {
        lidSection.disabled = false;
      } else {
        // If the user cancels, revert the radio button to "No"
        lidRequiredNo.checked = true;
      }
    } else {
      // If the selected product does not require Lid to be "No", enable the Lid section
      lidSection.disabled = false;
    }
  }
});

// lidRequiredNo.addEventListener("change", function () {
//   if (lidRequiredNo.checked) {
//     // Disable the Lid section
//     lidSection.disabled = true;
//     // reset all the options in
//   }
// });

lidRequiredNo.addEventListener("change", function () {
  if (lidRequiredNo.checked) {
    // Disable the Lid section
    lidSection.disabled = true;

    // Reset the form field border color when Lid Required is set to "No"
    resetFieldBorders();
  }
});

// Packaging Required radio button
var packagingRequiredYes = document.getElementById("packagingRequiredYes");
var packagingRequiredNo = document.getElementById("packagingRequiredNo");
var packagingSection = document.getElementById("packaging-section");

packagingRequiredYes.addEventListener("change", function () {
  if (packagingRequiredYes.checked) {
    // Check the selected product
    var selectedProduct = document.getElementById("projectProduct").value;


    // re-enable packaging field section
    packagingSection.disabled = false;

              // // packaging details
              // var packagingTypeLabel = document.querySelector(
              //   'label[for="packagingTypeOther"]');
              // packagingTypeLabel.style.color = "black";

              




              // handlePackagingCutterGuideRadioChange();
              // handlePackagingPaperStock();
              // handlePackagingPrintTypeRadioChange();
    
              // handleBarcodeRadioChange();
              // handlePackagingOuterCartonMarkings();

    // // Check if the selected product requires Packaging to be "No"
    // if (selectedProduct === "2. Kora") {
    //   // Show a confirm dialog
    //   var confirmation = confirm(
    //     "Packaging is NOT required for this option. Are you sure you wish to override this?"
    //   );

    //   // If the user confirms, enable the Packaging section
    //   if (confirmation) {
    //     packagingSection.disabled = false;
    //   } else {
    //     // If the user cancels, revert the radio button to "No"
    //     packagingRequiredNo.checked = true;
    //   }
    // } else {
    //   // If the selected product does not require Packaging to be "No", enable the Packaging section
    //   packagingSection.disabled = false;
    // }

    // Check if the selected product requires Packaging to be "No"
    // if (selectedProduct === "2. Kora") {

    //   packagingSection.disabled = false;
    //   // Show a confirm dialog
    //   // If the user confirms, enable the Packaging section
    // } 
  }
});

packagingRequiredNo.addEventListener("change", function () {
  if (packagingRequiredNo.checked) {
    // Disable the Packaging section
    packagingSection.disabled = true;
    // reset the form field border color
    resetFieldBorders();
  }
});

////////////////////////////////////////////////////////////////////////////////////////

// // Function to enable/disable Sleeve, Lid, and Packaging based on dropdown selection
// function handleDropdownSelection() {
//   var selectedProduct = document.getElementById("projectProduct").value;

//   // Disable all fieldsets and radio buttons initially
//   sleeveSection.disabled = true;
//   lidSection.disabled = true;
//   packagingSection.disabled = true;
//   sleeveRequiredYes.checked = false;
//   sleeveRequiredNo.checked = true;
//   lidRequiredYes.checked = false;
//   lidRequiredNo.checked = true;
//   packagingRequiredYes.checked = false;
//   packagingRequiredNo.checked = true;

//   // Reset field borders (highlighting) when the dropdown changes
//   resetFieldBorders();

//   //confirm current selection
//   console.log("Selected product: " + projectProduct.value);

//   // Enable fieldsets and radio buttons based on the selected product
//   if (selectedProduct === "2. Kora") {
//     lidSection.disabled = false;
//     packagingSection.disabled = false;
//     lidRequiredYes.checked = true;
//     packagingRequiredYes.checked = true;
//   } else if (
//     selectedProduct === "1. Nova" ||
//     selectedProduct === "3. 800 Series" ||
//     selectedProduct === "5. other (please specify)"
//   ) {
//     sleeveSection.disabled = false;
//     lidSection.disabled = false;
//     packagingSection.disabled = false;
//     sleeveRequiredYes.checked = true;
//     lidRequiredYes.checked = true;
//     packagingRequiredYes.checked = true;
//   } else if (selectedProduct === "4. HCV") {
//     packagingSection.disabled = false;
//     packagingRequiredYes.checked = true;
//   }
// }

// // Add an event listener to the dropdown to handle selection changes
// var projectProductDropdown = document.getElementById("projectProduct");
// projectProductDropdown.addEventListener("change", handleDropdownSelection);

// // Initially, call the function to set the initial state based on the default selected option
// handleDropdownSelection();

// Function to set the initial state of fieldsets and radio buttons
function setInitialFieldState() {
  sleeveSection.disabled = true;
  lidSection.disabled = true;
  packagingSection.disabled = true;
  sleeveRequiredYes.checked = true;
  sleeveRequiredNo.checked = false;
  lidRequiredYes.checked = true;
  lidRequiredNo.checked = false;
  packagingRequiredYes.checked = true;
  packagingRequiredNo.checked = false;
}

// Function to enable/disable Sleeve, Lid, and Packaging based on dropdown selection
function handleDropdownSelection() {
  var selectedProduct = document.getElementById("projectProduct").value;

  // Reset field borders (highlighting) when the dropdown changes
  resetFieldBorders();

  // Confirm current selection
  console.log("Selected product: " + projectProduct.value);

  // Enable fieldsets based on the selected product
  if (selectedProduct === "2. Kora") {
    lidSection.disabled = false;
    lidRequiredYes.checked = true;
    lidRequiredNo.checked = false;

    sleeveSection.disabled = true;
    sleeveRequiredYes.checked = false;
    sleeveRequiredNo.checked = true;

    packagingSection.disabled = false;
    packagingRequiredYes.checked = true;
    packagingRequiredNo.checked = false;
  } else if (
    selectedProduct === "1. Nova" ||
    selectedProduct === "3. 800 Series" ||
    selectedProduct === "5. other (please specify)"
  ) {
    lidSection.disabled = false;
    lidRequiredYes.checked = true;
    lidRequiredNo.checked = false;

    sleeveSection.disabled = false;
    sleeveRequiredYes.checked = true;
    sleeveRequiredNo.checked = false;

    packagingSection.disabled = false;
    packagingRequiredYes.checked = true;
    packagingRequiredNo.checked = false;
  } else if (selectedProduct === "4. HCV") {
    lidSection.disabled = true;
    lidRequiredYes.checked = false;
    lidRequiredNo.checked = true;

    sleeveSection.disabled = true;
    sleeveRequiredYes.checked = false;
    sleeveRequiredNo.checked = true;

    packagingSection.disabled = false;
    packagingRequiredYes.checked = true;
    packagingRequiredNo.checked = false;
  }
}

// Add an event listener to the dropdown to handle selection changes
var projectProductDropdown = document.getElementById("projectProduct");
projectProductDropdown.addEventListener("change", handleDropdownSelection);

// Initially, set the initial state when the page loads
setInitialFieldState();

////////////////////////////////////////////////////////////////////////////////////////

// Function to enable/disable the "Project Product" input based on the selected option
function handleProjectProduct() {
  // Get references to the elements
  var productDropdown = document.getElementById("projectProduct");
  var productOtherInput = document.getElementById("projectProductOther");
  var productLabel = document.querySelector('label[for="projectProductOther"]');

  // Check if the selected option is "other (please specify)"
  if (productDropdown.value === "5. other (please specify)") {
    // Enable the "If Other, please specify" input field
    productOtherInput.disabled = false;
    productOtherInput.required = true; // Make it required when enabled
    productLabel.style.color = "black"; // Change label color to black (not greyed out)
  } else {
    // Disable and clear the "If Other, please specify" input field
    productOtherInput.disabled = true;
    productOtherInput.required = false; // Make it not required when disabled
    productLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    productOtherInput.style.borderColor = "";
  }
}

// Add event listener to the Product dropdown
var productDropdown = document.getElementById("projectProduct");
productDropdown.addEventListener("change", handleProjectProduct);

// Initialize the state based on the initial selection
productDropdown.dispatchEvent(new Event("change"));

// Call the function to handle Packaging Type when saving
function handleProjectProductOnSave() {
  handleProjectProduct();
}

// // Function to enable/disable the "Packaging Type details" input based on the selected option
// // Get references to the elements
// var productDropdown = document.getElementById("projectProduct");
// var productOtherInput = document.getElementById("projectProductOther");
// var productLabel = document.querySelector('label[for="projectProductOther"]');

// // Add event listener to the Product dropdown
// productDropdown.addEventListener("change", function () {
//   // Check if the selected option is "other (please specify)"
//   if (productDropdown.value === "5. other (please specify)") {
//     // Enable the "If Other, please specify" input field
//     productOtherInput.disabled = false;
//     productOtherInput.required = true; // Make it required when enabled
//     productLabel.style.color = "black"; // Change label color to black (not greyed out)
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     productOtherInput.disabled = true;
//     productOtherInput.required = false; // Make it not required when disabled
//     productLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     productOtherInput.style.borderColor = "";
//   }
// });

// Initialize the state based on the initial selection
// productDropdown.dispatchEvent(new Event("change"));

// // Function to enable/disable the "Cup Size details" input based on the selected option
// // Get references to the elements
// var cupSizeDropdown = document.getElementById("cupSize");
// var cupSizeOptionsInput = document.getElementById("cupSizeOptions");
// var cupSizeLabel = document.querySelector('label[for="cupSizeOptions"]');

// // Add event listener to the Cup Size dropdown
// cupSizeDropdown.addEventListener("change", function () {
//   // Check if the selected option is "Other"
//   if (cupSizeDropdown.value === "Other") {
//     // Enable the "If other, please specify" input field
//     cupSizeOptionsInput.disabled = false;
//     cupSizeOptionsInput.required = true; // Make it required when enabled
//     // Change label color to black (not greyed out)
//     cupSizeLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If other, please specify" input field
//     cupSizeOptionsInput.disabled = true;
//     cupSizeOptionsInput.required = false; // Make it not required when disabled
//     cupSizeLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     cupSizeOptionsInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// cupSizeDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Cup Size details" input based on the selected option
function handleCupSize() {
  // Get references to the elements
  var cupSizeDropdown = document.getElementById("cupSize");
  var cupSizeOptionsInput = document.getElementById("cupSizeOptions");
  var cupSizeLabel = document.querySelector('label[for="cupSizeOptions"]');

  // Check if the selected option is "Other"
  if (cupSizeDropdown.value === "Other") {
    // Enable the "If other, please specify" input field
    cupSizeOptionsInput.disabled = false;
    cupSizeOptionsInput.required = true; // Make it required when enabled
    // Change label color to black (not greyed out)
    cupSizeLabel.style.color = "black";
  } else {
    // Disable and clear the "If other, please specify" input field
    cupSizeOptionsInput.disabled = true;
    cupSizeOptionsInput.required = false; // Make it not required when disabled
    cupSizeLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    cupSizeOptionsInput.style.borderColor = "";
  }
}

// Add event listener to the Cup Size dropdown
var cupSizeDropdown = document.getElementById("cupSize");
cupSizeDropdown.addEventListener("change", handleCupSize);

// Initialize the state based on the initial selection
cupSizeDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Cup Size handling when saving the form
function handleCupSizeOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleCupSize();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Cup Base Colour details" input based on the selected option
// // Get references to the elements
// var cupBaseColourDropdown = document.getElementById("cupBaseColour");
// var cupPantoneReferenceInput = document.getElementById("cupPantoneReference");
// var cupPantoneReferenceLabel = document.querySelector(
//   'label[for="cupPantoneReference"]'
// );

// // Add event listener to the Cup Base Colour dropdown
// cupBaseColourDropdown.addEventListener("change", function () {
//   // Check if the selected option is "Other (Pantone Matched)"
//   if (cupBaseColourDropdown.value === "Other (Pantone Matched)") {
//     // Enable the "Other (Pantone Matched)" input field
//     cupPantoneReferenceInput.disabled = false;
//     // Make it required when enabled
//     cupPantoneReferenceInput.required = true;
//     // Change label color to black (not greyed out)
//     cupPantoneReferenceLabel.style.color = "black";
//   } else {
//     // Disable and clear the "Other (Pantone Matched)" input field
//     cupPantoneReferenceInput.disabled = true;
//     // Make it not required when disabled
//     cupPantoneReferenceInput.required = false;
//     // Change label color to grey
//     cupPantoneReferenceLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     cupPantoneReferenceInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// cupBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Cup Base Colour details" input based on the selected option
function handleCupBaseColour() {
  // Get references to the elements
  var cupBaseColourDropdown = document.getElementById("cupBaseColour");
  var cupPantoneReferenceInput = document.getElementById("cupPantoneReference");
  var cupPantoneReferenceLabel = document.querySelector(
    'label[for="cupPantoneReference"]'
  );

  // Check if the selected option is "Other (Pantone Matched)"
  if (cupBaseColourDropdown.value === "Other (Pantone Matched)") {
    // Enable the "Other (Pantone Matched)" input field
    cupPantoneReferenceInput.disabled = false;
    // Make it required when enabled
    cupPantoneReferenceInput.required = true;
    // Change label color to black (not greyed out)
    cupPantoneReferenceLabel.style.color = "black";
  } else {
    // Disable and clear the "Other (Pantone Matched)" input field
    cupPantoneReferenceInput.disabled = true;
    // Make it not required when disabled
    cupPantoneReferenceInput.required = false;
    // Change label color to grey
    cupPantoneReferenceLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    cupPantoneReferenceInput.style.borderColor = "";
  }
}

// Add event listener to the Cup Base Colour dropdown
var cupBaseColourDropdown = document.getElementById("cupBaseColour");
cupBaseColourDropdown.addEventListener("change", handleCupBaseColour);

// Initialize the state based on the initial selection
cupBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Cup Base Colour handling when saving the form
function handleCupBaseColourOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleCupBaseColour();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Cup Decoration details" input based on the selected option
// // Get references to the elements
// var cupDecorationDropdown = document.getElementById("cupDecorationOptions");
// var cupDecorationInput = document.getElementById("cupDecoration");
// var cupDecorationLabel = document.querySelector('label[for="cupDecoration"]');

// // Add event listener to the Cup Decoration dropdown
// cupDecorationDropdown.addEventListener("change", function () {
//   // Check if the selected option is "4. Other - Please Specify"
//   if (cupDecorationDropdown.value === "4. Other - Please Specify") {
//     // Enable the "If Other, please specify" input field
//     cupDecorationInput.disabled = false;
//     // Make it required when enabled
//     cupDecorationInput.required = true;
//     // Change label color to black (not greyed out)
//     cupDecorationLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     cupDecorationInput.disabled = true;
//     // Make it not required when disabled
//     cupDecorationInput.required = false;
//     // Change label color to grey
//     cupDecorationLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     cupDecorationInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// cupDecorationDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Cup Decoration details" input based on the selected option
function handleCupDecoration() {
  // Get references to the elements
  var cupDecorationDropdown = document.getElementById("cupDecorationOptions");
  var cupDecorationInput = document.getElementById("cupDecoration");
  var cupDecorationLabel = document.querySelector('label[for="cupDecoration"]');

  // Check if the selected option is "4. Other - Please Specify"
  if (cupDecorationDropdown.value === "4. Other - Please Specify") {
    // Enable the "If Other, please specify" input field
    cupDecorationInput.disabled = false;
    // Make it required when enabled
    cupDecorationInput.required = true;
    // Change label color to black (not greyed out)
    cupDecorationLabel.style.color = "black";
  } else {
    // Disable and clear the "If Other, please specify" input field
    cupDecorationInput.disabled = true;
    // Make it not required when disabled
    cupDecorationInput.required = false;
    // Change label color to grey
    cupDecorationLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    cupDecorationInput.style.borderColor = "";
  }
}

// Add event listener to the Cup Decoration dropdown
var cupDecorationDropdown = document.getElementById("cupDecorationOptions");
cupDecorationDropdown.addEventListener("change", handleCupDecoration);

// Initialize the state based on the initial selection
cupDecorationDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Cup Decoration handling when saving the form
function handleCupDecorationOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleCupDecoration();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Cup Mould/Base details" input based on the selected option
// // Get references to the elements
// var cupMouldBaseOptionsDropdown = document.getElementById(
//   "cupMouldBaseOptions"
// );

// var silkScreenLabel = document.querySelector(
//   'label[for="silkScreenProvidedBy"]'
// );

// var silkScreenProvidedByEcoffeeCupLabel = document.querySelector(
//   'label[for="silkScreenProvidedByEcoffeeCup"]'
// );

// var silkScreenProvidedByClientLabel = document.querySelector(
//   'label[for="silkScreenProvidedByClient"]'
// );

// var silkScreenProvidedByEcoffeeCup = document.getElementById(
//   "silkScreenProvidedByEcoffeeCup"
// );
// var silkScreenProvidedByClient = document.getElementById(
//   "silkScreenProvidedByClient"
// );
// var cupMouldBaseOtherInput = document.getElementById("cupMouldBaseOther");

// var cupMouldBaseOtherLabel = document.querySelector(
//   'label[for="cupMouldBaseOther"]'
// );

// var silkScreenLabel = document.querySelector("h4");

// // Function to enable/disable elements based on the selected option
// function updateCupMouldBaseElements() {
//   var selectedOption = cupMouldBaseOptionsDropdown.value;

//   // Disable both radio options and the input field by default
//   silkScreenProvidedByEcoffeeCup.disabled = true;
//   silkScreenProvidedByClient.disabled = true;
//   cupMouldBaseOtherInput.disabled = true;

//   // Make the radio options and input field required only when enabled
//   silkScreenProvidedByEcoffeeCup.required = false;
//   silkScreenProvidedByClient.required = false;
//   cupMouldBaseOtherInput.required = false;

//   // Change label colors to grey by default
//   silkScreenLabel.style.color = "#CCCCCC";
//   silkScreenProvidedByClientLabel.style.color = "#CCCCCC";
//   silkScreenProvidedByEcoffeeCupLabel.style.color = "#CCCCCC";
//   cupMouldBaseOtherLabel.style.color = "#CCCCCC";

//   if (
//     // Check if the selected option is "1. Standard Ecoffee Cup" or "2. Standard blank"
//     selectedOption === "1. Standard Ecoffee Cup" ||
//     selectedOption === "2. Standard blank"
//   ) {
//     // When "Standard Ecoffee Cup" or "Standard blank" is selected
//     silkScreenProvidedByEcoffeeCup.disabled = true;
//     silkScreenProvidedByClient.disabled = true;
//     cupMouldBaseOtherInput.disabled = true;
//   } else if (selectedOption === "3. Silk-screen printed") {
//     // When "Silk-screen printed" is selected, enable the radio options and disable the input field
//     silkScreenProvidedByEcoffeeCup.disabled = false;
//     silkScreenProvidedByClient.disabled = false;
//     cupMouldBaseOtherInput.disabled = true;
//     silkScreenLabel.style.color = "black";
//     silkScreenProvidedByClientLabel.style.color = "black";
//     silkScreenProvidedByEcoffeeCupLabel.style.color = "black";
//   } else if (selectedOption === "4. other (please specify)") {
//     // When "Other" is selected, disable the radio options and enable the input field
//     silkScreenProvidedByEcoffeeCup.disabled = true;
//     silkScreenProvidedByClient.disabled = true;
//     cupMouldBaseOtherInput.disabled = false;
//     cupMouldBaseOtherInput.required = true;
//     cupMouldBaseOtherLabel.style.color = "black";
//   }
// }

// // Add event listener to the Cup Mould/Base dropdown
// cupMouldBaseOptionsDropdown.addEventListener(
//   "change",
//   updateCupMouldBaseElements
// );

// // Initialize the state based on the initial selection
// updateCupMouldBaseElements();

// Get references to the elements
var cupMouldBaseOptionsDropdown = document.getElementById(
  "cupMouldBaseOptions"
);

var silkScreenProvidedByEcoffeeCup = document.getElementById(
  "silkScreenProvidedByEcoffeeCup"
);

var silkScreenProvidedByClient = document.getElementById(
  "silkScreenProvidedByClient"
);

var silkScreenProvidedByEcoffeeCupLabel = document.querySelector(
  'label[for="silkScreenProvidedByEcoffeeCup"]'
);
var silkScreenProvidedByClientLabel = document.querySelector(
  'label[for="silkScreenProvidedByClient"]'
);
var cupMouldBaseOtherInput = document.getElementById("cupMouldBaseOther");
var cupMouldBaseOtherLabel = document.querySelector(
  'label[for="cupMouldBaseOther"]'
);

// // Function to enable/disable elements based on the selected option
// function updateCupMouldBaseElements() {
//   var selectedOption = cupMouldBaseOptionsDropdown.value;

//   // Disable both radio options and the input field by default
//   silkScreenProvidedByEcoffeeCup.disabled = true;
//   silkScreenProvidedByClient.disabled = true;
//   cupMouldBaseOtherInput.disabled = true;

//   // Make the radio options and input field required only when enabled
//   silkScreenProvidedByEcoffeeCup.required = false;
//   silkScreenProvidedByClient.required = false;
//   cupMouldBaseOtherInput.required = false;

//   // Change label colors to grey by default
//   silkScreenProvidedByEcoffeeCupLabel.style.color = "#CCCCCC";
//   silkScreenProvidedByClientLabel.style.color = "#CCCCCC";
//   cupMouldBaseOtherLabel.style.color = "#CCCCCC";

//   if (
//     // Check if the selected option is "1. Standard Ecoffee Cup" or "2. Standard blank"
//     selectedOption === "1. Standard Ecoffee Cup" ||
//     selectedOption === "2. Standard blank"
//   ) {
//     // When "Standard Ecoffee Cup" or "Standard blank" is selected
//     silkScreenProvidedByEcoffeeCup.disabled = true;
//     silkScreenProvidedByClient.disabled = true;
//     cupMouldBaseOtherInput.disabled = true;
//   } else if (selectedOption === "3. Silk-screen printed") {
//     // When "Silk-screen printed" is selected, enable the radio options and disable the input field
//     silkScreenProvidedByEcoffeeCup.disabled = false;
//     silkScreenProvidedByClient.disabled = false;
//     cupMouldBaseOtherInput.disabled = true;
//     silkScreenProvidedByEcoffeeCupLabel.style.color = "black";
//     silkScreenProvidedByClientLabel.style.color = "black";
//   } else if (selectedOption === "4. other (please specify)") {
//     // When "Other" is selected, disable the radio options and enable the input field
//     silkScreenProvidedByEcoffeeCup.disabled = true;
//     silkScreenProvidedByClient.disabled = true;
//     cupMouldBaseOtherInput.disabled = false;
//     cupMouldBaseOtherInput.required = true;
//     cupMouldBaseOtherLabel.style.color = "black";
//   }
// }

// Function to enable/disable elements based on the selected option
function updateCupMouldBaseElements() {
  var selectedOption = cupMouldBaseOptionsDropdown.value;

  // Disable both radio options and the input field by default
  silkScreenProvidedByEcoffeeCup.disabled = true;
  silkScreenProvidedByClient.disabled = true;
  cupMouldBaseOtherInput.disabled = true;

  // Make the radio options and input field required only when enabled
  silkScreenProvidedByEcoffeeCup.required = false;
  silkScreenProvidedByClient.required = false;
  cupMouldBaseOtherInput.required = false;

  // Change label colors to grey by default
  silkScreenProvidedByEcoffeeCupLabel.style.color = "#CCCCCC";
  silkScreenProvidedByClientLabel.style.color = "#CCCCCC";
  cupMouldBaseOtherLabel.style.color = "#CCCCCC";

  if (
    // Check if the selected option is "1. Standard Ecoffee Cup" or "2. Standard blank"
    selectedOption === "1. Standard Ecoffee Cup" ||
    selectedOption === "2. Standard blank"
  ) {
    // When "Standard Ecoffee Cup" or "Standard blank" is selected
    silkScreenProvidedByEcoffeeCup.disabled = true;
    silkScreenProvidedByClient.disabled = true;
    cupMouldBaseOtherInput.disabled = true;
    // reset the form field border color
    cupMouldBaseOtherInput.style.borderColor = "";
  } else if (selectedOption === "3. Silk-screen printed") {
    // When "Silk-screen printed" is selected, enable the radio options and disable the input field
    silkScreenProvidedByEcoffeeCup.disabled = false;
    silkScreenProvidedByClient.disabled = false;
    cupMouldBaseOtherInput.disabled = true;
    silkScreenProvidedByEcoffeeCupLabel.style.color = "black";
    silkScreenProvidedByClientLabel.style.color = "black";
  } else if (selectedOption === "4. other (please specify)") {
    // When "Other" is selected, disable the radio options and enable the input field
    silkScreenProvidedByEcoffeeCup.disabled = true;
    silkScreenProvidedByClient.disabled = true;
    cupMouldBaseOtherInput.disabled = false;
    cupMouldBaseOtherInput.required = true;
    cupMouldBaseOtherLabel.style.color = "black";
  }
}

// Add event listener to the Cup Mould/Base dropdown
cupMouldBaseOptionsDropdown.addEventListener(
  "change",
  updateCupMouldBaseElements
);

// Initialize the state based on the initial selection
updateCupMouldBaseElements();

// Function to trigger the Cup Mould/Base handling when saving the form
function updateCupMouldBaseElementsOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  updateCupMouldBaseElements();
  // Additional logic for saving the form goes here
}

// // Add event listener to the Cup Mould/Base dropdown
// cupMouldBaseOptionsDropdown.addEventListener(
//   "change",
//   updateCupMouldBaseElements
// );

// // Initialize the state based on the initial selection
// updateCupMouldBaseElements();

// // // Function to trigger the Cup Mould/Base handling when saving the form
// // function updateCupMouldBaseElementsOnSave() {
// //   // Trigger the same handling logic as when the dropdown changes
// //   updateCupMouldBaseElements();
// //   // Additional logic for saving the form goes here
// // }

// // Function to trigger the Cup Mould/Base handling when saving the form
// function updateCupMouldBaseElementsOnSave() {
//   // Get the current selected option
//   var selectedOption = cupMouldBaseOptionsDropdown.value;

//   // Trigger the same handling logic as when the dropdown changes
//   updateCupMouldBaseElements();

//   // Additional logic for saving the form goes here

//   // Check if the selected option is "4. other (please specify)"
//   if (selectedOption === "4. other (please specify)") {
//     // Check if the cupMouldBaseOtherInput field is empty
//     if (!cupMouldBaseOtherInput.value.trim()) {
//       // Set a custom validity message to indicate the field is required
//       cupMouldBaseOtherInput.setCustomValidity("This field is required.");

//       // Trigger validation to show the error message and prevent form submission
//       cupMouldBaseOtherInput.reportValidity();
//       return; // Abort saving the form
//     }
//   }

//   // If the selected option is not "4. other (please specify)",
//   // manually set the validity state of cupMouldBaseOtherInput to valid
//   cupMouldBaseOtherInput.setCustomValidity('');
// }

// // Function to enable/disable the "Sleeve Base Colour details" input based on the selected option
// // Get references to the elements
// var sleeveBaseColourDropdown = document.getElementById("sleeveBaseColour");
// var sleevePantoneReferenceInput = document.getElementById(
//   "sleevePantoneReference"
// );
// var sleevePantoneReferenceLabel = document.querySelector(
//   'label[for="sleevePantoneReference"]'
// );

// // Add event listener to the Sleeve Base Colour dropdown
// sleeveBaseColourDropdown.addEventListener("change", function () {
//   // Check if the selected option is "Other (Pantone Matched)"
//   if (sleeveBaseColourDropdown.value === "Other (Pantone Matched)") {
//     // Enable the "Other (Pantone Matched)" input field
//     sleevePantoneReferenceInput.disabled = false;
//     // Make it required when enabled
//     sleevePantoneReferenceInput.required = true;
//     // Change label color to black (not greyed out)
//     sleevePantoneReferenceLabel.style.color = "black";
//   } else {
//     // Disable and clear the "Other (Pantone Matched)" input field
//     sleevePantoneReferenceInput.disabled = true;
//     // Make it not required when disabled
//     sleevePantoneReferenceInput.required = false;
//     // Change label color to grey
//     sleevePantoneReferenceLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     sleevePantoneReferenceInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// sleeveBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Sleeve Base Colour details" input based on the selected option
function handleSleeveBaseColour() {
  // Get references to the elements
  var sleeveBaseColourDropdown = document.getElementById("sleeveBaseColour");
  var sleevePantoneReferenceInput = document.getElementById(
    "sleevePantoneReference"
  );
  var sleevePantoneReferenceLabel = document.querySelector(
    'label[for="sleevePantoneReference"]'
  );

  // Check if the selected option is "Other (Pantone Matched)"
  if (sleeveBaseColourDropdown.value === "Other (Pantone Matched)") {
    // Enable the "Other (Pantone Matched)" input field
    sleevePantoneReferenceInput.disabled = false;
    // Make it required when enabled
    sleevePantoneReferenceInput.required = true;
    // Change label color to black (not greyed out)
    sleevePantoneReferenceLabel.style.color = "black";
  } else {
    // Disable and clear the "Other (Pantone Matched)" input field
    sleevePantoneReferenceInput.disabled = true;
    // Make it not required when disabled
    sleevePantoneReferenceInput.required = false;
    // Change label color to grey
    sleevePantoneReferenceLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    sleevePantoneReferenceInput.style.borderColor = "";
  }
}

// Add event listener to the Sleeve Base Colour dropdown
var sleeveBaseColourDropdown = document.getElementById("sleeveBaseColour");
sleeveBaseColourDropdown.addEventListener("change", handleSleeveBaseColour);

// Initialize the state based on the initial selection
sleeveBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Sleeve Base Colour handling when saving the form
function handleSleeveBaseColourOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleSleeveBaseColour();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "other" input based on the selected option
// // Get references to the elements
// var lidMouldDropdown = document.getElementById("lidMouldOptions");
// var lidMouldInput = document.getElementById("lidMouldOther");
// var lidMouldLabel = document.querySelector('label[for="lidMouldOther"]');

// // Add event listener to the Lid Mould dropdown
// lidMouldDropdown.addEventListener("change", function () {
//   // Check if the selected option is "3. other (please specify)"
//   if (lidMouldDropdown.value === "3. other (please specify)") {
//     // Enable the "If Other, please specify" input field
//     lidMouldInput.disabled = false;
//     // Make it required when enabled
//     lidMouldInput.required = true;
//     // Change label color to black (not greyed out)
//     lidMouldLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     lidMouldInput.disabled = true;
//     // Make it not required when disabled
//     lidMouldInput.required = false;
//     // Change label color to grey
//     lidMouldLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     lidMouldInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// lidMouldDropdown.dispatchEvent(new Event("change"));

// Get references to the elements
var lidMouldDropdown = document.getElementById("lidMouldOptions");
var lidMouldInput = document.getElementById("lidMouldOther");
var lidMouldLabel = document.querySelector('label[for="lidMouldOther"]');

// Function to enable/disable the "other" input based on the selected option
function updateLidMouldInput() {
  // Check if the selected option is "3. other (please specify)"
  if (lidMouldDropdown.value === "3. other (please specify)") {
    // Enable the "If Other, please specify" input field
    lidMouldInput.disabled = false;
    // Make it required when enabled
    lidMouldInput.required = true;
    // Change label color to black (not greyed out)
    lidMouldLabel.style.color = "black";
  } else {
    // Disable and clear the "If Other, please specify" input field
    lidMouldInput.disabled = true;
    // Make it not required when disabled
    lidMouldInput.required = false;
    // Change label color to grey
    lidMouldLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    lidMouldInput.style.borderColor = "";
  }
}

// Add event listener to the Lid Mould dropdown
lidMouldDropdown.addEventListener("change", updateLidMouldInput);

// Initialize the state based on the initial selection
updateLidMouldInput();

// Function to trigger the Lid Mould handling when saving the form
function updateLidMouldInputOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  updateLidMouldInput();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Lid Base Colour details" input based on the selected option
// // Get references to the elements
// var lidBaseColourDropdown = document.getElementById("lidBaseColour");
// var lidPantoneReferenceInput = document.getElementById("lidPantoneReference");
// var lidBaseColourLabel = document.querySelector('label[for="lidBaseColour"]');

// // Add event listener to the Lid Base Colour dropdown
// lidBaseColourDropdown.addEventListener("change", function () {
//   // Check if the selected option is "Other (Pantone Matched)"
//   if (lidBaseColourDropdown.value === "Other (Pantone Matched)") {
//     // Enable the "Other (Pantone Matched)" input field
//     lidPantoneReferenceInput.disabled = false;
//     // Make it required when enabled
//     lidPantoneReferenceInput.required = true;
//     // Change label color to black (not greyed out)
//     lidBaseColourLabel.style.color = "black";
//   } else {
//     // Disable and clear the "Other (Pantone Matched)" input field
//     lidPantoneReferenceInput.disabled = true;
//     // Make it not required when disabled
//     lidPantoneReferenceInput.required = false;
//     // Change label color to grey
//     lidBaseColourLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     lidPantoneReferenceInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// lidBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Lid Base Colour details" input based on the selected option
function handleLidBaseColour() {
  // Get references to the elements
  var lidBaseColourDropdown = document.getElementById("lidBaseColour");
  var lidPantoneReferenceInput = document.getElementById("lidPantoneReference");
  var lidBaseColourLabel = document.querySelector('label[for="lidBaseColour"]');

  // Check if the selected option is "Other (Pantone Matched)"
  if (lidBaseColourDropdown.value === "Other (Pantone Matched)") {
    // Enable the "Other (Pantone Matched)" input field
    lidPantoneReferenceInput.disabled = false;
    // Make it required when enabled
    lidPantoneReferenceInput.required = true;
    // Change label color to black (not greyed out)
    lidBaseColourLabel.style.color = "black";
  } else {
    // Disable and clear the "Other (Pantone Matched)" input field
    lidPantoneReferenceInput.disabled = true;
    // Make it not required when disabled
    lidPantoneReferenceInput.required = false;
    // Change label color to grey
    lidBaseColourLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    lidPantoneReferenceInput.style.borderColor = "";
  }
}

// Add event listener to the Lid Base Colour dropdown
var lidBaseColourDropdown = document.getElementById("lidBaseColour");
lidBaseColourDropdown.addEventListener("change", handleLidBaseColour);

// Initialize the state based on the initial selection
lidBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Lid Base Colour handling when saving the form
function handleLidBaseColourOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleLidBaseColour();
  // Additional logic for saving the form goes here
}

// // Call handleLidBaseColourOnSave when saving the form
// // Replace this with your actual save form function or event
// saveButton.addEventListener("click", function () {
//   // Call the function to handle Lid Base Colour when saving
//   handleLidBaseColourOnSave();
// });

// // Function to enable/disable the "Packaging Type details" input based on the selected option
// // Get references to the elements
// var packagingTypeDropdown = document.getElementById("packagingTypeOptions");
// var packagingTypeOtherInput = document.getElementById("packagingTypeOther");
// var packagingTypeLabel = document.querySelector(
//   'label[for="packagingTypeOther"]'
// );

// // Add event listener to the Packaging Type dropdown
// packagingTypeDropdown.addEventListener("change", function () {
//   // Check if the selected option is "3. other (please specify)"
//   if (packagingTypeDropdown.value === "3. other (please specify)") {
//     // Enable the "If Other, please specify" input field
//     packagingTypeOtherInput.disabled = false;
//     packagingTypeOtherInput.required = true; // Make it required when enabled
//     // Change label color to black (not greyed out)
//     packagingTypeLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     packagingTypeOtherInput.disabled = true;
//     packagingTypeOtherInput.required = false; // Make it not required when disabled
//     // Change label color to grey
//     packagingTypeLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     packagingTypeOtherInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// packagingTypeDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Packaging Type details" input based on the selected option
function handlePackagingType() {
  // Get references to the elements
  var packagingTypeDropdown = document.getElementById("packagingTypeOptions");
  var packagingTypeOtherInput = document.getElementById("packagingTypeOther");
  var packagingTypeLabel = document.querySelector(
    'label[for="packagingTypeOther"]'
  );

  // Check if the selected option is "3. other (please specify)"
  if (packagingTypeDropdown.value === "3. other (please specify)") {
    // Enable the "If Other, please specify" input field
    packagingTypeOtherInput.disabled = false;
    packagingTypeOtherInput.required = true; // Make it required when enabled
    // Change label color to black (not greyed out)
    packagingTypeLabel.style.color = "black";
  } else {
    // Disable and clear the "If Other, please specify" input field
    packagingTypeOtherInput.disabled = true;
    packagingTypeOtherInput.required = false; // Make it not required when disabled
    // Change label color to grey
    packagingTypeLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    packagingTypeOtherInput.style.borderColor = "";
  }
}

// Add event listener to the Packaging Type dropdown
var packagingTypeDropdown = document.getElementById("packagingTypeOptions");
packagingTypeDropdown.addEventListener("change", handlePackagingType);

// Initialize the state based on the initial selection
packagingTypeDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Packaging Type handling when saving the form
function handlePackagingTypeOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handlePackagingType();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Packaging Cutter Guide details" input based on the selected option
// // Get references to the elements
// var packagingOuterCartonMarkingsDropdown = document.getElementById(
//   "packagingOuterCartonMarkings"
// );
// var packagingOuterCartonMarkingsOtherInput = document.getElementById(
//   "packagingOuterCartonMarkingsOther"
// );
// var packagingOuterCartonMarkingsLabel = document.querySelector(
//   'label[for="packagingOuterCartonMarkingsOther"]'
// );

// // Add event listener to the Packaging Outer Carton Markings dropdown
// packagingOuterCartonMarkingsDropdown.addEventListener("change", function () {
//   // Check if the selected option is "other (please specify)"
//   if (packagingOuterCartonMarkingsDropdown.value === "other (please specify)") {
//     // Enable the "If Other, please specify" input field
//     packagingOuterCartonMarkingsOtherInput.disabled = false;
//     // Make it required when enabled
//     packagingOuterCartonMarkingsOtherInput.required = true;
//     // Change label color to black (not greyed out)
//     packagingOuterCartonMarkingsLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     packagingOuterCartonMarkingsOtherInput.disabled = true;
//     // Make it not required when disabled
//     packagingOuterCartonMarkingsOtherInput.required = false;
//     // Change label color to grey
//     packagingOuterCartonMarkingsLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     packagingOuterCartonMarkingsOtherInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// packagingOuterCartonMarkingsDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Packaging Outer Carton Markings" input based on the selected option
function handlePackagingOuterCartonMarkings() {
  // Get references to the elements
  var packagingOuterCartonMarkingsDropdown = document.getElementById(
    "packagingOuterCartonMarkings"
  );
  var packagingOuterCartonMarkingsOtherInput = document.getElementById(
    "packagingOuterCartonMarkingsOther"
  );
  var packagingOuterCartonMarkingsLabel = document.querySelector(
    'label[for="packagingOuterCartonMarkingsOther"]'
  );

  // Check if the selected option is "other (please specify)"
  if (packagingOuterCartonMarkingsDropdown.value === "other (please specify)") {
    // Enable the "If Other, please specify" input field
    packagingOuterCartonMarkingsOtherInput.disabled = false;
    // Make it required when enabled
    packagingOuterCartonMarkingsOtherInput.required = true;
    // Change label color to black (not greyed out)
    packagingOuterCartonMarkingsLabel.style.color = "black";
  } else {
    // Disable and clear the "If Other, please specify" input field
    packagingOuterCartonMarkingsOtherInput.disabled = true;
    // Make it not required when disabled
    packagingOuterCartonMarkingsOtherInput.required = false;
    // Change label color to grey
    packagingOuterCartonMarkingsLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    packagingOuterCartonMarkingsOtherInput.style.borderColor = "";
  }
}

// Add event listener to the Packaging Cutter Guide dropdown
var packagingOuterCartonMarkingsDropdown = document.getElementById(
  "packagingOuterCartonMarkings"
);
packagingOuterCartonMarkingsDropdown.addEventListener(
  "change",
  handlePackagingOuterCartonMarkings
);

// Initialize the state based on the initial selection
packagingOuterCartonMarkingsDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Packaging Cutter Guide handling when saving the form
function handlePackagingOuterCartonMarkingsOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handlePackagingOuterCartonMarkings();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Packaging Outer Carton Markings" input based on the selected option
// // Get references to the elements
// var packagingOuterCartonMarkingsDropdown = document.getElementById(
//   "packagingOuterCartonMarkings"
// );
// var packagingOuterCartonMarkingsOtherInput = document.getElementById(
//   "packagingOuterCartonMarkingsOther"
// );
// var packagingOuterCartonMarkingsLabel = document.querySelector(
//   'label[for="packagingOuterCartonMarkingsOther"]'
// );

// // Add event listener to the Packaging Outer Carton Markings dropdown
// packagingOuterCartonMarkingsDropdown.addEventListener("change", function () {
//   // Check if the selected option is "other (please specify)"
//   if (packagingOuterCartonMarkingsDropdown.value === "other (please specify)") {
//     // Enable the "If Other, please specify" input field
//     packagingOuterCartonMarkingsOtherInput.disabled = false;
//     // Make it required when enabled
//     packagingOuterCartonMarkingsOtherInput.required = true;
//     // Change label color to black (not greyed out)
//     packagingOuterCartonMarkingsLabel.style.color = "black";
//   } else {
//     // Disable and clear the "If Other, please specify" input field
//     packagingOuterCartonMarkingsOtherInput.disabled = true;
//     // Make it not required when disabled
//     packagingOuterCartonMarkingsOtherInput.required = false;
//     // Change label color to grey
//     packagingOuterCartonMarkingsLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     packagingOuterCartonMarkingsOtherInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// packagingOuterCartonMarkingsDropdown.dispatchEvent(new Event("change"));

// // Funtion to handle the "Packaging Cutter Guide Standard" radio buttons
// // Get references to the elements
// var packagingCutterGuideStandardE = document.getElementById(
//   "packagingCutterGuideStandardE"
// );
// var packagingCutterGuideO = document.getElementById("packagingCutterGuideO");
// var packagingCutterGuideOtherInput = document.getElementById(
//   "packagingCutterGuideOther"
// );
// var packagingCutterGuideLabel = document.querySelector(
//   'label[for="packagingCutterGuideOther"]'
// );

// function handlePackagingCutterGuideRadioChange() {
//   if (packagingCutterGuideO.checked) {
//     // Enable the "Overprint Details" input field
//     packagingCutterGuideOtherInput.disabled = false;
//     // Make it required when enabled
//     packagingCutterGuideOtherInput.required = true;
//     // Change label color to black (not greyed out)
//     packagingCutterGuideLabel.style.color = "black";
//   } else {
//     // Disable and clear the input field
//     packagingCutterGuideOtherInput.disabled = true;
//     // Make it not required when disabled
//     packagingCutterGuideOtherInput.required = false;
//     // Change label color to grey
//     packagingCutterGuideLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     packagingCutterGuideOtherInput.style.borderColor = "";
//   }
// }

// // Add event listeners to the radio buttons
// packagingCutterGuideO.addEventListener(
//   "change",
//   handlePackagingCutterGuideRadioChange
// );
// packagingCutterGuideStandardE.addEventListener(
//   "change",
//   handlePackagingCutterGuideRadioChange
// );

// // Initialize the state based on the initial selection
// handlePackagingCutterGuideRadioChange();

// Function to handle the "Packaging Cutter Guide Standard" radio buttons
function handlePackagingCutterGuideRadioChange() {
  // Get references to the elements
  var packagingCutterGuideStandardE = document.getElementById(
    "packagingCutterGuideStandardE"
  );
  var packagingCutterGuideO = document.getElementById("packagingCutterGuideO");
  var packagingCutterGuideOtherInput = document.getElementById(
    "packagingCutterGuideOther"
  );
  var packagingCutterGuideLabel = document.querySelector(
    'label[for="packagingCutterGuideOther"]'
  );

  if (packagingCutterGuideO.checked) {
    // Enable the "Overprint Details" input field
    packagingCutterGuideOtherInput.disabled = false;
    // Make it required when enabled
    packagingCutterGuideOtherInput.required = true;
    // Change label color to black (not greyed out)
    packagingCutterGuideLabel.style.color = "black";
  } else {
    // Disable and clear the input field
    packagingCutterGuideOtherInput.disabled = true;
    // Make it not required when disabled
    packagingCutterGuideOtherInput.required = false;
    // Change label color to grey
    packagingCutterGuideLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    packagingCutterGuideOtherInput.style.borderColor = "";
  }
}

// Add event listeners to the radio buttons
var packagingCutterGuideO = document.getElementById("packagingCutterGuideO");
var packagingCutterGuideStandardE = document.getElementById(
  "packagingCutterGuideStandardE"
);

packagingCutterGuideO.addEventListener(
  "change",
  handlePackagingCutterGuideRadioChange
);
packagingCutterGuideStandardE.addEventListener(
  "change",
  handlePackagingCutterGuideRadioChange
);

// Initialize the state based on the initial selection
handlePackagingCutterGuideRadioChange();

// Function to trigger the Packaging Cutter Guide handling when saving the form
function handlePackagingCutterGuideOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handlePackagingCutterGuideRadioChange();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Packaging Barcode details" input based on the selected option
// // Get references to the elements
// var packagingBarcodeRequiredNo = document.getElementById(
//   "packagingBarcodeRequiredNo"
// );
// var packagingBarcodeRequiredYesEcofffeeCup = document.getElementById(
//   "packagingBarcodeRequiredYesEcofffeeCup"
// );
// var packagingBarcodeRequiredYesClient = document.getElementById(
//   "packagingBarcodeRequiredYesClient"
// );
// var packagingBarcodeDetailsInput = document.getElementById(
//   "packagingBarcodeDetails"
// );
// var packagingBarcodeDetailsLabel = document.querySelector(
//   'label[for="packagingBarcodeDetails"]'
// );

// // Function to enable or disable the input field based on the selected radio button
// function handleBarcodeRadioChange() {
//   if (packagingBarcodeRequiredYesClient.checked) {
//     // Enable the "Barcode Number (if applicable)" input field
//     packagingBarcodeDetailsInput.disabled = false;
//     // Make it required when enabled
//     packagingBarcodeDetailsInput.required = true;
//     // Change label color to black (not greyed out)
//     packagingBarcodeDetailsLabel.style.color = "black";
//   } else {
//     // Disable and clear the input field
//     packagingBarcodeDetailsInput.disabled = true;
//     // Make it not required when disabled
//     packagingBarcodeDetailsInput.required = false;
//     // Change label color to grey
//     packagingBarcodeDetailsLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     packagingBarcodeDetailsInput.style.borderColor = "";
//   }
// }

// // Add event listeners to all three radio buttons
// packagingBarcodeRequiredNo.addEventListener("change", handleBarcodeRadioChange);
// packagingBarcodeRequiredYesEcofffeeCup.addEventListener(
//   "change",
//   handleBarcodeRadioChange
// );
// packagingBarcodeRequiredYesClient.addEventListener(
//   "change",
//   handleBarcodeRadioChange
// );

// // Initialize the state based on the initial selection
// handleBarcodeRadioChange();

// Get references to the elements
var packagingBarcodeRequiredNo = document.getElementById(
  "packagingBarcodeRequiredNo"
);
var packagingBarcodeRequiredYesEcofffeeCup = document.getElementById(
  "packagingBarcodeRequiredYesEcofffeeCup"
);
var packagingBarcodeRequiredYesClient = document.getElementById(
  "packagingBarcodeRequiredYesClient"
);
var packagingBarcodeDetailsInput = document.getElementById(
  "packagingBarcodeDetails"
);
var packagingBarcodeDetailsLabel = document.querySelector(
  'label[for="packagingBarcodeDetails"]'
);

// Function to enable or disable the input field based on the selected radio button
function handleBarcodeRadioChange() {
  if (packagingBarcodeRequiredYesClient.checked) {
    // Enable the "Barcode Number (if applicable)" input field
    packagingBarcodeDetailsInput.disabled = false;
    // Make it required when enabled
    packagingBarcodeDetailsInput.required = true;
    // Change label color to black (not greyed out)
    packagingBarcodeDetailsLabel.style.color = "black";
  } else {
    // Disable and clear the input field
    packagingBarcodeDetailsInput.disabled = true;
    // Make it not required when disabled
    packagingBarcodeDetailsInput.required = false;
    // Change label color to grey
    packagingBarcodeDetailsLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    packagingBarcodeDetailsInput.style.borderColor = "";
  }
}

// Add event listeners to all three radio buttons
packagingBarcodeRequiredNo.addEventListener("change", handleBarcodeRadioChange);
packagingBarcodeRequiredYesEcofffeeCup.addEventListener(
  "change",
  handleBarcodeRadioChange
);
packagingBarcodeRequiredYesClient.addEventListener(
  "change",
  handleBarcodeRadioChange
);

// Initialize the state based on the initial selection
handleBarcodeRadioChange();

// Function to trigger the Barcode handling when saving the form
function handleBarcodeOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleBarcodeRadioChange();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Sleeve Overprint details" input based on the selected option
// // Get references to the elements
// var sleeveOverprintNo = document.getElementById("sleeveOverprintNo");
// var sleeveOverprintYes = document.getElementById("sleeveOverprintYes");
// var sleeveOverprintDetailsInput = document.getElementById(
//   "sleeveOverprintDetails"
// );
// var sleeveOverprintDetailsLabel = document.querySelector(
//   'label[for="sleeveOverprintDetails"]'
// );

// // Function to enable or disable the input field based on the selected radio button
// function handleSleeveOverprintRadioChange() {
//   if (sleeveOverprintYes.checked) {
//     // Enable the "Overprint Details" input field
//     sleeveOverprintDetailsInput.disabled = false;
//     // Make it required when enabled
//     sleeveOverprintDetailsInput.required = true;
//     // Change label color to black (not greyed out)
//     sleeveOverprintDetailsLabel.style.color = "black";
//   } else {
//     // Disable and clear the input field
//     sleeveOverprintDetailsInput.disabled = true;
//     // Make it not required when disabled
//     sleeveOverprintDetailsInput.required = false;
//     // Change label color to grey
//     sleeveOverprintDetailsLabel.style.color = "#CCCCCC";
//     // reset the form field border color
//     sleeveOverprintDetailsInput.style.borderColor = "";
//   }
// }

// // Add event listeners to the radio buttons
// sleeveOverprintNo.addEventListener("change", handleSleeveOverprintRadioChange);
// sleeveOverprintYes.addEventListener("change", handleSleeveOverprintRadioChange);

// // Initialize the state based on the initial selection
// handleSleeveOverprintRadioChange();

// Get references to the elements
var sleeveOverprintNo = document.getElementById("sleeveOverprintNo");
var sleeveOverprintYes = document.getElementById("sleeveOverprintYes");
var sleeveOverprintDetailsInput = document.getElementById(
  "sleeveOverprintDetails"
);
var sleeveOverprintDetailsLabel = document.querySelector(
  'label[for="sleeveOverprintDetails"]'
);

// Function to enable or disable the input field based on the selected radio button
function handleSleeveOverprintRadioChange() {
  if (sleeveOverprintYes.checked) {
    // Enable the "Overprint Details" input field
    sleeveOverprintDetailsInput.disabled = false;
    // Make it required when enabled
    sleeveOverprintDetailsInput.required = true;
    // Change label color to black (not greyed out)
    sleeveOverprintDetailsLabel.style.color = "black";
  } else {
    // Disable and clear the input field
    sleeveOverprintDetailsInput.disabled = true;
    // Make it not required when disabled
    sleeveOverprintDetailsInput.required = false;
    // Change label color to grey
    sleeveOverprintDetailsLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    sleeveOverprintDetailsInput.style.borderColor = "";
  }
}

// Add event listeners to the radio buttons
sleeveOverprintNo.addEventListener("change", handleSleeveOverprintRadioChange);
sleeveOverprintYes.addEventListener("change", handleSleeveOverprintRadioChange);

// Initialize the state based on the initial selection
handleSleeveOverprintRadioChange();

// Function to trigger the Sleeve Overprint handling when saving the form
function handleSleeveOverprintOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handleSleeveOverprintRadioChange();
  // Additional logic for saving the form goes here
}

// var cupCoatedRadio = document.getElementById("cupCoated");
// var cupUncoatedRadio = document.getElementById("cupUncoated");
// var cupCoatedLabel = document.querySelector('label[for="cupCoated"]');
// var cupUncoatedLabel = document.querySelector('label[for="cupUncoated"]');

// var sleeveCoatedRadio = document.getElementById("sleeveCoated");
// var sleeveUncoatedRadio = document.getElementById("sleeveUncoated");
// var sleeveCoatedLabel = document.querySelector('label[for="sleeveCoated"]');
// var sleeveUncoatedLabel = document.querySelector('label[for="sleeveUncoated"]');

// // Initialize the state based on the initial selection
// sleeveBaseColourDropdown.dispatchEvent(new Event("change"));

// // function to enable/disable the "Packaging Paper Stock details" input and radio options based on the selected option
// var packagingPaperStockDropdown = document.getElementById(
//   "packagingPaperStock"
// );

// var packagingPaperStockOtherInput = document.getElementById(
//   "packagingPaperStockOther"
// );

// var packagingPaperStockLabel = document.querySelector(
//   'label[for="packagingPaperStockOther"]'
// );

// // add event listener to the Packaging Paper Stock dropdown
// packagingPaperStockDropdown.addEventListener("change", function () {
//   // check if the selected option is "other (please specify)"
//   if (packagingPaperStockDropdown.value === "3. other (please specify)") {
//     // enable the "If Other, please specify" input field
//     packagingPaperStockOtherInput.disabled = false;
//     // make it required when enabled
//     packagingPaperStockOtherInput.required = true;
//     // change label color to black (not greyed out)
//     packagingPaperStockLabel.style.color = "black";
//   } else {
//     // disable and clear the "If Other, please specify" input field
//     packagingPaperStockOtherInput.disabled = true;
//     // make it not required when disabled
//     packagingPaperStockOtherInput.required = false;
//     // change label color to grey
//     packagingPaperStockLabel.style.color = "#CCCCCC";

//     // reset the form field border color
//     packagingPaperStockOtherInput.style.borderColor = "";
//   }
// });

// // initialize the state based on the initial selection
// packagingPaperStockDropdown.dispatchEvent(new Event("change"));

// Get references to the elements
var packagingPaperStockDropdown = document.getElementById(
  "packagingPaperStock"
);
var packagingPaperStockOtherInput = document.getElementById(
  "packagingPaperStockOther"
);
var packagingPaperStockLabel = document.querySelector(
  'label[for="packagingPaperStockOther"]'
);

// Function to enable/disable the "Packaging Paper Stock details" input and radio options based on the selected option
function handlePackagingPaperStock() {
  // Check if the selected option is "3. other (please specify)"
  if (packagingPaperStockDropdown.value === "3. other (please specify)") {
    // Enable the "If Other, please specify" input field
    packagingPaperStockOtherInput.disabled = false;
    // Make it required when enabled
    packagingPaperStockOtherInput.required = true;
    // Change label color to black (not greyed out)
    packagingPaperStockLabel.style.color = "black";
  } else {
    // Disable and clear the "If Other, please specify" input field
    packagingPaperStockOtherInput.disabled = true;
    // Make it not required when disabled
    packagingPaperStockOtherInput.required = false;
    // Change label color to grey
    packagingPaperStockLabel.style.color = "#CCCCCC";
    // Reset the form field border color
    packagingPaperStockOtherInput.style.borderColor = "";
  }
}

// Add event listener to the Packaging Paper Stock dropdown
packagingPaperStockDropdown.addEventListener(
  "change",
  handlePackagingPaperStock
);

// Initialize the state based on the initial selection
packagingPaperStockDropdown.dispatchEvent(new Event("change"));

// Function to trigger the Packaging Paper Stock handling when saving the form
function handlePackagingPaperStockOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handlePackagingPaperStock();
  // Additional logic for saving the form goes here
}

// // Function to enable/disable the "Lid Base Colour details" input and radio options based on the selected option
// var lidBaseColourDropdown = document.getElementById("lidBaseColour");
// var lidPantoneReferenceInput = document.getElementById("lidPantoneReference");
// var lidBaseColourLabel = document.querySelector('label[for="lidBaseColour"]');
// var lidCoatedRadio = document.getElementById("lidCoated");
// var lidUncoatedRadio = document.getElementById("lidUncoated");
// var lidCoatedLabel = document.querySelector('label[for="lidCoated"]');
// var lidUncoatedLabel = document.querySelector('label[for="lidUncoated"]');

// // Add event listener to the Lid Base Colour dropdown
// lidBaseColourDropdown.addEventListener("change", function () {
//   // Check if the selected option is "Other (Pantone Matched)"
//   if (lidBaseColourDropdown.value === "Other (Pantone Matched)") {
//     // Enable the "Other (Pantone Matched)" input field
//     lidPantoneReferenceInput.disabled = false;
//     // Enable the radio options
//     lidCoatedRadio.disabled = false;
//     lidUncoatedRadio.disabled = false;
//     // Make the input and radio options required when enabled
//     lidPantoneReferenceInput.required = true;
//     lidCoatedRadio.required = true;
//     lidUncoatedRadio.required = true;
//     // Change label colors to black (not greyed out)
//     lidBaseColourLabel.style.color = "black";
//     lidCoatedLabel.style.color = "black";
//     lidUncoatedLabel.style.color = "black";
//   } else {
//     // Disable and clear the "Other (Pantone Matched)" input field
//     lidPantoneReferenceInput.disabled = true;
//     // Disable the radio options
//     lidCoatedRadio.disabled = true;
//     lidUncoatedRadio.disabled = true;
//     // Make the input and radio options not required when disabled
//     lidPantoneReferenceInput.required = false;
//     lidCoatedRadio.required = false;
//     lidUncoatedRadio.required = false;
//     // Change label colors to grey
//     lidBaseColourLabel.style.color = "#CCCCCC";
//     lidCoatedLabel.style.color = "#CCCCCC";
//     lidUncoatedLabel.style.color = "#CCCCCC";

//     // reset the form field border color
//     lidPantoneReferenceInput.style.borderColor = "";
//   }
// });

// // Initialize the state based on the initial selection
// lidBaseColourDropdown.dispatchEvent(new Event("change"));

// Function to enable/disable the "Packaging Print Type details" input and radio options based on the selected option
var packagingPrintType = document.getElementById("packagingPrintType");
var packagingPrintTypeDetails = document.getElementById(
  "packagingPrintTypeDetails"
);
var packagingPrintTypeDetailsLabel = document.querySelector(
  'label[for="packagingPrintTypeDetails"]'
);

var packagingPantone = document.getElementById("pantone");
var packagingFourColour = document.getElementById("fourColour");

// var packagingCoated = document.getElementById("packagingCoated");
// var packagingUncoated = document.getElementById("packagingUncoated");
// var packagingCoatedLabel = document.querySelector(
//   'label[for="packagingCoated"]'
// );
// var packagingUncoatedLabel = document.querySelector(
//   'label[for="packagingUncoated"]'
// );

// // Function to enable/disable the "Packaging Print Type" input and radio options based on the selected option
// function handlePackagingPrintTypeRadioChange() {
//   if (packagingPantone.checked) {
//     // Enable the radio options
//     // packagingCoated.disabled = false;
//     // packagingUncoated.disabled = false;

//     // Make the input and radio options required when enabled
//     packagingPrintTypeDetails.required = true;
//     // packagingCoated.required = true;

//     // Change label colors to black (not greyed out)
//     packagingPrintTypeDetailsLabel.style.color = "black";
//     // packagingCoatedLabel.style.color = "black";
//     // packagingUncoatedLabel.style.color = "black";
//   } else {
//     // Disable the radio options
//     // packagingCoated.disabled = true;
//     // packagingUncoated.disabled = true;

//     // Make the input and radio options not required when disabled
//     packagingPrintTypeDetails.required = false;
//     // packagingCoated.required = false;

//     // Change label colors to grey
//     packagingPrintTypeDetailsLabel.style.color = "#CCCCCC";
//     // packagingCoatedLabel.style.color = "#CCCCCC";
//     // packagingUncoatedLabel.style.color = "#CCCCCC";

//     // reset the form field border color
//     packagingPrintTypeDetails.style.borderColor = "";
//   }
// }

// // Add event listeners to the radio buttons
// packagingFourColour.addEventListener(
//   "change",
//   handlePackagingPrintTypeRadioChange
// );
// packagingPantone.addEventListener(
//   "change",
//   handlePackagingPrintTypeRadioChange
// );

// // Initialize the state based on the initial selection
// handlePackagingPrintTypeRadioChange();

// Get references to the elements
var packagingPrintType = document.getElementById("packagingPrintType");
var packagingPrintTypeDetails = document.getElementById(
  "packagingPrintTypeDetails"
);
var packagingPrintTypeDetailsLabel = document.querySelector(
  'label[for="packagingPrintTypeDetails"]'
);
var packagingPantone = document.getElementById("pantone");
var packagingFourColour = document.getElementById("fourColour");
// var packagingCoated = document.getElementById("packagingCoated");
// var packagingUncoated = document.getElementById("packagingUncoated");
// var packagingCoatedLabel = document.querySelector(
//   'label[for="packagingCoated"]'
// );
// var packagingUncoatedLabel = document.querySelector(
//   'label[for="packagingUncoated"]'
// );

// Function to enable/disable the "Packaging Print Type" input and radio options based on the selected option
function handlePackagingPrintTypeRadioChange() {
  if (packagingPantone.checked) {
    // Enable the radio options
    // packagingCoated.disabled = false;
    // packagingUncoated.disabled = false;

    // Make the input and radio options required when enabled
    packagingPrintTypeDetails.required = true;
    // packagingCoated.required = true;

    // Change label colors to black (not greyed out)
    packagingPrintTypeDetailsLabel.style.color = "black";
    // packagingCoatedLabel.style.color = "black";
    // packagingUncoatedLabel.style.color = "black";
  } else {
    // Disable the radio options
    // packagingCoated.disabled = true;
    // packagingUncoated.disabled = true;

    // Make the input and radio options not required when disabled
    packagingPrintTypeDetails.required = false;
    // packagingCoated.required = false;

    // Change label colors to grey
    packagingPrintTypeDetailsLabel.style.color = "#CCCCCC";
    // packagingCoatedLabel.style.color = "#CCCCCC";
    // packagingUncoatedLabel.style.color = "#CCCCCC";

    // Reset the form field border color
    packagingPrintTypeDetails.style.borderColor = "";
  }
}

// Add event listeners to the radio buttons
packagingFourColour.addEventListener(
  "change",
  handlePackagingPrintTypeRadioChange
);
packagingPantone.addEventListener(
  "change",
  handlePackagingPrintTypeRadioChange
);

// Initialize the state based on the initial selection
handlePackagingPrintTypeRadioChange();

// Function to trigger the Packaging Print Type handling when saving the form
function handlePackagingPrintTypeOnSave() {
  // Trigger the same handling logic as when the dropdown changes
  handlePackagingPrintTypeRadioChange();
  // Additional logic for saving the form goes here
}

// // Function to validate the form and highlight empty fields in red
// function validateForm() {
//   const requiredFields = document.querySelectorAll("[required]");
//   let hasEmptyFields = false;

//   requiredFields.forEach((field) => {
//     field.addEventListener("input", () => {
//       if (field.value) {
//         field.style.borderColor = ""; // Reset the border color when text is entered
//       }
//     });

//     if (!field.value) {
//       field.style.borderColor = "red"; // Highlight empty fields in red
//       hasEmptyFields = true;
//     } else {
//       field.style.borderColor = ""; // Reset the border color
//     }
//   });

//   if (hasEmptyFields) {
//     alert(
//       "WARNING: Some fields are still empty! You MUST fill out all required fields (highlighted in RED) before proceeding."
//     );
//     return false; // Cancel the operation and force the user to fill out required fields
//   }

//   return true; // Continue with the operation if all required fields are filled out
// }

// Function to validate the form and highlight empty fields in red
function validateForm() {
  const requiredFields = document.querySelectorAll("[required]");
  let hasEmptyFields = false;

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.value) {
        field.style.borderColor = ""; // Reset the border color when text is entered
      }
    });

    if (!field.value) {
      // Highlight empty fields in red only if the relevant conditions are not met
      if (
        !(sleeveRequiredNo.checked && field.closest("#sleeve-section")) &&
        !(lidRequiredNo.checked && field.closest("#lid-section")) &&
        !(packagingRequiredNo.checked && field.closest("#packaging-section"))
      ) {
        field.style.borderColor = "red";
        hasEmptyFields = true;
      }
    } else {
      field.style.borderColor = ""; // Reset the border color
    }
  });

  if (hasEmptyFields) {
    alert(
      "WARNING: Some fields are still empty! You MUST fill out all required fields (highlighted in RED) before proceeding."
    );
    return false; // Cancel the operation and force the user to fill out required fields
  }

  return true; // Continue with the operation if all required fields are filled out
}

// // Function to reset the border color of all required fields
// function resetFieldBorders() {
//   const requiredFields = document.querySelectorAll("[required]");
//   requiredFields.forEach((field) => {
//     console.log("Resetting border for field:", field);
//     field.style.borderColor = ""; // Reset the border color
//     // if this is a NEW form, reset the radio buttons
//     if (jobId.value === "NEW") {
//       handleDropdownSelection(field); // Reset the border color of the fieldset
//     }
//   });
// }

// Declare resettingRadioButtons at a global scope
var resettingRadioButtons = false;

// Function to reset the border color of all required fields
function resetFieldBorders() {
  const requiredFields = document.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    console.log("Resetting border for field:", field);
    field.style.borderColor = ""; // Reset the border color
  });

  // Reset the radio button selections based on jobId.value if necessary
  // if (jobId.value === "NEW" && !resettingRadioButtons) {
  //   resettingRadioButtons = true; // Prevent re-entry to this block
  //   handleDropdownSelection();
  //   resettingRadioButtons = false; // Allow further calls
  // }
}
//testing

// Listen for the DOM to be loaded
// document.addEventListener("DOMContentLoaded", () => {
//   // Add a click event listener to the export button
//   const exportButton = document.getElementById("exportData");

//   exportButton.addEventListener("click", () => {
//     // Reference to the root of your Firebase database
//     const rootRef = ref(db);

//     // Fetch the data from your Firebase database
//     get(rootRef)
//       .then((snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           // Convert the data to JSON
//           const jsonData = JSON.stringify(data, null, 2);

//           // Create a Blob containing the JSON data
//           const blob = new Blob([jsonData], { type: "application/json" });

//           // Create a download link and trigger the download
//           const downloadLink = document.createElement("a");
//           downloadLink.href = URL.createObjectURL(blob);
//           downloadLink.download = "firebase_data.json";
//           downloadLink.click();
//         } else {
//           console.error("No data found in the database.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data from Firebase:", error);
//       });
//   });
// });

// Function to limit the input to six digits (for productCode)
function limitToSixDigits(input) {
  const value = input.value;
  if (value.length > 6) {
    input.value = value.slice(0, 6); // Truncate to 6 digits
  }
}

// Get a reference to the productCode input element
const productCodeInput = document.getElementById("productCode");

// Add an event listener for the "input" event
productCodeInput.addEventListener("input", function () {
  limitToSixDigits(productCodeInput);
});

// Function to limit the input to three digits (for samplesRequired)
function limitToThreeDigits(input) {
  const value = input.value;
  if (value.length > 3) {
    input.value = value.slice(0, 3); // Truncate to 6 digits
  }
}

// Get a reference to the productCode input element
const samplesRequiredInput = document.getElementById("samplesRequired");

// Add an event listener for the "input" event
samplesRequiredInput.addEventListener("input", function () {
  limitToThreeDigits(samplesRequiredInput);
});
