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
    else{
        document.getElementById("velgFilm").value="";
        document.getElementById("antall").value="";
        document.getElementById("fornavn").value="";
        document.getElementById("etternavn").value="";
        document.getElementById("telefonNr").value="";
        document.getElementById("epost").value="";
        $.post("/lagre", kunde, function(){
            hentAlle();
        });
        feilmelding();
    }
}
function hentAlle(){
    $.get()"/hentAlle",function (data){
        henteData(data);
    });

function henteData(alleKunder) {
    let ut = "<table class='table table-striped table-bordered'>";
    ut += "<tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>TelefonNr</th><th>Epost</th>" + "</tr>";
    for (let kunde of alleKunder) {
        ut += "<tr><td>" + kunde.film + "</td><td>" + kunde.antall + "</td><td>" + kunde.fornavn + "</td><td>" + kunde.etternavn + "</td><td>" + kunde.telefonNr + "</td><td>" + kunde.epost + "</td>"
        ut += "</tr>";
    }
    ut += "</table";
    $("#dineBiletter").html(ut);
}
}
function nullstill(){
    $get("/nullstill",function (){
        $("#dineBilletter").html("")
    });
    feilmelding();
}
