import os
import django
import random
import time
from faker import Faker
from django.db.utils import OperationalError

# Configurar o ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'locadora.settings')
django.setup()

from motorista.models import Motorista  # Importar o modelo

# Inicializa a biblioteca Faker
fake = Faker("pt_BR")

def criar_motoristas():
    """ Cria motoristas fictícios no banco de dados respeitando os limites de tamanho """
    motoristas = []
    for _ in range(50):
        motorista = Motorista(
            nome=fake.name(),  
            email=fake.email(),
            cnpj=fake.cnpj(),
            cpf=fake.cpf(),
            cep=fake.postcode(),  # CEP geralmente tem no máximo 9 caracteres
            endereco=fake.street_name(),
            numero=str(fake.building_number()),
            bairro=fake.bairro(),
            cidade=fake.city(),
            estado=fake.estado_sigla(),  # Estado deve ser apenas "SP", "RJ", etc. (2 caracteres)
            telefone=fake.phone_number()[:15],  # Garante no máximo 15 caracteres
            celular=fake.cellphone_number()[:15],  # Garante no máximo 15 caracteres
            observacao=fake.text(max_nb_chars=50),
            status=random.choice([True, False])
        )
        motoristas.append(motorista)

    # Salva todos os motoristas no banco de dados
    Motorista.objects.bulk_create(motoristas)
    print("✅ 50 motoristas adicionados com sucesso!")

# Executar
