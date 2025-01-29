from django.db import models
from veiculo.models import Veiculo
from motorista.models import Motorista

class Aluguel(models.Model):
    taxa = models.DecimalField(max_digits=10, decimal_places=2)
    data_pagamento = models.DateField()
    veiculo = models.ForeignKey(Veiculo, on_delete=models.CASCADE)
    motorista = models.ForeignKey(Motorista, on_delete=models.CASCADE)
    km_atual = models.PositiveIntegerField()
    valor_pago = models.DecimalField(max_digits=10, decimal_places=2)
    data_inicio = models.BooleanField(default=False)
    data_fim = models.BooleanField(default=False)
    pendencias = models.TextField(blank=True, null=True, help_text="Informe pendências como Multa ou Manutenção")
