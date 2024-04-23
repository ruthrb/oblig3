$(document).ready(function (){
    let showTable=$("#showTable");
});

function addBestilling(){
    let film=$("#selectFilm");
    let antall=$("#inputAntall");
    let fornavn=$("#inputFornavn");
    let etternavn=$("#inputEtternavn");
    let telefonNr=$("#inputTelefonNr");
    let epost=$("#inputEpost");
    let Billett={};
    let errors;

    function validateAndAdd(BillettInput){
        validate(BillettInput);
        Billett[navn]=BillettInput.val();
    }
    function validate(BillettInput){
        if (BillettInput.val()==="Default"||
        BillettInput.val()===""||
        BillettInput.val()===null ||
        BillettInput.val()===0){
            errors++;
            BillettInput.next().css("display:inLine");
        }
    }
    try{
        errors=0;
        validateAndAdd(film,"film");
        validateAndAdd(antall,"antall");
        validateAndAdd(fornavn,"fornavn");
        validateAndAdd(etternavn,"etternavn");
        validateAndAdd(telefonNr,"telefonNr");
        validateAndAdd(epost,"epost");
        if (errors!==0){
            return new Error("Mangler felter");
        }
    } catch (error){
        console.error(error);
        return;
    }
    $.ajax({
        url: "/setBillett",
        type: "POST",
        data: JSON.stringify(Billett),
        contentType: "application/json; charset=utf.8",
        complete: function (){
            updateBestilling();
            const resetValue= function (BillettInput){
                BillettInput.val("");
            }
            resetValue(film);
            resetValue(antall);
            resetValue(fornavn);
            resetValue(etternavn);
            resetValue(telefonNr);
            resetValue(epost);
        }
        })
}
function slettBestillinger(){
    $.get("/slettBilletter", function (data){
        console.log(data)
    }).done(function (){
        oppdaterBestilling()
    })
}
function oppdaterBestilling(){
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