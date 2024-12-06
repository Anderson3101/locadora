import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import api from "../../api";

const MotoristaForm = ({ motorista, onClose }) => {
  const [formData, setFormData] = useState({
    nome: "",
    cnh: "",
    validade_cnh: "",
    telefone: "",
    endereco: "",
  });

  useEffect(() => {
    if (motorista) {
      setFormData(motorista);
    }
  }, [motorista]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (motorista) {
        await api.put(`/motoristas/${motorista.id}`, formData);
      } else {
        await api.post("/motoristas", formData);
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{motorista ? "Editar Motorista" : "Adicionar Motorista"}</DialogTitle>
      <DialogContent>
        <TextField
          name="nome"
          label="Nome"
          fullWidth
          margin="normal"
          value={formData.nome}
          onChange={handleChange}
        />
        <TextField
          name="cnh"
          label="CNH"
          fullWidth
          margin="normal"
          value={formData.cnh}
          onChange={handleChange}
        />
        <TextField
          name="validade_cnh"
          label="Validade CNH"
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.validade_cnh}
          onChange={handleChange}
        />
        <TextField
          name="telefone"
          label="Telefone"
          fullWidth
          margin="normal"
          value={formData.telefone}
          onChange={handleChange}
        />
        <TextField
          name="endereco"
          label="Endereço"
          fullWidth
          margin="normal"
          value={formData.endereco}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MotoristaForm;
