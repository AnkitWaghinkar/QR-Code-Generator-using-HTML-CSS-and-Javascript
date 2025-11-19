const enterText = document.getElementById("enterText");
const qrSize = document.getElementById("qrSize");
const qrContainer = document.querySelector(".qrBody");
const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");


let size = parseInt(qrSize.value);

// disable download until QR is generated
downloadBtn.disabled = true;

generateBtn.addEventListener("click", () => {
    isInputEmpty();
});

downloadBtn.addEventListener('click', (e) => {
    if (downloadBtn.disabled) {
        e.preventDefault();
        alert("Enter text or URL to generate your QR Code");
    }
});

qrSize.addEventListener("change", (e) => {
    size = e.target.value;
    isInputEmpty();
});

function isInputEmpty(){
    if(enterText.value.length > 0){
        generateQRCode();
    }  
        else{
            alert("Enter text or URL to generate your QR Code");
        }
};

function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:enterText.value,
        height:size,
        width:size,
        colorLight: "#f0fcff",
        colorDark: "#000000"
    });

    // wait for QRCode.js to render
    setTimeout(() => {
        const img = qrContainer.querySelector("img");
        const canvas = qrContainer.querySelector("canvas");

        if (img && img.src) {
            downloadBtn.href = img.src;
        } else if (canvas) {
            downloadBtn.href = canvas.toDataURL("image/png");
        }

        downloadBtn.download = "QR_Code.png";
        downloadBtn.disabled = false; // enable after QR ready
    }, 300);
};