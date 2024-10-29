"use server";

import Usuario from "@/componentes/bd/entities/Usuario";
import {
  alterarUsuarioDB,
  getUsuarioPorEmailDB,
} from "@/componentes/bd/usecases/usuarioUseCases";
import FormularioUsuario from "@/componentes/comuns/FormularioUsuario";

const User = () => {
  const salvarUsuario = async (formData) => {
    "use server";
    const objeto = {
      id: formData.id,
      email: formData.email,
      senha: formData.senha,
      tipo: formData.tipo,
      telefone: formData.telefone,
      nome: formData.nome,
    };

    try {
      await alterarUsuarioDB(objeto);
    } catch (err) {
      throw new Error("Erro: " + err);
    }
  };

  const getUsuario = async (email) => {
    "use server";
    email = email.email;

    try {
      const usuario = await getUsuarioPorEmailDB({
        email,
      });

      return {
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
        telefone: usuario.telefone,
        nome: usuario.nome,
      };
    } catch (err) {
      throw new Error("Erro: " + err);
    }
  };

  return <FormularioUsuario onSave={salvarUsuario} getUsuario={getUsuario} />;
};

export default User;
