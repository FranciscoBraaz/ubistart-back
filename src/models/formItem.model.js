import { Schema, model } from "mongoose";

const formItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormItem = model("FormItem", formItemSchema);

export async function create({ name, email, cep }) {
  try {
    const formItemCreated = await FormItem.create({ name, email, cep });
    return formItemCreated;
  } catch (error) {
    console.warn("DB - Erro ao criar item:", error);
    throw new Error(error);
  }
}

export async function update(updatedFields, itemId) {
  try {
    const updatedItem = await FormItem.findOneAndUpdate(
      { _id: itemId },
      { $set: updatedFields },
      { new: true }
    );

    return updatedItem;
  } catch (error) {
    console.warn("DB - Erro ao editar item:", error);
    throw new Error(error);
  }
}

export async function getItemByEmail(email) {
  try {
    const formItem = await FormItem.findOne({ email });
    return formItem;
  } catch (error) {
    console.warn("DB - Erro ao buscar item:", error);
    throw new Error(error);
  }
}

export async function getItemByCep(cep) {
  try {
    const formItem = await FormItem.findOne({ cep });
    return formItem;
  } catch (error) {
    console.warn("DB - Erro ao buscar item:", error);
    throw new Error(error);
  }
}

export async function getItems({ page = 1, limit = 5 }) {
  try {
    const formItems = await FormItem.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await FormItem.countDocuments();

    return {
      formItems,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } catch (error) {
    console.warn("DB - Erro ao buscar itens:", error);
    throw new Error(error);
  }
}
