import axios from "axios";

export async function validateCep(cep) {
  try {
    const { data } = await axios.get(
      `https://brasilapi.com.br/api/cep/v1/${cep}`
    );

    return data;
  } catch (error) {
    console.warn("Erro ao validar CEP:", error);
    return error;
  }
}
