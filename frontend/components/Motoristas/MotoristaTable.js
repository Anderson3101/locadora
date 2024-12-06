import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const MotoristaTable = ({ motoristas, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>CNH</TableCell>
          <TableCell>Validade CNH</TableCell>
          <TableCell>Telefone</TableCell>
          <TableCell>Endereço</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {motoristas.map((motorista) => (
          <TableRow key={motorista.id}>
            <TableCell>{motorista.nome}</TableCell>
            <TableCell>{motorista.cnh}</TableCell>
            <TableCell>{motorista.validade_cnh}</TableCell>
            <TableCell>{motorista.telefone}</TableCell>
            <TableCell>{motorista.endereco}</TableCell>
            <TableCell>
              <IconButton onClick={() => onEdit(motorista)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(motorista.id)} color="secondary">
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MotoristaTable;
