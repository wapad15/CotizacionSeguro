//constructor  para seguro
class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }
  // metodo que sirve para cotizar el seguro
  cotizarSeguro() {
    /*
    1 = americano 1.15
    2 = asiatico 1.05
    3 = europeo 1.35
 */
    // creamos un switch   pque dependiendo la marca asi asume la cantidad o dinero a pagar por seguro
    let cantidad;
    const base = 400000;

    switch (this.marca) {
      case "1":
        cantidad = base * 1.15;
        break;
      case "2":
        cantidad = base * 1.05;
        break;
      case "3":
        cantidad = base * 1.35;
        break;
    }

    //leer el año  y la diferencia de años entre la fecha actual y año seleccionado
    const diferencia = new Date().getFullYear() - this.anio;
    //cada año de diferecia hay que reducir el 3% el calor del seguro
    cantidad -= (diferencia * 3 * cantidad) / 100;

    /*
      ----tipo de  seguro
      basico = 30% mas
      completo = 50% mas
   */
    // condicional que calcula el tipo y si es basico le sube el 30% a la cantidad y si es completo se sube el 50%
    if (this.tipo === "basico") {
      cantidad *= 1.3;
    } else {
      cantidad *= 1.5;
    }
    return cantidad;
  }
}

//funcion que se encarga del htm (gif ,imagenes etc) es decir interfaz de usuario, todo lo que se muestra
class Interfaz {
  // mensaje que se  imprime en el HTML
  mostrarMensaje(mensaje, tipo) {
    //creamos un div para agregar al html
    const div = document.createElement("div");
    //entra  al condicional si el tipo es error
    if (tipo === "error") {
      div.classList.add("mensaje", "error");
    } else {
      div.classList.add("mensaje", "correcto");
    }
    //agregamos el mensaje pasado por parametro al div
    div.innerHTML = `${mensaje}`;
    //insertamos el div al htm antes de donde encuentre la clase from-group
    formulario.insertBefore(div, document.querySelector(".form-group"));
    // pasados 2,5 segudos borramos el mensaje del htm
    setTimeout(function() {
      document.querySelector(".mensaje").remove();
    }, 2500);
  }

  //muestra el resultado de la cotizacion en la interfaz
  mostrarResultado(seguro, total) {
    const resultado = document.getElementById("resultado");
    let marca;
    switch (seguro.marca) {
      case "1":
        marca = "Americano";
        break;
      case "2":
        marca = "Asiatico";
        break;
      case "3":
        marca = "Europeo";
        break;
    }
    //creamos un div
    const div = document.createElement("div");
    //agregamos la informacion
    div.innerHTML = `
      <p class =' header' >Resumen de Cotizacion</p>
      <p>Marca: ${marca}</p>
      <p>Año: ${seguro.anio}</p>
      <p>Tipo: ${seguro.tipo}</p>
      <p>Total: ${total}</p>
  `;
    //creamos una variable tipo spiner y la activamos
    const spinner = document.querySelector("#cargando img");
    spinner.style.display = "block";

    // despes de 3 segunto desactivamos el spiner y agregams en div  al resultado
    setTimeout(function() {
      spinner.style.display = "none";
      resultado.appendChild(div);
    }, 3000);
  }
}

//event lisenert
const formulario = document.getElementById("cotizar-seguro");
formulario.addEventListener("submit", function(e) {
  e.preventDefault();
  // leer la marca seleccionada del selec
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  // leer el año seleccionado del <select>
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  // leer el  valor del radio buton  para saber el tipo de seguro
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //crear instancia de interfaz
  const interfaz = new Interfaz();

  // revisamos que los campos no esten vacios
  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    // interfaz imprimiendo un error
    interfaz.mostrarMensaje("DIGITE TODOS LOS DATOS", "error");
  } else {
    //limpiar resultados anteriores
    const resultados = document.querySelector("#resultado div");
    if (resultados != null) {
      resultados.remove();
    }
    // instanciamos seguro y  mostrar interfaz
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    // cotizar el seguro
    const cantidad = seguro.cotizarSeguro();

    //mostrar el resultado de la cotizacion
    interfaz.mostrarResultado(seguro, cantidad);
    interfaz.mostrarMensaje("COTIZANDO...", "correcto");
  }
});

// creamos una variable años maximo para obtener el año actual y creamos una minima donde restamos 20 años para tener el  año mas bajo que se acepta de autos (20 años atras)
const max = new Date().getFullYear();
const min = max - 20;
const selectAnios = document.getElementById("anio");
//creamos un for para imprimir en el imput de años los "20 años que pueden ser elegidos"
for (let i = max; i > min; i--) {
  let opcion = document.createElement("option");
  // agregamos el valor del option
  opcion.value = i;
  //agregamos el texto del htm que sera el mismo de valor
  opcion.innerHTML = i;
  //agregamos un hijo a anios  y estehijo dera la opcion antes construida
  selectAnios.appendChild(opcion);
}
