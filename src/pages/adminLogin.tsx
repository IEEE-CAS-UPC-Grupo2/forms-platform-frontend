import React from 'react';
import AdminHeader from '../components/adminHeader';
import FooterCAS from '../components/footerCAS';

const adminLogin: React.FC = () => {
    return (
        <div className="flex flex-col h-screen ">

            <AdminHeader/>

            <main className="flex flex-1 justify-center items-center bg-white">
                
                <form className="px-40 pb-20 pt-5 mb-20 shadow-md rounded-lg bg-gray-200" style={{ fontFamily: 'Avenir, sans-serif' }}>

                    <div className='my-8'>
                        <h1 className="text-3xl font-bold text-center text-gray-900" style={{ fontWeight: 750 }} >Login de Administrador</h1>
                    </div>

                    <div className="mt-10">

                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electronico
                        </label>

                        <div className="mt-1">
                            <input type="email" id="email" name="email"
                            className="border-black shadow-sm block w-full sm:text-sm  h-12 rounded-md text-gray-800 px-3"
                            required
                            />
                        </div>
                    </div>

                    <div className="my-10">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div className="mt-1">
                            <input type="password" id="password" name="password"
                            className="shadow-sm block w-full sm:text-sm border-black h-12 rounded-md text-gray-800 px-3"
                            required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#155544] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Ingresar
                        </button>
                    </div>

                </form>
            </main>

            <FooterCAS />

        </div>
    );
};

export default adminLogin;