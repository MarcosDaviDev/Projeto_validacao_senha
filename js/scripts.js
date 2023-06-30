class Validator{

    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            
        ]
    }

    //iniciar a validação de todos os campos
    validate(form){

        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .erro-validation');

        if(currentValidations.length){
            this.cleanValidations(currentValidations);
        }

        // pegar todos inputs
         let inputs = form.getElementsByTagName('input');

        // HTML Collection -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que foi encontrado
        inputsArray.forEach(function(input){

            //loop em todas as validações existentes
            for(let i=0; this.validations.length > i; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) !=null){
                    
                    // limpando a string para virar um método
                    let method = this.validations[i].replace('data-','').replace('-','');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input,value);
             }
            }
        }, this);
    }

    //verifica se o input possui todos os caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;

        let errorMensage= `O campo precisa ter mais que ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMensage);
        }

    }

    //verifica se o input passou do limite máximo de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMensage= `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMensage);
        }
    }

    //método que imprime mensagens de erros na tela
    printMessage(input, msg){

        //verifica a quantidade de erros
        let errorsQty = input.parentNode.querySelector('.erro-validation');

       if(errorsQty === null){
            let template = document.querySelector('.erro-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
       }

    }

    //verifica se o input é requerido
    required(input){

        let inputValue = input.value;

        if(inputValue === ''){
            let errorMensage = `Esse campo é obrigatório`;

            this.printMessage(input, errorMensage);
        }

    }

    //limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}


let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento que dispara as validações
submit.addEventListener('click', function(e){

    e.preventDefault();

    validator.validate(form);
});
