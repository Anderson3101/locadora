from django.shortcuts import render, redirect
from .forms import ManutencaoForm
from veiculo.models import Veiculo
from motorista.models import Motorista
from manutencao.models import Manutencao
from django.contrib import messages

def adicionar_manutencao(request):
    veiculos = Veiculo.objects.all()
    motoristas = Motorista.objects.all()

    if request.method == 'POST':
        form = ManutencaoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = ManutencaoForm()

    return render(request, 'adicionar_manutencao.html', {
        'form': form,
        'veiculos': veiculos,
        'motoristas': motoristas,
    })
    
def listar_manutencao(request):
    manutencao = Manutencao.objects.all()
    return render(request, 'listar_manutencao.html', {'manutencao': manutencao})

def editar_manutencao(request, pk):
    manutencao = Manutencao.objects.get(pk=pk)
    veiculos = Veiculo.objects.all()
    motoristas = Motorista.objects.all()
    
    if request.method == 'POST':
        form = ManutencaoForm(request.POST, instance=manutencao)
        if form.is_valid():
            form.save()
            messages.success(request, 'Manutenção editada com sucesso!')
            return redirect('listar_manutencao')
    return render(request, 'editar_manutencao.html', {
        'manutencao': manutencao,
        'veiculos': veiculos,
        'motoristas': motoristas,
    })
