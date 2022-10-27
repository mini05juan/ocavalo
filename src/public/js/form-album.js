const pegaValue = [document.querySelector("#inputName")
   , document.querySelector("#inputEmail")
   , document.querySelector("#inputTelefone")
   , document.querySelector("#inputCPF")
   , document.querySelector("#inputMsg")]


const errors = [document.querySelector("#msgError1"), document.querySelector("#msgError2")
   , document.querySelector("#msgError3")
   , document.querySelector("#msgError4")
   , document.querySelector("#msgError5")]


document.querySelector("#submit-button").addEventListener('click',  (e) => {
   e.preventDefault();
   for (let index = 0; index < pegaValue.length; index++) {
      const element = pegaValue[index].value;

      if (element.trim() == "") {

         errors[index].innerHTML = errors[index].className
         errors[index].style.color = "red"

      }

   }
})
