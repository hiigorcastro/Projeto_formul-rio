// Formatação de telefone  
function formatarTelefone(input) {  
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos  

    // Formatação adequada para números com base no comprimento  
    if (value.length > 10) {  
        // Formato para 11 dígitos  
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');  
    } else if (value.length >= 10) {  
        // Formato para 10 dígitos  
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');  
    }  

    input.value = value;  
}  

// Formatação de CPF
function formatarCPF(input) {  
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos  
    if (value.length > 11) {  
        value = value.substring(0, 11); // Limita o CPF a 11 dígitos  
    }  
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto  
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto  
    value = value.replace(/(\d{2})$/, '-$1'); // Adiciona o hífen  
    input.value = value;  
}  

// Formatação de CNPJ 
function formatarCNPJ(input) {  
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos  
    if (value.length > 14) {  
        value = value.substring(0, 14); // Limita o CNPJ a 14 dígitos  
    }  
    value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona o primeiro ponto  
    value = value.replace(/^(\d{2})\.(\d{3})(\d{1})/, '$1.$2/$3'); // Adiciona a barra  
    value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona o hífen  
    input.value = value;  
}  

// Formatação do CEP e preenchimento de endereço  
document.getElementById('cep').addEventListener('blur', function() {  
    let cep = this.value.replace(/\D/g, '');  
    if (cep != "") {  
        let validacep = /^[0-9]{8}$/;  
        if (validacep.test(cep)) {  
            fetch(`https://viacep.com.br/ws/${cep}/json/`)  
                .then(response => response.json())  
                .then(data => {  
                    if (!("erro" in data)) {  
                        document.getElementById('endereco').value = data.logradouro;  
                        document.getElementById('bairro').value = data.bairro;  
                        document.getElementById('cidade').value = data.localidade;  
                        document.getElementById('estado').value = data.uf;  
                    } else {  
                        alert("CEP não encontrado.");  
                    }  
                });  
        } else {  
            alert("Formato de CEP inválido.");  
        }  
    }  
});  

// Alterar placeholder de documento e formatá-lo  
document.getElementById('documentoComercial').addEventListener('change', function() {  
    let documento = document.getElementById('documento');  
    if (this.value === 'cpf') {  
        documento.placeholder = 'xxx.xxx.xxx-xx';  
        documento.value = ''; // Limpa o campo ao mudar o tipo   
    } else if (this.value === 'cnpj') {  
        documento.placeholder = 'xx.xxx.xxx/xxxx-xx';  
        documento.value = ''; // Limpa o campo ao mudar o tipo   
    } else {  
        documento.placeholder = '';  
        documento.value = ''; // Limpa o campo ao mudar o tipo  
    }  
});  

// Formatação do documento  
document.getElementById('documento').addEventListener('input', function() {  
    const tipoDocumento = document.getElementById('documentoComercial').value;  
    if (tipoDocumento === 'cpf') {  
        formatarCPF(this);  
    } else if (tipoDocumento === 'cnpj') {  
        formatarCNPJ(this);  
    }  
});  

// Validação ao enviar o formulário  
document.getElementById('cadastroForm').addEventListener('submit', function(event) {  
    let horarioInicial = document.getElementById('horarioInicial').value;  
    let horarioFinal = document.getElementById('horarioFinal').value;  

    // Validação dos horários  
    if (horarioInicial < "06:00" || horarioInicial > "18:00" || horarioFinal < "06:00" || horarioFinal > "18:00" || horarioFinal <= horarioInicial) {  
        alert("Os horários de recebimento devem ser entre 06:00 e 18:00 e o horário final não pode ser menor que o horário inicial.");  
        event.preventDefault();  
    }  

    // Chama a função de validação do formulário  
    if (!validateForm()) {  
        event.preventDefault(); // impede o envio do formulário se a validação falhar  
    }  
});  

// Função de validação do formulário  
function validateForm() {  
    // Validação do nome do comprador  
    const nomeResponsavel = document.getElementById('nomeResponsavel');  
    const nomeRegex = /^[A-Za-z\s]+$/;  
    if (!nomeRegex.test(nomeResponsavel.value)) {  
        alert('O nome do responsável deve conter apenas letras.');  
        return false;  
    }  

    // Validação do documento (CPF ou CNPJ)  
    const documento = document.getElementById('documento');  
    const documentoComercial = document.getElementById('documentoComercial').value;  

    // Removendo validação de formato específico do telefone  
    return true; // Para ter certeza de que a validação do formulário passa  
}