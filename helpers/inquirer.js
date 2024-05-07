import inquirer from "inquirer";
import 'colors'


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.blue} Historial`
            },
            {
                value: 0,
                name: `${'0.'.blue} Salir`
            }
        ]
    }
]


const inquirerMenu = async() => {
    console.log('============================='.blue);
    console.log('    Seleccione una opción'.white    )
    console.log('=============================\n'.blue)

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion
}


const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }

    ];

    console.log('\n')
    await inquirer.prompt(question);
}


const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc
}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map( (lugar, index) => {
        
    const idx = `${index + 1}.`.blue;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({ 
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas)
    return id
}


const confirmar = async (message) => {
    const question= [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}



const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map( (tarea, index) => {
        
        const idx = `${index + 1}.`.blue;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
        })


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones ',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt(pregunta)
    return ids
}



export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}