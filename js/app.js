const maxYear = new Date().getFullYear();
const minYear = maxYear - 20;
const select = document.getElementById('anio');
const forms = document.getElementById('cotizar-seguro');

class Insurance {
    constructor(brand, year, type) {
        this.brand = brand;
        this.year = year;
        this.type = type;
    }

    quoteInsure() {
        const base = 2000;
        let cant = 0;

        switch (this.brand) {
            case '1':
                cant = base * 1.15;
                break;
            case '2':
                cant = base * 1.05;
                break;
            case '3':
                cant = base * 1.35;
                break;
            default:
                cant = base;
                break;
        }

        const differenceInYears = maxYear - this.year;
        cant -= (differenceInYears * 0.03) * cant;

        if (this.type === 'basico')
            cant *= 1.30;
        else
            cant *= 1.50;

        return cant;
    }
}


class UserInterface {

    showError(message, type) {
        const div = document.createElement('div');
        if (type === 'error')
            div.classList.add('mensaje', 'error');
        else
            div.classList.add('mensaje', 'correcto');

        div.textContent = message;
        forms.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(() => div.style.display = 'none', 3000);
    }

    showResult(insurance, cant) {
        const result = document.getElementById('resultado');
        let brand = null;

        switch (insurance.brand) {
            case '1':
                brand = 'Americano';
                break;

            case '2':
                brand = 'Asiatico';
                break;

            case '3':
                brand = 'Europeo';
                break;
        }

        const div = document.createElement('div');
        div.innerHTML = `
            <p> <strong> Tu Resumen: </strong> </p>
            <p> <strong> Marca </strong>: ${ brand } </p>
            <p> <strong> Año </strong>: ${ insurance.year } </p>
            <p> <strong> Tipo </strong>: ${ insurance.type } </p>
            <p> <strong> Total </strong>: $${ cant } </p>
            `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(() => {
            spinner.style.display = 'none';
            result.appendChild(div);
        }, 3000);
    }
}

const userInterface = new UserInterface();

function send() {
    forms.addEventListener('submit', e => {
        const brand = document.getElementById('marca').value;
        const year = document.getElementById('anio').value;
        const type = document.querySelector('input[name="tipo"]:checked').value;

        if (brand === '')
            userInterface.showError('Verifique que no existan campos vacios', 'error');
        else {
            const insurance = new Insurance(brand, year, type);
            const cant = insurance.quoteInsure();
            userInterface.showResult(insurance, cant);
            userInterface.showError('Cargando', 'correcto');
        }
        e.preventDefault();
        forms.reset();
    });
}

function loadRangeYear() {
    for (let year = maxYear; year >= minYear; year--) {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    }
}

function main() {
    loadRangeYear();
    send();
}

main();