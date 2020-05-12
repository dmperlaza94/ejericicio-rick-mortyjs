const cuerpoTabla = document.getElementById('cuerpoTabla');

cuerpoTabla.innerHTML = "";
for (let i = 1; i <= 20; i++) {
    cuerpoTabla.innerHTML += `
        <tr>
            <td>Situacion #${i}</td>
            <td>
                <select class="tipoTrauma" name="tipoTrauma">
                    <option value="">Seleccione</option>
                    <option value="P">P</option>
                    <option value="T">T</option>
                    <option value="F">F</option>
                </select>
            </td>
            <td>
                <input class="calificaionTrauma" type="number" name="calificaionTrauma" min="1" max="10">
            </td>
        </tr>
        `
}

const inputsTiposTraumas = [...document.querySelectorAll(".tipoTrauma")];
const inputsCalificacionesTraumas = [...document.querySelectorAll(".calificaionTrauma")];
const botonEnviar = document.getElementById("botonEnviar");

const filtrarArray = (array, dato) => array.filter((valor) => valor == dato);

const imprimirValor = (IdElement, dato) => {
    document.getElementById(IdElement).innerText = dato;
}

botonEnviar.addEventListener('click', () => {

    let hayCamposVacios = false;

    inputsTiposTraumas.forEach((input) => {
        if (input.value == "") {
            hayCamposVacios = true;
        }
    })

    inputsCalificacionesTraumas.forEach((input) => {
        if (input.value == "") {
            hayCamposVacios = true;
        }
    })

    if (hayCamposVacios) {
        alert("Hay tipos de Trauma o calificaciones sin seleccionar");
    } else {
        imprimirCantidadesTraumas(inputsTiposTraumas);
        imprimirCalificacionesTraumas();
    }

});

const imprimirCantidadesTraumas = (inputsTiposTraumas) => {
    let tiposTraumasValores = inputsTiposTraumas.map((input) => input.value)

    let cantidadRepetidosP = filtrarArray(tiposTraumasValores, 'P').length;
    imprimirValor("cantidadP", cantidadRepetidosP);

    let cantidadRepetidosT = filtrarArray(tiposTraumasValores, 'T').length;
    imprimirValor("cantidadT", cantidadRepetidosT);

    let cantidadRepetidosF = filtrarArray(tiposTraumasValores, 'F').length;
    imprimirValor("cantidadF", cantidadRepetidosF);
}


const imprimirCalificacionesTraumas = () => {
    const calificacionesTraumasP = new Array()
    const calificacionesTraumasT = new Array();
    const calificacionesTraumasF = new Array();

    inputsCalificacionesTraumas.forEach((calificaion, index) => {

        switch (inputsTiposTraumas[index].value) {
            case 'P':
                calificacionesTraumasP.push(parseInt(calificaion.value));
                break;

            case 'T':
                calificacionesTraumasT.push(parseInt(calificaion.value));
                break;

            case 'F':
                calificacionesTraumasF.push(parseInt(calificaion.value));
                break;

            default:
                console.error("Tipo de trauma no valido para calificar");
                break;
        }
    });

    let promedioP = getPromedioCalificaciones(calificacionesTraumasP);
    let promedioT = getPromedioCalificaciones(calificacionesTraumasT);
    let promedioF = getPromedioCalificaciones(calificacionesTraumasF);
    imprimirPromedios(promedioP, promedioT, promedioF);
}

const getPromedioCalificaciones = (calificaciones) => {
    console.log(calificaciones)
    if (calificaciones.length == 0) {
        return 0
    }
    let total = calificaciones.reduce((accumulador, currentValue) => accumulador + currentValue);
    let promedio = total / calificaciones.length;
    return promedio;
}

const imprimirPromedios = (promedioP, promedioT, promedioF) => {
    imprimirValor("tdPromedioP", promedioP);
    imprimirValor("tdPromedioT", promedioT);
    imprimirValor("tdPromedioF", promedioF);

    if (promedioT > 7 || promedioF > 7) {
        alert('Promedio para situacio T o F superado. Merece maximo castigo');
    }
    else {
        alert('Promedio para situacio T o F no superado. Se ha salvado');
    }
}