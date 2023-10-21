// script to save web form as PDF ///////////////////////////////////////////////

document.getElementById("saveAsPDF").addEventListener("click", function () {
  // Get form data

  // Customer Details
  const name = document.getElementById("name").value;
  // const email = document.getElementById("email").value;
  const factory = document.getElementById("factory").value;
  const date = document.getElementById("date").value;
  const projectName = document.getElementById("projectName").value;
  const jobNumber = document.getElementById("jobNumber").value;
  const radio = document.querySelector(
    'input[name="newOrRepeat"]:checked'
  ).value;
  const productCode = document.getElementById("productCode").value;
  const sampleRequiredDate =
    document.getElementById("sampleRequiredDate").value;

  // Product Details

  // Cup Details
  const cupSize = document.getElementById("cupSize").value;
  const cupBaseColour = document.getElementById("cupBaseColour").value;
  const cupDecoration = document.getElementById("cupDecoration").value;
  const cupArtwork = document.getElementById("cupArtwork").value;
  const cupMouldBase = document.getElementById("cupMouldBase").value;
  const cupExtraNotes = document.getElementById("cupExtraNotes").value;

  // Lid Details
  const lidSize = document.getElementById("lidSize").value;
  const lidBaseColour = document.getElementById("lidBaseColour").value;
  const lidMould = document.getElementById("lidMould").value;
  const lidArtwork = document.getElementById("lidArtwork").value;
  const lidExtraNotes = document.getElementById("lidExtraNotes").value;

  // Sleeve Details
  const sleeveSize = document.getElementById("sleeveSize").value;
  const sleeveBaseColour = document.getElementById("sleeveBaseColour").value;
  const sleeveArtwork = document.getElementById("sleeveArtwork").value;
  const sleeveMould = document.getElementById("sleeveMould").value;
  const embossing = document.querySelector(
    'input[name="embossing"]:checked'
  ).value;
  const overprint = document.querySelector(
    'input[name="overprint"]:checked'
  ).value;
  const overprintDetails = document.getElementById("overprintDetails").value;
  const sleeveExtraNotes = document.getElementById("sleeveExtraNotes").value;

  // Packaging Details
  const individualBox = document.querySelector(
    'input[name="individualBox"]:checked'
  ).value;
  const individualCardboardSleeve = document.querySelector(
    'input[name="individualCardboardSleeve"]:checked'
  ).value;
  const packagingCutterGuide = document.getElementById(
    "packagingCutterGuide"
  ).value;
  const packagingPrintInformation = document.getElementById(
    "packagingPrintInformation"
  ).value;
  const packagingPaperStock = document.getElementById(
    "packagingPaperStock"
  ).value;
  const packagingArtwork = document.getElementById("packagingArtwork").value;
  const packagingColour = document.getElementById("packagingColour").value;
  const packagingOuterCartonMarkings = document.getElementById(
    "packagingOuterCartonMarkings"
  ).value;
  const packagingBarcode = document.getElementById("packagingBarcode").value;
  const packagingExtraNotes = document.getElementById(
    "packagingExtraNotes"
  ).value;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add content to the saved PDF

  //Project Details
  doc.text(`Date of Brief: ${date}`, 10, 10);
  doc.text(`Customer Name: ${name}`, 10, 20);
  // doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Factory: ${factory}`, 10, 30);
  doc.text(`Project Name: ${projectName}`, 10, 40);
  doc.text(`Job Number: ${jobNumber}`, 10, 50);
  doc.text(`New or Repeat: ${radio}`, 10, 60);
  doc.text(`Product Code: ${productCode}`, 10, 70);
  doc.text(`Sample Required: ${sampleRequiredDate}`, 10, 80);

  // Cup Details
  doc.text(`Cup Size: ${cupSize}`, 10, 90);
  doc.text(`Cup Base Colour: ${cupBaseColour}`, 10, 100);
  doc.text(`Cup Decoration: ${cupDecoration}`, 10, 110);
  doc.text(`Cup Artwork: ${cupArtwork}`, 10, 120);
  doc.text(`Cup Mould Base: ${cupMouldBase}`, 10, 130);
  doc.text(`Cup Extra Notes: ${cupExtraNotes}`, 10, 140);

  // Lid Details
  doc.text(`Lid Size: ${lidSize}`, 10, 150);
  doc.text(`Lid Base Colour: ${lidBaseColour}`, 10, 160);
  doc.text(`Lid Mould: ${lidMould}`, 10, 170);
  doc.text(`Lid Artwork: ${lidArtwork}`, 10, 180);
  doc.text(`Lid Extra Notes: ${lidExtraNotes}`, 10, 190);

  // Sleeve Details
  doc.text(`Sleeve Size: ${sleeveSize}`, 10, 200);
  doc.text(`Sleeve Base Colour: ${sleeveBaseColour}`, 10, 210);
  doc.text(`Sleeve Artwork: ${sleeveArtwork}`, 10, 220);
  doc.text(`Sleeve Mould: ${sleeveMould}`, 10, 230);
  doc.text(`Embossing: ${embossing}`, 10, 240);
  doc.text(`Overprint: ${overprint}`, 10, 250);
  doc.text(`Overprint Details: ${overprintDetails}`, 10, 260);
  doc.text(`Sleeve Extra Notes: ${sleeveExtraNotes}`, 10, 270);

  // Packaging Details
  doc.text(`Individual Box: ${individualBox}`, 10, 280);
  doc.text(
    `Individual Cardboard Sleeve: ${individualCardboardSleeve}`,
    10,
    290
  );
  doc.text(`Packaging Cutter Guide: ${packagingCutterGuide}`, 10, 300);
  doc.text(
    `Packaging Print Information: ${packagingPrintInformation}`,
    10,
    310
  );
  doc.text(`Packaging Paper Stock: ${packagingPaperStock}`, 10, 320);
  doc.text(`Packaging Artwork: ${packagingArtwork}`, 10, 330);
  doc.text(`Packaging Colour: ${packagingColour}`, 10, 340);
  doc.text(
    `Packaging Outer Carton Markings: ${packagingOuterCartonMarkings}`,
    10,
    350
  );
  doc.text(`Packaging Barcode: ${packagingBarcode}`, 10, 360);
  doc.text(`Packaging Extra Notes: ${packagingExtraNotes}`, 10, 370);

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
document.getElementById("date").value = formattedDate1;

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
