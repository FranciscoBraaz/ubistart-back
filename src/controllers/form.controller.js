import {
  getItemByEmail,
  getItemByCep,
  create,
  update,
  getItems,
} from "../models/formItem.model.js";
import { validateCep } from "../utils/index.js";

export async function createItem(req, res) {
  try {
    const { name, email, cep } = req.body;

    if (!name || !email || !cep) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const foundItemByEmail = await getItemByEmail(email);
    if (foundItemByEmail) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const cepFormatted = cep.replace(/\D/g, "");
    const foundItemByCep = await getItemByCep(cepFormatted);
    if (foundItemByCep) {
      return res.status(400).json({ message: "CEP já cadastrado" });
    }

    const isValidCep = await validateCep(cepFormatted);

    if (isValidCep instanceof Error) {
      return res.status(400).json({ message: "CEP inválido" });
    }

    const formItemCreated = await create({ name, email, cep: cepFormatted });

    res.json({
      message: "Item criado com sucesso",
      createdItem: formItemCreated,
    });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "Houve um erro interno no servidor" });
  }
}

export async function editItem(req, res) {
  try {
    const { id, name, email, cep } = req.body;

    if (!id || !name || !email || !cep) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const foundItemByEmail = await getItemByEmail(email);
    if (foundItemByEmail) {
      if (id !== foundItemByEmail._id.toString()) {
        return res.status(400).json({ message: "E-mail já cadastrado" });
      }
    }

    const cepFormatted = cep.replace(/\D/g, "");
    const foundItemByCep = await getItemByCep(cepFormatted);
    if (foundItemByCep) {
      if (id !== foundItemByCep._id.toString()) {
        return res.status(400).json({ message: "CEP já cadastrado" });
      }
    }

    const isValidCep = await validateCep(cepFormatted);

    if (isValidCep instanceof Error) {
      return res.status(400).json({ message: "CEP inválido" });
    }

    const formItemUpdated = await update(
      { name, email, cep: cepFormatted },
      id
    );

    res.json({
      message: "Item criado com sucesso",
      updatedItem: formItemUpdated,
    });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "Houve um erro interno no servidor" });
  }
}

export async function getFormItems(req, res) {
  try {
    const { page = 1 } = req.params;

    const { formItems, totalPages, currentPage } = await getItems({
      page: Number(page),
    });

    res.status(200).json({ formItems, totalPages, currentPage });
  } catch (error) {
    console.warn(error);
    res.status(500).json({ message: "Houve um erro interno no servidor" });
  }
}
