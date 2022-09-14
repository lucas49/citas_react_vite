import React from 'react'
import { useState, useEffect } from 'react' 
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    // Aviso que falta un campo
    const [error, setError] = useState(false)


    useEffect(()=> {
       if   (Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        } 
    }, [paciente])

  

    

    // Generar un KEY ID 
     const generarId = () =>{
       const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36)

       return random + fecha;
    
     }

    const handleSubmit = (e) => {
        e.preventDefault();

// Validacion de formulario.
        if ([nombre, propietario,email,fecha,sintomas].includes('')){
            console.log('Hay al menos un campo vacio')

            setError(true)
            return;
        }

        setError(false)


        //Objeto de Pacientes nuevo
        const objetoPaciente = {
            nombre, 
            propietario,
            email,
            fecha,
            sintomas
        }

            if(paciente.id){
                //Editanto el registro
                objetoPaciente.id = paciente.id
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

                setPacientes(pacientesActualizado)
                setPaciente({})
           
        
            }else {
                // Nuevo registro
                objetoPaciente.id = generarId();
                setPacientes([...pacientes, objetoPaciente])
            }

        // console.log(objetoPaciente)
        // Se toma una copia de lo que ya existe en el arreglo (setPacientes)
        // Usamos el spread operation,  (xqe es inmutable) se toma una copia de (...pacientes) y le pasamos objetoPcientes, arreglo nuevo.
        //  setPacientes([...pacientes, objetoPaciente])

        // Reiniciar el Formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        
    }



  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form  
                    onSubmit={handleSubmit}
                    className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
                    
                >
                    {error && <Error mensaje='Todos los campos son obligatorio'/>}

                      {/* Otra forma de pasar prop :children || Sirve para crear tus propias hooks */}
                     {/* {error && <Error><p>Todos los campos son obligatorios</p></Error>  */}
                        
                    
            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="mascota">
                    Nombre Mascota
                </label>

                <input 
                id='mascota'
                type="text" 
                placeholder='Nombre de la mascota'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={nombre}
                onChange= {(e)=> setNombre(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="propietario">
                    Nombre Propetario
                </label>

                <input 
                id='propietario'
                type="text" 
                placeholder='Nombre del propetario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={propietario}
                onChange= {(e)=> setPropietario(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="email">
                    Email
                </label>

                <input 
                id='email'
                type="email" 
                placeholder='Email del propetario'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange= {(e)=> setEmail(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="alta">
                    Alta
                </label>

                <input 
                id='alta'
                type="date" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={fecha}
                onChange= {(e)=> setFecha(e.target.value)}
                />
             </div>

            <div className='mb-5'>
                <label className='block text-gray-700 uppercase font-bold' htmlFor="sintomas">
                    Sintomas
                </label>

              <textarea 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id="sintomas" 
                placeholder='Descibe los sintomas'
                value={sintomas}
                onChange= {(e)=> setSintomas(e.target.value)}
                ></textarea>
            
            </div>

            <input 
            type="submit"
            className='bg-indigo-600 w-full p-3 text-white  uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all' 
            value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />



        </form>

    </div>
  )
}

export default Formulario