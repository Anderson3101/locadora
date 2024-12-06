import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import MotoristaTable from "./MotoristaTable";
import MotoristaForm from "./MotoristaForm";
import api from "../../api";

const MotoristaList = () => {
  const [motoristas, setMotoristas] = useState([]);
  const [selectedMotorista, setSelectedMotorista] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMotoristas = async () => {
    try {
      const response = await api.get("/motoristas");
      setMotoristas(response.data);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  };

  useEffect(() => {
    fetchMotoristas();
  }, []);

  const handleEdit = (motorista) => {
    setSelectedMotorista(motorista);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/motoristas/${id}`);
      fetchMotoristas();
    } catch (error) {
      console.error("Erro ao excluir motorista:", error);
    }
  };

  const handleFormClose = () => {
    setSelectedMotorista(null);
    setShowForm(false);
    fetchMotoristas();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Motoristas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(true)}
        style={{ marginBottom: 16 }}
      >
        Adicionar Motorista
      </Button>
      <MotoristaTable
        motoristas={motoristas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <MotoristaForm
          motorista={selectedMotorista}
          onClose={handleFormClose}
        />
      )}
    </Container>
  );
};

export default MotoristaList;
