function feilmelding(){
    $('err0').html("")
    $('err1').html("")
    $('err2').html("")
    $('err3').html("")
    $('err4').html("")
    $('err5').html("")
}

function kjop(){
    const kunde={
        film: $("#selectFilm").val(),
        antall: $("#inputAntall").val(),
        fornavn: $("#inputFornavn").val(),
        etternavn: $("#inputEtternavn").val(),
        telefonNr: $("#inputTelefonNr").val(),
        epost: $("#inputEpost").val(),
    };
    if (kunde.film===""||kunde.antall===""||kunde.fornavn===""||kunde.etternavn===""||kunde.telefonNr===""||kunde.epost===""){
        if (kunde.film===""){
            document.getElementById("err0").innerHTML="Du er nødt til å velge en film";
        }
        if (kunde.antall===""){
            document.getElementById("err1").innerHTML="Velg antall";
        }
        if (kunde.fornavn===""){
            document.getElementById("err2").innerHTML="Fyll inn fornavn";
        }
        if (kunde.etternavn===""){
            document.getElementById("err3").innerHTML="Fyll inn etternavn";
        }
        if (kunde.telefonNr===""){
            document.getElementById("err4").innerHTML="Fyll inn telefonNr";
        }
        if (kunde.epost===""){
            document.getElementById("err5").innerHTML="Fyll inn epost";
        }
    }
    else
}
$(document).ready(function (){
    let showTable=$("#showTable"); //?
});

function addBestilling() {
    let film = $("#selectFilm");
    let antall = $("#inputAntall");
    let fornavn = $("#inputFornavn");
    let etternavn = $("#inputEtternavn");
    let telefonNr = $("#inputTelefonNr");
    let epost = $("#inputEpost");
    let Billett = {};
    let errors = 0;
    let ut = "";

    function validateAndAdd(BillettInput, variabel) {
        validate(BillettInput);
        Billett[variabel] = BillettInput.val();
    }

    function validate(BillettInput) {
        if (BillettInput.val() === "Default" ||
            BillettInput.val() === "" ||
            BillettInput.val() === null ||
            BillettInput.val() === 0) {
            errors++;
            BillettInput.next().css("display: inline");
        }
    }

    //unødvendig?
    try {
        errors = 0;
        validateAndAdd(film, "film");
        validateAndAdd(antall, "antall");
        validateAndAdd(fornavn, "fornavn");
        validateAndAdd(etternavn, "etternavn");
        validateAndAdd(telefonNr, "telefonNr");
        validateAndAdd(epost, "epost");
        if (errors !== 0) {
            throw new Error("Mangler felter");
        }
    } catch (error) {
        console.error(error);
        return;
    }
    ut += "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>TelefonNr</th><th>Epost</th></tr>";
    ut += "<tr><td>" + film + "</td><td>" + antall + "</td><td>" + fornavn + "</td><td>" + etternavn + "</td><td>" + telefonNr + "</td><td>" + epost + "</td></tr>";
    ut += "</table>";

    $.ajax({
        url: "/setBillett",
        type: "POST",
        data: JSON.stringify(Billett),
        contentType: "application/json; charset=utf.8",
        complete: function () {
            updateBestilling();
            $("#selectFilm, #inputAntall, #inputFornavn, #inputEtternavn, #inputTelefonNr, #inputEpost").val("");
           /* const resetValue = function (BillettInput) {
                BillettInput.val("");
            }
            resetValue(film);
            resetValue(antall);
            resetValue(fornavn);
            resetValue(etternavn);
            resetValue(telefonNr);
            resetValue(epost);*/
        }
    });
    $("#output").html(ut);

    $.get("/addBestillinger", function () {
    }).done(function () {
        updateBestilling()
    })
}

function slettBestillinger(){
    $.get("/slettBilletter", function (){
    }).done(function (){
        updateBestilling()
    })
}
function updateBestilling(){
    let arrayEmpty;
    $.get("/sjekkBilletterTom", function(bool){
        arrayEmpty=bool;
    }).done(function (){
        if (arrayEmpty){
            $("#showTable").addClass("d-none");
        }
        else{
            let BillettListe;
            $.get("/fåAlleBilletter", function (data){
                BillettListe=data;
            }).done(function(){
                const tableStart= `
                <table class="table w-auto ">
                <thead>
                <tr>
                <th scope="col">Film </th>
                <th scope="col">Antall</th>
                <th scope="col">Fornavn</th>
                <th scope="col">Etternavn</th>
                <th scope="col">TelefonNr</th>
                <th scope="col">Epost</th>
                </tr>
                </thead>
                <tbody>`;

                let tableMiddle="";
                const tableEnd="</tbody></table>";
                for (let i = 0; i <BillettListe.length ; i++) {
                    tableMiddle+=`
                    <tr>
                    <td> ${BillettListe[i].film} </td>
                    <td> ${BillettListe[i].antall} </td>
                    <td> ${BillettListe[i].fornavn} </td>
                    <td> ${BillettListe[i].etternavn} </td>
                    <td> ${BillettListe[i].telefonNr} </td>
                    <td> ${BillettListe[i].epost} </td>
                    </tr>`;
                }
                let tableFull=tableStart+tableMiddle+tableEnd;
                $("#alleBilletter").html(tableFull);
            })
        }
    })
}