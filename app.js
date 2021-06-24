require('colors');
const { guardarDB, leerDB } = require('./helpers/fs');
const {inquirerMenu, pausa, leerInput,listadoTareasBorrar, confirmar,mostrarListadoChecklist}= require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main =async ()=>{
    console.log('Hola Mundo');

    let opt='';
    const tareas=new Tareas;
    const tareasDB=leerDB();

    if(tareasDB){///cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    

    do {
        opt= await inquirerMenu();
        
        switch(opt){
            case '1':
                const desc=await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids=await mostrarListadoChecklist(tareas.listadoArray);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id=await listadoTareasBorrar(tareas.listadoArray);                
                if(id!=='0'){
                    console.log('pasa igual');
                    const borrarOk=await confirmar('¿Esta seguro?');
                    if (borrarOk){
                            tareas.borrarTarea(id);
                            console.log('Tarea borrada');
                    }
                }
            break;
        };
               
        guardarDB(tareas.listadoArray);

        await pausa();

    } while( opt !== '0' );

}

main();