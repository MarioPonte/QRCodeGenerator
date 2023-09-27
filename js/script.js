const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if(url === ""){
        alert("Introduza um URL");
    }else{
        showSpinner();

        setTimeout( () => {
            hideSpinner();
            generateQRCode(url, size);

            setTimeout( () => {
                const saveUrl = qr.querySelector("img").src;
                qr.querySelector("img").classList.add("qrImg");
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }

}

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
}

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
}

const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
}

hideSpinner();

const clearUI = () => {
    qr.innerHTML = "";
    const saveLink = document.getElementById("save-link");
    if(saveLink) saveLink.remove();
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = "save-link";
    link.href = saveUrl;
    link.download = "qrcode";
    link.innerHTML = "Salvar Imagem";
    document.getElementById("saveQRCode").appendChild(link);
}

form.addEventListener("submit", onGenerateSubmit);